# liri-node-app

### Live Demo: [Click here to watch now!](https://drive.google.com/file/d/1T8OixubZveIECxJRxoxHoVQEZ-qMXLm5/view?usp=sharing)

## What it is
- A Node.js app that takes the input from the user via CLI and outputs the appropriate information depending on the user command
- User can ask Liri for concert info of their favorite artists, find a song that they like, and look up movie info of their favorite movies
- The app utilizes the Bands In Town, Spotify, and OMDb APIs
- Uses API calls and parses through returned JSON objects, outputting them in a specified format

## Technologies Used
- Node.js
- JavaScript
- Bands in Town API (via Axios npm module)
- Spotify API (via Spotify npm module)
- OMDb API (via Axios npm module)
- Moment (via Moment npm module)

## Code Explanation
- Authentication keys for Spotify are stored in "keys.js", and we are exporting its contents to the main "liri.js" file
- What our app does depends on what the user types, and there are 4 main functions: (1) Finds concert information for the specified artist/band, (2) Spotify lookup for a song, (3) OMDb lookup for a movie, and (4) read command and query from another file
- The program makes a request to the Bands in Town API by inputting the artist/band name, and we get back a JSON object that includes an array concerts; from there, we selectively output using console.log
- The program also makes a request to the Spotify API, and we get back a JSON object that includes everything we need (artist(s), song, preview link, and album)
- The program also makes a HTTP request to the OMDb API using the request NPM module, and we get back a JSON object that includes everything we need (title, year, IMDb rating, language, etc.)
- The program also reads from a file called "random.text" and executes the command and query found there using string and array methods
- Appropriate comments and error-checking has been added