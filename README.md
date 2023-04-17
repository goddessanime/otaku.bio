# Goddess Anime Cards Custom Link

This is a NodeJS project that allows users to input their username and receive custom links to their profile on https://goddessanime.com. It uses an Express server to handle incoming requests and send data to the website.

## Installation

To run this project, you must have NodeJS installed. Clone the repository and navigate to the project directory. Then, run the following command to install the necessary dependencies:

```bash 
npm run start
```


This will start the server on port 3000. You can then make requests to the server by sending a GET request to `http://localhost:5000/{username}`. Replace `{username}` with the desired username. The server will then send a request to https://goddessanime.com to retrieve the user data and return a custom link to their profile.
