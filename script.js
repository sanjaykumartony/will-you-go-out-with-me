/* =====================================================
   SCREENS
===================================================== */

const screens = document.querySelectorAll(".screen");

const loading = document.getElementById("loading");
const invite = document.getElementById("invite");
const intro = document.getElementById("intro");
const proposal = document.getElementById("proposal");
const planner = document.getElementById("planner");
const food = document.getElementById("food");
const final = document.getElementById("final");

function showScreen(screen){

    screens.forEach(s=>{

        s.classList.remove("active");

    });

    screen.classList.add("active");

}

/* =====================================================
   LOADING
===================================================== */

const progressBar = document.getElementById("progressBar");

let progress = 0;

const loadingAnimation = setInterval(()=>{

    progress += 2;

    progressBar.style.width = progress + "%";

    if(progress>=100){

        clearInterval(loadingAnimation);

        setTimeout(()=>{

            showScreen(invite);

        },300);

    }

},30);

/* =====================================================
   INVITATION FLOW
===================================================== */

document
.getElementById("openInvitation")
.onclick=()=>{

    showScreen(intro);

};

document
.getElementById("continueBtn")
.onclick=()=>{

    showScreen(proposal);

};

/* =====================================================
   FUNNY NO BUTTON
===================================================== */

const noBtn = document.getElementById("noBtn");

const message = document.getElementById("message");

const replies=[

    "Please? 🥺",

    "Think again 😄",

    "Wrong button 😂",

    "Not accepting that 😌",

    "Green button looks nicer ❤️",

    "I'll keep asking 😌",

    "Come on 😄"

];

let replyIndex = 0;

noBtn.onclick=()=>{

    message.innerText = replies[replyIndex];

    replyIndex++;

    if(replyIndex>=replies.length){

        replyIndex=0;

    }

    const x = Math.random()*180-90;

    const y = Math.random()*180-90;

    noBtn.style.transform=

    `translate(${x}px,${y}px)`;

};

/* =====================================================
   YES
===================================================== */

document
.getElementById("yesBtn")
.onclick=()=>{

    confetti({

        particleCount:80,

        spread:90,

        origin:{y:.6}

    });

    setTimeout(()=>{

        showScreen(planner);

    },300);

};

/* =====================================================
   CUSTOM PLACE
===================================================== */

const place = document.getElementById("place");

const customPlace = document.getElementById("customPlace");

place.onchange=()=>{

    if(place.value==="You suggest..."){

        customPlace.style.display="block";

    }

    else{

        customPlace.style.display="none";

        customPlace.value="";

    }

};

/* =====================================================
   FOOD OPTIONS
===================================================== */

const foodGrid = document.getElementById("foodGrid");

const foodOptions=[

    ["🍕","Pizza"],

    ["🍔","Burger"],

    ["🍝","Pasta"],

    ["🍛","Biryani"],

    ["🍜","Ramen"],

    ["☕","Coffee"],

    ["🍨","Ice Cream"],

    ["✨","You choose..."]

];

let selectedFood="";

const customFood=document.getElementById("customFood");

foodOptions.forEach(item=>{

    const card=document.createElement("div");

    card.className="foodCard";

    card.innerHTML=

    `<div>${item[0]}</div>

     <span>${item[1]}</span>`;

    card.onclick=()=>{

        document

        .querySelectorAll(".foodCard")

        .forEach(c=>{

            c.classList.remove("selected");

        });

        card.classList.add("selected");

        if(item[1]==="You choose..."){

            customFood.style.display="block";

            selectedFood="";

        }

        else{

            customFood.style.display="none";

            customFood.value="";

            selectedFood=item[1];

        }

    };

    foodGrid.appendChild(card);

});

/* =====================================================
   NEXT BUTTON
===================================================== */

document
.getElementById("plannerNext")
.onclick=()=>{

    const date=document.getElementById("date").value;

    const time=document.getElementById("time").value;

    if(date===""){

        alert("Choose a date 😊");

        return;

    }

    if(time===""){

        alert("Choose a time 😊");

        return;

    }

    if(place.value===""){

        alert("Choose a place 😊");

        return;

    }

    if(

        place.value==="You suggest..."

        &&

        customPlace.value.trim()===""

    ){

        alert("Tell me your place 😊");

        return;

    }

    showScreen(food);

};

/* =====================================================
   FINISH
===================================================== */

// Replace with YOUR Apps Script URL
const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzqW0kJwSTBNmNFHzLNSHoRldp7A7tz2fej4nLbLYVzesg0T8Q0wXeAXhwXWjve9N6tNw/exec";

document
.getElementById("finishBtn")
.onclick = async ()=>{

    if(selectedFood===""){

        if(customFood.style.display==="block"){

            if(customFood.value.trim()===""){

                alert("Tell me what you'd like to eat 😊");

                return;

            }

            selectedFood = customFood.value.trim();

        }

        else{

            alert("Please choose a food 😊");

            return;

        }

    }

    const selectedPlace =
        place.value==="You suggest..."
        ? customPlace.value.trim()
        : place.value;

    const selectedDate =
        document.getElementById("date").value;

    const selectedTime =
        document.getElementById("time").value;

    const summary =
        document.getElementById("summary");

    summary.innerHTML = `

        <p>📅 <strong>Date:</strong> ${selectedDate}</p>

        <p>🕒 <strong>Time:</strong> ${selectedTime}</p>

        <p>📍 <strong>Place:</strong> ${selectedPlace}</p>

        <p>🍽️ <strong>Food:</strong> ${selectedFood}</p>

    `;

    confetti({

        particleCount:180,

        spread:120,

        origin:{y:.6}

    });

    try{

        await fetch(SCRIPT_URL,{

            method:"POST",

            mode:"no-cors",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                date:selectedDate,

                time:selectedTime,

                place:selectedPlace,

                food:selectedFood

            })

        });

    }

    catch(error){

        console.log(error);

    }

    showScreen(final);

};

/* =====================================================
   END
===================================================== */