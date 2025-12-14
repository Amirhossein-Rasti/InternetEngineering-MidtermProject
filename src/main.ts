import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";

document.addEventListener("DOMContentLoaded", () => {
    const slider1 = new KeenSlider(
        "#keen-slider1",
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

    var slider2 = new KeenSlider("#keen-slider2", {
        loop: true,
        mode: "free-snap",
        breakpoints: {
            "(min-width: 400px)": {
                slides: {
                    perView: 1,
                    spacing: 15,
                },
            },
            "(min-width: 600px)": {
                slides: {
                    perView: 2,
                    spacing: 15,
                },
            },
            "(min-width: 1300px)": {
                slides: {
                    perView: 3,
                    spacing: 15,
                },
            },
        },
    }); //Second slider

    //statistics
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
            threshold: 0.7,
        }
    );
    observer.observe(counterSection!);
    
    //Initialize input
    const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement
    searchBtn.setAttribute("disabled", "false")
    searchBtn.classList.add("cursor-not-allowed");
    searchBtn.classList.remove("cursor-pointer");
});

document.getElementById("submitBtn")?.addEventListener("click", () => {
    onSubmit();
});

document.getElementById("search")?.addEventListener("keyup", (event: Event) => {
    const searchBtn: HTMLButtonElement = document.getElementById("searchBtn") as HTMLButtonElement;
    const inputValue = (event.target as HTMLInputElement).value.trim();
    if (inputValue.length == 0) {
        searchBtn.setAttribute("disabled", "true");
        searchBtn.classList.remove("cursor-pointer");
        searchBtn.classList.add("cursor-not-allowed");
    } else {
        searchBtn.setAttribute("disabled", "false");
        searchBtn.classList.remove("cursor-not-allowed");
        searchBtn.classList.add("cursor-pointer");
    }
});
document.getElementById('loginPageBtn')?.addEventListener('click',navigationToLoginForm)

function onSubmit() {
    const firstNameInput: HTMLInputElement = document.getElementById("firstName") as HTMLInputElement;
    const lastNameInput: HTMLInputElement = document.getElementById("lastName") as HTMLInputElement;
    const phoneNumberInput: HTMLInputElement = document.getElementById("phoneNumber") as HTMLInputElement;
    const request: HTMLTextAreaElement = document.getElementById("request") as HTMLTextAreaElement;
    //Validate join form inputs
    if (firstNameInput.value.length == 0) {
        showHint("فیلد نام اجباری است!");
        return;
    }
    if (/\d/.test(firstNameInput.value)) {
        showHint("نام واردشده نامعتبر است!");
        return;
    }
    if (firstNameInput.value.length > 21) {
        showHint("نام واردشده باید کمتر از ۲۱ کاراکتر باشد!");
        return;
    }
    if (lastNameInput.value.length == 0) {
        showHint("فیلد  نام خانوادگی اجباری است!");
        return;
    }
    if (/\d/.test(lastNameInput.value)) {
        showHint(" نام خانوادگی واردشده نامعتبر است!");
        return;
    }
    if (lastNameInput.value.length > 21) {
        showHint("نام خانوادگی واردشده باید کمتر از ۲۱ کاراکتر باشد!");
        return;
    }
    if (!/^(?:\+98|0)?9[0-9]{9}$/.test(phoneNumberInput.value)) {
        showHint(" شماره تلفن واردشده نامعتبر است!");
        return;
    }
    if (request.value.length < 10) {
        showHint("متن درخواست واردشده باید بیشتر از ۱۰ کاراکتر باشد!");
        return;
    }
    const submitBtn = document.getElementById("submitBtn")!;
    submitBtn.innerText = "ارسال شد";
    submitBtn.style.background = "oklch(70.4% 0.14 182.503)";
    submitBtn.setAttribute("disabled", "true");
    setTimeout(() => {
        submitBtn.innerText = "ثبت درخواست";
        submitBtn.style.background = "oklch(58.8% 0.158 241.966)";
        submitBtn.setAttribute("disabled", "false");
    }, 3000);
    clearForm();
}

function showHint(hintMessage: string) {
    const hintElement = document.getElementById("hint") as HTMLInputElement;
    hintElement.innerHTML = "* " + hintMessage;
    setTimeout(() => {
        hintElement.innerHTML = "";
    }, 3000);
}

function clearForm() {
    const firstNameInput: HTMLInputElement = document.getElementById("firstName") as HTMLInputElement;
    const lastNameInput: HTMLInputElement = document.getElementById("lastName") as HTMLInputElement;
    const phoneNumberInput: HTMLInputElement = document.getElementById("phoneNumber") as HTMLInputElement;
    const emailInput: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
    const officeInput: HTMLInputElement = document.getElementById("office") as HTMLInputElement;
    const request: HTMLTextAreaElement = document.getElementById("request") as HTMLTextAreaElement;

    firstNameInput.value = "";
    lastNameInput.value = "";
    phoneNumberInput.value = "";
    emailInput.value = "";
    officeInput.value = "";
    request.value = "";
}

function navigationToLoginForm(){
    window.open('./../login.html');
}