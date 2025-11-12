# Competitive Intelligence Dashboard

A professional business intelligence dashboard for tracking real-time stock performance of major technology sector competitors. Built for deployment on Vercel with serverless architecture.

## 🎯 Overview

This dashboard provides instant visibility into competitor stock prices for:
- **Apple Inc.** (AAPL)
- **Microsoft Corporation** (MSFT)
- **Alphabet Inc. / Google** (GOOGL)
- **Meta Platforms Inc.** (META)
- **Amazon.com Inc.** (AMZN)

## ✨ Features

### Business Features
- **Real-time Stock Tracking** - Live data from API Ninjas Stock Price API
- **Visual Price Comparison** - Automatic highlighting of highest (green) and lowest (red) prices
- **Data Export** - One-click CSV export for reports and presentations
- **Timestamp Tracking** - See when data was last updated

### Technical Features
- **Serverless Architecture** - Scalable Vercel Functions for optimal performance
- **Secure API Integration** - Environment-based API key management
- **Professional UI/UX** - High-contrast design meeting WCAG AA accessibility standards
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Error Handling** - Comprehensive error states with user-friendly messages
- **Loading States** - Professional loading animations during data fetch

## 🚀 Deployment Instructions

### Prerequisites
- Vercel account ([sign up free](https://vercel.com/signup))
- API Ninjas account and API key ([get free API key](https://api-ninjas.com/register))

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/competitor-stock-dashboard)

### Manual Deployment

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd vercel
   ```

2. **Install Vercel CLI** (optional, for local testing)
   ```bash
   npm install -g vercel
   ```

3. **Deploy to Vercel**
   ```bash
   vercel
   ```

4. **Configure Environment Variables**
   - Go to your Vercel dashboard
   - Navigate to: Project Settings → Environment Variables
   - Add the following variable:
     - **Name**: `API_KEY`
     - **Value**: Your API Ninjas API key
     - **Environment**: Production, Preview, Development

5. **Redeploy** (if already deployed)
   ```bash
   vercel --prod
   ```

### Local Development

1. **Create `.env` file** in the project root:
   ```
   API_KEY=your_api_ninjas_key_here
   ```

2. **Start development server**:
   ```bash
   vercel dev
   ```

3. **Open browser** to `http://localhost:3000`

## 📁 Project Structure

```
/
├── api/
│   └── stocks.js          # Serverless function for API calls
├── index.html             # Dashboard frontend
├── package.json           # Project configuration
└── README.md             # This file
```

## 🔧 Configuration

### API Endpoints

The dashboard fetches data from:
- **Endpoint**: `/api/stocks`
- **Method**: GET
- **Response**: JSON with stock data array

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `API_KEY` | API Ninjas authentication key | Yes |

### Tracked Companies

To modify tracked companies, edit the `COMPANIES` array in `/api/stocks.js`:

```javascript
const COMPANIES = [
  { ticker: 'AAPL', name: 'Apple Inc.' },
  { ticker: 'MSFT', name: 'Microsoft Corporation' },
  // Add more companies here
];
```

## 🎨 Customization

### Styling
All styles are contained in `index.html` within the `<style>` tag. Key CSS variables in `:root`:
- `--primary-bg`: Main background color
- `--accent-blue`: Primary accent color
- `--accent-green`: Positive indicator color
- `--accent-red`: Negative indicator color

### Functionality
JavaScript functions in `index.html`:
- `fetchStockData()`: Retrieves data from API
- `renderStockData()`: Renders table with highlighting
- `exportToCSV()`: Generates CSV export
- `refreshData()`: Re-fetches latest data

## 📊 Usage

1. **View Dashboard** - Data loads automatically on page load
2. **Refresh Data** - Click "Refresh Data" button for latest prices
3. **Export Data** - Click "Export to CSV" to download current data
4. **Mobile Access** - Fully responsive design works on all devices

## 🔒 Security Features

- Environment-based API key storage (never exposed to client)
- CORS configuration for secure browser requests
- Input validation and sanitization
- XSS protection with HTML escaping
- Error messages don't expose sensitive information

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 API Rate Limits

API Ninjas free tier includes:
- **50,000 requests/month**
- Rate limit: ~1,667 requests/day

Each dashboard load makes 5 API calls (one per stock). Plan accordingly for your expected traffic.

## 🐛 Troubleshooting

### "Unable to load data" Error
- **Check API key**: Verify `API_KEY` environment variable is set correctly
- **Check API quota**: Ensure you haven't exceeded API Ninjas rate limits
- **Check network**: Verify API Ninjas service is accessible

### Data not refreshing
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Check browser console for errors (F12 → Console tab)
- Verify Vercel function logs in dashboard

### Deployment issues
- Ensure all files are committed to git
- Verify Vercel project is linked correctly
- Check Vercel deployment logs for errors

## 📄 License

This project is provided as-is for business intelligence purposes.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Vercel documentation: https://vercel.com/docs
3. Review API Ninjas documentation: https://api-ninjas.com/api/stockprice

## 🔄 Updates

To update your deployed dashboard:
```bash
git pull origin main
vercel --prod
```

---

**Built with ❤️ for competitive intelligence and business decision-making**
