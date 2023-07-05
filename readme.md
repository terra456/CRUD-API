To install all packages:
```bash
npm install
```
The program is started by npm-script `start` in following way:
```bash
npm run start
```

To use env file, renaim it by add a dot in the beginning of the nsme. In this case server will be http://localhost:3000/

Else use http://127.0.0.1:4000/

### Endpoints:
- **GET** `api/users` is used to get all persons
    - Server should answer with `status code` **200** and all users records
- **GET** `api/users/{userId}`
    - Server should answer with `status code` **200** and user info
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid
    - Server should answer with `status code` **404** user doesn't exist
- **POST** `api/users` is used to create record about new user and store it in database
    - Server should answer with `status code` **201** and newly created record
    - Server should answer with `status code` **400** if fields is invalid
- **PUT** `api/users/{userId}` is used to update existing user
    - Server should answer with` status code` **200** and updated record
    - Server should answer with` status code` **400** if `userId` is invalid
    - Server should answer with` status code` **404** if user doesn't exist
- **DELETE** `api/users/{userId}` is used to delete existing user from database
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** if `userId` is invalid
    - Server should answer with `status code` **404** if user doesn't exist
