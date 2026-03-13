const data = require('../../data.json');

export default function handler(req, res) {
  const { id } = req.query;
  const result = data.find(item => item.id === id);

  if (!result) {
    return res.status(404).json({ error: 'Không tìm thấy chứng thư' });
  }

  res.status(200).json(result);
}