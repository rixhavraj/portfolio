const projects = [
    {
        category: "PRODUCT UI / LOCAL-FIRST",
        title: "Flowboard",
        description: "A calm project-delivery board designed for the moment a team needs to see the work, not hunt for it. Tasks can be added, moved between views and retained in the browser between visits.",
        highlights: [
            "Creates and stores tasks locally with LocalStorage.",
            "Filters work by status without losing visual context.",
            "Uses a responsive layout that stays usable on a small screen."
        ],
        technologies: ["HTML", "CSS", "JavaScript", "LocalStorage"],
        live: "projects/flowboard/index.html",
        github: "projects/flowboard/"
    },
    {
        category: "ANALYTICS DASHBOARD",
        title: "Metricly",
        description: "A product analytics concept that makes a weekly check-in feel less like a spreadsheet. The dashboard pairs a readable trend view with the few operating metrics a client needs to make a decision.",
        highlights: [
            "Updates headline metrics and chart data by reporting period.",
            "Uses accessible labels and a compact layout for scan-friendly reporting.",
            "Demonstrates data visualisation without external dependencies."
        ],
        technologies: ["HTML", "CSS", "JavaScript", "SVG"],
        live: "projects/metricly/index.html",
        github: "projects/metricly/"
    },
    {
        category: "CREATIVE TOOL",
        title: "Palette Lab",
        description: "A browser-based palette explorer for quickly exploring visual directions with a client. Generate a direction, inspect each value and copy the colours into a design system or mood board.",
        highlights: [
            "Generates harmonious five-colour combinations.",
            "Copies individual hex values with clear feedback.",
            "Includes contrast-minded text treatment for swatches."
        ],
        technologies: ["HTML", "CSS", "JavaScript", "Clipboard API"],
        live: "projects/palette-lab/index.html",
        github: "projects/palette-lab/"
    }
];

const filters = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
let lastTrigger = null;

filters.forEach((filter) => {
    filter.addEventListener("click", () => {
        filters.forEach((item) => item.classList.remove("active"));
        filter.classList.add("active");

        projectCards.forEach((card) => {
            card.hidden = filter.dataset.filter !== "all" && card.dataset.category !== filter.dataset.filter;
        });
    });
});

document.querySelectorAll(".project-details").forEach((button) => {
    button.addEventListener("click", () => openProject(Number(button.dataset.project), button));
});

function openProject(index, trigger) {
    const project = projects[index];
    lastTrigger = trigger;
    document.getElementById("modalCategory").textContent = project.category;
    document.getElementById("modalTitle").textContent = project.title;
    document.getElementById("modalDescription").textContent = project.description;
    document.getElementById("modalTech").replaceChildren(...project.technologies.map((technology) => {
        const tag = document.createElement("span");
        tag.textContent = technology;
        return tag;
    }));
    document.getElementById("modalHighlights").replaceChildren(...project.highlights.map((highlight) => {
        const item = document.createElement("li");
        item.textContent = highlight;
        return item;
    }));
    document.getElementById("modalLive").href = project.live;
    document.getElementById("modalGithub").href = project.github;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalClose.focus();
}

function closeModal() {
    if (!modal.classList.contains("active")) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lastTrigger?.focus();
}

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
});
