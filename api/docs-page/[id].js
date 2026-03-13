import data from '../../data.json';

export default function handler(req, res) {
  const { id } = req.query;
  const result = data.find(item => item.id === id);

  if (result) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(`
      <html>
        <head>
          <title>Chứng thư thẩm định tài sản</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #333; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            table, th, td { border: 1px solid #ccc; }
            th, td { padding: 10px; text-align: left; }
          </style>
        </head>
        <body>
          <h1>📄 Chứng thư thẩm định tài sản</h1>
          <p><strong>Mã chứng thư:</strong> ${result.id}</p>
          <p><strong>Ngày chứng thư:</strong> ${result.ngay}</p>
          <p><strong>Khách hàng:</strong> ${result.ten}</p>
          <p><strong>Kết quả:</strong> ${Number(result.ketqua).toLocaleString()} ₫</p>

          <h2>📋 Danh sách tài sản</h2>
          <table>
            <tr><th>STT</th><th>Hạng mục tài sản</th></tr>
            <tr><td>1</td><td>${result.taisan}</td></tr>
          </table>

          <footer style="margin-top:40px; color:#666;">
            © 2026 VNG VALUE
          </footer>
        </body>
      </html>
    `);
  } else {
    res.status(404).send("<h1>Không tìm thấy chứng thư</h1>");
  }
}
