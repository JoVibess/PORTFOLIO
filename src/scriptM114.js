import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Header

const menuburger = document.querySelector(".menu-burger");
const menu2 = document.querySelector(".menu2");

let isMenuOpen = false; // Suivi de l'état du menu

menuburger.addEventListener("click", () => {
  if (!isMenuOpen) {
    menu2.style.display = "flex"; // Affiche le menu avant de déclencher l'animation
    menu2.classList.remove("pop-menu-exit");
    void menu2.offsetWidth; // Réinitialise l'état de l'animation
    menu2.classList.add("pop-menu-enter");
  } else {
    // Si le menu est ouvert, appliquer l'animation de sortie
    menu2.classList.remove("pop-menu-enter");
    void menu2.offsetWidth; // Réinitialise l'état de l'animation
    menu2.classList.add("pop-menu-exit");
  }
  isMenuOpen = !isMenuOpen;
});

// Lors de la fin de l'animation, cacher complètement le menu si c'est une sortie
menu2.addEventListener("animationend", (event) => {
  if (event.animationName === "slideOut") {
    menu2.style.display = "none"; // Cache complètement après l'animation de sortie
  }
});

// // Section 1

gsap.fromTo(
  ".mockupM114",
  {
    x: "-300%",
  },
  {
    x: 0,
    scrollTrigger: ".sectionOne",
    duration: 2,
    ease: "power2.out",
  }
);

// // Section 2

gsap.fromTo(
  ".projetSec3",
  {
    x: "10%",
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    scrollTrigger: ".projetSec3",
    duration: 2,
    ease: "power2.out",
  }
);

// // Section 3

const panels = document.querySelectorAll(".panel");
panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClasses();
    panel.classList.add("active");
  });
});

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}

// // Section 4

gsap.fromTo(
  ".sectionFour",
  {
    y: "10%",
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    scrollTrigger: ".sectionFour",
    duration: 1.6,
    ease: "power2.out",
  }
);

// // Section 5

if (window.innerWidth >= 768) {
  gsap.fromTo(
    ".mockupIphone",
    {
      x: "300%",
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      scrollTrigger: ".sectionFive",
      duration: 2,
      ease: "power2.out",
    }
  );
  gsap.fromTo(
    ".mockupTablette",
    {
      x: "-200%",
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      scrollTrigger: ".sectionFive",
      duration: 2,
      ease: "power2.out",
    }
  );
}

// // Section 7

gsap.from(".sectionSix h2", {
  scrollTrigger: ".bloc2Six",
  y: "50%",
  opacity: 0,
  duration: 1.6,
  ease: "power2.out",
});

gsap.from(".sectionSeven h2", {
  scrollTrigger: ".circleEffect",
  y: "50%",
  opacity: 0,
  duration: 1.6,
  ease: "power2.out",
});

// // Circle effect

let circle = document.querySelector(".circle");
circle.addEventListener("click", function () {
  for (let i = 0; i < 80; i++) {
    let particles = document.createElement("i");
    particles.classList.add("particles");
    let randomX = (Math.random() - 0.5) * window.innerWidth;
    let randomY = (Math.random() - 0.5) * window.innerHeight;

    particles.style.setProperty("--x", randomX + "px");
    particles.style.setProperty("--y", randomY + "px");

    let randomSize = Math.random() * window.innerWidth * 0.03;
    particles.style.width = randomSize + "px";
    particles.style.height = randomSize + "px";

    let duration = Math.random() * 3 + 2;

    particles.style.animation = `animate ${duration}s ease forwards`;

    document.querySelector(".circleEffect").appendChild(particles);

    setTimeout(function () {
      particles.remove();
    }, 5000);
  }
});
