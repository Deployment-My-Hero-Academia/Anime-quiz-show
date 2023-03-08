# Anime Quiz Show App
This is a quiz app, MERN fullstack project that focuses on deployment. A user will be able user register, log in, complete already made quizzes. There is also the ability to create their own quiz which allows for for CRUD functionality. This will be the ability for a user to be an admin.


# Features

<details>
USER
- able to login/register
- able to use CRUD (CREATE, READ, UPDATE, and DELETE their own quizzes)
ADMIN
-able to login/register
-able to see information on users/quizzes
</details>


# Environment Variables
To run this project, you will need to add the following environment variables to your .env file DB_URI
`PORT`
`DB_URI`

# Installation
git clone - https://github.com/Deployment-My-Hero-Academia/Anime-quiz-show.git

```bash backend
from root cd server - install dependencies
    npm install
    add environment variables values in .env(provided by request)
    npm start /or/ nodemon
```

```bash frontend   
from root cd client - install dependencies
    npm install
    npm start
```


# Authors
- [@IgzUchiha](https://github.com/IgzUchiha)
- [@Sheree1986](https://github.com/Sheree1986)
- [@nukandtudasmom](https://github.com/nukandtudasmom)
#

# Tier 1 —  MVP Application & CRUD and REST

# Front End: Essential components have been incorporated and laid out on the page 🔓
<details>


   ❓ User is able to navigate through the page using necessary route

   ❓ User interface is thoughtfully designed. You may use vanilla CSS, or use a CSS Framework

   ❓ As a user, I want the app to have a nice UX

   ❓ As a user, I want to see the data nicely organized

   ❓ As a User, I want to log in to a deployed app.


# Back End:

   ❓ As a user, I want to read entries from the database

   ❓ As a user, I want to add entries to the database

   ❓ As a user, I want to delete entries from the database

   ❓ As a user, I want to edit entries in the database

   ❓ As a user, I expect to do all of the above by accessing RESTful routes



# Deployment: Deploy the application using the service of your choice 🔓
   ❓  🏁 Backend Deployed with MongoDB Atlas - https://anime-quiz-app.onrender.com/ 🏁

   ❓  🏁 Frontend Deployed with Render.com - https://anime-quiz-app-frontend.onrender.com/ 🏁

   ❓  🏁 Postman API Documentation  - 🏁  

   ❓  🏁 YouTube Presentation Video - 🏁  


</details>

  
# Tier 2 — Deployed Application via Continuous Deployment 🔓
<details>
  
   ❓ Set up continuous deployments so that the application is deployed upon push/merge to main 
  
   ❓ Main Goal: The deployed app should be the most up to date version of your working-and-tested repository code

   ❓ NOTE: You are not required to use GitHub Actions

</details> 

#  Tier 3 — Continuous Integration 🔓
 <details>
  
   ❓ Create a Branch Protection Rule to run the tests upon Pull Requests to the main branch
  
   ❓ As a signed-up User, I want to be granted authorization to access the API

   ❓ Upon successful test runs, Github Actions should deploy your application

</details> 

# Tier 4 — Login/Register/Authentication
<details>
 
  ❓ As a user, I can create a new account with my information saved in a database 
 
  ❓ As a user, I can login to the account to retrieve information specific to my account. This information is displayed on the screen to make my user experience different from other users.
 
  ❓ As User B, I should not have access to User A’s private data (i.e. profile information, unpublished blog posts, private images…)
  
  ❓ As a User, I expect not to be able to create new entities without first logging in / authenticating in some way (token/session)
 
  ❓ Allow only authenticated users to access the private/profile/sharing portion of the application 🚫
 
  ❓ Allow unauthenticated users to access other pages (like a welcome screen, or list of public posts)

</details>

# Tier 5 — Admin vs User & Further Security Implementations
<details>


  ❓ Create an admin setting that gives different controls to certain users of your application
  ❓ Protect your app against OWASP Top 10


</details>

References
https://stackoverflow.com/questions/75205873/nodeinternal-modules-cjs-loader1056-throw-err/75636758#75636758 https://www.youtube.com/watch?v=Q_3lXJ0agwI&t=623s
https://github.com/actions/checkout
https://stackoverflow.com/questions/61652674/error-cannot-find-module-react-dev-utils-getpublicurlorpath
https://www.youtube.com/watch?v=Q_3lXJ0agwI&t=623s

