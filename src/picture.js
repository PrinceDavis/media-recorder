import { takePicture, clearPhoto } from "./picture-manager";
import { constraints } from "./util";
import "./css/picture.css";

let   streaming = false;
let   canvas    = null;
let   video     = null;
let   photo     = null;
let   startBtn  = null;
const width     = 340;
let   height    = 0;

/**
 * start video streaming
 */
const startUp = () => {
  startBtn = document.getElementById("startbutton");
  canvas   = document.getElementById("canvas");
  video    = document.getElementById("video");
  photo    = document.getElementById("photo");

  /**
   * tell the browser not to capture audio data
   */
  const settings = { ...constraints };
  delete settings.audio;

 /**
  * get stream data from media devices on a
  * user system
  */
  navigator.mediaDevices.getUserMedia(settings)
    .then(stream => {
      video.srcObject = stream;
      video.play();
    }).catch(err => console.log(`An error occurred ${err}`));

  /**
   * set up video window
   */
  video.addEventListener("canplay", ev => {
    if(!streaming) {
      height = video.videoHeight / (video.videoWidth/width);

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
  startBtn.addEventListener("click", ev => {
    takePicture({canvas, video, photo, width, height});
    ev.preventDefault();
  }, false);
  clearPhoto(canvas, photo);
}

startUp()

