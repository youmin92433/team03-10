const banner = document.querySelector("div.banner");
const firstBanner = document.createElement("div");
const lastBanner = document.createElement("div");
const arrows = document.querySelectorAll("div.arrow");
const buttons = document.querySelectorAll(".swiper-slide");
const pauseBtn = document.querySelector(".swiper_pause_btn");

let count = 1;
let tempButton = buttons[0];
let isPaused = false;

firstBanner.innerHTML = `<img src="/images/1.png">`;
lastBanner.innerHTML = `<img src="/images/9.png">`;
banner.appendChild(firstBanner);
banner.prepend(lastBanner);

banner.style.transform = `translate(-1020px)`;

const autoSlide = () => {
    count++;
    banner.style.transform = `translate(-${1020 * count}px)`;
    banner.style.transition = `transform 1s`;

    if (count === 10) {
        setTimeout(() => {
            banner.style.transform = `translate(-1020px)`;
            banner.style.transition = `transform 0s`;
        }, 1000);
        count = 1;
    }

    updateActiveButton();
};

const updateActiveButton = () => {
    tempButton.classList.remove("swiper-slide-thumb-active");
    tempButton = buttons[count - 1];
    buttons[count - 1].classList.add("swiper-slide-thumb-active");
};

let autoSlideInterval = setInterval(autoSlide, 3000);
let arrowCheck = false;

arrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
        if (arrowCheck) return;

        arrowCheck = true;
        clearInterval(autoSlideInterval);

        const arrowType = arrow.classList.contains("left") ? "left" : "right";

        if (arrowType === "left") {
            count--;
            banner.style.transform = `translate(-${1020 * count}px)`;
            banner.style.transition = `transform 0.5s`;

            if (count === 0) {
                setTimeout(() => {
                    banner.style.transform = `translate(-13500px)`;
                    banner.style.transition = `transform 0s`;
                }, 500);
                count = 9;
            }
        } else {
            count++;
            banner.style.transform = `translate(-${1020 * count}px)`;
            banner.style.transition = `transform 0.5s`;

            if (count === 10) {
                setTimeout(() => {
                    banner.style.transform = `translate(-1020)`;
                    banner.style.transition = `transform 0s`;
                }, 500);
                count = 1;
            }
        }

        updateActiveButton();

        if (!isPaused) {
            autoSlideInterval = setInterval(autoSlide, 3000);
        }

        setTimeout(() => {
            arrowCheck = false;
        }, 500);
    });
});

let buttonCheck = false;

buttons.forEach((button, i) => {
    button.addEventListener("click", (e) => {
        if (buttonCheck) return;

        buttonCheck = true;
        clearInterval(autoSlideInterval);

        count = i + 1;
        banner.style.transform = `translate(-${1020 * count}px)`;
        banner.style.transition = `transform 0.5s`;

        updateActiveButton();

        if (!isPaused) {
            autoSlideInterval = setInterval(autoSlide, 3000);
        }

        setTimeout(() => {
            buttonCheck = false;
        }, 500);
    });
});

pauseBtn.addEventListener("click", () => {
    isPaused = !isPaused;

    if (isPaused) {
        clearInterval(autoSlideInterval);
        pauseBtn.textContent = "자동슬라이드 재생";
        pauseBtn.classList.add("paused");
    } else {
        autoSlideInterval = setInterval(autoSlide, 3000);
        pauseBtn.textContent = "자동슬라이드 멈춤";
        pauseBtn.classList.remove("paused");
    }
});

banner.addEventListener("mouseenter", () => {
    if (!isPaused) {
        clearInterval(autoSlideInterval);
    }
});

banner.addEventListener("mouseleave", () => {
    if (!isPaused) {
        autoSlideInterval = setInterval(autoSlide, 3000);
    }
});
