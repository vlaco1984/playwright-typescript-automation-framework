// Quick API test to see what the actual response is
const https = require('https');

// Test search API
const searchData = 'search_product=dress';

const options = {
  hostname: 'automationexercise.com',
  port: 443,
  path: '/api/searchProduct',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': searchData.length,
  },
};

console.log('Testing Search API...');
const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response Body:', data);
    try {
      const json = JSON.parse(data);
      console.log('Parsed JSON:', JSON.stringify(json, null, 2));
    } catch {
      console.log('Not JSON response');
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(searchData);
req.end();
