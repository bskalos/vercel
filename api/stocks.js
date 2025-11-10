/**
 * Serverless API Function for Stock Data Retrieval
 *
 * This function securely fetches real-time stock prices for major technology
 * competitors from API Ninjas Stock Price API. It handles authentication,
 * parallel data fetching, and comprehensive error handling.
 *
 * Environment Variables Required:
 * - API_KEY: Your API Ninjas API key
 *
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */

// Company tracking configuration
const COMPANIES = [
  { ticker: 'AAPL', name: 'Apple Inc.' },
  { ticker: 'MSFT', name: 'Microsoft Corporation' },
  { ticker: 'GOOGL', name: 'Alphabet Inc. (Google)' },
  { ticker: 'META', name: 'Meta Platforms Inc.' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.' }
];

/**
 * Fetches stock price for a single ticker from API Ninjas
 *
 * @param {string} ticker - Stock ticker symbol
 * @param {string} apiKey - API authentication key
 * @returns {Promise<Object>} Stock price data or error object
 */
async function fetchStockPrice(ticker, apiKey) {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/stockprice?ticker=${ticker}`,
      {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate response data
    if (!data || typeof data.price === 'undefined') {
      throw new Error('Invalid response format from API');
    }

    return {
      success: true,
      price: data.price
    };
  } catch (error) {
    console.error(`Error fetching ${ticker}:`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Main serverless function handler
 * Fetches stock data for all tracked companies in parallel
 */
export default async function handler(req, res) {
  // Enable CORS for browser requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only GET requests are supported'
    });
  }

  try {
    // Validate API key configuration
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error('API_KEY environment variable not configured');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'API key not configured. Please contact administrator.'
      });
    }

    // Record data collection timestamp
    const timestamp = new Date().toISOString();

    // Fetch all stock prices in parallel for optimal performance
    const stockPromises = COMPANIES.map(async (company) => {
      const result = await fetchStockPrice(company.ticker, apiKey);

      return {
        ticker: company.ticker,
        companyName: company.name,
        price: result.success ? result.price : null,
        error: result.success ? null : result.error,
        timestamp
      };
    });

    // Wait for all requests to complete
    const stockData = await Promise.all(stockPromises);

    // Check if any stocks failed to fetch
    const failedStocks = stockData.filter(stock => stock.error);
    const successfulStocks = stockData.filter(stock => !stock.error);

    // If all requests failed, return error response
    if (successfulStocks.length === 0) {
      return res.status(503).json({
        error: 'Service unavailable',
        message: 'Unable to fetch stock data. Please try again later.',
        details: failedStocks.map(s => ({ ticker: s.ticker, error: s.error }))
      });
    }

    // Return successful response with data
    // Include partial failure information if some stocks failed
    return res.status(200).json({
      success: true,
      timestamp,
      data: stockData,
      summary: {
        total: COMPANIES.length,
        successful: successfulStocks.length,
        failed: failedStocks.length
      }
    });

  } catch (error) {
    // Catch-all error handler for unexpected errors
    console.error('Unexpected error in stocks API:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred while processing your request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
