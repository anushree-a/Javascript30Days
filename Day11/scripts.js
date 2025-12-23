// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const volumeSlider = player.querySelector('input[name="volume"]');
const playbackRateSlider = player.querySelector('input[name="playbackRate"]');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

// Toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Update volume
function handleVolumeUpdate() {
  video.volume = this.value;
}

volumeSlider.addEventListener('input', handleVolumeUpdate);
volumeSlider.addEventListener('change', handleVolumeUpdate);

// Update playback rate
function handlePlaybackRateUpdate() {
  video.playbackRate = this.value;
}

playbackRateSlider.addEventListener('input', handlePlaybackRateUpdate);
playbackRateSlider.addEventListener('change', handlePlaybackRateUpdate);

// Skip functionality
const skipButtons = player.querySelectorAll('[data-skip]');

function skip() {
  const skipValue = parseFloat(this.dataset.skip);
  video.currentTime += skipValue;
}

skipButtons.forEach(button => button.addEventListener('click', skip));

// Progress bar functionality
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Update progress bar as video plays
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);
video.addEventListener('loadedmetadata', handleProgress); // Initialize progress bar when video metadata loads