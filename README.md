# cscu-exambank
CSCU ExamBank GraphQL API.
Now Deprecated, new system design in progress.


### To Run Server
Create a .env file with the following variables Keep in mind ADMIN_TOKEN/STUDENT_TOKEN are just temporary environment variables and will not be used going onto prod. It is in effect for the mock authentication system prior to implementation with Ryerson SCS.
```
MASTER_TOKEN=mastertoken
ADMIN_TOKEN=admintoken
STUDENT_TOKEN=studenttoken
MONGO_URL=mongodb://localhost:27017/exambank
SALT=3^dMjq&7YDW!MAjF94bDYeamy6Nkrwj
```
Then run the command `npm start` from your terminal on the root directory of this repo. 

### To Run ReactJS Front-End Application
cd into FRONTEND_APPLICATION/exambank
Run `npm install` if you haven't already done so. 
Run `npm start` to start the React webapp
