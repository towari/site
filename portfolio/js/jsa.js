document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("trbt").addEventListener("click", Tweet, false);
});

function Tweet() {
    window.open("https://twitter.com/intent/tweet?hashtags=TowariPunch&original_referer=http%3A%2F%2Fyata10.web.fc2.com%2F&text=とわりの力ではダンボールをへこませるのがやっとだった")
}