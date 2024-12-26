const images = Array.from({ length: 22 }, (_, i) => `Images/pink-pepe${i + 1}.png`);

let links = [
  "https://www.pond0x.com/swap/solana?ref=ExampleSolanaWalletAddress",
];

const roulette = document.querySelector(".roulette");
const spinButton = document.getElementById("spinButton");
const winnerDiv = document.getElementById("winner");
const winnerImage = document.getElementById("winnerImage");
const winnerLink = document.getElementById("winnerLink");
const addLinkButton = document.getElementById("addLinkButton");
const addLinkForm = document.getElementById("addLinkForm");
const newRefLinkInput = document.getElementById("newRefLink");
const twitterHandleInput = document.getElementById("twitterHandle");
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

    // Position the images in a circle
    const angle = (index * 360) / images.length; // Angle for each image
    const radius = 120; // Radius of the circle
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    img.style.position = "absolute";
    img.style.left = `${150 + x - 25}px`; // Adjust with center and image size
    img.style.top = `${150 + y - 25}px`; // Adjust with center and image size
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.borderRadius = "50%";

    roulette.appendChild(img);
  });
}
populateRoulette();

// Spin Button Logic
spinButton.addEventListener("click", () => {
  if (spinning) return;
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

submitLinkButton.addEventListener("click", () => {
  const newRefLink = newRefLinkInput.value.trim();

  if (!newRefLink.startsWith("https://www.pond0x.com/swap/solana?ref=")) {
    alert("Invalid Ref Link");
    return;
  }

  links.push(newRefLink);
  newRefLinkInput.value = ""; // Clear input field
  addLinkForm.classList.add("hidden");
});

cancelLinkButton.addEventListener("click", () => {
  newRefLinkInput.value = ""; // Clear input field
  addLinkForm.classList.add("hidden");
});

// Close Winner Div on Ref Link Click
function closeWinner() {
  winnerDiv.classList.add("hidden");
}




















  
  
  


