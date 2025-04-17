import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// PAGE ACCUEIL

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


let getBodyHeight = (function () {
  const body = document.body;
  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      document.documentElement.style.setProperty(
        "--bodyHeight",
        `${entry.contentRect.height}px`
      );
    }
  });
  observer.observe(body);
})();

// SECTION 1

// GSAP

gsap.from("#text1", {
  scrollTrigger: "#text1",
  y: "60%", // Déplacement du bas vers le haut
  opacity: 0,
  duration: 2,
  ease: "power2.out",
});

gsap.from(
  "#text2",
  {
    scrollTrigger: "#text2",
    duration: 2,
    y: "60%", // Déplacement du bas vers le haut
    opacity: 0,
    delay: 0.5,
    ease: "power2.out",
  },
  "-=1"
);

if (window.innerWidth >= 768) {
  gsap.from(".separator", {
    scrollTrigger: ".separator",
    x: 700,
    duration: 0.8,
  });
  gsap.from("#blueStar", {
    scrollTrigger: "#blueStar",
    x: 400,
    rotation: 360,
    duration: 1,
  });
  gsap.from("#title1", {
    scrollTrigger: "#title1",
    x: -300,
    duration: 1,
    opacity: 0,
    ease: "power2.out",
  });
  gsap.from("#title3", {
    scrollTrigger: "#title3",
    x: 300,
    duration: 1,
    opacity: 0,
    ease: "power2.out",
  });
  gsap.from("#letter1", {
    scrollTrigger: "#letter1",
    x: -500,
    duration: 1,
    rotation: 360,
    opacity: 0,
    ease: "power2.out",
  });
  gsap.from("#letter2", {
    scrollTrigger: "#letter2",
    x: 500,
    duration: 0.8,
    rotation: -360,
    opacity: 0,
    ease: "power2.out",
  });
  gsap.from("#letter3", {
    scrollTrigger: "#letter3",
    x: 400,
    duration: 1,
    rotation: -360,
    opacity: 0,
    ease: "power2.out",
  });
}

gsap.from("#text3", {
  scrollTrigger: "#text3",
  x: -100,
  duration: 1,
  opacity: 0,
  ease: "power2.out",
});
