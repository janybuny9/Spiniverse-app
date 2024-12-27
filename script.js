const BASE_URL = "https://janybuny9.pythonanywhere.com";

// API-Verbindung herstellen und Links laden
async function fetchLinks() {
  try {
    const response = await fetch(`${BASE_URL}/get_refs`);
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

// Link hinzufügen
submitLinkButton.addEventListener("click", async () => {
  const newRefLink = newRefLinkInput.value.trim();

  const normalizedLink = newRefLink.replace("https://pond0x.com/", "https://www.pond0x.com/");
  if (!normalizedLink.startsWith("https://www.pond0x.com/swap/solana?ref=")) {
    alert("Invalid Ref Link");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/add_ref`, {
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
    links.push(result.link);
    logLinks();
    newRefLinkInput.value = "";
    addLinkForm.classList.add("hidden");
    alert("Link successfully added!");
  } catch (error) {
    console.error("Error adding link:", error);
    alert("Failed to add link. Please try again.");
  }
});

















  
  
  


