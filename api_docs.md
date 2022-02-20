# InstaFood API

List of available endpoints:

- [POST /register](#post-register)
- [POST /login](#post-login)
- [GET /users](#get-users)
- [GET /users/:id](#get-usersid)
- [GET /places](#get-places)
- [GET /places/photo](#get-placesphoto)
- [GET /places/:id](#get-placesid)
- [POST /posts](#post-posts)
- [GET /posts](#get-posts)
- [DELETE /posts/:id](#delete-postsid)
- [GET /trending/posts](#get-trendingposts)
- [GET /trending/places](#get-trendingplaces)
- [GET /trending/tags](#get-trendingtags)

### POST /register

Register new user.

**Request**

_Body_
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Responses**

_Response 201 - Created_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGYxMjFjZDUwNDBjNzM4MGZjN2RlYSIsIm5hbWUiOiJ1c2VyLm9uZSIsImVtYWlsIjoidXNlci5vbmVAbWFpbC5jb20iLCJpYXQiOjE2NDUxNTQ4NDV9.oIymYBnOn7TAA_0Kgf1raJVvibDt6JJiEgpet3twi5s"
}
```

### POST /login

Login using existing user credentials.

**Request**

_Body_
```json
{
  "email": "string",
  "password": "string"
}
```

**Responses**

_Response 200 - Created_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGYxMjFjZDUwNDBjNzM4MGZjN2RlYSIsIm5hbWUiOiJ1c2VyLm9uZSIsImVtYWlsIjoidXNlci5vbmVAbWFpbC5jb20iLCJpYXQiOjE2NDUxNTQ4NDV9.oIymYBnOn7TAA_0Kgf1raJVvibDt6JJiEgpet3twi5s"
}
```

### GET /users

**Request**

_Query_
```json
{
  "username": "string"
}
```


**Responses**

_Response 200 - Created_
```json
[
  {
    "id": "620f477a903febe22132c9d4",
    "username": "user.two",
    "email": "user.two@mail.com",
    "created_at": "2022-02-18T07:15:06.837Z",
    "updated_at": "2022-02-18T07:15:06.837Z"
  }
]
```

### GET /users/:id

**Request**

_Params_
```json
{
  "id": "string (required)"
}
```

**Responses**

_Response 200 - Created_
```json
[
  {
    "id": "620f477a903febe22132c9d4",
    "username": "user.two",
    "email": "user.two@mail.com",
    "created_at": "2022-02-18T07:15:06.837Z",
    "updated_at": "2022-02-18T07:15:06.837Z"
  }
]
```

### GET /places

Searching places with query.

**Request**

_Query_

```json
{
  "name": "string (required)",
  "location": "string (optional)"
}
```

**Responses**

_Response 200 - OK_

```json
[
  {
    "place_id": "ChIJx7nxVtb1aS4Rjhv-oVcYKl8",
    "name": "Warung Jepara",
    "address": "RRPH+GVR, RT.8/RW.8, Pasar Baru, Sawah Besar, Central Jakarta City, Jakarta 10120, Indonesia",
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png"
  },
  {
    "place_id": "ChIJx7nxVtb1aS4Rjhv-oVcYKl8",
    "name": "Warung Tekko",
    "address": "Jl. Suryopranoto No.14, RT.14/RW.8, Petojo Sel., Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10160, Indonesia",
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "photo_reference": "Aap_uECBix5HF972L1HL7DEO7yqsZYerVhE5qmElD5LHT96sqQ9wsNQN-DnPSgfVsVYRPNzPQ5ikGY5hlhKwIqx5BJPgn4-92hfeHkG4779AWTljPbEGUqyYkui6ftorZlNgemGyPdVA5KoRqMKZeA5ybk4JyAN-HnSzVIOJxin4iNDvf_ld"
  }
]
```

### GET /places/photo

Accessing a photo of place using photo_reference provided by Google Places API.

**Request**

_Query_
```json
{
  "ref": "string (required)"
}
```

**Responses**

_Response 200 - OK_

Response body contains binary data of image.

### GET /places/:id

Getting specific place detail by id.

**Request**

_Params_
```json
{
  "id": "string (required)"
}
```

**Responses**

_Response 200 - OK_
```json
{
	"name": "Warung Tenda Biru",
	"address": "16, Jl. Denpasar Raya No.109, RT.16/RW.4...",
	"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
	"photos": [
		"Aap_uEA3jWRmw3BqBK7M2x_c2c-T1NL9JWRrT6URovSlDDnaDkaufu_84bxnQbCsAXZoS3whGQ8kIrzT2JIkcXpanrv2Ykigr2JUjM-ZKldCHOG6jDKIOdgRCo1QkCLWtQgRcgJTP0zF6si_ki49MbazwKxUlGFBXdjkL483ocZscO5hcBS8",
		"Aap_uEAW8dFvuDlJLW-_t-175lJY7OmMLqGxK3OHyOk70q3oqhgWFB9FuRW_FbdgoS7BrBD6yyVNbHTGPp93sE6bhTepuLT2C9wpjW3yI63XLLEYLQ3iyEQT6i6ijcOrueyaL49KA-pQgI3XK4X3L3lxamhhFME-04g29K2DPVdqLY7t-U0H"
	]
}
```

### POST /posts

Creating new post.

**Request**

_Headers_
```json
{
  "content-type": "multipart/form-data",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQxMjcwNDMwfQ.EpaOTmbHDYRuW1ytTXvuMA22OcCOaeulPf88Asq4u9s"
}
```

_Body_
```json
{
  "place_id": "string",
  "caption": "string",
  "tags": "array of string",
  "images": "array of files"
}
```

**Responses**

_Response 201 - Created_
```json
{
  "id": "620f0d71f63c8e7e064611c9",
  "user": "620eb0001b28613ab1d5b310",
  "place_id": "ChIJd9SUqtb1aS4RJmrIUtK58-s",
  "images": [
		"https://storage.googleapis.com/hacktiv8-instafood.appspot.com/development/posts/620f0d71f63c8e7e064611c9/img-1.png",
		"https://storage.googleapis.com/hacktiv8-instafood.appspot.com/development/posts/620f0d71f63c8e7e064611c9/img-2.png"
	],
  "created_at": "2022-02-18T03:07:29.959Z",
  "tags": [ "sate", "soto" ]
}
```

### GET /posts

Getting list of posts.

**Request**

_Query_
```json
{
  "user_id": "string",
  "place_id": "string",
  "tag": "string",
  "page_size": "string",
  "page_number": "string"
}
```

**Responses**

_Response 200 - OK_
```json
{
  "pages_count": 5,
  "items": [
    {
      "id": "620eb4f177ecd84dd0b4a7ec",
      "user": {
        "username": "user.one",
        "id": "621054ef0837fb236cd55b7c"
      },
      "place_id": "ChIJmzRSGeD1aS4RELtI48vhrb8",
      "images": [
        "https://storage.googleapis.com/hacktiv8-instafood.appspot.com/development/posts/620f6055bf705044a6b1148c/img-1.png",
        "https://storage.googleapis.com/hacktiv8-instafood.appspot.com/development/posts/620f6055bf705044a6b1148c/img-2.png"
      ],
      "likes": [
        {
          "id": "62105694b36a64d38945f588",
          "user": {
            "id": "621054ef0837fb236cd55b7c",
            "username": "user.one"
          }
        }
      ],
      "comments": [
        {
          "id": "62105604b36a64d38945f57f",
          "comment": "hello",
          "user": {
            "id": "621054ef0837fb236cd55b7c",
            "username": "user.one"
          }
        }
      ],
      "created_at": "2022-02-18T08:51:00.868Z",
      "updated_at": "2022-02-19T02:26:34.385Z"
    }
  ]
}
```

### DELETE /posts/:id

Deleting post by id.

**Request**

_Params_
```json
{
  "id": "string (required)"
}
```

**Responses**

_Response 200 - OK_
```json
{
  "message": "post has been deleted successfully"
}
```

### GET /trending/posts

Getting 10 (at maximum) trending posts sorted by popularity.

**Responses**

_Response 200 - OK_
```json
[
  {
    "id": "621063ecc93e6b0ae05b6f83",
    "user": {
      "id": "62105d4046db9b1297368fce",
      "username": "user.two"
    },
    "images": [
      "https://storage.googleapis.com/hacktiv8-instafood.appspot.com/development/posts/621063ecc93e6b0ae05b6f83/img-1.png"
    ],
    "tags": [
      "sweet",
      "food"
    ]
  }
]
```

### GET /trending/places

Getting 10 (at maximum) trending places sorted by popularity. Each element contains most popular post related to the place.

**Responses**

_Response 200 - OK_
```json
[
  {
    "place_id": "ChIJh_fNBAH3aS4Rg0Edh0Qfidw",
    "most_popular": {
      "post": {
        "id": "621063ecc93e6b0ae05b6f83",
        "user": {
          "username": "user.two",
          "id": "62105d4046db9b1297368fce"
        },
        "images": [
          "https://storage.googleapis.com/hacktiv8-instafood.appspot.com/development/posts/621063ecc93e6b0ae05b6f83/img-1.png"
        ],
        "tags": [
          "sweet",
          "food"
        ]
      }
    }
  }
]
```

### GET /trending/tags

Getting 10 (at maximum) trending places sorted by popularity. Each element contains most popular post related to the tag.

**Responses**

_Response 200 - OK_
```json
[
  {
    "tag": "sweet",
    "most_popular": {
      "post": {
        "id": "6210d46c8d557815d4a4f845",
        "user": {
          "username": "user.one",
          "id": "621054ef0837fb236cd55b7c"
        },
        "images": [],
        "tags": [
          "sweet"
        ]
      }
    }
  }
]
```
