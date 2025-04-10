const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const repeatBtn = document.getElementById('repeat');
const shuffleBtn = document.getElementById('shuffle');
const volumeSlider = document.getElementById('volume');
const volumeIcon = document.getElementById('volume-icon');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['alone', 'leeona_-_do_i', 'host'];

// Keep track of song
let songIndex = 2;
let isRepeat = false;
let isShuffle = false;
let prevVolume = 1;

// Initially load song details into DOM
loadSong(songs[songIndex]);
loadPlaylist();

// Update song details
function loadSong(song) {
  title.innerText = formatSongTitle(song);
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  
  // Reset time displays until we get actual data
  currTime.textContent = '00:00';
  durTime.textContent = '00:00';
  
  // Update active song in playlist
  updateActivePlaylistItem();
}

// Set initial duration when metadata is loaded
function updateDuration() {
  if (!isNaN(audio.duration)) {
    const min_d = Math.floor(audio.duration / 60);
    const sec_d = Math.floor(audio.duration % 60);
    durTime.innerHTML = `${min_d < 10 ? '0' + min_d : min_d}:${sec_d < 10 ? '0' + sec_d : sec_d}`;
  }
}

// Format song title to make it more readable
function formatSongTitle(song) {
  return song
    .replace(/_/g, ' ')
    .replace(/-/g, ' - ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Load playlist
function loadPlaylist() {
  const playlist = document.getElementById('playlist');
  playlist.innerHTML = '';
  
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = formatSongTitle(song);
    li.setAttribute('data-index', index);
    
    // Set active class
    if (index === songIndex) {
      li.classList.add('active');
    }
    
    // Add click event
    li.addEventListener('click', () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });
    
    playlist.appendChild(li);
  });
}

// Update active playlist item
function updateActivePlaylistItem() {
  const playlistItems = document.querySelectorAll('.playlist li');
  playlistItems.forEach((item, index) => {
    if (index === songIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  if (isShuffle) {
    getRandomSong();
  } else {
    songIndex--;

    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  if (isShuffle) {
    getRandomSong();
  } else {
    songIndex++;

    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Get random song
function getRandomSong() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * songs.length);
  } while (newIndex === songIndex);
  
  songIndex = newIndex;
}

// Toggle repeat
function toggleRepeat() {
  isRepeat = !isRepeat;
  
  // Explicitly add or remove class based on isRepeat value
  if (isRepeat) {
    repeatBtn.classList.add('active');
  } else {
    repeatBtn.classList.remove('active');
  }
}

// Toggle shuffle
function toggleShuffle() {
  isShuffle = !isShuffle;
  
  // Explicitly add or remove class based on isShuffle value
  if (isShuffle) {
    shuffleBtn.classList.add('active');
  } else {
    shuffleBtn.classList.remove('active');
  }
}

// Set volume
function setVolume() {
  audio.volume = volumeSlider.value;
  updateVolumeIcon();
}

// Update volume icon based on volume level
function updateVolumeIcon() {
  const volume = audio.volume;
  
  if (volume === 0) {
    volumeIcon.className = 'fas fa-volume-mute';
  } else if (volume < 0.5) {
    volumeIcon.className = 'fas fa-volume-down';
  } else {
    volumeIcon.className = 'fas fa-volume-up';
  }
}

// Toggle mute
function toggleMute() {
  if (audio.volume > 0) {
    prevVolume = audio.volume;
    audio.volume = 0;
    volumeSlider.value = 0;
  } else {
    audio.volume = prevVolume;
    volumeSlider.value = prevVolume;
  }
  updateVolumeIcon();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  if (!isNaN(duration) && duration > 0) {
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // Update current time display
    const min = Math.floor(currentTime / 60);
    const sec = Math.floor(currentTime % 60);
    currTime.innerHTML = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  }
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Get duration & currentTime for Time of song
function DurTime(e) {
  const { duration } = e.srcElement;
  
  // Only update duration display if it's valid and not already set
  if (!isNaN(duration) && duration > 0 && durTime.textContent === '00:00') {
    const min_d = Math.floor(duration / 60);
    const sec_d = Math.floor(duration % 60);
    durTime.innerHTML = `${min_d < 10 ? '0' + min_d : min_d}:${sec_d < 10 ? '0' + sec_d : sec_d}`;
  }
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Repeat and shuffle 
repeatBtn.addEventListener('click', toggleRepeat);
shuffleBtn.addEventListener('click', toggleShuffle);

// Volume control
volumeSlider.addEventListener('input', setVolume);
volumeIcon.addEventListener('click', toggleMute);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Load metadata
audio.addEventListener('loadedmetadata', updateDuration);

// Sometimes metadata can be delayed, try again when canplay
audio.addEventListener('canplay', updateDuration);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', () => {
  if (isRepeat) {
    audio.currentTime = 0;
    playSong();
  } else {
    nextSong();
  }
});

// Time of song (backup method for duration)
audio.addEventListener('timeupdate', DurTime);