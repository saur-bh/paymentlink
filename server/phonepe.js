require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');

async function createPhonePeLink(data) {
  const payload = {
    merchantId: process.env.PP_MERCHANT_ID,
    transactionId: data.transactionId,
    merchantOrderId: data.invoiceNo,
    amount: data.amount,
    mobileNumber: data.phone,
    message: data.message,
    expiresIn: 3600
  };

  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const endpoint = '/v3/payLink/init';
  const xverify = crypto
    .createHash('sha256')
    .update(base64Payload + endpoint + process.env.PP_SALT_KEY)
    .digest('hex') + '###' + process.env.PP_SALT_INDEX;

  const response = await axios.post(
    process.env.PP_HOST_URL + endpoint,
    { request: base64Payload },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xverify,
        'X-CALLBACK-URL': process.env.PP_CALLBACK_URL
      }
    }
  );
  return response.data;
}

module.exports = { createPhonePeLink };