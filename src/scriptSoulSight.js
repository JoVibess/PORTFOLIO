import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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


// Section 2

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
// Section 3

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




