import { constraints } from "./util";

navigator.mediaDevices.getUserMedia(constraints).then(stream => {
  const video = document.querySelector("video");
  video.onloadedmetadata = e => video.play();
  video.srcObject = stream;
});

