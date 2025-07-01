const fs = require('fs');
const path = require('path');
const { createPhonePeLink } = require('./phonepe');

async function main() {
  const filePath = path.join(__dirname, '../drafts/2025-07-gkp.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const invoice of data) {
    const transactionId = `GKP-${invoice.id}-${Date.now()}`;
    const result = await createPhonePeLink({
      transactionId,
      invoiceNo: invoice.invoiceNo,
      amount: invoice.total,
      phone: invoice.child?.phone || '',
      message: `Payment for invoice ${invoice.invoiceNo}`
    });

    console.log(`🔗 Invoice ${invoice.invoiceNo}: ${result.data?.payLink || 'Failed'}`);
  }
}

main().catch(console.error);