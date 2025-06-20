const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const downloadBtn = document.getElementById("downloadBtn");

// Start the camera
navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    alert("Camera access denied: " + err.message);
  });

// Detect touch/click and take snapshot
document.body.addEventListener("click", takeSnapshot);
document.body.addEventListener("touchstart", takeSnapshot);

function takeSnapshot() {
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Show download button
  downloadBtn.style.display = "block";

  // Prepare download link
  const dataURL = canvas.toDataURL("image/png");
  downloadBtn.onclick = () => {
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "intruder.png";
    a.click();
  };
}