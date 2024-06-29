# Rate Repository iOS Application - Made with React Native

Developed by **Benjamin Phillips**

[Backend Repository](https://github.com/fullstack-hy2020/rate-repository-api)
(Backend not made by me btw)

## Table of Contents
- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Demo Video](#demo-video)
- [Usage](#usage)
  
## About The Project

Native iOS Application designed for users to rate GitHub repositories. Completed as part of the React Native portion of 'Full Stack Open' online coding curriculum.

#### Built With

**- React Native**
**- GraphQL**

## Key Features

#### Authentication and Authorization with JWTs And Local Storage
Rate Repository App implements authentication and authorization using JSON Web Tokens (JWTs). Upon login, the backend GraphQL server issues a JWT, which is stored in the user's local storage. When making requests to the server, the stored JWT is accessed and sent in the headers so the user can access protected resources. Storing the JWT in local storage also means that users can remain logged in across sessions.

#### Users
Users can sign up with a username and password, and subsequently sign in for user-exclusive content.

#### Repositories
Main page returns a list of reviewed repositories with all their key information.

#### Searching and Ordering Repositories
User can search for repositories created by specific users or with specific names. Repositories can be organised by 'Latest', 'Highest-rated' or 'Lowest-rated'.

#### Reviews
Users can write their own reviews regarding a certain repository and view all of the reviews they've written. Users can delete their own reviews. 

#### Pagination
Cursor-based pagination is used to fetch more repositories once the user has reached the end of the list. This allows for infinite scrolling (if there were enough repositories).

## Demo Video

https://github.com/BenPhillips-21/rateRepositoryApp/assets/126538364/a10e811c-3b64-4f2d-9ae4-28fc72024b19

## Usage

Note: This app can only be recreated on your device if you are on Mac because this is an iOS application.

In order to use this app, you should already have an Xcode iOS simulator! If you don't, go here first: https://docs.expo.dev/workflow/ios-simulator/

1. Clone this repo
  ```
  git@github.com:BenPhillips-21/rateRepositoryApp.git
  ```
2. Install necessary NPM Packages
   ```
   npm install
   ```
3.  ```
    npm start
    ```
    Something similar to below should appear once you have run 'npm start'... Look in the red box and copy the IP address between the exp:// and :, which is in this example 192.168.1.33. Construct an URL in format http://<IP_ADDRESS>:4000/graphql
    
    ![image](https://github.com/BenPhillips-21/rateRepositoryApp/assets/126538364/c386d014-f074-44f2-85e1-a35a29140cba)
    
4. ```
   touch .env
   ```
5. ```
   ENV="development"
   APOLLO_URI="NEWLYCONSTRUCTEDURL"
   ```
6.  ```
    npm start
    ```
    Then press the 'i' key in order to open the iOS simulator!


Note: This app is not deployed to the Apple store as that costs money that I don't have.
