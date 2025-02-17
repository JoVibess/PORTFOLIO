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
document.querySelector('.sectionOne').addEventListener('mouseenter', () => {
    const mockup = document.querySelector('.mockup1M114');

    // Ajoute la classe "animated" pour rendre l'état persistant
    mockup.addEventListener('animationend', () => {
        section.classList.add('animated');
    }, { once: true }); // "once" garantit que l'écouteur se retire après la première exécution
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

// document.querySelector('.sectionFive').addEventListener('mouseenter', () => {
//     const section5 = document.querySelector('.sectionFive');
//     const mockup1 = document.querySelector('.mockupIphone');
//     const mockup2 = document.querySelector('.mockupTablette');

//     // Ajoute la classe "animated" pour rendre l'état persistant
//     mockup1.addEventListener('animationend', () => {
//         section5.classList.add('animated');
//     }, { once: true }); // "once" garantit que l'écouteur se retire après la première exécution

//     mockup2.addEventListener('animationend', () => {
//         section5.classList.add('animated');
//     }, { once: true }); // "once" garantit que l'écouteur se retire après la première exécution
// });


document.querySelector('.sectionFive').addEventListener('mouseenter', () => {
    const section5 = document.querySelector('.sectionFive');
    const mockupIphone = document.querySelector('.mockupIphone');
    const mockupTablette = document.querySelector('.mockupTablette');
    mockupIphone.classList.add('animated1');
    mockupTablette.classList.add('animated2');
    // // Écouter la fin des animations et ajouter la classe persistante
    // mockupIphone.addEventListener(
    //     'animationend',
    //     () => {
    //         console.log('aaaaa');
    //         section5.classList.add('animated');
    //         console.log('gàrog');
            
    //     },
    //     { once: true } // Supprime l'écouteur après la première exécution
    // );

    // mockupTablette.addEventListener(
    //     'animationend',
    //     () => {
    //         section5.classList.add('animated');
    //     },
    //     { once: true } // Supprime l'écouteur après la première exécution
    // );
},{ once: true });


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













