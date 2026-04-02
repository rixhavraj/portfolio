document.addEventListener("DOMContentLoaded", () => {
    const cursorDot = document.getElementById("cursor-dot");

    document.addEventListener("mousemove", (event) => {
        cursorDot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    });
});
