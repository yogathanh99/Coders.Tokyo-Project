/* Get Elemnents */
const player = document.querySelector('.player')

const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')

const toggle = player.querySelector('.toggle')
const skipButtons=player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

function togglePlay() {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent=icon
}

function skip() {
  const timeSkip = this.dataset.skip
  console.log(timeSkip)
  video.currentTime+=parseFloat(timeSkip)
}

function handleRangeUpdate() {
  video[this.name]=this.value
}

function handleProgress() {
  const percent = (video.currentTime * 100) / video.duration
  progressBar.style.flexBasis=`${percent}%`
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime=scrubTime
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range=>range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', ()=> mousedown=true)
progress.addEventListener('mouseup', ()=> mousedown=false)