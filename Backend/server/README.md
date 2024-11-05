
# Hostel API Usage Guide

## Overview

The Hostel API allows you to retrieve a list of hostels with both filtering and pagination functionalities. You can specify filter criteria such as `gender`, `max_price`, `min_price`, `amenities`, and `arrival_time` in the POST request body. Additionally, use `limit` and `offset` parameters to retrieve paginated data as needed.

## 1. Filter API
### Endpoint

**POST** `/api/hostels/filter/`

### Request Structure

To utilize the hostel filtering feature, send a **POST** request with a JSON body containing the following fields:

#### Request Body Parameters

| Parameter                                | Type         | Description                                                                                          | Default Value |
|------------------------------------------|--------------|------------------------------------------------------------------------------------------------------|---------------|
| `gender`                                 | Integer      | Gender of the hostels to filter: <br> 0: Female <br> 1: Male <br> 2: Any <br> 3: Both              | 2 (Any)       |
| `max_price`                             | Integer      | Maximum price for hostel accommodation (inclusive).                                                | 1,000,000     |
| `min_price`                             | Integer      | Minimum price for hostel accommodation (inclusive).                                                | 0             |
| `internet`                               | Integer      | Filter for internet availability: <br> 0: No <br> 1: Yes <br> 2: Any                               | 2 (Any)       |
| `washing_machine`                        | Integer      | Filter for washing machine availability: <br> 0: No <br> 1: Yes <br> 2: Any                         | 2 (Any)       |
| `bathroom_cleaning`                     | Integer      | Filter for bathroom cleaning availability: <br> 0: No <br> 1: Yes <br> 2: Any                       | 2 (Any)       |
| `study_table`                            | Integer      | Filter for study table availability: <br> 0: No <br> 1: Yes <br> 2: Any                             | 2 (Any)       |
| `books_rack`                            | Integer      | Filter for books rack availability: <br> 0: No <br> 1: Yes <br> 2: Any                             | 2 (Any)       |
| `wardrobe`                               | Integer      | Filter for wardrobe availability: <br> 0: No <br> 1: Yes <br> 2: Any                               | 2 (Any)       |
| `clothes_hanger`                        | Integer      | Filter for clothes hanger availability: <br> 0: No <br> 1: Yes <br> 2: Any                         | 2 (Any)       |
| `smoking_and_beverages_usage`           | Integer      | Filter for smoking and beverages usage: <br> 0: No <br> 1: Yes <br> 2: Any                         | 2 (Any)       |
| `arrival_time`                          | String       | Arrival time for filtering in `HH:MM` format. Only hostels with later arrival times will be included. | '00:00'       |
| `distance`                              | Object       | An optional object containing distance filtering criteria.                                          | -             |
| &nbsp;&nbsp;&nbsp;`latitude`            | Float        | Latitude of the reference point for distance filtering.                                             | -             |
| &nbsp;&nbsp;&nbsp;`longitude`           | Float        | Longitude of the reference point for distance filtering.                                            | -             |
| &nbsp;&nbsp;&nbsp;`max_distance_km`     | Float        | Maximum distance (in kilometers) from the specified point.                                          | 10            |
| `location`                               | String       | Location keyword to filter hostels by location (case-insensitive).                                 | -             |

### Error Responses

The API will return a `400 Bad Request` response with a message if any of the following conditions are met:
- **Invalid Arrival Time Format**: If the `arrival_time` is not in `HH:MM` format.
- **Invalid Price Range**: If the difference between `max_price` and `min_price` is less than 1000.
- **Invalid Distance Range**: If the provided `max_distance_km` is less than 0.1 or if latitude or longitude are missing or invalid.

### Example Request

```json
{
    "gender": 1,
    "max_price": 5000,
    "min_price": 2000,
    "internet": 1,
    "washing_machine": 1,
    "bathroom_cleaning": 0,
    "study_table": 1,
    "books_rack": 1,
    "wardrobe": 0,
    "clothes_hanger": 1,
    "smoking_and_beverages_usage": 0,
    "arrival_time": "18:00",
    "distance": {
        "latitude":  27.692179,
        "longitude": 85.335329,
        "max_distance_km": 5
    },
    "location": "baneshowor",
}
```

### Response Structure

On a successful request, the API will return a JSON array of hostels matching the specified filters. Each hostel object will be serialized using the `HostelSerializer` and will include the following fields:

#### Response Body

```json
[
    {
        "id": 1,
        "name": "KTM Boys Hostel",
        "location": "Mid Baneshowor",
        "owner_name": "Savitri Nepal",
        "gender": 0,
        "internet": true,
        "washing_machine": true,
        "bathroom_cleaning": true,
        "study_table": true,
        "books_rack": true,
        "wardrobe": true,
        "clothes_hanger": true,
        "smoking_and_beverages_usage": false,
        "arrival_time": "21:30:00",
        "transportation_bus_stations": "Setopool and Nearby apex college",
        "nearby_hospitals_pharmacy": "Frontline hospital and salala pharmacy",
        "nearby_schools": "Frontline hospital and salala pharmacy",
        "nearby_shopping_malls": "EyePlex",
        "nearby_cafes_and_restaurants": "Himalayan java"
    }
    // ... more hostel objects
]
```

### Status Codes

- **200 OK**: Request was successful, and the filtered hostels are returned.
- **400 Bad Request**: Invalid request parameters or missing required parameters.

## 2. Pagination API
### Endpoint

**GET** `/api/hostels?offset=offset&limit=limit`

### Request Structure

To utilize the hostel pagination feature, send a **GET** request with `limit` and `offset` as query parameters.

- **limit**: Integer, optional. Specifies the maximum number of hostels to return. Default is 10.
- **offset**: Integer, optional. Specifies the starting point in the list of hostels. Default is 0.



#### Example Request
To retrieve hostels with pagination:
```http
GET /api/hostels/?limit=10&offset=20
```
This request returns 10 hostels starting from the 21st record in the dataset.

---

### Response Structure


```json
{
  "hostels": [
    {
      "id": 1,
        "name": "KTM Boys Hostel",
        "location": "Mid Baneshowor",
        "owner_name": "Savitri Nepal",
        "gender": 0,
        "internet": true,
        "washing_machine": true,
        "bathroom_cleaning": true,
        "study_table": true,
        "books_rack": true,
        "wardrobe": true,
        "clothes_hanger": true,
        "smoking_and_beverages_usage": false,
        "arrival_time": "21:30:00",
        "transportation_bus_stations": "Setopool and Nearby apex college",
        "nearby_hospitals_pharmacy": "Frontline hospital and salala pharmacy",
        "nearby_schools": "Frontline hospital and salala pharmacy",
        "nearby_shopping_malls": "EyePlex",
        "nearby_cafes_and_restaurants": "Himalayan java"
    },
    ...
  ],
  "total_count": 50,  // Total number of hostels 
  "has_more": true     // True if there are more hostels available beyond this page
}
```

### Response Fields
- **hostels**: Array of hostel objects that match the criteria.
- **total_count**: Integer. The total number of hostels
- **has_more**: Boolean. Indicates if more hostels are available beyond the current set.

---