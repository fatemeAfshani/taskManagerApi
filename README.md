# taskManagerApi

 This application that let you to create users and login with email and password, it also allows you to create new tasks for the logged in user, modify task and delete them.
 each user can watch his/her own profile and add/delete avatar image. and also users can log out from one account or all of them.
 
 
 ................
 
 
 This project is deployed on heroku and mongodb in deployed on  mongodb Atlas and for authorization using jwt
 deploy url: https://fateme-task-manager.herokuapp.com
 
 ................
 
 
 This is some request to test the Api:
 
 
 for adding new user:
 
 curl  POST 'URL/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "YOUR NAME",
    "email": "YOUR UNIQUE EMAIL",
    "password": "PASSWORD NOT CONTAIN 'password'"
}'
 
 **use the token from response for authorization **

for login:

curl --location --request POST 'URL/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "YOUR EMAIL",
    "password" : "YOUR PASSWORD"
}'


for add new task:

curl --location --request POST 'URL/tasks' \
--header 'Authorization: Bearer TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
   "description": "TASK DESCRIPTION",
    "complited": FALSE OR TRUE/NOT REQUIRED
}'

**you can use task id for the next request**

for update task: 

curl --location --request PATCH 'URL/tasks/TASK ID' \
--header 'Authorization: Bearer TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "complited":"FALSE/TRUE",
    "description": "TASK DESCRIPTION"
}'

for uploading avatar page:

curl --location --request POST 'URL/users/me/avatar' \
--header 'Authorization: Bearer TOKEN' \
--form 'avatar=@ADDRESS OF THE IMAGE'



 
 **check the code in routers/taskRouter and routers/userRouter for all of requests.**
 
 
