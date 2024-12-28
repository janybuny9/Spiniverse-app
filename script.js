const images = Array.from({ length: 22 }, (_, i) => `Images/pink-pepe${i + 1}.png`);
let links = [];

// Establish API connection and load links
async function fetchLinks() {
  try {
    const response = await fetch("https://janybuny9.pythonanywhere.com/get_refs");
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

// Update links list in frontend
function logLinks() {
  console.log("Links in der Liste:", links);
}

// Setup for the roulette wheel
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

// Populate the roulette wheel with images
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

// Logic for the spin button
spinButton.addEventListener("click", () => {
  if (spinning || links.length === 0) {
    alert("No referral links available to spin!");
    return;
  }
  spinning = true;
  winnerDiv.classList.add("hidden");

  // Randomly select a link
  const winnerIndex = Math.floor(Math.random() * links.length);
  const winnerRotation = (winnerIndex * 360) / images.length;
  currentRotation += 3600 + winnerRotation;

  roulette.style.transition = "transform 3s ease-out";
  roulette.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    winnerImage.src = images[winnerIndex % images.length];
    winnerLink.href = links[winnerIndex].ref_link; // Use the link from the database
    winnerLink.textContent = "Winning Referral Link"; // Text for the winning link
    winnerDiv.classList.remove("hidden");
    spinning = false;
  }, 3000);
});

// Add Ref Link Logic
addLinkButton.addEventListener("click", () => addLinkForm.classList.toggle("hidden"));

submitLinkButton.addEventListener("click", async () => {
  const newRefLink = newRefLinkInput.value.trim();

  // Normalize the link: Always start with "www."
  const normalizedLink = newRefLink.replace("https://pond0x.com/", "https://www.pond0x.com/");
  if (!normalizedLink.startsWith("https://www.pond0x.com/swap/solana?ref=")) {
    alert("Invalid Ref Link");
    return;
  }

  try {
    const response = await fetch("https://janybuny9.pythonanywhere.com/add_ref", { // Replace with your Flask URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ref_link: normalizedLink }),
    });

    if (response.status === 409) {
      alert("This link already exists!");
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to add link");
    }

    const result = await response.json();
    links.push({ ref_link: normalizedLink }); // Add only the normalized link
    logLinks(); // Display links in the console
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

// Close Winner Div on Ref Link Click
function closeWinner() {
  winnerDiv.classList.add("hidden");
}

// Video sound control
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("backgroundVideo");
  const playButton = document.getElementById("playButton");

  // Automatically enable sound
  video.muted = false;
  video.play().catch((error) => {
    console.warn("Autoplay failed:", error);
    video.muted = true; // If autoplay fails, keep the video muted.
  });

  // Button-Logic
  playButton.addEventListener("click", () => {
    video.muted = !video.muted; // Toggle sound on/off
    video.play(); // Ensure the video keeps playing
  });
});

// Load initial links
fetchLinks();






















  
  
  


