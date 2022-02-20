const { forever } = require('async');
const Post = require('../models/Post');
const TrendingPosts = require('../models/TrendingPosts');
const TrendingTag = require('../models/TrendingTag');
const TrendingPlace = require('../models/TrendingPlace');
const actTrendingVersion = require('../actions/trendingVersion');

const PROCESSING_INTERVAL = process.env.PROCESSING_INTERVAL || 1 * 1000;
const RESTART_INTERVAL = process.env.RESTART_INTERVAL || 10 * 1000;
const PROCESSING_SIZE = process.env.PROCESSING_SIZE || 20;
const TRENDING_POSTS_SIZE = 10;

let nextPostDate = null;
let trendingPosts = null;
let draftVersion = 0;

module.exports = async function () {
  console.log('starting trending worker');
  await initTrendingVersion();
  console.log('trending worker is looping');

  startProcessingLoop(() => proceedTrending());
};

async function initTrendingVersion() {
  const tv = await actTrendingVersion.instance();
  draftVersion = tv.draft;

  await TrendingTag.deleteMany({ version: draftVersion });
  await TrendingPlace.deleteMany({ version: draftVersion });
}

function startProcessingLoop(handler) {
  forever(
    function (next) {
      Promise.resolve(handler())
        .then(() => {
          setTimeout(() => next(), PROCESSING_INTERVAL);
        })
        .catch(err => {
          console.log(err);
          setTimeout(() => next(), PROCESSING_INTERVAL);
        });
    },
    err => console.log(err)
  );
}

async function proceedTrending() {
  const filter = {};

  if (!nextPostDate) {
    console.log('trending worker version', draftVersion);
    trendingPosts = [];
  } else {
    filter.created_at = {
      $lt: nextPostDate,
    };
  }

  /**
   *
   * Assumption:
   * No post has exactly the same timestamp.
   *
   * Filter by created_at does not handle condition
   * when there are at least two posts that have
   * exactly same value of date in millisecond.
   * One of them might possibly get skipped.
   *
   */
  const posts = await Post.find(filter)
    .select(['place_id', 'tags', 'like_ids', 'comment_ids', 'created_at'])
    .limit(PROCESSING_SIZE)
    .sort({ created_at: -1 });

  for (let post of posts) {
    await proceedPost(post);
  }

  if (posts.length > 0) {
    nextPostDate = new Date(posts[posts.length - 1].created_at);
  } else {
    nextPostDate = null;
    await updateTrendingPosts();
  }
}

async function proceedPost(post) {
  const popularity = calculatePopularity(post);
  const promises = [];

  if (post.place_id) {
    const p = TrendingPlace.findOne({
      version: draftVersion,
      place_id: post.place_id,
    })
      .then(result => {
        if (!result) {
          return TrendingPlace.create({
            version: draftVersion,
            place_id: post.place_id,
            popularity: popularity / 10,
            most_popular: {
              post: post._id,
              popularity: popularity,
            },
          });
        } else {
          result.popularity += popularity / 10;

          if (popularity > result.most_popular.popularity) {
            result.most_popular = {
              post: post._id,
              popularity: popularity,
            };
          }

          return result.save();
        }
      })
      .catch(console.log);

    promises.push(p);
  }

  post.tags.forEach(tag => {
    const p = TrendingTag.findOne({
      version: draftVersion,
      tag: tag,
    })
      .then(result => {
        if (!result) {
          return TrendingTag.create({
            version: draftVersion,
            tag: tag,
            popularity: popularity / 10,
            most_popular: {
              post: post._id,
              popularity: popularity,
            },
          });
        } else {
          result.popularity += popularity / 10;

          if (popularity > result.most_popular.popularity) {
            result.most_popular = {
              post: post._id,
              popularity: popularity,
            };
          }

          return result.save();
        }
      })
      .catch(console.log);

    promises.push(p);
  });

  let i = 0;
  while (i < trendingPosts.length && popularity < trendingPosts[i].popularity) {
    i++;
  }

  if (i < TRENDING_POSTS_SIZE) {
    trendingPosts.splice(i, 0, {
      id: post._id,
      popularity,
    });
  }

  await Promise.all(promises);
}

function calculatePopularity(post) {
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const createdAtInMillis = new Date(post.created_at).getTime();

  const timeScore = (createdAtInMillis % oneDayInMillis) / oneDayInMillis;
  const originalPopularity =
    100 + post.like_ids.length + post.comment_ids.length + timeScore;

  const elapsedDaysInMillis = new Date() - new Date(post.created_at);
  const elapsedDays = Math.round(elapsedDaysInMillis / oneDayInMillis);
  const actualPopularity =
    originalPopularity * Math.pow(1 - 0.005, elapsedDays);

  return actualPopularity;
}

async function updateTrendingPosts() {
  await TrendingPosts.findOneAndUpdate(
    { version: draftVersion },
    {
      posts: trendingPosts.map(v => v.id),
      updated_at: new Date(),
    },
    { upsert: true }
  );

  const tv = await actTrendingVersion.shiftVersion();
  draftVersion = tv.draft;

  await TrendingTag.deleteMany({ version: draftVersion });
  await TrendingPlace.deleteMany({ version: draftVersion });
  await new Promise(resolve => {
    setTimeout(() => resolve(), RESTART_INTERVAL);
  });
}
