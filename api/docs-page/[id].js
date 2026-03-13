const data = require('../../data.json');

export default function handler(req, res) {
  const { id } = req.query;
  const result = data.find(item => item.id === id);

  if (!result) {
    return res.status(404).send('<h2>Không tìm thấy chứng thư</h2>');
  }

  res.status(200).send(`
    <html>
      <head><title>Chứng thư ${result.id}</title></head>
      <body>
        <h1>Chứng thư thẩm định tài sản</h1>
        <p><strong>Mã chứng thư:</strong> ${result.id}</p>
        <p><strong>Ngày chứng thư:</strong> ${result.ngay}</p>
        <p><strong>Khách hàng:</strong> ${result.ten}</p>
        <p><strong>Kết quả:</strong> ${result.Ketqua}</p>
        <p><strong>Tài sản:</strong> ${result.taisan}</p>
      </body>
    </html>
  `);
}