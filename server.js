const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { createPhonePeLink } = require('./server/phonepe');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const draftsDir = path.join(__dirname, 'drafts');
if (!fs.existsSync(draftsDir)) fs.mkdirSync(draftsDir);

app.post('/generate-link', async (req, res) => {
  try {
    const { invoice } = req.body;
    if (!invoice) return res.status(400).json({ error: 'Missing invoice' });
    const transactionId = `${invoice.centre?.toUpperCase?.() || 'INV'}-${invoice.id}-${Date.now()}`;
    const result = await createPhonePeLink({
      transactionId,
      invoiceNo: invoice.invoiceNo,
      amount: invoice.total,
      phone: invoice.child?.phone || '',
      message: `Payment for invoice ${invoice.invoiceNo}`
    });
    res.json({ link: result.data?.payLink || null, raw: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/save-drafts', (req, res) => {
  const { year, month, centre, data } = req.body;
  const fileName = `${year}-${month}-${centre}.json`;
  const filePath = path.join(draftsDir, fileName);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ status: 'saved', file: fileName });
});

app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});