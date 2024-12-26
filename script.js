// Vercel API URL
const API_URL = "https://your-vercel-app.vercel.app/api/links";

// Links-Array dynamisch von der API laden
let links = [];

// Roulette-Elemente
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

// Links von der API laden
async function loadLinks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch links");
    links = await response.json();
    populateRoulette(); // Roulette aktualisieren
  } catch (error) {
    console.error("Error loading links:", error);
    alert("Failed to load links. Check the console for more details.");
  }
}

// Link zur API hinzufügen
async function addLink(newLink) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ link: newLink }),
    });
    if (!response.ok) throw new Error("Failed to add link");
    const addedLink = await response.json();
    links.push(addedLink.link);
    populateRoulette(); // Roulette aktualisieren
  } catch (error) {
    console.error("Error adding link:", error);
    alert("Failed to add link. Check the console for more details.");
  }
}

// Roulette mit Bildern befüllen
function populateRoulette() {
  roulette.innerHTML = "";
  links.forEach((link, index) => {
    const img = document.createElement("img");
    img.src = `images/pink-pepe${(index % 22) + 1}.png`; // Bilder rotieren
    const angle = (index * 360) / links.length;
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

// Spin-Button-Logik
spinButton.addEventListener("click", () => {
  if (spinning || links.length === 0) return;
  spinning = true;
  winnerDiv.classList.add("hidden");

  const winnerIndex = Math.floor(Math.random() * links.length);
  const winnerRotation = (winnerIndex * 360) / links.length;
  currentRotation += 3600 + winnerRotation;

  roulette.style.transition = "transform 3s ease-out";
  roulette.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    winnerImage.src = `images/pink-pepe${(winnerIndex % 22) + 1}.png`;
    winnerLink.href = links[winnerIndex];
    winnerDiv.classList.remove("hidden");
    spinning = false;
  }, 3000);
});

// Add-Ref-Link-Button-Logik
addLinkButton.addEventListener("click", () => addLinkForm.classList.toggle("hidden"));

submitLinkButton.addEventListener("click", async () => {
  const newRefLink = newRefLinkInput.value.trim();

  if (!newRefLink.startsWith("https://www.pond0x.com/swap/solana?ref=")) {
    alert("Invalid Referral Link");
    return;
  }

  await addLink(newRefLink); // Link zur API hinzufügen
  newRefLinkInput.value = ""; // Input-Feld leeren
  addLinkForm.classList.add("hidden");
});

cancelLinkButton.addEventListener("click", () => {
  newRefLinkInput.value = ""; // Input-Feld leeren
  addLinkForm.classList.add("hidden");
});

// Gewinner-Box schließen
function closeWinner() {
  winnerDiv.classList.add("hidden");
}

// Links laden, wenn die Seite geöffnet wird
loadLinks();





















  
  
  


