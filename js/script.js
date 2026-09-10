/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", function(e) {

    if (!cursor || !cursorDot) return;

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";

});


/* =========================
   THEME TOGGLE
========================= */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", function() {

        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {

            themeToggle.textContent = "☾";

        } else {

            themeToggle.textContent = "☼";

        }

    });

}


/* =========================
   TYPING EFFECT
========================= */

const typingText = document.getElementById("typingText");

if (typingText) {

    const words = [
        "FULL STACK DEVELOPER",
        "SOFTWARE DEVELOPER",
        "CREATIVE BUILDER",
        "UI/UX ENTHUSIAST"
    ];

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingText.textContent =
                currentWord.substring(0, characterIndex + 1);

            characterIndex++;

            if (characterIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;

            }

        } else {

            typingText.textContent =
                currentWord.substring(0, characterIndex - 1);

            characterIndex--;

            if (characterIndex === 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }

            }

        }

        setTimeout(
            typeEffect,
            deleting ? 40 : 80
        );

    }

    typeEffect();

}


/* =========================
   MOBILE MENU
========================= */

const menuButton = document.getElementById("menuButton");

if (menuButton) {

    menuButton.addEventListener("click", function() {

        const nav = document.querySelector(".nav-links");

        nav.classList.toggle("mobile-open");

    });

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".section");

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal");

                    setTimeout(() => {

                        entry.target.classList.add("visible");

                    }, 50);

                }

            });

        },
        {
            threshold: 0.1
        }
    );

revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(e) {

        e.preventDefault();

        alert(
            "Thanks for reaching out! Connect your preferred form service here to receive messages."
        );

        contactForm.reset();

    });

}