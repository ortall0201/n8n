// Test Bright Data Instagram Scraper API
// Replace 'YOUR_API_TOKEN' with your actual token

const API_TOKEN = 'YOUR_API_TOKEN'; // Replace this!

const searchQuery = {
  url: 'https://www.instagram.com/explore/tags/fashion/',
  limit: 10  // Get 10 posts to test
};

const options = {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify([searchQuery])
};

console.log('Testing Bright Data Instagram Scraper...\n');
console.log('Searching hashtag: #fashion');
console.log('Limit: 10 posts\n');

try {
  const response = await fetch('https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_l7q7dkf244hwjntr0&include_errors=true', options);

  console.log('Response Status:', response.status);
  console.log('Response Status Text:', response.statusText);

  const data = await response.json();

  if (response.ok) {
    console.log('\n✓ SUCCESS! Bright Data API is working.\n');
    console.log('Response:', JSON.stringify(data, null, 2));
  } else {
    console.log('\n✗ ERROR:', data);
  }
} catch (error) {
  console.error('\n✗ FAILED:', error.message);
}
