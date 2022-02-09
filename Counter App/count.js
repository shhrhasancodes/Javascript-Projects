let btn = document.querySelector(".button2"),
    rst = document.querySelector(".button3"),
    content = document.querySelector(".button1");

let score = 0;

content.textContent = score;

btn.addEventListener("click", () => {
    score++;
    content.textContent = score;
});

rst.addEventListener("click", () => {
    score = 0;
    content.textContent = score;
});
