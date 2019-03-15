import { constraints } from "./util";
import './css/record-audio.css';

const soundClips = document.querySelector(".sound-clips");
const record     = document.querySelector(".record");
const stop       = document.querySelector(".stop");

/**
 * remove the media data settings that we don't need
 */
const mediaSetting = { ...constraints };
delete mediaSetting.video;

navigator.mediaDevices.getUserMedia(mediaSetting)
  .then(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    let chunks = [];

    record.onclick = () => {
      mediaRecorder.start();

      record.style.color      = "black";
      record.style.background = "red";
    }

    mediaRecorder.ondataavailable = e => {
      chunks.push(e.data);
    }

    stop.onclick = () => {
      mediaRecorder.stop();

      record.style.background = "";
      record.style.color      = "";
    }

    mediaRecorder.onstop = e => {
      const clipName      = prompt("Enter a name for your sound clip");
      const clipContainer = document.createElement("article");
      const deleteButton  = document.createElement("button");
      const audio         = document.createElement("audio");
      const clipLabel     = document.createElement("p");

      clipContainer.classList.add("clip");
      audio.setAttribute("controls", "");
      deleteButton.innerHTML = "Delete";
      clipLabel.innerHTML = clipName;

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips.appendChild(clipContainer);

      const blob = new Blob(chunks, {"type": "audio/ogg; codecs=opus"});
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;

      deleteButton.onclick = e => {
        const target = e.target;
        target.parentNode.parentNode.removeChild(target.parentNode);
      }
    }
  })
  .catch(err => console.log( `The following error occured ${err}`));
