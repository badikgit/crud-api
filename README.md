# CRUD API
Simple CRUD API using in-memory database underneath

## Downloading and Prerequisites

```bash
git clone {repository URL}
cd {path to the folder where the repository was saved}/crud-api
npm install
```

## Scripts
>### To run the application in `development mode`:
>```bash
>npm run start:dev
>```
>
>### To run the application in `production  mode`:
>```bash
>npm run start:prod
>```

## Endpoints:
>### Users
>>>**GET** `api/users` - get all users
>>>
>>> Response code
>>>| Code | Description | Respose schema | Respose body example |
>>>| ------ | ------ | ------ | ------ |
>>>| **200** | OK |**[**<br>   **{<br>      "id":** *string (uuid)*,<br>      **"username":** *string*,<br>      **"age":** *number*,<br>      **"hobbies":** *string[ ]*<br>   **}**<br>**]**|**[<br>   {<br>      "id":** *"5e9af1d3-ff53-4153-80c3-162fd3016f98"*,<br>      **"username":** *"Ben"*,<br>      **"age":** *55*,<br>      **"hobbies":** [<br>            *"skiing",<br>            "surf"*<br>      **]**<br>   **}<br>]**|
>>
>>
>>>**POST** `api/users` - new user creating
>>>
>>>Request body data should be in `JSON` format:
>>>| Request schema<br>( * - requared fields) | Example Value<br>(correct) | Example Value<br>(wrong types<br>or missing<br>requared fields) |Example Value<br>(invalid JSON - <br>extra comma or<br>something else) |
>>>| ------ | ------ | ------ |------ |
>>>| **{<br>   "username": *string*, *<br>   **"age":** *number*, *<br>   **"hobbies":** *string[ ]* *<br>**} | **{<br>   "username":** *"Ben"*,<br>   **"age":** *55*,<br>   **"hobbies": [**<br>      *"skiing",<br>      "surf"*<br>   **]**<br>**}** | **{<br>   "username":** *"Ben"*,<br>   **"hobbies":** [<br>      *"skiing",<br>      14*<br>   ]<br>**}** | **{<br>   "username":** *"Ben"*,<br>   **"age":** *55*,**,**<br>   **"hobbies": [**<br>      *"skiing",<br>      "surf"*<br>   **]**<br>**}** |
>>>
>>> Response body data is returned in `JSON` format. Response codes table:
>>>| Code | Description | Response schema | Response body example  |
>>>| ------ | ------ | ------ | ------ |
>>>| **201** | Created |**{<br>   "id":** string (uuid),<br>   **"username":** string,<br>   **"age":** number,<br>   **"hobbies":** string[]**<br>**}|**{<br>   "id":** "5e9af1d3-ff53-4153-80c3-162fd3016f98",<br>   **"username":** "Ben",<br>   **"age":** 55,<br>   **"hobbies":** [<br>      "skiing",<br>      "surf"<br>   **]**<br>**}**|
>>>| **400** | Bad Request | **{<br>   "message":** string **<br>}** | **{<br>   "message":** "Request data fields error: missing required field age, age should be number, hobbies should be string[]."**<br>}** |
>>>| **400** | Bad Request | **{<br>   "message":** string **<br>}** | **{<br>   "message":** "Invalid JSON format."**<br>}** |
>>
>>>**OTHER MEHODS** to `api/users` are not allowed
>>>| Code | Description | Response schema | Response body example  |
>>>| ------ | ------ | ------ | ------ |
>>>| **405** | Method Not Allowed | **{<br>   "message":** string **<br>}** | **{<br>   "message":** "Wrong method."**<br>}** |
>### User by ID
>>>  - **GET**      `api/users/:userId` - get the user by ID
>>>
>>> Response body data is returned in `JSON` format. Response codes table:
>>>| Code | Description | Response schema | Response body example  |
>>>| ------ | ------ | ------ | ------ |
>>>| **200** | OK |**{<br>   "id":** string (uuid),<br>   **"username":** string,<br>   **"age":** number,<br>   **"hobbies":** string[]**<br>**}|**{<br>   "id":** "5e9af1d3-ff53-4153-80c3-162fd3016f98",<br>   **"username":** "Ben",<br>   **"age":** 55,<br>   **"hobbies":** [<br>      "skiing",<br>      "surf"<br>   **]**<br>**}**|
>>>| **400** | Bad Request | **{<br>   "message":** string **<br>}** | **{<br>   "message":** "Invalid id (not uuid)"**<br>}** |
>>>| **404** | Not Found | **{<br>   "message":** string **<br>}** | **{<br>   "message":** "Record doesn't exist"**<br>}** |
>>
>>>  - **PUT**      `api/users/:userId` - update the user by ID
>>>
>>>Request body data should be in `JSON` format:
>>>| Request schema<br>( * - requared fields) | Example Value<br>(correct) | Example Value<br>(wrong types<br>or missing<br>requared fields) |Example Value<br>(invalid JSON, ) |
>>>| ------ | ------ | ------ |------ |
>>>| **{<br>   "username": *string*, *<br>   **"age":** *number*, *<br>   **"hobbies":** *string[ ]* *<br>**} | **{<br>   "username":** *"Ben"*,<br>   **"age":** *55*,<br>   **"hobbies": [**<br>      *"skiing",<br>      "surf"*<br>   **]**<br>**}** | **{<br>   "username":** *"Ben"*,<br>   **"hobbies":** [<br>      *"skiing",<br>      14*<br>   ]<br>**}** | **{<br>   "username":** *"Ben"*,<br>   **"age":** *55*,**,**<br>   **"hobbies": [**<br>      *"skiing",<br>      "surf"*<br>   **]**<br>**}** |
>>>
>>> Response body data is returned in `JSON` format. Response codes table:
>>>| Code | Description | Response schema | Response body example  |
>>>| ------ | ------ | ------ | ------ |
>>>| **200** | OK |**{<br>   "id":** string (uuid),<br>   **"username":** string,<br>   **"age":** number,<br>   **"hobbies":** string[]**<br>**}|**{<br>   "id":** "5e9af1d3-ff53-4153-80c3-162fd3016f98",<br>   **"username":** "Ben",<br>   **"age":** 55,<br>   **"hobbies":** [<br>      "skiing",<br>      "surf"<br>   **]**<br>**}**|
>>>| **400** | Bad Request | **{<br>   "message":** string **<br>}** | **{<br>   "message":** "Request data fields error: missing required field age, age should be number, hobbies should be string[]."**<br>}** |
>>>| **400** | Bad Request | **{<br>   "message":** string **<br>}** | **{<br>   "message":** "Invalid JSON format."**<br>}** |
>>>| **400** | Bad Request | **{<br>   "message":** string **<br>}** | **{<br>   "message":** "Invalid id (not uuid)"**<br>}** |
>>>| **404** | Not Found | **{<br>   "message":** string **<br>}** | **{<br>   "message":** "Record doesn't exist"**<br>}** |
>>
>>>  - **DELETE** `api/users/:userId` - delete the user by ID
>>>
>>> Response body data is returned in `JSON` format on errors (if `userId` is invalid (not `uuid`) or if record with `id === userId` doesn't exist), or empty on success. Response codes table:
>>>| Code | Description | Response schema | Response body example |
>>>| ------ | ------ | ------ | ------ |
>>>| **204** | No Content | | |
>>>| **400** | Bad Request | **{<br>   "message":** string **<br>}** | **{<br>   "message":** "Invalid id (not uuid)"**<br>}** |
>>>| **404** | Not Found | **{<br>   "message":** string **<br>}** | **{<br>   "message":** "Record doesn't exist"**<br>}** |
>>
>>>**OTHER MEHODS** to `api/users/:userId` are not allowed
>>>| Code | Description | Response schema | Response body example  |
>>>| ------ | ------ | ------ | ------ |
>>>| **405** | Method Not Allowed | **{<br>   "message":** string **<br>}** | **{<br>   "message":** "Wrong method."**<br>}** |
