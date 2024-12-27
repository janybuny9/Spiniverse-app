let links = []; // Temporär, bis eine Datenbank angebunden wird

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "GET") {
    res.status(200).json(links);
  } else if (req.method === "POST") {
    const { link } = req.body;
    if (!link || !link.startsWith("https://www.pond0x.com/swap/solana?ref=")) {
      res.status(400).json({ error: "Invalid link" });
      return;
    }
    links.push(link);
    res.status(201).json({ link });
  } else {
    res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

