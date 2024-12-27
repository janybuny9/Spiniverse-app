// API für das Abrufen und Hinzufügen von Links
export async function fetchLinksFromAPI() {
  try {
    const response = await fetch("https://janybuny9.pythonanywhere.com/get_refs");
    if (!response.ok) throw new Error("Fehler beim Abrufen der Links");
    return await response.json();
  } catch (error) {
    console.error("Error fetching links:", error);
    return [];
  }
}

export async function addLinkToAPI(newLink) {
  try {
    const response = await fetch("https://janybuny9.pythonanywhere.com/add_ref", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ref_link: newLink }),
    });

    if (response.status === 409) return { error: "Link existiert bereits" };
    if (!response.ok) throw new Error("Fehler beim Hinzufügen des Links");
    return await response.json();
  } catch (error) {
    console.error("Error adding link:", error);
    return { error: "Fehler beim Hinzufügen des Links" };
  }
}
