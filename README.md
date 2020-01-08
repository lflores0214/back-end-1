# back-end

#### Users Schema

| field    | data type        | metadata                                            |
| :------- | :--------------- | :-------------------------------------------------- |
| id       | unsigned integer | primary key, auto-increments, generated by database |
| username | string           | required, unique                                    |
| email    | string           | required, unique                                    |

#### Journal Schema

| field      | data type        | metadata                                                             |
| :--------- | :--------------- | :------------------------------------------------------------------- |
| id         | unsigned integer | primary key, auto-increments, generated by database                  |
| user_id    | unsigned integer | foreign key referencing id in Users table, generated by the database |
| workout    | string           | required                                                             |
| sets       | integer          | optional                                                             |
| weight     | string           | optional                                                             |
| reps       | integer          | optional                                                             |
| created_at | string           | generated by the database                                            |
| notes      | string           | optional                                                             |

### UserInfo Schema

| field   | data type        | metadata                                                             |
| :------ | :--------------- | :------------------------------------------------------------------- |
| id      | unsigned integer | primary key, auto-increments, generated by database                  |
| user_id | unsigned integer | foreign key referencing id in Users table, generated by the database |
| age     | integer          | required                                                             |
| height  | string           | required                                                             |
| weight  | string           | required                                                             |

### Endpoints

Base URL: `https://weightliftingjournal1.herokuapp.com/api`

| Request Method | Endpoint             | Description                                                           |
| :------------- | :------------------- | :-------------------------------------------------------------------- |
| `POST`         | `/auth/login`        | Logs a user in and returns a token                                    |
| `POST`         | `/auth/register`     | creates a user                                                        |
| `POST`         | `/users/:id/journal` | adds a journal entry for a given user :id references id for the user  |
| `POST`         | `/users/:id/info`    | adds user information for a given user :id references id for the user |
| `GET`          | `/users`             | returns all users                                                     |
| `GET`          | `/users/journals`    | returns all journal entries for all users                             |
| `GET`          | `/users/:id/journal` | returns all journal entries for a user                                |
| `GET`          | `/users/usersinfo`   | returns user information for all users                                |
| `GET`          | `/users/:id/info`    | returns user information for a given user                             |
| `PUT`          | `/users/:id/entry`   | updates a journal entry. :id refers to the entry id                   |
| `PUT`          | `/users/:id/info`    | updates user information. :id refers to the info id                   |
| `Delete`       | `/users/:id/entry`   | deletes a journal entry. :id refers to the entry id                   |
