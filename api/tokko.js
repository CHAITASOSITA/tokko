export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { key } = req.query;
  if (!key) return res.status(400).json({ error: "Falta la API key" });

  try {
    const url = `https://www.tokkobroker.com/api/v1/property/?format=json&key=${key}&lang=es_ar&limit=100`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
