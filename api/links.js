} else if (req.method === "POST") {
    const { link } = req.body;

    // Normalisieren des Links: Immer mit "www."
    const normalizedLink = link.replace("https://pond0x.com/", "https://www.pond0x.com/");
    if (!normalizedLink.startsWith("https://www.pond0x.com/swap/solana?ref=")) {
    // Validierung des Links
    if (!link || (!link.startsWith("https://www.pond0x.com/swap/solana?ref=") &&
        !link.startsWith("https://pond0x.com/swap/solana?ref="))) {
      res.status(400).json({ error: "Ungültiger Link" });
      return;
    }

    // Standardisiere Link (füge 'www.' hinzu, falls nicht vorhanden)
    const standardizedLink = link.startsWith("https://www.")
      ? link
      : link.replace("https://", "https://www.");
    // Überprüfung auf Duplikate
    if (links.includes(normalizedLink)) {
    if (links.includes(standardizedLink)) {
      res.status(409).json({ error: "Link existiert bereits" });
      return;
    }

    // Hinzufügen des Links
    links.push(normalizedLink);
    res.status(201).json({ link: normalizedLink });
    links.push(standardizedLink);
    res.status(201).json({ link: standardizedLink });
  } else {
    res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
    res.status(405).end(`Methode ${req.method} ist nicht erlaubt`);
  }
}
