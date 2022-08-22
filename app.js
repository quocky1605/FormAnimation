const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");

const tl = gsap.timeline({ defaults: { duration: 1 } });

const start =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";

const end =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

containers.forEach((container) => {
  const input = container.querySelector(".input");
  const line = container.querySelector(".elastic-line");
  const placeholder = container.querySelector(".placeholder");

  input.addEventListener("focus", () => {
    if (!input.value) {
      tl.fromTo(
        line,
        { attr: { d: start } },
        { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
      )
        .to(line, { attr: { d: start }, ease: "elastic.out(3,0.5)" }, "<50%")
        .to(
          placeholder,
          {
            top: -15,
            left: 0,
            ease: "Power2.easeOut",
            scale: 0.7,
            duration: 0.5,
          },
          "<15%"
        );
    }
  });
});

form.addEventListener("click", () => {
  containers.forEach((container) => {
    const input = container.querySelector(".input");
    const line = container.querySelector(".elastic-line");
    const placeholder = container.querySelector(".placeholder");

    if (document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeholder, {
          top: 0,
          left: 0,
          scale: 1,
          duration: 0.5,
          ease: "Power2.easeOut",
        });
      }
    }

    input.addEventListener("input", (event) => {
      // console.log(event.target.value.lenght);
      if (event.target.type === "text") {
        let inputText = event.target.value;
        if (inputText.length > 2) {
          colorize("#6391E8", line, placeholder);
        } else {
          colorize("#FE8C99", line, placeholder);
        }
      }
      if (event.target.type === "email") {
        let validEmail = validateEmail(event.target.value);
        if (validEmail) {
          colorize("#6391E8", line, placeholder);
        } else {
          colorize("#FE8C99", line, placeholder);
        }
      }
      if (event.target.type === "tel") {
        let validPhone = validate(event.target.value);
        if (validPhone) {
          colorize("#6391E8", line, placeholder);
        } else {
          colorize("#FE8C99", line, placeholder);
        }
      }
    });
  });
});

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validate(phone) {
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return regex.test(phone);
}

function colorize(color, line, placeholder) {
  gsap.to(line, { stroke: color, duration: 0.75 });
  gsap.to(placeholder, { color: color, duration: 0.75 });
  // return color;
}

const checkbox = document.querySelector(".checkbox");
const tl2 = gsap.timeline({
  defaults: { duration: 0.5, ease: "Power2.easeOut" },
});
const tickMarkPath = document.querySelector(".tick-mark path");
const pathLength = tickMarkPath.getTotalLength();
gsap.set(tickMarkPath, {
  strokeOffset: pathLength,
  strokeDasharray: pathLength,
});
checkbox.addEventListener("click", function (e) {
  if (checkbox.checked) {
    tl2
      .to(".checkbox-fill", { top: "0%" })
      .fromTo(
        tickMarkPath,
        { strokeDashoffset: pathLength },
        { strokeDashoffset: 0 },
        "<50%"
      )
      .to(".checkbox-label", { color: "#6391E8" }, "<");
  } else {
    tl2
      .to(".checkbox-fill", { top: "100%" })
      .fromTo(
        tickMarkPath,
        { strokeDashoffset: 0 },
        { strokeDashoffset: pathLength },
        "<50%"
      )
      .to(".checkbox-label", { color: "#c5c5c5" }, "<");
  }
});

gsap.set("#eye", { transformOrigin: "center" });
gsap.fromTo(
  "#eye",
  { scale: 1 },
  {
    scale: 0.3,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.5,
    ease: "Power2.easeOut",
  }
);

const button = document.querySelector("button");
const tl3 = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});
button.addEventListener("click", (e) => {
  e.preventDefault();
  tl3
    .to(".contact-right, .contact-left", {
      y: 30,
      opacity: 0,
      pointerEvents: "none",
    })
    .to("form", { scale: 0.8 }, "<")
    .fromTo(".submitted", { opacity: 0, y: 30 }, { opacity: 1, y: 0 });
  gsap.set("#hand", { transformOrigin: "left" });
  gsap.fromTo(
    "#hand",
    { rotation: 0, y: 0 },
    { rotation: -10, y: 2, ease: "elastic(3,0.3)", duration: 2, delay: 1 }
  );
});
