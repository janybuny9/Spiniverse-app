const images = Array.from({ length: 22 }, (_, i) => `Images/pink-pepe${i + 1}.png`);
let links = [];

// API-Verbindung herstellen und Links laden
async function fetchLinks() {
  try {
    const response = await fetch("https://spiniverse-app.vercel.app/api/links");
    if (!response.ok) {
      throw new Error("Failed to fetch links");
    }
    links = await response.json();
    console.log("Aktuelle Links:", links);
  } catch (error) {
    console.error("Error fetching links:", error);
    links = [];
  }
}

// Links-Liste im Frontend aktualisieren (optional in der Konsole sichtbar)
function logLinks() {
  console.log("Links in der Liste:", links);
}

// Roulette-Setup
const roulette = document.querySelector(".roulette");
const spinButton = document.getElementById("spinButton");
const winnerDiv = document.getElementById("winner");
const winnerImage = document.getElementById("winnerImage");
const winnerLink = document.getElementById("winnerLink");
const addLinkButton = document.getElementById("addLinkButton");
const addLinkForm = document.getElementById("addLinkForm");
const newRefLinkInput = document.getElementById("newRefLink");
const submitLinkButton = document.getElementById("submitLinkButton");
const cancelLinkButton = document.getElementById("cancelLinkButton");

let spinning = false;
let currentRotation = 0;

// Populate Roulette
function populateRoulette() {
  roulette.innerHTML = "";
  images.forEach((imgSrc, index) => {
    const img = document.createElement("img");
    img.src = imgSrc;

    const angle = (index * 360) / images.length;
    const radius = 120;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    img.style.position = "absolute";
    img.style.left = `${150 + x - 25}px`;
    img.style.top = `${150 + y - 25}px`;
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.borderRadius = "50%";

    roulette.appendChild(img);
  });
}
populateRoulette();

// Spin Button Logic
spinButton.addEventListener("click", () => {
  if (spinning || links.length === 0) {
    alert("No referral links available to spin!");
    return;
  }
  spinning = true;
  winnerDiv.classList.add("hidden");

  // Zufälligen Link auswählen
  const winnerIndex = Math.floor(Math.random() * links.length);
  const winnerRotation = (winnerIndex * 360) / images.length;
  currentRotation += 3600 + winnerRotation;

  roulette.style.transition = "transform 3s ease-out";
  roulette.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    winnerImage.src = images[winnerIndex % images.length];
    winnerLink.href = links[winnerIndex];
    winnerLink.textContent = "Winning Referral Link"; // Text für den Gewinnerlink
    winnerDiv.classList.remove("hidden");
    spinning = false;
  }, 3000);
});

// Add Ref Link Logic
addLinkButton.addEventListener("click", () => addLinkForm.classList.toggle("hidden"));

submitLinkButton.addEventListener("click", async () => {
  const newRefLink = newRefLinkInput.value.trim();

  if (!newRefLink.startsWith("https://www.pond0x.com/swap/solana?ref=")) {
    alert("Invalid Ref Link");
    return;
  }

  try {
    const response = await fetch("https://spiniverse-app.vercel.app/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: newRefLink }),
    });

    if (response.status === 409) {
      alert("This link already exists!");
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to add link");
    }

    const result = await response.json();
    links.push(result.link);
    logLinks(); // Links in der Konsole anzeigen
    newRefLinkInput.value = "";
    addLinkForm.classList.add("hidden");
    alert("Link successfully added!");
  } catch (error) {
    console.error("Error adding link:", error);
    alert("Failed to add link. Please try again.");
  }
});

cancelLinkButton.addEventListener("click", () => {
  newRefLinkInput.value = "";
  addLinkForm.classList.add("hidden");
});

// Close Winner Div
function closeWinner() {
  winnerDiv.classList.add("hidden");
}

// Video-Ton-Steuerung
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("backgroundVideo");
  const playButton = document.createElement("button");

  playButton.id = "playButton";
  playButton.textContent = "🔊 Mute/Unmute";
  document.body.appendChild(playButton);

  // Button positionieren (oben rechts)
  playButton.style.position = "absolute";
  playButton.style.top = "10px";
  playButton.style.right = "10px";
  playButton.style.zIndex = "10";
  playButton.style.padding = "10px";
  playButton.style.background = "#ff00ff";
  playButton.style.color = "white";
  playButton.style.border = "none";
  playButton.style.borderRadius = "5px";
  playButton.style.cursor = "pointer";

  // Automatisch Ton aktivieren
  video.muted = false;
  video.play().catch((error) => {
    console.warn("Autoplay failed:", error);
    video.muted = true; // Falls Autoplay scheitert, bleibt das Video stumm.
  });

  // Button-Logik
  playButton.addEventListener("click", () => {
    if (video.muted) {
      video.muted = false;
      video.play();
    } else {
      video.muted = true;
    }
  });
});

// Initiale Links laden
fetchLinks();





















  
  
  


