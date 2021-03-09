const imgwrapper = document.querySelector(".imgwrapper");
const leftcolumn = document.querySelector(".left-column");
const rightcolumn = document.querySelector(".right-column");
const slider = document.querySelector(".slider");
const tl = new TimelineMax();

tl.fromTo(
  imgwrapper,
  1,
  { height: "0%" },
  { height: "80%", ease: Power2.easeInOut }
)
  .fromTo(
    imgwrapper,
    1.2,
    { width: "100%" },
    { width: "80%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1.2,
    { width: "0%" },
    { width: "100%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(leftcolumn, 0.5, { opacity: 0 }, { opacity: 1 }, "-=0.5")
  .fromTo(rightcolumn, 0.5, { opacity: 0 }, { opacity: 1 }, "-=0.5");

const sections = document.querySelectorAll("section");
const bubble = document.querySelector(".bubble");
const gradients = ["white", "yellow", "white", "lightblue"];

const options = {
  threshold: 0.7,
};

let observer = new IntersectionObserver(navCheck, options);

function navCheck(entries) {
  entries.forEach((entry) => {
    const className = entry.target.className;
    const activeAnchor = document.querySelector(`[data-page=${className}]`);
    const gradientIndex = entry.target.getAttribute("data-index");
    const coords = activeAnchor.getBoundingClientRect();
    const directions = {
      height: coords.height,
      width: coords.width,
      top: coords.top,
      left: coords.left,
    };
    if (entry.isIntersecting) {
      bubble.style.setProperty("left", `${directions.left}px`);
      bubble.style.setProperty("width", `${directions.width}px`);
      bubble.style.setProperty("height", `2px`);
      bubble.style.setProperty("top", `${directions.top}px`);
      bubble.style.background = gradients[gradientIndex];
    }
  });
}
sections.forEach((section) => {
  observer.observe(section);
});
