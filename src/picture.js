// import { constraints } from "./util";
import "./css/picture.css";


let   streaming    = false;
let   canvas      = null;
let   video       = null;
let   photo       = null;
let   startbutton = null;
const width       = 320;
const height      = 0;

/**
 * start video streaming
 */
const startUp = () => {
  startBtn = document.getElementById("startbutton");
  canvas   = document.getElementById("canvas");
  video    = document.getElementById("video");
  photo    = document.getElementById("photo");

  /**
   * settings that media captured from user device
   * need to abide by
   */
  const constraint = {
    video: {
      width: { ideal: 600 },
      height: { ideal: 600 },
      facingMode: "user"
    },
  }

 /**
  * get stream data from media devices on a
  * user system
  */
  navigator.mediaDevices.getUserMedia(constraint)
    .then(stream => {
      video.srcObject = stream;
      video.play();
    }).catch(err => console.log(`An error occurred ${err}`));

  /**
   * set up video window
   */
  video.addEventListener("canplay", ev => {
    if(!streaming) {
      height = video.videoHeight / (videoWidth/width);

      canvas.setAttribute("height", height);
      video.setAttribute("height", height);
      canvas.setAttribute("width", width);
      video.setAttribute("width", width);
      streaming = true;
    }
  }, false);

  /**
   * response to user click interaction with
   * a button in viewport
   */
  startbutton.addEventListener("click", ev => {
    takePicture();
    ev.preventDefault();
  }, false);


  clearphoto();
}

