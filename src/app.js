const constriants = {
  audio: true,
  video: {
    width: { ideal: 600 },
    height: { ideal: 600 },
    facingMode: "user"
  }
}

navigator.mediaDevices.getUserMedia(constriants).then(stream => {
  const video = document.querySelector("video");
  video.srcObject = stream;
  video.onloadedmetadata = e => video.play();
});

