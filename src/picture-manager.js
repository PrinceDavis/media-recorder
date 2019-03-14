/**
 * Capture a frame from the streaming video
 * @param {canvas object} canvas canvas on which the captured frame is manipulated
 * @param {video object} video html element for displaying captured media from user device
 * @param {img object} photo html element for displaying captured picture frame
 * @param {number} height height of canvas
 * @param {number} width width of canvas
 */
export const takePicture = ({canvas, video, photo, width, height}) => {
  const context = canvas.getContext("2d");
  if(width && height) {
    canvas.height = height;
    canvas.width = width;
    context.drawImage(video, 0, 0, width, height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }else {
    clearPhoto(canvas, photo)
  }
}

/**
 * Move captured frame from canvas to an image element
 * @param {object} canvas canvas on which the captured frame is manipulated
 * @param {object} photo html element on to display captured frame turned image
 */
export const clearPhoto = (canvas, photo) => {
  const context = canvas.getContext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
}

