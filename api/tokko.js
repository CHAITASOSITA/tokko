export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  
  if (req.method === "OPTIONS") return res.status(200).end();

  const { key, endpoint = "property", limit = 100, offset = 0 } = req.query;
  if (!key) return res.status(400).json({ error: "Falta la API key" });

  try {
    const url = `https://www.tokkobroker.com/api/v1/${endpoint}/?format=json&key=${key}&lang=es_ar&limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
