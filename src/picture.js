// import { constraints } from "./util";
import "./css/picture.css";


let   streaming    = false;
let   canvas      = null;
let   video       = null;
let   photo       = null;
let   startbutton = null;
const width       = 320;
const height      = 0;


const startUp = () => {
  startBtn = document.getElementById("startbutton");
  canvas   = document.getElementById("canvas");
  video    = document.getElementById("video");
  photo    = document.getElementById("photo");

  const constraint = {
    video: {
      width: { ideal: 600 },
      height: { ideal: 600 },
      facingMode: "user"
    },
  }

  navigator.mediaDevices.getUserMedia(constraint)
    .then(stream => {
      video.srcObject = stream;
      video.play();
    }).catch(err => console.log(`An error occurred ${err}`));

  video.addEventListener("canplay", ev => {
    if(!streaming) {
      height = video.videoHeight / (videoWidth/width);

      canvas.setAttribute("height", height);
      video.setAttribute("height", height);
      canvas.setAttribute("width", width);
      video.setAttribute("width", width);
      streaming = true;
    }
  }, false);``
}

