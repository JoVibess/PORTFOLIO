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


// Section 1
const section = document.querySelector('.sectionOne');

document.querySelectorAll('.sectionOne').forEach(element => {
    ["mouseenter", "touchmove"].forEach(eventType => {
        element.addEventListener(eventType, () => {
            const mockup = document.querySelector('.mockup1M114');

            // Ajoute la classe "animated" pour rendre l'état persistant
            mockup.addEventListener('animationend', () => {
                section.classList.add('animated');
            }, { once: true }); // "once" garantit que l'écouteur se retire après la première exécution
        });
    });
});

// section 3

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
;

// // Section 5

const section5 = document.querySelector('.sectionFive');
const mockupIphone = document.querySelector('.mockupIphone');
const mockupTablette = document.querySelector('.mockupTablette');

["mouseenter", "touchmove"].forEach(eventType => {
    section5.addEventListener(eventType, () => {
        mockupIphone.classList.add('animated1');
        mockupTablette.classList.add('animated2');
    }, { once: true }); // L'événement ne s'exécutera qu'une seule fois
});

// Circle effect


let circle = document.querySelector('.circle');
circle.addEventListener('click', function(){
    for(let i = 0; i < 80; i++){
        let particles = document.createElement('i');
        particles.classList.add('particles');
        let randomX = (Math.random() - 0.5) * window.innerWidth;
        let randomY = (Math.random() - 0.5) * window.innerHeight;

        particles.style.setProperty('--x' , randomX+'px');
        particles.style.setProperty('--y' , randomY+'px');

        let randomSize = Math.random() * window.innerWidth * 0.03;
        particles.style.width = randomSize + 'px';
        particles.style.height = randomSize + 'px';

        let duration = Math.random() * 3 + 2;
        
        particles.style.animation = `animate ${duration}s ease forwards`;

        document.querySelector('.circleEffect').appendChild(particles);

        setTimeout(function(){
            particles.remove(); 
        },5000);
    }
})













