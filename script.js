// ==============================
// Screens
// ==============================

const screens = document.querySelectorAll(".screen");

const loadingScreen = document.getElementById("loadingScreen");
const inviteScreen = document.getElementById("inviteScreen");
const introScreen = document.getElementById("introScreen");
const proposalScreen = document.getElementById("proposalScreen");
const plannerScreen = document.getElementById("plannerScreen");
const foodScreen = document.getElementById("foodScreen");
const finalScreen = document.getElementById("finalScreen");

function showScreen(screen){

    screens.forEach(s=>s.classList.remove("active"));

    screen.classList.add("active");

}



// ==============================
// Loading
// ==============================

const progressBar = document.getElementById("progressBar");

let progress = 0;

const loader = setInterval(()=>{

    progress += 2;

    progressBar.style.width = progress + "%";

    if(progress>=100){

        clearInterval(loader);

        showScreen(inviteScreen);

    }

},30);



// ==============================
// Buttons
// ==============================

document.getElementById("openInvite").onclick=()=>{

    showScreen(introScreen);

};

document.getElementById("continueBtn").onclick=()=>{

    showScreen(proposalScreen);

};



// ==============================
// Funny NO
// ==============================

const noBtn=document.getElementById("noBtn");

const msg=document.getElementById("message");

const funnyReplies=[

    "Please? 🥺",
    "Think again 😄",
    "Wrong button 😂",
    "I'm not accepting that 😌",
    "Try the green one ❤️"

];

let replyIndex=0;

noBtn.onclick=()=>{

    msg.innerText=funnyReplies[replyIndex];

    replyIndex=(replyIndex+1)%funnyReplies.length;

    const x=Math.random()*180-90;

    const y=Math.random()*180-90;

    noBtn.style.transform=`translate(${x}px,${y}px)`;

};



// ==============================
// YES
// ==============================

document.getElementById("yesBtn").onclick=()=>{

    confetti({

        particleCount:80,

        spread:90,

        origin:{y:.6}

    });

    showScreen(plannerScreen);

};



// ==============================
// Planner
// ==============================

const place=document.getElementById("place");

const customPlace=document.getElementById("customPlace");

place.onchange=()=>{

    if(place.value==="You choose..."){

        customPlace.style.display="block";

    }else{

        customPlace.style.display="none";

    }

};



// ==============================
// Food
// ==============================

const foods=[

    ["🍕","Pizza"],
    ["🍝","Pasta"],
    ["🍛","Biryani"],
    ["☕","Coffee"],
    ["🍣","Sushi"],
    ["🥞","Pancakes"],
    ["🍜","Ramen"],
    ["✨","You choose..."]

];

const foodGrid=document.getElementById("foodGrid");

foods.forEach(f=>{

    const div=document.createElement("div");

    div.className="foodCard";

    div.innerHTML=`${f[0]}<span>${f[1]}</span>`;

    foodGrid.appendChild(div);

});

const customFood=document.getElementById("customFood");

let selectedFood="";

document.querySelectorAll(".foodCard").forEach(card=>{

    card.onclick=()=>{

        document.querySelectorAll(".foodCard").forEach(c=>c.classList.remove("selected"));

        card.classList.add("selected");

        const value=card.innerText.trim();

        if(value.includes("You choose")){

            customFood.style.display="block";

            selectedFood="";

        }

        else{

            customFood.style.display="none";

            selectedFood=value;

        }

    };

});



// ==============================
// Planner Next
// ==============================

document.getElementById("plannerNext").onclick=()=>{

    if(date.value===""){

        alert("Choose a date 😊");

        return;

    }

    if(time.value===""){

        alert("Choose a time 😊");

        return;

    }

    if(place.value===""){

        alert("Choose a place 😊");

        return;

    }

    if(place.value==="You choose..." && customPlace.value.trim()===""){

        alert("Tell me the place 😊");

        return;

    }

    showScreen(foodScreen);

};



// ==============================
// Finish
// ==============================

document.getElementById("foodNext").onclick=()=>{

    if(selectedFood===""){

        if(customFood.style.display==="block"){

            if(customFood.value.trim()===""){

                alert("Tell me what you're craving 😊");

                return;

            }

            selectedFood=customFood.value.trim();

        }

        else{

            alert("Choose something to eat 😊");

            return;

        }

    }

    const summary=document.getElementById("summary");

    summary.innerHTML=`

        <p>📅 ${date.value}</p>

        <p>🕒 ${time.value}</p>

        <p>📍 ${place.value==="You choose..."?customPlace.value:place.value}</p>

        <p>🍽 ${selectedFood}</p>

    `;

    confetti({

        particleCount:150,

        spread:120

    });

    showScreen(finalScreen);

};