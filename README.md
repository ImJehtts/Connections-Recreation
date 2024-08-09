# Connections-Recreation
In this project, I used the MERN Stack with OpenAI's API to recreate the NYT Game Connections so I can play without having to wait for a new day. The OpenAI API returns back the 4 categories along with 4 words for each category. You are allowed the standard 4 mistakes and a new wordbank is provided through the API after every round. 

1. Make sure you have node installed. Once downloaded you can use code below to make sure its good to run:
   ```
   npm -v
   ```
 2. Create a mongodb atlas database online and get an openai key (Money needed to use this API).
    
    For mongodb, go to this link: https://www.mongodb.com/cloud/atlas/register
    Create an account if needed and create a free shared cluster. Go under security on the left side, create a username and 
    password to use  your database. Next go to network access and add your PC's current IP address. Finally go to database, go 
    to connect, select connect your application and copy the connection string provided down. 

    For OpenAI, go to this link: https://openai.com/index/openai-api/
    Create an account if needed, go dashboard, and create an API key using the option on  the left and copy it down. Next go to 
     your profile in the top right and make sure there is money in your account under billing (even a few dollars can go a long 
     way).   
 3. Create a .env file in backend folder. Fill it out as such:
     ```
     PORT=4000
     FRONT_END_PORT = http://localhost:3000
     MONG_URI= [YOUR MONGODB URI]
     OPENAI_KEY=[YOUR OPENAI KEY]
     ```
     If you decide to use your own selected port numbers, make sure to change the backend port in package.json in the frontend 
     src folder.
    ```
    {
     "proxy": "http://localhost:4000", //RIGHT HERE
     "name": "frontend",
     "version": "0.1.0",
     "private": true,
    ```
 4. Open two terminals. In one, cd to the frontend
     ```
     cd frontend
     ```
    In the other, cd to the backend
     ```
     cd backend
     ```
    In both terminals, run
     ```
     npm install 
     ```
    to download all dependencies needed.

 5. On the frontend terminal run
     ```
     npm start
     ```
     And on the backend terminal run
     ```
     npm run dev 
     ```
6. Now the project should run on [localhost](http://localhost:4000/)
