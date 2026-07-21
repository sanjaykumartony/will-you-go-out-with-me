// ----------------------
// Elements
// ----------------------

const screens = document.querySelectorAll(".screen");

const loading = document.getElementById("loading");
const welcome = document.getElementById("welcome");
const intro = document.getElementById("intro");
const question = document.getElementById("question");
const planner = document.getElementById("planner");
const food = document.getElementById("food");
const finalScreen = document.getElementById("final");

const progressBar = document.getElementById("progressBar");
const loadingPercent = document.getElementById("loadingPercent");

const openBtn = document.getElementById("openBtn");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

const plannerNext = document.getElementById("plannerNext");
const foodNext = document.getElementById("foodNext");

// ----------------------
// Summary
// ----------------------

const summaryDate = document.getElementById("summaryDate");
const summaryTime = document.getElementById("summaryTime");
const summaryPlace = document.getElementById("summaryPlace");
const summaryFood = document.getElementById("summaryFood");

// ----------------------
// Data
// ----------------------

let selectedPlace = "";
let selectedFood = "";

const noMessages = [
    "Really sure?",
    "Think again 😄",
    "I'll let you choose the place.",
    "Free food though 👀",
    "You won't even try?",
    "Still no?",
    "Come on...",
    "This button seems lonely.",
    "I'm running out of ideas 😂",
    "Last chance!",
    "Okay... maybe?",
    "You know the green button is nicer 😌"
];

let noIndex = 0;
let yesScale = 1;

// ----------------------
// Helper
// ----------------------

function showScreen(screen){

    screens.forEach(s=>{
        s.classList.remove("active");
    });

    screen.classList.add("active");

}

// ----------------------
// Loading
// ----------------------

let progress = 0;

const loadingInterval = setInterval(()=>{

    progress++;

    progressBar.style.width = progress + "%";
    loadingPercent.innerText = progress + "%";

    if(progress >= 100){

        clearInterval(loadingInterval);

        setTimeout(()=>{

            showScreen(welcome);

        },400);

    }

},20);

// ----------------------
// Welcome
// ----------------------

openBtn.onclick = ()=>{

    showScreen(intro);

};

// ----------------------
// Intro
// ----------------------

intro.onclick = ()=>{

    showScreen(question);

};

// ----------------------
// NO BUTTON
// ----------------------

noBtn.onclick = ()=>{

    message.innerText = noMessages[noIndex % noMessages.length];

    noIndex++;

    yesScale += 0.15;

    yesBtn.style.transform =
        `scale(${yesScale})`;

    noBtn.style.transform =
        `scale(${Math.max(0.45,1-noIndex*0.05)})`;

};

// ----------------------
// YES BUTTON
// ----------------------

yesBtn.onclick = ()=>{

    confetti({

        particleCount:220,
        spread:90,
        origin:{y:.6}

    });

    setTimeout(()=>{

        showScreen(planner);

    },900);

};

// ----------------------
// Places
// ----------------------

const placeCards =
document.querySelectorAll(".placeCard");

placeCards.forEach(card=>{

    card.onclick=()=>{

        placeCards.forEach(c=>{

            c.classList.remove("selected");

        });

        card.classList.add("selected");

        selectedPlace = card.innerText;

    };

});

// ----------------------
// Planner
// ----------------------

plannerNext.onclick=()=>{

    const date =
    document.getElementById("date").value;

    const time =
    document.getElementById("time").value;

    if(date==="" || time===""){

        alert("Please select date and time.");

        return;

    }

    if(selectedPlace===""){

        alert("Please choose a place.");

        return;

    }

    showScreen(food);

};

// ----------------------
// Food
// ----------------------

const foodCards =
document.querySelectorAll(".foodCard");

foodCards.forEach(card=>{

    card.onclick=()=>{

        foodCards.forEach(c=>{

            c.classList.remove("selected");

        });

        card.classList.add("selected");

        selectedFood =
        card.innerText.replace(/\n/g," ");

    };

});

// ----------------------
// Finish
// ----------------------

foodNext.onclick=()=>{

    if(selectedFood===""){

        alert("Pick something to eat 😄");

        return;

    }

    summaryDate.innerText =
        document.getElementById("date").value;

    summaryTime.innerText =
        document.getElementById("time").value;

    summaryPlace.innerText =
        selectedPlace;

    summaryFood.innerText =
        selectedFood;

    confetti({

        particleCount:350,
        spread:140

    });

    showScreen(finalScreen);

};