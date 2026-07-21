// ----------------------
// Screen Navigation
// ----------------------

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
    screens.forEach(screen => screen.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// ----------------------
// Intro
// ----------------------

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
    showScreen("question");
});

// ----------------------
// No Button Logic
// ----------------------

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const messages = [
    "No ❤️",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Come on Bharti 🥺",
    "Please?",
    "Free food though 👀",
    "Don't break my heart 💔",
    "Still no?",
    "I can cook... maybe 🍳",
    "Seriously?",
    "Absolutely certain?",
    "Final answer?",
    "Click Yes 😄"
];

let clickCount = 0;
let yesScale = 1;
let noScale = 1;

noBtn.addEventListener("click", () => {

    if (clickCount < messages.length - 1) {
        clickCount++;
    }

    noBtn.innerText = messages[clickCount];

    yesScale += 0.25;
    noScale *= 0.82;

    yesBtn.style.transform = `scale(${yesScale})`;
    noBtn.style.transform = `scale(${noScale})`;

    // Make YES dominate the screen
    if (yesScale > 4.5) {
        yesBtn.style.position = "fixed";
        yesBtn.style.left = "0";
        yesBtn.style.top = "0";
        yesBtn.style.width = "100vw";
        yesBtn.style.height = "100vh";
        yesBtn.style.borderRadius = "0";
        yesBtn.style.fontSize = "48px";
        yesBtn.innerHTML = "YES 💚";
    }
});

// ----------------------
// YES Button
// ----------------------

yesBtn.addEventListener("click", () => {

    confetti({
        particleCount: 250,
        spread: 120,
        origin: {
            y: 0.6
        }
    });

    setTimeout(() => {
        showScreen("details");
    }, 1800);

});

// ----------------------
// Date Page
// ----------------------

const nextBtn = document.getElementById("nextBtn");

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const placeInput = document.getElementById("place");

let selectedDate = "";
let selectedTime = "";
let selectedPlace = "";
let selectedFood = "";

// Next button
nextBtn.addEventListener("click", () => {

    if (
        dateInput.value === "" ||
        timeInput.value === "" ||
        placeInput.value === ""
    ) {
        alert("Please complete all fields ❤️");
        return;
    }

    selectedDate = dateInput.value;
    selectedTime = timeInput.value;
    selectedPlace = placeInput.value;

    showScreen("food");

});


// ----------------------
// Food Selection
// ----------------------

const foodCards = document.querySelectorAll(".food");

foodCards.forEach(card => {

    card.addEventListener("click", () => {

        foodCards.forEach(c =>
            c.classList.remove("selected")
        );

        card.classList.add("selected");

        selectedFood = card.dataset.food;

    });

});


// ----------------------
// Final Screen
// ----------------------

const foodBtn = document.getElementById("foodBtn");
const summary = document.getElementById("summary");

foodBtn.addEventListener("click", () => {

    if (selectedFood === "") {
        alert("Choose something to eat 😄");
        return;
    }

    showScreen("final");

    summary.innerHTML = `
    ❤️ Bharti ❤️

    <br><br>

    📅 <b>${selectedDate}</b>

    <br><br>

    🕒 <b>${selectedTime}</b>

    <br><br>

    📍 <b>${selectedPlace}</b>

    <br><br>

    🍕 <b>${selectedFood}</b>

    <br><br>

    Be ready on time 😄

    <br>

    I'm coming to get you ❤️
    `;

    confetti({
        particleCount: 400,
        spread: 180,
        origin: { y: 0.6 }
    });

});


