# InstaFood API

List of available endpoints:

- [GET /places](#get-places)
- [GET /places/photo](#get-placesphoto)
- [GET /places/:id](#get-placesid)

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
    "PlaceId": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "name": "Warung Jepara",
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png"
  },
  {
    "PlaceId": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "name": "Warung Tekko",
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
	"formatted_address": "16, Jl. Denpasar Raya No.109, RT.16/RW.4...",
	"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
	"name": "Warung Tenda Biru",
	"photos": [
		{
			"height": 1080,
			"html_attributions": [
				"<a href=\"https://maps.google.com/maps/contrib/103401590865745977740\">Someone</a>"
			],
			"photo_reference": "Aap_uEBLO7SdLaWXC7x1WOxNnV5-4Yy2vsByS-VikkreR8LnwvlkJXsOGrRV17sz8l7iV4yumXClVn-jTqEJbQKQE_2MzrMBGZe1lYyZBscuirvB0Y9xJ8yJLU4zTxhgdhps3oNqtuDMJD6BbsuwPo8Gwi_DHVnC0L4hML12345_a_R7szu0",
			"width": 1080
		}
	]
}
```