type User = {
    username: string;
    password: string;
    rememberMe: boolean;
};
const users: User[] = [
    { username: "user1", password: "1234", rememberMe: false },
    { username: "user2", password: "1234", rememberMe: true },
    { username: "user3", password: "1234", rememberMe: false },
];

const usernameInput = document.getElementById("username") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const hint = document.getElementById("hint") as HTMLParagraphElement;

document.getElementById("submitBtn")?.addEventListener("click", login);

function login() {
    const user = users.find((user) => {
        return user.username == usernameInput.value && user.password == passwordInput.value;
    });
    if (user) {
        window.open("./index.html");
    } else {
        hint.classList.remove("hidden");
        setTimeout(() => {
            hint.classList.add("hidden");
        }, 3000);
    }
}
