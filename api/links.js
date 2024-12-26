let links = [
  "https://www.pond0x.com/swap/solana?ref=ExampleRef1",
  "https://www.pond0x.com/swap/solana?ref=ExampleRef2",
];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ links });
  }

  if (req.method === "POST") {
    const { link } = req.body;

    const validPrefix = "https://www.pond0x.com/swap/solana?ref=";
    if (!link.startsWith(validPrefix)) {
      return res.status(400).json({ message: "Invalid link format." });
    }

    if (links.includes(link)) {
      return res.status(400).json({ message: "Link already exists." });
    }

    links.push(link);
    return res.status(200).json({ message: "Link added successfully.", links });
  }

  return res.status(405).json({ message: "Method not allowed." });
}
