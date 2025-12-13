import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";

document.addEventListener("DOMContentLoaded", () => {
    const slider = new KeenSlider(
        "#my-keen-slider",
        {
            loop: true,
        },
        [
            (slider) => {
                let timeout = 3000;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 2000);
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on("dragStarted", clearNextTimeout);
                slider.on("animationEnded", nextTimeout);
                slider.on("updated", nextTimeout);
            },
        ]
    ); //First slider

    const counterSection = document.getElementById("counterSection");
    const workHours = document.getElementById("work-hours");
    const successfulProject = document.getElementById("successful-project");
    const satisfiedClient = document.getElementById("satisfied-client");
    let counted = false; //For controlling that incrimination occurs one time
    const observer = new IntersectionObserver( // increment smoothly counter of statistics
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !counted) {
                    const interval1 = setInterval(() => {
                        workHours!.innerHTML = `${+workHours!.innerHTML + 1}`;
                        if (+workHours!.innerHTML > 406) {
                            clearInterval(interval1);
                        }
                    }, 2);

                    const interval2 = setInterval(() => {
                        successfulProject!.innerHTML = `${+successfulProject!.innerHTML + 1}`;
                        if (+successfulProject!.innerHTML > 134) {
                            clearInterval(interval2);
                        }
                    }, 6);

                    const interval3 = setInterval(() => {
                        satisfiedClient!.innerHTML = `${+satisfiedClient!.innerHTML + 1}`;
                        if (+satisfiedClient!.innerHTML > 203) {
                            clearInterval(interval3);
                        }
                    }, 5);
                    counted = true;
                }
            });
        },
        {
            threshold: 0.7
        }
    );
    observer.observe(counterSection!);
});
