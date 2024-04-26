Sure, here's a more visually appealing README with markdown formatting:

---

# **Project Description**

This project is a robust web application developed using **Spring Boot** and **PostgreSQL** for the backend. It is designed to facilitate mutual assistance among users, where some users can provide help, and others can receive it.

The backend of the application includes a series of API controllers that allow users to register, authenticate, create, view, and delete requests for help. Each request for help has its own user, the information of whom is derived from the JWT token.

The application uses **Docker** for deploying the PostgreSQL database and the service itself. This allows for easy deployment of the application on any computer with Docker installed, without the need to manually install PostgreSQL and other dependencies.

---

## **How to Start Backend**

1. Make a JAR file of this project (it should be there by default)
2. Run Docker Desktop & input in CMD 'docker-compose up' (Docker compose includes PostgreSQL & service)

---

## **API Documentation**

### **User Controller**

- **POST** `http://localhost:8080/api/user/registration/helper` - Create a helper (a user who will help people)
  - Request Body, User:
    ```json
    {
        "username": "qwertyH",
        "email": "qwertyH@gmail.com",
        "password": "qwertyH",
        "phone": "123-456-7890",
        "city": "Lviv"
    }
    ```
  - Response: User, 201, Created

- **POST** `http://localhost:8080/api/user/registration/recipient` - Create a recipient (a user who needs help)
  - Request Body, User:
    ```json
    {
        "username": "qwertyP",
        "email": "qwertyP@gmail.com",
        "password": "qwertyP",
        "phone": "123-456-7890",
        "city": "Ternopil"
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
        "priority": "HIGH"
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
        "user": {
            "username": "qwertyR",
            "email": "qwertyR@gmail.com",
            "phone": "123-456-7890",
            "city": "lviv"
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
        "user": {
            "username": "qwertyR",
            "email": "qwertyR@gmail.com",
            "phone": "123-456-7890",
            "city": "lviv"
        }
      }
    ]
    ```

- **GET** `http://localhost:8080/api/request/get-all-proposes` - Get all proposes for recipient, you will get request only which were published by helpers
  - Response: List<RequestDTO>, 200, OK
    ```json
    [
      {
        "id": 2,
        "title": "віддаю одяг для дітей",
        "description": "куртка, футболка, стан хороший",
        "priority": "HIGH",
        "createdAt": "2024-04-25 23:55:36",
        "user": {
            "username": "qwertyH",
            "email": "qwertyH@gmail.com",
            "phone": "123-456-7890",
            "city": "lviv"
        }
      }
    ]
    ```

- **DELETE** `http://localhost:8080/api/request/delete/{ID}` - Delete user request, through JWT, we check whether this is really your request
  - PathVariable, ID
  - Response: 200, OK
