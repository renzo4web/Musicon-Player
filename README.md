# Musicon Player

[!Musicon Player](https://res.cloudinary.com/turbopila/video/upload/v1624751461/musicon-gif_dga8eg.gif)

- Soundcloud API
- Search Track
- Play Tracks 

Why? I like music like everyone else for that reason I wanted to make a player an app similar to Soundcloud, for userte soundcloud provides an SDK to interact with its API, thanks to this I could make a basic but very functional and fast music player and search engine.
The challenge for me with this project was how to implement the timeline of the player, the quickest solution I found was to use an input of type range and set its maximum to be equal to the total duration of the song and update its value with respect to the current time of the music using an interval.

[Demo](https://musicon-player.netlify.app/)