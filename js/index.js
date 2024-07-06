if (localStorage.colorsPage) {
  const { mainColor, hoverColor, color } = JSON.parse(localStorage.colorsPage);

  $("#colors li").removeClass("active");
  $(`#colors [data-color="${color}"]`).addClass("active");

  setColorPage("--main-color", mainColor);
  setColorPage("--hover-color", hoverColor);
  setColorPage("--second-color", color);
}

// ----- Section Home ------
// Nav
$("#home .bar-icon").on("click", () => $("nav").addClass("active"));
$("nav .close-nav").on("click", () => $("nav").removeClass("active"));

$("nav ul li a").on("click", function (e) {
  e.preventDefault();
  const sectionId = $(this).attr("href");
  const positionSection = $(sectionId).offset().top;
  $("html, body").animate({ scrollTop: positionSection });

  $("nav").hasClass("active") && $("nav").removeClass("active");
});

// Section Duration
// Toggle Active Singer Duration => (Accordion)
let isActiveSigner = $("#duration .singer:first-child .title")[0];
$("#duration .singer .title").on("click", function () {
  if (isActiveSigner == this) {
    $(this).next().children().slideToggle();
    isActiveSigner = this;
  } else {
    isActiveSigner = this;
    $("#duration .singer .info p").slideUp();
    $(this).next().children().slideToggle();
  }
});

// Section Details
$(function () {
  const eventDay = $("#eventDay"),
    eventHour = $("#eventHour"),
    eventMinute = $("#eventMinute"),
    eventSecond = $("#eventSecond");

  const eventParty = setInterval(() => {
    const currentDate = new Date();
    const eventDate = new Date("7/13/2024 17:00:00");
    const durationTime = eventDate - currentDate;

    if (durationTime <= 0) {
      $("#details .container").html(
        "<p class='text-white fs-2 fw-bold'>Party is started</p>"
      );
      clearInterval(eventParty);
      return;
    }

    const activeDate = new Date(durationTime);

    const seconds = activeDate.getUTCSeconds();
    const minutes = activeDate.getUTCMinutes();
    const hours = activeDate.getUTCHours();
    const days = activeDate.getUTCDate();

    $(eventDay).text(`${days === 1 ? 0 : days}D`);
    $(eventHour).text(`${hours < 10 ? `0${hours}` : hours}H`);
    $(eventMinute).text(`${minutes < 10 ? `0${minutes}` : minutes}m`);
    $(eventSecond).text(`${seconds < 10 ? `0${seconds}` : seconds}S`);
  }, 1000);
});

// Section Contact

// Validation Input
const validation = {
  userName: /^[a-zA-Z]+$/,
  userEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

$("#userName, #userEmail").on("input", () => {
  checkInputValue($(this));
  validate($(this), validation[$(this).attr("id")]);
});

$("#sendMessage").on("click", (e) => {
  const isEmptyValue = checkInputValue(
    $("#userName, #userEmail, #userMessage")
  );
  const isValidName = validate(
    $("#userName"),
    validation[$("#userName").attr("id")]
  );
  const isValidEmail = validate(
    $("#userEmail"),
    validation[$("#userEmail").attr("id")]
  );

  const isValid = isValidEmail && isValidName;

  (isEmptyValue || !isValid) && e.preventDefault();
});

// Check Keyword input
const amount = 100;
$("#userMessage").on("keydown", function (e) {
  const numValue = $(this).val().length;

  if (numValue >= amount)
    if (e.key != "Backspace") e.preventDefault();
    else return true;
});

$("#userMessage").on("input", function () {
  checkInputValue($(this));

  const amountAvailable = amount - $(this).val().length;

  if (amountAvailable <= 0)
    $("#contact form #countChar").text("Your available character finished");
  else $("#contact form #countChar").text(amountAvailable);
});

/* Feathers */

// Set Color

$("nav #colors li").on("click", function () {
  $("nav #colors li").removeClass("active");
  $(this).addClass("active");

  const color = $(this).attr("data-color");
  const mainColor = color.split("").toSpliced(-1, 1, ",0.6)").join("");
  const hoverColor = color.split("").toSpliced(-1, 1, ",0.4)").join("");

  const colorsOption = {
    mainColor,
    hoverColor,
    color,
  };

  setColorPage("--main-color", mainColor);
  setColorPage("--hover-color", hoverColor);
  setColorPage("--second-color", color);

  localStorage.setItem("colorsPage", JSON.stringify(colorsOption));
});

/* Scroll Top */
// Show ScrollTop on scroll
$(window).on("scroll", function () {
  if (this.scrollY > $("#duration").offset().top)
    $("#scrollTop").addClass("active");
  else $("#scrollTop").removeClass("active");
});

// Scroll To Top
$("#scrollTop").on("click", () =>
  document.getElementById("home").scrollIntoView({
    behavior: "smooth",
  })
);

// Helper Func
function replaceAddClassName(element, oldClass, newClass) {
  if (element.hasClass(oldClass)) {
    element.removeClass(oldClass);
    element.addClass(newClass);
  } else element.addClass(newClass);
}

function checkInputValue(element) {
  let isEmpty = false;
  if (element.val() === "") {
    element.addClass("is-invalid");
    isEmpty = true;
  } else {
    element.removeClass("is-invalid");

    isEmpty = false;
  }

  return isEmpty;
}
function validate(element, reg) {
  const value = element.val();
  if (reg?.test(value)) {
    replaceAddClassName(element, "is-invalid", "is-valid");
    return true;
  } else {
    replaceAddClassName(element, "is-valid", "is-invalid");
    return false;
  }
}

function setColorPage(filed, color) {
  document.documentElement.style.setProperty(filed, color);
}
