// ********************************************** local storage

let mainColors = localStorage.getItem("theme_color");

// check for local data
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  //  remove active class from the li
  document.querySelectorAll(".color-list li").forEach((ele) => {
    ele.classList.remove("active");

    //  add active class to the existed color
    if (ele.dataset.color === mainColors) {
      ele.classList.add("active");
    }
  });
}

// background option
let randomChange = true;
// background interval contraller
let intervalContraller;

// check for background local data
let backgroundLocalData = localStorage.getItem("background_option");

if (backgroundLocalData !== null) {
  if (backgroundLocalData === "true") {
    randomChange = true;
    document.querySelector(".rand-btns .yes").classList.add("active");
  } else {
    randomChange = false;
    document.querySelector(".rand-btns .yes").classList.remove("active");
    document.querySelector(".rand-btns .no").classList.add("active");
  }
}

// ********************************************** setting box
//  get the setting element
let settingBox = document.querySelector(".setting-box"),
  settingToggler = document.querySelector(".set-gear");

//  toggle the setting list + spin the geer
settingToggler.onclick = function () {
  this.classList.toggle("fa-spin");
  settingBox.classList.toggle("active");
};

// ********************* color switcher
let colorList = document.querySelectorAll(".color-list li");
// loop on list items
colorList.forEach((li) => {
  li.addEventListener("click", (e) => {
    //  set color on :root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //  set color on local storage
    localStorage.setItem("theme_color", e.target.dataset.color);

    handleActive(e);
  });
});

// ********************* randon baclground toggler
let randomBackEl = document.querySelectorAll(".rand-btns button");
// loop on all buttons
randomBackEl.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      randomChange = true;
      randomizer();
      localStorage.setItem("background_option", true);
    } else {
      randomChange = false;
      clearInterval(intervalContraller);
      localStorage.setItem("background_option", false);
    }
  });
});

// **********************************************
//  get the landing page
let landingPage = document.querySelector(".landing-page");

//  get the images array
let imgArray = [
  "img-1.jpg",
  "img-2.jpg",
  "img-3.jpg",
  "img-4.png",
  "img-5.png",
  "img-6.png",
];

// roandomize function
function randomizer() {
  if (randomChange === true) {
    // get random number
    intervalContraller = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      landingPage.style.backgroundImage = `url(\"images/${imgArray[randomNumber]}\")`;
    }, 2500);
  }
}
// Change backgrouond image url
randomizer();

// ********************************************** skills section
// select skills selector

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // the offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // the outer height
  let skillsOffsetHeight = ourSkills.offsetHeight;

  // the window height
  let windowHeight = this.innerHeight;

  // the window scroll top
  let windowScrollTop = this.scrollY;

  if (windowScrollTop > skillsOffsetTop + skillsOffsetHeight - windowHeight) {
    let allSkills = document.querySelectorAll(".skill .skill-progress span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// ********************************************** gallery section
// create popup
let ourGallery = document.querySelectorAll(".gallery-imgs img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");

    // set class to the overlay
    overlay.className = "popup-overlay";

    // appent the overlay to body
    document.body.appendChild(overlay);

    // cerate th popup itself
    let popupBox = document.createElement("div");

    // set class to the popup
    popupBox.className = "popup-box";

    // check for alt text on images
    if (img.alt !== null) {
      // create image heading
      let imgHeading = document.createElement("h3");

      // create text for heading
      let imgText = document.createTextNode(img.alt);

      // append the text to the heading
      imgHeading.appendChild(imgText);

      // append the heading to the popup
      popupBox.appendChild(imgHeading);

      // create the img
      let popupImg = document.createElement("img");

      // set the src to the poped up image
      popupImg.src = img.src;

      // append the image to the popup
      popupBox.appendChild(popupImg);

      // append the popup to the body
      document.body.appendChild(popupBox);

      // create the close button
      let closeButton = document.createElement("button");
      // add class to the button
      closeButton.className = "close-btn";

      // create the close button text (font awesome)
      let closeBtnText = document.createElement("i");
      closeBtnText.className = "fa fa-close fa-fw close";

      // appent the text to the button
      closeButton.appendChild(closeBtnText);

      // appendthe button to the popup box
      popupBox.appendChild(closeButton);
    }
  });
});

document.addEventListener("click", (e) => {
  if (
    e.target.className == "close-btn" ||
    e.target.className == "fa fa-close fa-fw close"
  ) {
    // e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
    document.querySelector(".popup-box").remove();
  }
});

// navigation bullets
// select all bullet
let allBullets = document.querySelectorAll(".nav-bullets .bullet");

// navigation links
// select all links
let allLinks = document.querySelectorAll(".links a");

// ********************************************** the scrolltoView function
function scrollToTheElement(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}
scrollToTheElement(allBullets);
scrollToTheElement(allLinks);

// ********************************************** active class handler
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// ********************************************** navigation bullets
let bulletsBtn = document.querySelectorAll(".nav-bullets-opt button");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalOption = localStorage.getItem("bullets_option");

if (bulletLocalOption !== null) {
  bulletsBtn.forEach((localBtn) => {
    localBtn.classList.remove("active");
  });

  if (bulletLocalOption === "on") {
    bulletsContainer.style.display = "block";
    document.querySelector(".nav-bullets-opt .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".nav-bullets-opt .no").classList.add("active");
  }
}
bulletsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.dataset.display === "on") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "on");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "off");
    }
    handleActive(e);
  });
});

// ********************************************** reset button
document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear(); ==> if there is no other data in localStorage then the settings
  localStorage.removeItem("theme_color");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
};

// ********************************************** links toggler
let menuToggler = document.querySelector(".toggle-links"),
  toggledList = document.querySelector(".links");
menuToggler.onclick = function (e) {
  // to stop propagation
  e.stopPropagation();

  this.classList.toggle("active");
  toggledList.classList.toggle("open");
};

// close the button from aywhere
document.addEventListener("click", (e) => {
  if (e.target !== menuToggler && e.target !== toggledList) {
    if (
      menuToggler.classList.contains("active") &&
      toggledList.classList.contains("open")
    ) {
      menuToggler.classList.remove("active");
      toggledList.classList.remove("open");
    }
  }
});
