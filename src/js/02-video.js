import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onTimeUpdate, 1000));

player.getVideoTitle().then(function (title) {
        console.log('title:', title);
});
const savedTime = localStorage.getItem("videoplayer-current-time");
if(savedTime) {player.setCurrentTime(savedTime)};

function onTimeUpdate(e) {
    localStorage.setItem("videoplayer-current-time", e.seconds);
    }
