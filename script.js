import { fetchLinksFromAPI, addLinkToAPI } from "./LINK.js";

const images = Array.from({ length: 22 }, (_, i) => `Images/pink-pepe${i + 1}.png`);
let links = []; // Dynamische Links-Liste

// API-Verbindung herstellen und Links laden
async function initializeLinks() {
  links = await fetchLinksFromAPI();
  console.log("Abruf der Links abgeschlossen:", links);
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
    alert("Keine Referral-Links verfügbar!");
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
    winnerLink.href = links[winnerIndex].ref_link;
    winnerLink.textContent = "Winning Referral Link";
    winnerDiv.classList.remove("hidden");
    spinning = false;
  }, 3000);
});

// Add Ref Link Logic
addLinkButton.addEventListener("click", () => addLinkForm.classList.toggle("hidden"));

submitLinkButton.addEventListener("click", async () => {
  const newRefLink = newRefLinkInput.value.trim();

  // Validierung des Links
  if (!newRefLink.startsWith("https://www.pond0x.com/swap/solana?ref=")) {
    alert("Ungültiger Ref Link");
    return;
  }

  const result = await addLinkToAPI(newRefLink);
  if (result.error) {
    alert(result.error);
  } else {
    links.push(result);
    console.log("Aktualisierte Links:", links);
    alert("Link erfolgreich hinzugefügt!");
  }

  newRefLinkInput.value = "";
  addLinkForm.classList.add("hidden");
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
  const playButton = document.getElementById("playButton");

  video.muted = false;
  video.play().catch((error) => {
    console.warn("Autoplay failed:", error);
    video.muted = true;
  });

  playButton.addEventListener("click", () => {
    video.muted = !video.muted;
    video.play();
  });
});

// Initiale Links laden
initializeLinks();














  
  
  


