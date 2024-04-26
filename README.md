
# NeedAssist
NeedAssist is an online platform designed to centralize urgent requests from people seeking assistance. Whether it’s finding critical information, connecting with volunteers, or offering support, NeedAssist aims to bridge the gap between those in need and those willing to help.

## **How to run**
1. Move to project folder directory
2. Open cmd and input 'docker-compose up' (you need run dekstop docker on your PC)

## **API Documentation**

### **User Controller**
ROLE_HELPER - 2001   
ROLE _RECIPIENT - 5320

- **POST** `http://localhost:8080/api/user/registration` - Create a helper or recipient (you will choice in request body)
  - Request Body, User:
    ```json
    {
        "name": "qwertyHN",
        "surname": "qwertyHS",
        "email": "qwertyH@gmail.com",
        "password": "qwertyH",
        "phone": "123-456-7890",
        "city": "Lviv",
        "role": 2001
    }
    ```
  - Response: User, 201, Created

- **POST** `http://localhost:8080/api/user/authorization` - Authorization, you will get an access token (JWT) that will be used for all API security requests
  - Request Body, AuthRequest:
    ```json
    {
        "email": "qwertyH@gmail.com",
        "password": "qwertyH"
    }
    ```
  - Response: 200, OK
    ```json
    {
        "roles": [
            2001
        ],
        "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxd2VydHlIQGdtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfSEVMUEVSIl0sImV4cCI6MTcxNDA2OTMzMSwiaWF0IjoxNzE0MDY1NzMxfQ.EUIwf9ZLrVmSOpycUK9co9-B4GiMsn3zw5INiOYNcrE"
    }
    ```

- **POST** `http://localhost:8080/api/user/refresh` - Refresh token, this is done so that you can refresh the page and not have to re-authorize
  - CookieValue("jwt") it's you get from authorization
  - Response: 200, OK
    ```json
    {
        "roles": [
            2001
        ],
        "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxd2VydHlIQGdtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfSEVMUEVSIl0sImV4cCI6MTcxNDA2OTMzMSwiaWF0IjoxNzE0MDY1NzMxfQ.EUIwf9ZLrVmSOpycUK9co9-B4GiMsn3zw5INiOYNcrE"
    }
    ```

- **POST** `http://localhost:8080/api/user/logout` - Logout, your refresh token in the db & cookies is cleared
  - CookieValue("jwt")
  - Response: 204, NoContent

### **Request Controller**

> **Note:** All requests must contain an access token (JWT), in header 'Bearer Token'. Helper - user who helps (volunteer). Recipient - user who needs help (victim).

- **POST** `http://localhost:8080/api/request/add` - Create request, each request has their own user, the user information is taken from the jwt token, so if you are a 'helper' and you make a request, the request will have your data how a 'helper' and vice versa. This will then come in handy for understanding "get-all-requests" & "get-all-purposes"
  - Request Body, RequestDTO (field priority contains only 3 values: LOW, MEDIUM, HIGH):
    ```json
    {
        "title": "допомога з одягом",
        "description": "потрібний одяг XL дуже сильно для дитини",
        "priority": "HIGH",
        "city": "Lviv"
    }
    ```
  - Response: RequestDTO, 201, Created

- **GET** `http://localhost:8080/api/request/get/{ID}` - Get request by ID
  - PathVariable, ID
  - Response: RequestDTO, 200, OK
    ```json
    {
        "id": 1,
        "title": "допомога з одягом",
        "description": "потрібний одяг XL дуже сильно для дитини",
        "priority": "HIGH",
        "createdAt": "2024-04-25 23:55:36",
        "city": "Lviv"
        "user": {
            "name": "qwertyRN",
            "surname": "qwertyRS",
            "email": "qwertyR@gmail.com",
            "phone": "123-456-7890"
        }
    }
    ```

- **GET** `http://localhost:8080/api/request/get-all-requests` - Get all request for helper, you will get request only which were published by recipients
  - Response: List<RequestDTO>, 200, OK
    ```json
    [
      {
        "id": 1,
        "title": "допомога з одягом",
        "description": "потрібний одяг XL дуже сильно для дитини",
        "priority": "HIGH",
        "createdAt": "2024-04-25 23:55:36",
        "city": "Lviv"
        "user": {
            "name": "qwertyRN",
            "surname": "qwertyRS",
            "email": "qwertyR@gmail.com",
            "phone": "123-456-7890"
        }
    }
  ]
    ```

- **GET** `http://localhost:8080/api/request/get-all-proposes` - Get all proposes for recipient, you will get request only which were published by helpers
  - Response: List<RequestDTO>, 200, OK
    ```json
    [
      {
        "id": 1,
        "title": "допомога з одягом",
        "description": "потрібний одяг XL дуже сильно для дитини",
        "priority": "HIGH",
        "createdAt": "2024-04-25 23:55:36",
        "city": "Lviv"
        "user": {
            "name": "qwertyRN",
            "surname": "qwertyRS",
            "email": "qwertyR@gmail.com",
            "phone": "123-456-7890"
        }
    }
  ]
    ```

- **DELETE** `http://localhost:8080/api/request/delete/{ID}` - Delete user request, through JWT, we check whether this is really your request
  - PathVariable, ID
  - Response: 200, OK

