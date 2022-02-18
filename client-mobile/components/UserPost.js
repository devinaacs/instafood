import React from 'react';
import { StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const numColumns = 3;

export default function UserPost() {
  return (
    <FlatList
      data={posts}
      style={styles.container}
      numColumns={numColumns}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Image
            style={{ width: windowWidth / 3, height: 176, margin: 1 }}
            source={{
              uri: item.imageUrl,
            }}
          />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const posts = [
  {
    id: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    user: {
      name: 'Bambang',
      profilePicture:
        'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png',
    },
    likes: 781019389,
    place: 'Pizza Hut',
    createdAt: 'February 16, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
  {
    id: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    user: {
      name: 'Jefri',
      profilePicture:
        'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png',
    },
    likes: 7810,
    place: 'Holy Cow',
    createdAt: 'February 12, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
  {
    id: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    user: {
      name: 'Bambang',
      profilePicture:
        'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png',
    },
    likes: 781019389,
    place: 'Pizza Hut',
    createdAt: 'February 16, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
  {
    id: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    user: {
      name: 'Bambang',
      profilePicture:
        'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png',
    },
    likes: 781019389,
    place: 'Pizza Hut',
    createdAt: 'February 16, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
  {
    id: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    user: {
      name: 'Bambang',
      profilePicture:
        'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png',
    },
    likes: 781019389,
    place: 'Pizza Hut',
    createdAt: 'February 16, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
  {
    id: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    user: {
      name: 'Bambang',
      profilePicture:
        'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png',
    },
    likes: 781019389,
    place: 'Pizza Hut',
    createdAt: 'February 16, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
  {
    id: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    user: {
      name: 'Bambang',
      profilePicture:
        'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png',
    },
    likes: 781019389,
    place: 'Pizza Hut',
    createdAt: 'February 16, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
  {
    id: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    user: {
      name: 'Bambang',
      profilePicture:
        'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png',
    },
    likes: 781019389,
    place: 'Pizza Hut',
    createdAt: 'February 16, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
  {
    id: 7,
    imageUrl:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    user: {
      name: 'Bambang',
      profilePicture:
        'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png',
    },
    likes: 781019389,
    place: 'Pizza Hut',
    createdAt: 'February 16, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
  {
    id: 8,
    imageUrl:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    user: {
      name: 'Bambang',
      profilePicture:
        'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png',
    },
    likes: 781019389,
    place: 'Pizza Hut',
    createdAt: 'February 16, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
];
