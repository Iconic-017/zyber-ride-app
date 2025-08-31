# API Documentation

This document provides details on the available API endpoints.

---

## User Endpoints

### Register a new user

Creates a new user account.

- **URL:** `/user/register`
- **Method:** `POST`
- **Auth required:** No

### Request Body

The request body must be a JSON object containing the user's information.

**Example:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Parameters:**

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `fullname` | `Object` | The user's full name. | Yes |
| `fullname.firstname` | `String` | The user's first name. Minimum 3 characters. | Yes |
| `fullname.lastname` | `String` | The user's last name. Minimum 3 characters. | No |
| `email` | `String` | A unique email address for the user. | Yes |
| `password` | `String` | The user's password. Minimum 6 characters. | Yes |

---

### Responses

#### Success Response

- **Status Code:** `201 Created`
- **Content:** Returns a success message, the created user object, and a JWT for authentication.

**Example:**
```json
{
    "message": "User registered successfully",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "_id": "66756b90792372f7c4583bce",
        "email": "john.doe@example.com",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc1NmI5MDc5MjM3MmY3YzQ1ODNiY2UiLCJpYXQiOjE3MTg5NzExNTIsImV4cCI6MTcxOTA1NzU1Mn0.some-jwt-token"
}
```

#### Error Responses

- **Status Code:** `400 Bad Request`
- **Description:** Returned when request body validation fails. This can be due to missing required fields or fields that do not meet the criteria (e.g., password too short).
- **Content:** An array of validation errors.

**Example:**
```json
{
    "errors": [
        {
            "type": "field",
            "msg": "First name is required",
            "path": "fullname.firstname",
            "location": "body"
        }
    ]
}
```

- **Status Code:** `500 Internal Server Error`
- **Description:** Returned for server-side errors. This can happen if a user with the provided email already exists or if there is another unexpected error during user creation.
- **Content:** An error message.

**Example:**
```json
{
    "message": "User already exists"
}
```

### Login a user

Logs in an existing user.

- **URL:** `/user/login`
- **Method:** `POST`
- **Auth required:** No

### Request Body

The request body must be a JSON object containing the user's credentials.

**Example:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Parameters:**

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `email` | `String` | The user's email address. | Yes |
| `password` | `String` | The user's password. Minimum 6 characters. | Yes |

---

### Responses

#### Success Response

- **Status Code:** `200 OK`
- **Content:** Returns a success message, the user object, and a JWT for authentication.

**Example:**
```json
{
    "message": "Login successful",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "_id": "66756b90792372f7c4583bce",
        "email": "john.doe@example.com",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc1NmI5MDc5MjM3MmY3YzQ1ODNiY2UiLCJpYXQiOjE3MTg5NzExNTIsImV4cCI6MTcxOTA1NzU1Mn0.some-jwt-token"
}
```

#### Error Responses

- **Status Code:** `400 Bad Request`
- **Description:** Returned when request body validation fails (e.g., missing email or password).
- **Content:** An array of validation errors.

- **Status Code:** `401 Unauthorized`
- **Description:** Returned for invalid credentials (email or password).
- **Content:** An error message.

**Example:**
```json
{
    "message": "Invalid email or password"
}
```

- **Status Code:** `500 Internal Server Error`
- **Description:** Returned for other server-side errors.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Invalid email or password"
}
```

## Get User Profile

Retrieves the authenticated user's profile information.

- **URL:** `/user/profile`
- **Method:** `GET`
- **Auth required:** Yes (JWT in cookie or Authorization header)

### Request Headers

- `Authorization: Bearer <token>` (if not using cookie)

---

### Responses

#### Success Response

- **Status Code:** `200 OK`
- **Content:** Returns the user object (excluding password).

**Example:**
```json
{
    "_id": "66756b90792372f7c4583bce",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "__v": 0
}
```

#### Error Responses

- **Status Code:** `401 Unauthorized`
- **Description:** Returned if the user is not authenticated or the token is invalid/expired.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Authentication required"
}
```

- **Status Code:** `500 Internal Server Error`
- **Description:** Returned for server-side errors.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Internal server error"
}
```

---

## Logout User

Logs out the authenticated user by blacklisting the JWT and clearing the cookie.

- **URL:** `/user/logout`
- **Method:** `GET`
- **Auth required:** Yes (JWT in cookie or Authorization header)

### Request Headers

- `Authorization: Bearer <token>` (if not using cookie)

---

### Responses

#### Success Response

- **Status Code:** `200 OK`
- **Content:** Returns a success message.

**Example:**
```json
{
    "message": "Logout successful"
}
```

#### Error Responses

- **Status Code:** `400 Bad Request`
- **Description:** Returned if no token is provided in the request.
- **Content:** An error message.

**Example:**
```json
{
    "message": "No token provided"
}
```

- **Status Code:** `500 Internal Server Error`
- **Description:** Returned for server-side errors.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Internal server error"
}
```

---

## Captain Endpoints

### Register a new captain

Creates a new captain account (driver/vehicle registration).

- **URL:** `/captain/register`
- **Method:** `POST`
- **Auth required:** No

### Request Body

The request body must be a JSON object containing the captain's information and vehicle details.

**Example:**
```json
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securepass123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car",
    "location": {
      "lat": 28.6139,
      "long": 77.2090
    }
  }
}
```

**Parameters:**

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `fullname` | `Object` | The captain's full name. | Yes |
| `fullname.firstname` | `String` | The captain's first name. Minimum 3 characters. | Yes |
| `fullname.lastname` | `String` | The captain's last name. Minimum 3 characters. | No |
| `email` | `String` | A unique email address for the captain. | Yes |
| `password` | `String` | The captain's password. Minimum 6 characters. | Yes |
| `vehicle` | `Object` | The vehicle details. | Yes |
| `vehicle.color` | `String` | Vehicle color. Minimum 3 characters. | Yes |
| `vehicle.plate` | `String` | Vehicle plate. Minimum 3 characters. | Yes |
| `vehicle.capacity` | `Integer` | Vehicle capacity. Minimum 1. | Yes |
| `vehicle.vehicleType` | `String` | Vehicle type: `car`, `motorcycle`, or `auto`. | Yes |
| `vehicle.location` | `Object` | Vehicle location (latitude/longitude). | No |
| `vehicle.location.lat` | `Number` | Latitude. | No |
| `vehicle.location.long` | `Number` | Longitude. | No |

---

### Responses

#### Success Response

- **Status Code:** `201 Created`
- **Content:** Returns a success message, the created captain object, and a JWT for authentication.

**Example:**
```json
{
    "message": "Captain registered successfully",
    "captain": {
        "fullname": {
            "firstname": "Alice",
            "lastname": "Smith"
        },
        "_id": "66756b90792372f7c4583bce",
        "email": "alice.smith@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "XYZ1234",
            "capacity": 4,
            "vehicleType": "car",
            "location": {
                "lat": 28.6139,
                "long": 77.2090
            }
        },
        "status": "inactive",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc1NmI5MDc5MjM3MmY3YzQ1ODNiY2UiLCJpYXQiOjE3MTg5NzExNTIsImV4cCI6MTcxOTA1NzU1Mn0.some-jwt-token"
}
```

#### Error Responses

- **Status Code:** `400 Bad Request`
- **Description:** Returned when request body validation fails. This can be due to missing required fields or fields that do not meet the criteria (e.g., password too short, invalid vehicle type, or email already exists).
- **Content:** An array of validation errors or an error message.

**Example (validation error):**
```json
{
    "errors": [
        {
            "type": "field",
            "msg": "First name must be between 3 and 50 characters",
            "path": "fullname.firstname",
            "location": "body"
        }
    ]
}
```

**Example (email exists):**
```json
{
    "message": "Captain with this email already exists"
}
```

- **Status Code:** `500 Internal Server Error`
- **Description:** Returned for server-side errors.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Internal server error"
}
```

### Login a captain

Logs in an existing captain.

- **URL:** `/captain/login`
- **Method:** `POST`
- **Auth required:** No

#### Request Body

The request body must be a JSON object containing the captain's credentials.

**Example:**
```json
{
  "email": "alice.smith@example.com",
  "password": "securepass123"
}
```

**Parameters:**

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `email` | `String` | The captain's email address. | Yes |
| `password` | `String` | The captain's password. Minimum 6 characters. | Yes |

---

#### Responses

- **Status Code:** `200 OK`
- **Content:** Returns a success message, the captain object, and a JWT for authentication (in a cookie).

**Example:**
```json
{
    "message": "Login successful",
    "captain": {
        "fullname": {
            "firstname": "Alice",
            "lastname": "Smith"
        },
        "_id": "66756b90792372f7c4583bce",
        "email": "alice.smith@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "XYZ1234",
            "capacity": 4,
            "vehicleType": "car",
            "location": {
                "lat": 28.6139,
                "long": 77.2090
            }
        },
        "status": "inactive",
        "__v": 0
    }
}
```

- **Status Code:** `400 Bad Request`
- **Description:** Returned when request body validation fails (e.g., missing email or password, or invalid credentials).
- **Content:** An array of validation errors or an error message.

**Example (validation error):**
```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Please provide a valid email",
            "path": "email",
            "location": "body"
        }
    ]
}
```

**Example (invalid credentials):**
```json
{
    "message": "Invalid email or password"
}
```

- **Status Code:** `500 Internal Server Error`
- **Description:** Returned for server-side errors.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Internal server error"
}
```

### Get Captain Profile

Retrieves the authenticated captain's profile information.

- **URL:** `/captain/profile`
- **Method:** `GET`
- **Auth required:** Yes (JWT in cookie or Authorization header)

#### Request Headers

- `Authorization: Bearer <token>` (if not using cookie)

---

#### Responses

- **Status Code:** `200 OK`
- **Content:** Returns the captain object (excluding password).

**Example:**
```json
{
    "captain": {
        "_id": "66756b90792372f7c4583bce",
        "fullname": {
            "firstname": "Alice",
            "lastname": "Smith"
        },
        "email": "alice.smith@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "XYZ1234",
            "capacity": 4,
            "vehicleType": "car",
            "location": {
                "lat": 28.6139,
                "long": 77.2090
            }
        },
        "status": "inactive",
        "__v": 0
    }
}
```

- **Status Code:** `401 Unauthorized`
- **Description:** Returned if the captain is not authenticated or the token is invalid/expired.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Authentication required"
}
```

- **Status Code:** `500 Internal Server Error`
- **Description:** Returned for server-side errors.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Internal server error"
}
```

---

### Logout Captain

Logs out the authenticated captain by blacklisting the JWT and clearing the cookie.

- **URL:** `/captain/logout`
- **Method:** `GET`
- **Auth required:** Yes (JWT in cookie or Authorization header)

#### Request Headers

- `Authorization: Bearer <token>` (if not using cookie)

---

#### Responses

- **Status Code:** `200 OK`
- **Content:** Returns a success message.

**Example:**
```json
{
    "message": "Logout successful"
}
```

- **Status Code:** `400 Bad Request`
- **Description:** Returned if no token is provided in the request.
- **Content:** An error message.

**Example:**
```json
{
    "message": "No token provided"
}
```

- **Status Code:** `500 Internal Server Error`
- **Description:** Returned for server-side errors.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Internal server error"
}
```

---

## Maps Endpoints

The Maps API provides geocoding, distance calculation, and autocomplete functionality using Google Maps API.

### Get Coordinates from Address

Converts an address to geographic coordinates (latitude and longitude).

- **URL:** `/maps/get-coordinates`
- **Method:** `GET`
- **Auth required:** Yes (JWT in cookie or Authorization header)

#### Request Headers

- `Authorization: Bearer <token>` (if not using cookie)

#### Query Parameters

| Parameter | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `address` | `String` | The address to geocode. Minimum 3 characters. | Yes |

#### Example Request

```
GET /maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
```

#### Responses

##### Success Response

- **Status Code:** `200 OK`
- **Content:** Returns the coordinates for the given address.

**Example:**
```json
{
    "coordinates": {
        "ltd": 37.4224764,
        "lng": -122.0842499
    }
}
```

##### Error Responses

- **Status Code:** `400 Bad Request`
- **Description:** Returned when the address parameter is missing or invalid.
- **Content:** An error message or validation errors.

**Example:**
```json
{
    "message": "Address query parameter is required."
}
```

- **Status Code:** `401 Unauthorized`
- **Description:** Returned if the user is not authenticated.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Authentication required"
}
```

- **Status Code:** `404 Not Found`
- **Description:** Returned when coordinates cannot be found for the given address.
- **Content:** An error message.

**Example:**
```json
{
    "message": "coordinate not found"
}
```

---

### Get Distance and Time

Calculates the distance and travel time between two locations.

- **URL:** `/maps/get-distance-time`
- **Method:** `GET`
- **Auth required:** Yes (JWT in cookie or Authorization header)

#### Request Headers

- `Authorization: Bearer <token>` (if not using cookie)

#### Query Parameters

| Parameter | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `origin` | `String` | The starting location. Minimum 3 characters. | Yes |
| `destination` | `String` | The destination location. Minimum 3 characters. | Yes |

#### Example Request

```
GET /maps/get-distance-time?origin=San+Francisco,+CA&destination=Los+Angeles,+CA
```

#### Responses

##### Success Response

- **Status Code:** `200 OK`
- **Content:** Returns the distance and duration in meters and seconds respectively.

**Example:**
```json
{
    "distance": 559000,
    "duration": 19800
}
```

##### Error Responses

- **Status Code:** `400 Bad Request`
- **Description:** Returned when origin or destination parameters are missing or invalid.
- **Content:** Validation errors.

**Example:**
```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Invalid value",
            "path": "origin",
            "location": "query"
        }
    ]
}
```

- **Status Code:** `401 Unauthorized`
- **Description:** Returned if the user is not authenticated.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Authentication required"
}
```

- **Status Code:** `500 Internal Server Error`
- **Description:** Returned for server-side errors or when no route is found.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Internal server error"
}
```

---

### Get Autocomplete Suggestions

Provides address suggestions based on user input for autocomplete functionality.

- **URL:** `/maps/get-suggestions`
- **Method:** `GET`
- **Auth required:** Yes (JWT in cookie or Authorization header)

#### Request Headers

- `Authorization: Bearer <token>` (if not using cookie)

#### Query Parameters

| Parameter | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `input` | `String` | The user's input text. Minimum 3 characters. | Yes |

#### Example Request

```
GET /maps/get-suggestions?input=San+Fran
```

#### Responses

##### Success Response

- **Status Code:** `200 OK`
- **Content:** Returns an array of address suggestions.

**Example:**
```json
{
    "suggestions": [
        {
            "description": "San Francisco, CA, USA",
            "place_id": "ChIJIQBpAG2AhYAR_6128GcTUEo"
        },
        {
            "description": "San Francisco International Airport, San Francisco, CA, USA",
            "place_id": "ChIJ1YMtb8c3j4AR6aYUJvnXq28"
        },
        {
            "description": "San Francisco Bay, CA, USA",
            "place_id": "ChIJKxjxux9Jj4AR9Qp4u7GcyR0"
        }
    ]
}
```

##### Error Responses

- **Status Code:** `400 Bad Request`
- **Description:** Returned when the input parameter is missing or invalid.
- **Content:** An error message or validation errors.

**Example:**
```json
{
    "message": "Input query parameter is required."
}
```

- **Status Code:** `401 Unauthorized`
- **Description:** Returned if the user is not authenticated.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Authentication required"
}
```

- **Status Code:** `500 Internal Server Error`
- **Description:** Returned for server-side errors.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Error fetching autocomplete suggestions"
}
```

--- 

## Ride Endpoints

### Create a new ride

Creates a new ride request for a user.

- **URL:** `/rides/create`
- **Method:** `POST`
- **Auth required:** Yes (JWT in cookie or Authorization header)

### Request Headers

- `Authorization: Bearer <token>` (if not using cookie)

### Request Body

The request body must be a JSON object containing the ride details.

**Example:**
```json
{
  "pickup": "123 Main Street, San Francisco, CA",
  "destination": "456 Market Street, San Francisco, CA",
  "vehicleType": "car"
}
```

**Parameters:**

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `pickup` | `String` | The pickup location address. Minimum 3 characters. | Yes |
| `destination` | `String` | The destination address. Minimum 3 characters. | Yes |
| `vehicleType` | `String` | The type of vehicle: `car`, `bike`, or `auto`. | Yes |

---

### Responses

#### Success Response

- **Status Code:** `201 Created`
- **Content:** Returns the created ride object with calculated fare, distance, and duration.

**Example:**
```json
{
    "ride": {
        "_id": "66756b90792372f7c4583bce",
        "user": "66756b90792372f7c4583bcf",
        "captain": null,
        "pickup": "123 Main Street, San Francisco, CA",
        "destination": "456 Market Street, San Francisco, CA",
        "fare": 85,
        "status": "pending",
        "distance": "2.5",
        "duration": 8,
        "paymentID": null,
        "orderID": null,
        "signature": null,
        "otp": "1234",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
    }
}
```

#### Error Responses

- **Status Code:** `400 Bad Request`
- **Description:** Returned when request body validation fails. This can be due to missing required fields or fields that do not meet the criteria (e.g., invalid vehicle type, address too short).
- **Content:** An array of validation errors.

**Example:**
```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Invalid pickup address",
            "path": "pickup",
            "location": "body"
        }
    ]
}
```

- **Status Code:** `401 Unauthorized`
- **Description:** Returned if the user is not authenticated or the token is invalid/expired.
- **Content:** An error message.

**Example:**
```json
{
    "message": "Authentication required"
}
```

- **Status Code:** `500 Internal Server Error`
- **Description:** Returned for server-side errors (e.g., map service errors, database errors).
- **Content:** An error message.

**Example:**
```json
{
    "error": "Pickup and destination are required"
}
```

---

### Get Fare Estimate

Calculates the estimated fare, distance, and duration for a ride between two locations for all vehicle types.

- **URL:** `/rides/get-fare`
- **Method:** `GET`
- **Auth required:** Yes (JWT in cookie or Authorization header)

#### Request Headers

- `Authorization: Bearer <token>` (if not using cookie)

#### Query Parameters

| Parameter     | Type   | Description                        | Required |
| :----------- | :----- | :--------------------------------- | :------- |
| `pickup`     | String | The pickup location address. Minimum 3 characters. | Yes      |
| `destination`| String | The destination address. Minimum 3 characters.     | Yes      |

#### Example Request

```
GET /rides/get-fare?pickup=123+Main+Street,+San+Francisco,+CA&destination=456+Market+Street,+San+Francisco,+CA
```

#### Responses

##### Success Response

- **Status Code:** `200 OK`
- **Content:** Returns the estimated distance (in km), duration (in minutes), and fare for each vehicle type.

**Example:**
```json
{
  "distance": "2.5",
  "duration": 8,
  "fares": {
    "car": 88,
    "bike": 37,
    "auto": 55
  }
}
```

##### Error Responses

- **Status Code:** `400 Bad Request`
- **Description:** Returned when query parameter validation fails (e.g., missing or too short pickup/destination).
- **Content:** An array of validation errors.

**Example:**
```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid pickup address",
      "path": "pickup",
      "location": "query"
    }
  ]
}
```

- **Status Code:** `401 Unauthorized`
- **Description:** Returned if the user is not authenticated or the token is invalid/expired.
- **Content:** An error message.

**Example:**
```json
{
  "message": "Authentication required"
}
```

- **Status Code:** `500 Internal Server Error`
- **Description:** Returned for server-side errors (e.g., map service errors).
- **Content:** An error message.

**Example:**
```json
{
  "error": "Pickup and destination are required"
}
```

---