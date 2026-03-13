import QRCode from 'qrcode';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const qr = await QRCode.toDataURL(`https://your-vercel-app.vercel.app/docs-page/${id}`);
    res.status(200).json({ qrcode: qr });
  } catch (err) {
    res.status(500).json({ error: 'Không tạo được QR code' });
  }
}