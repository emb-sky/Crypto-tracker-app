const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const STOCK_API_URL = process.env.STOCK_API_URL;
const CG_API_KEY = process.env.CG_API_KEY;

async function pollData() {
  try {
    const symbols = ['bitcoin', 'ethereum', 'dogecoin', 'cardano', 'polkadot'];
    const response = await axios.get(`${STOCK_API_URL}?ids=${symbols.join(',')}&vs_currencies=usd&x_cg_demo_api_key=${CG_API_KEY}`);
    const data = response.data;

    console.log('Fetched data:', data);

    // Here you would typically send this data to your API
    // For demonstration, we're just logging it
    console.log('Data fetched successfully');
  } catch (error) {
    console.error('Error polling data:', error);
  }
}

// Poll data every 10 seconds
setInterval(pollData, 10000);

// Initial poll
pollData();