import QRCode from 'qrcode';
import data from '../../data.json';

export default async function handler(req, res) {
  const { id } = req.query;
  const result = data.find(item => item.id === id);

  if (result) {
    try {
      const qr = await QRCode.toDataURL(JSON.stringify(result));
      res.status(200).json({ qrcode: qr });
    } catch (err) {
      res.status(500).json({ error: "Không tạo được QR code" });
    }
  } else {
    res.status(404).json({ error: "Không tìm thấy chứng thư" });
  }
}