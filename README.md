# Musica!

Musica is a web application that recommends list of songs based on an algorithm. This algorithm uses personalized data which is fetched by using Spotify API and takes user's preference of time frame as a parameter. Here is the explanation of recommendation algorithm:

1. The chosen time frame (last 1 month, 6 months or all history of the user) is given to the algorithm.
2. Most listened 10 artists in the period time frame are obtained.
3. For each artist, a relevant artist is obtained. In total, there are 20 artists so far (10 most listened, 10 relevant to them).
4. The most popular 10 songs of each artists are fetched. 
5. For each artist, one unsaved song is chosen randomly out of these 10 top songs of the artist.
6. So far, 20 songs are obtained each from different artists and each are not saved by the user before.
7. The other 10 songs are obtained by using Spotify API's recommendation algorithm. The seeds given to that algorithm are genres of top 10 artists.
8. In total, 30 songs are obtained to recommend.

By implementhing this project, I practiced:
- Styling with CSS
- Creating Functional Components in React
- Passing Information to Components in React
- Setting the State of Components by using React Hooks
- Advancing on JavaScript
- Interacting with Spotify API with different scopes
- Understanding and using Oauth 2.0
- Using Heroku for deployment


## Deployment

The app is deployed through Heroku. Here is the link:

### [Musica!](https://musica-discover.herokuapp.com/)


## Usage

Here is the screenshot of the input fields of the app, the user should first choose the time frame and then click "Get Your Recommended Playlist" button:

<img alt="Search Bar" src="https://github.com/mkamilgok/Musica/blob/master/public/SearchBarSS.png" width="900" height="350">


The first click redirects the user to Spotify login page. After the authorization, clicking the same button will retrieve the recommended songs. <br />
Then discovered songs appear at the left side column of the page. <br />
These songs can be added to the playlist either by clicking **"+"** button for a chosen song or by clicking **"Add All"** button to add all discovered songs the the playlist. <br />
The **playlist name** can be typed to the text box at the top of the right column. <br />
After these adjustments, the user is ready to click **"Save To Spotify"** button which is at the bottom of the page and then the playlist will be on your Spotify account. YEY!

<img alt="Playlist Creation" src="https://github.com/mkamilgok/Musica/blob/master/public/Playlist.png" width="900" height="525">
