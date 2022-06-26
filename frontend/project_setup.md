1. React + Tailwind CSS
    - Create a project with Tailwind CSS using https://tailwindcss.com/docs/guides/create-react-app
    - Import the tailwind config file from https://github.com/adrianhajdin/project_shareme_social_media/blob/main/frontend_sanity/tailwind.config.js
    - Create App and index CSS (Tailwind Base config), import to index.js
    - Install Below dependency (npm i @sanity/client @sanity/image-url react-icons react-loader-spinner react-masonry-css react-router-dom uuid)
    (npm i react-google-login -force)
        - npm install 
            - @sanity/client, @sanity/image-url (For connecting sanity backend)
            - react-google-login -force(Authenctication)
            - react-icons
            - react-loader-spinner
            - react-masonry-css (Image Grid)
            - react-router-dom
            - uuid
2. Intial setup 
    - Setup the router details in both index and App components 
    - Create contianer, components in inside src folder
    - Rout is hanled with path and element not component 

3. Google Auth 
    - Use https://console.cloud.google.com/apis/credentials, for Google login
    - Create new project, then navigate to Credentails, click Create credentails 
    - Select OAuth client Id, configure constent screen => external 
    - Enter app name, contact email id, logo and move on to summary (Skip scope & test users)
    - Navigate to Oauth consent screen, click publish APP
    - Again credentails menu => create credentails => oAuth client ID
    - selection application as web, then create it. client ID and client secret will be visible
    - Rest follow the tutorial https://www.youtube.com/watch?v=HtJKUQXmtok

4. Sanity client setup
    - Need to create a seperate js file (client JS), we can reuse this project file for others
    - Extra we need to take project id and token Id
    - Run sanity manage, in dashboard page we can find project Id and API=> tokens=> select permission as deploy studio