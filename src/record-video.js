import "./css/record-video.css";

const mediaSource = new MediaSource();
mediaSource.addEventListener("sourceopen", handleSourceOpen, false);

let mediaRecorder;
let recordedBlobs;
let sourceBuffer;

const downloadButton  = document.querySelector("button#download");
const recordedVideo   = document.querySelector("video#recorded");
const errorMsgElement = document.querySelector("span#errorMsg");
const recordButton    = document.querySelector("button#record");
const playButton      = document.querySelector("button#play");

recordButton.addEventListener("click", () => {
  if(recordButton.textContent === "Start Recording") {
    startRecording();
  }else {
    stopRecording();
    recordButton.textContent = "Start Recording";
    playButton.disabled      = false;
    downloadButton.disabled  = false;
  }
});

playButton.addEventListener("click", () => {
  const buffer = new Blob(recordedBlobs, {type: "video/webm"});

  recordedVideo.src       = null;
  recordedVideo.srcObject = null;
  recordedVideo.src       = window.URL.createObjectURL(buffer);
  recordedVideo.controls  = true;
  recordedVideo.play();
});

downloadButton.addEventListener("click", () => {
  const blob            = new Blob(recordedBlobs, {type: "video/webm"});
  const url             = window.URL.createObjectURL(blob);
  const a               = document.createElement("a");

  a.download      = "new-record.webm";
  a.style.display = "none";
  a.href          = url;

  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
});


function handleSourceOpen(event) {
  console.log("MediaSource Open");
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log("source buffer", sourceBuffer);
}

function handleDataAvailable(event) {
  if(event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}


function startRecording() {
  recordedBlobs = [];
  let options = {mimeType: "video/webm;codec=vp9"};
  if(!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.error(`${options.mimeType} is not Supported`);
    errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
    options = {mimeType: 'video/webm;codecs=vp8'};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not Supported`);
      errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
      options = {mimeType: 'video/webm'};
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not Supported`);
        errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
        options = {mimeType: ''};
      }
    }
  }
  try {
    mediaRecorder = new MediaRecorder(window.stream, options)
  } catch (e) {
    console.error('Exception while creating MediaRecorder:', e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    return;
  }

  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.textContent = 'Stop Recording';
  playButton.disabled = true;
  downloadButton.disabled = true;

  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

document.querySelector('button#start').addEventListener('click', async () => {
  const hasEchoCancellation = document.querySelector('#echoCancellation').checked;
  const constraints = {
    audio: {
      echoCancellation: {exact: hasEchoCancellation}
    },
    video: {
      width: 1280, height: 720
    }
  };
  console.log('Using media constraints:', constraints);
  await init(constraints);
});

async function init(constraints) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    console.error('navigator.getUserMedia error:', e);
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}



function handleSuccess(stream) {
  recordButton.disabled = false;
  console.log('getUserMedia() got stream:', stream);
  window.stream = stream;

  const gumVideo = document.querySelector('video#gum');
  gumVideo.srcObject = stream;
}

function stopRecording() {
  mediaRecorder.stop();
  console.log('Recorded Blobs: ', recordedBlobs);
}
