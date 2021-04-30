
const body = document.getElementsByTagName('body')[0];
const mobHeader = document.getElementById('mob-header');
const mobToggle = document.getElementById("menu-toggle");
const mobNavList = document.querySelectorAll('.mob-menu a');
const langButtons = document.querySelectorAll('.lang-switcher span');
const langButtonsMob = document.querySelectorAll('.lang-switcher.mobile span');
let langState;
if (localStorage.getItem("MultiLanguage") != null) langState = localStorage.getItem("MultiLanguage");
else langState = "en";

const themeButtons = document.querySelectorAll('.themes li');

langControl(langState, langButtons);
langControl("mob-"+langState, langButtonsMob);
themeSwitch(themeButtons, body);




function themeSwitch (buttons, body) {
  let setting;
  if (localStorage.getItem("theme") == null) setting = "system";
  else setting = localStorage.getItem("theme");

  if (setting === "system") {
    setSysTheme(body);
    localStorage.setItem("theme", setting);
  }
  setTheme(body, setting, buttons);
  themeButtons.forEach(li => {
    li.addEventListener("click", function () {
      setting = this.getAttribute('id');
      setTheme(body, setting, buttons);
    })
  })
}

function setTheme (body, param, buttons) {
  buttons.forEach(li => {
    li.classList.remove("active");
  })
  document.getElementById(param).classList.add("active");
  if (param === "light") {
    if (body.classList.contains("dark")) body.classList.remove("dark");

  } else if (param === "dark") {
    body.classList.add("dark");

  } else {
    setSysTheme(body);
  }
  localStorage.setItem("theme", param);
}

function setSysTheme (body) {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    body.classList.add("dark");
  } else {
    if (body.classList.contains("dark")) body.classList.remove("dark");
  }
  document.querySelector('#system').classList.add("active");
}

// change active class on lang switcher according to user selection & local storage variable
function langControl(state, buttons) {
  // in case viewport width is changed and other switcher is to be used
  buttons.forEach(span => {
    if (span.classList.contains("active")) span.classList.remove("active");
  })

  let current = document.getElementById(state);
  current.classList.add("active");

  buttons.forEach(span => {
    span.addEventListener("click", function() {
      current.classList.remove("active");
      current = this;
      current.classList.add("active");
    })
  })
}

//preloader
window.onload = (event) => {
  body.classList.add("loaded");
};

// SCROLLSPY FOR BOTH NAVS & SCROLL EVENTS
window.addEventListener("scroll", function() {
  const sections = document.querySelectorAll('section');
  const navList = document.querySelectorAll('.menu a, .mob-menu a');
  let current = 'home';
  //console.log(current);
  sections.forEach(section => {

    if(pageYOffset >= section.offsetTop - 100) {
      current = section.getAttribute('id')
      if(pageYOffset >= document.body.scrollHeight - window.outerHeight) {
        current = 'contacts'
      }
    }

  })

  navList.forEach(a => {
    if(a.classList.contains(current)) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  })

  // scroll events
  const header = document.getElementById('header');
  const toTop = document.getElementById('to-top');

  if (window.pageYOffset > 0) header.classList.add("scrolled");
  else header.classList.remove("scrolled");

  if (window.pageYOffset > 50) {
    toTop.classList.add("active");
    mobHeader.classList.add("scrolled")
  } else {
    toTop.classList.remove("active");
    mobHeader.classList.remove("scrolled");
  }
})


// menu open and close
mobToggle.addEventListener("click", function () {
  if (this.classList.contains("toggled")) {
    this.classList.remove("toggled");
    body.classList.remove("o-hidden");
    mobHeader.classList.remove("activated");
  } else {
    this.classList.add("toggled");
    body.classList.add("o-hidden");
    mobHeader.classList.add("activated");
  }
})

// exit menu on click
mobNavList.forEach(a => {
  a.addEventListener("click", function () {
    mobToggle.classList.remove("toggled");
    body.classList.remove("o-hidden");
    mobHeader.classList.remove("activated");
  })
})

//exit menu on window resize
window.addEventListener("resize", function () {
  langState = localStorage.getItem("MultiLanguage");
  langControl(langState, langButtons);
  langControl("mob-"+langState, langButtonsMob);
  mobToggle.classList.remove("toggled");
  body.classList.remove("o-hidden");
  mobHeader.classList.remove("activated");
})

// smooth scroll init
let scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
	speedAsDuration: true
});

// multilang init
$(document).ready(function() {
  $.MultiLanguage('language.json');
});
