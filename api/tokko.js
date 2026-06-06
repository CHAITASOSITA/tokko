export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  
  if (req.method === "OPTIONS") return res.status(200).end();

  const { key, endpoint = "property" } = req.query;
  if (!key) return res.status(400).json({ error: "Falta la API key" });

  try {
    let all = [];
    let offset = 0;
    const limit = 100;
    let total = null;

    do {
      const url = `https://www.tokkobroker.com/api/v1/${endpoint}/?format=json&key=${key}&lang=es_ar&limit=${limit}&offset=${offset}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      
      if (total === null) total = data.meta?.total_count || 0;
      const objects = data.objects || [];
      all = all.concat(objects);
      offset += limit;

    } while (all.length < total && total > 0);

    res.status(200).json({ objects: all, meta: { total_count: total } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
