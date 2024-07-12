const form = document.querySelector("#img-form");
const img = document.querySelector("#img");
const outputPath = document.querySelector("#output-path");
const filename = document.querySelector("#filename");
const heightInput = document.querySelector("#height");
const widthInput = document.querySelector("#width");

// get image and validation and render html
function loadImage(e) {
  const file = e.target.files[0];
  if (!isFileImage(file)) {
    return alartError("Please select an image");
  }

  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = function () {
    widthInput.value = this.width;
    heightInput.value = this.height;
  };

  form.style.display = "block";
  filename.innerText = file.name;
  outputPath.innerText = path.join(os.homedir(), "Downloads", "ADImageResizer");
}

// validation for image
function isFileImage(file) {
  const acceptedImageType = ["image/gif", "image/png", "image/jpeg"];
  return file && acceptedImageType.includes(file["type"]);
}

// sent image to main function
function sendImage(e) {
  e.preventDefault();

  const width = widthInput.value;
  const height = heightInput.value;
  const imgPath = img.files[0].path;

  if (!img.files[0]) {
    return alartError("Plese upload a image");
  }
  if (width === "" || height === "") {
    return alartError("Please fill in a height or width");
  }

  ipcRenderer.send("image:resize", {
    imgPath,
    width,
    height,
  });
}

// catch the image:done
ipcRenderer.on("image:done", () => alartSuccess("Image saved on output"));

// alarts
function alartError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "red",
      color: "white",
      textAlign: "center",
    },
  });
}

function alartSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "green",
      color: "white",
      textAlign: "center",
    },
  });
}

img.addEventListener("change", loadImage);
form.addEventListener("submit", sendImage);
