// api/docs/[id].js
const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
  const { id } = req.query || {};
  console.log('--- /api/docs called ---');
  console.log('req.query:', req.query);
  console.log('received id:', id);

  try {
    const dataPath = path.join(process.cwd(), 'data.json');
    console.log('process.cwd():', process.cwd());
    console.log('dataPath:', dataPath);
    console.log('data.json exists:', fs.existsSync(dataPath));

    const raw = fs.readFileSync(dataPath, 'utf8');
    let data;
    try {
      data = JSON.parse(raw);
      console.log('data.json parsed length:', Array.isArray(data) ? data.length : 'not array');
    } catch (e) {
      console.error('JSON parse error:', e && e.message);
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.status(500).json({ error: 'Lỗi parse data.json' });
    }

    if (!id) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.status(400).json({ error: 'Thiếu tham số id. Gọi /api/docs/:id' });
    }

    const normalizedId = String(id).trim();
    const result = data.find(item => String(item.id).trim() === normalizedId);

    console.log('found result:', !!result);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ error: 'Không tìm thấy chứng thư' });
    }
  } catch (err) {
    console.error('Lỗi khi đọc data.json:', err && err.message);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(500).json({ error: 'Lỗi server khi đọc dữ liệu' });
  }
};
