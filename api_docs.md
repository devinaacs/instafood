# InstaFood API

List of available endpoints:

- [GET /places](#get-places)

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
