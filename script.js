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
    updateLinksList(); // Liste im Frontend anzeigen
  } catch (error) {
    console.error("Error fetching links:", error);
    links = [];
  }
}

fetchLinks();

// Links im Frontend anzeigen
function updateLinksList() {
  const linksContainer = document.getElementById("linksList");
  linksContainer.innerHTML = ""; // Bestehende Liste leeren
  links.forEach((link, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `#${index + 1}: ${link}`;
    linksContainer.appendChild(listItem);
  });
}

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

  const winnerIndex = Math.floor(Math.random() * links.length);
  const winnerRotation = (winnerIndex * 360) / images.length;
  currentRotation += 3600 + winnerRotation;

  roulette.style.transition = "transform 3s ease-out";
  roulette.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    winnerImage.src = images[winnerIndex % images.length];
    winnerLink.href = links[winnerIndex];
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

  if (links.includes(newRefLink)) {
    alert("This link is already in the list!");
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

    if (!response.ok) {
      throw new Error("Failed to add link");
    }

    const result = await response.json();
    links.push(result.link);
    updateLinksList(); // Liste aktualisieren
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






















  
  
  


