# Enhanced Music Player

A modern, feature-rich music player built with HTML, CSS, and vanilla JavaScript.

## Features

- Play, pause, previous, and next track controls
- Progress bar with seek functionality
- Display of current and total track time
- Autoplay next track when current track ends
- Repeat single track functionality
- Shuffle playlist functionality
- Volume control with mute option
- Visual playlist with clickable tracks
- Rotating album cover animation during playback
- Responsive design for all screen sizes

## Usage

1. Clone this repository
2. Add your music files to the `music` folder (MP3 format)
3. Add corresponding album artwork to the `images` folder (JPG format)
4. Update the `songs` array in `script.js` with your song filenames (without the extension)
5. Open `index.html` in your browser or run `npm start` to start the local server

## Song Format

The player automatically formats song titles for display:
- Underscores (_) are converted to spaces
- Hyphens (-) are converted to " - " 
- First letter of each word is capitalized

Example: `leeona_-_do_i.mp3` will display as "Leeona - Do I"

## Adding New Songs

1. Add your MP3 file to the `music` folder
2. Add a corresponding JPG image with the same filename to the `images` folder
3. Add the base filename (without extension) to the `songs` array in `script.js`

## Technologies Used

- HTML5 Audio API
- CSS3 Animations and Transitions
- ES6 JavaScript Features

# Run the project

- `npm i`
- `node server.js`
- run the index.html file with live server

# Gotchas

- be sure to adjust the port for the CORS policy in the server.js file,
  in order to make it the same as the one provided automatically
  by _Live Server_

# How it works

A server (Express, Node.js) is running locally to retrieve the names
of the audio files in the audio directory.
The client fetches the file name of the audio files and populates
the songs array.
The rest is user-driven.

# Controls

You can control the player using the play/pause, next song, prev. song icons,
and also via keyboard:

- spacebar or 'k' to play/paus
- 'n' for next song
- 'p' for prev. song
- 'l' for +10s
- 'j' for -10s

# TODO

- clicking a number (x) on the keyboard should load and play song number x
- clicking ? should play a random song from the song list
