# Weather Analytics Application - Comfort Index Dashboard

A secure, full-stack weather analytics application that retrieves weather data from OpenWeatherMap, processes it using a custom Comfort Index algorithm, and presents meaningful insights through a modern, responsive UI.

## 🌟 Features

- **Weather Data Retrieval**: Fetches real-time weather data from OpenWeatherMap API
- **Custom Comfort Index**: Proprietary algorithm scoring cities 0-100 based on multiple weather parameters
- **Server-Side Caching**: 5-minute cache for weather API responses with debug endpoint
- **Authentication & Authorization**: Auth0 integration with MFA and restricted signups
- **Responsive UI**: Modern, mobile-friendly interface with dark mode support
- **Temperature Trends**: Interactive charts showing 24-hour temperature forecasts
- **City Ranking**: Automatic sorting from most to least comfortable cities

## 🚀 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling
- **Recharts** for data visualization
- **Auth0 React SDK** for authentication

### Backend
- **Node.js** with TypeScript
- **Express** for API server
- **Auth0 JWT middleware** for route protection
- **In-memory cache** for weather data

## 📋 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- pnpm package manager
- OpenWeatherMap API key
- Auth0 account and application

### Environment Configuration

#### Server (Backend)
Create a `.env` file in the `server/` directory:

```env
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
AUTH0_AUDIENCE=your_auth0_audience
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
```

#### Client (Frontend)
Create a `.env` file in the `client/` directory:

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_AUDIENCE=your_auth0_audience
```

### Installation

1. **Install dependencies**:
```bash
# Install server dependencies
cd server
pnpm install

# Install client dependencies  
cd ../client
pnpm install
```

2. **Start the development servers**:
```bash
# Terminal 1 - Start backend server
cd server
pnpm dev

# Terminal 2 - Start frontend client
cd client
pnpm dev
```

3. **Access the application**:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/api/health

## 🎯 Comfort Index Algorithm

### Formula
The Comfort Index score is calculated using the following formula:

```
Comfort Score = (Temperature Score × 0.35) + (Humidity Score × 0.25) + (Wind Score × 0.20) + (Cloudiness Score × 0.20)
```

### Parameter Scoring

#### Temperature Score (35% weight)
- **Optimal range**: 18-24°C (100 points)
- **Formula**: `100 - |temperature - 21| × 4`
- **Rationale**: 21°C is widely considered the most comfortable indoor temperature. The score decreases linearly as temperature deviates from this ideal.

#### Humidity Score (25% weight)
- **Optimal range**: 40-60% (100 points)
- **Formula**: 
  - If humidity < 40%: `humidity × 2.5`
  - If humidity > 60%: `150 - humidity × 2.5`
  - Otherwise: 100
- **Rationale**: Both very low and very high humidity cause discomfort. The 40-60% range is ideal for human comfort and health.

#### Wind Score (20% weight)
- **Optimal range**: 0-3 m/s (100 points)
- **Formula**: `100 - (windSpeed × 15)`
- **Rationale**: Light winds (0-3 m/s) are comfortable. Higher wind speeds cause discomfort, especially when combined with temperature extremes.

#### Cloudiness Score (20% weight)
- **Optimal range**: 0-30% (100 points)
- **Formula**: `100 - (cloudiness × 1.2)`
- **Rationale**: Clear to partly cloudy skies are generally preferred. Heavy cloud cover can affect mood and UV exposure, though it does provide temperature moderation.

### Reasoning Behind Variable Weights

1. **Temperature (35%)**: Temperature has the most immediate and significant impact on human comfort. Our bodies are highly sensitive to thermal changes, making this the most critical factor.

2. **Humidity (25%)**: Humidity significantly affects perceived temperature through the heat index. High humidity makes heat feel more oppressive, while low humidity causes dryness and irritation.

3. **Wind (20%)**: Wind chill and wind heat effects are important but secondary to temperature and humidity. Moderate winds can actually enhance comfort by promoting evaporation.

4. **Cloudiness (20%)**: While less critical than the other factors, cloud cover affects both thermal comfort (through UV exposure and temperature moderation) and psychological well-being.

### Trade-offs Considered

1. **Simplicity vs. Accuracy**: The formula uses linear relationships for simplicity, though real-world comfort responses are often non-linear. This trade-off was made for computational efficiency and interpretability.

2. **Individual Preferences**: The algorithm assumes a general "average" human preference, though individual comfort preferences vary significantly based on acclimatization, health conditions, and personal preference.

3. **Seasonal Variations**: The optimal temperature range doesn't account for seasonal acclimatization - what feels comfortable in summer might feel cold in winter. This was simplified to maintain consistency.

4. **Missing Parameters**: Factors like UV index, air quality, and precipitation probability were excluded due to API limitations, though they would provide a more comprehensive comfort assessment.

## 🗄️ Cache Design

### Implementation
The application uses an in-memory cache with the following characteristics:

- **Cache Type**: JavaScript Map stored in server memory
- **TTL (Time To Live)**: 5 minutes (300,000 ms)
- **Cached Data**: Raw OpenWeatherMap API responses
- **Cache Key**: City code (e.g., "1248991" for Colombo)

### Cache Workflow

1. **Request**: Weather data requested for a city
2. **Cache Check**: System checks if valid cached data exists
3. **Hit**: Return cached data immediately (marked as HIT)
4. **Miss**: Fetch from OpenWeatherMap API, cache the response, return data (marked as MISS)
5. **Expiration**: Cached data automatically removed after 5 minutes

### Cache Debug Endpoint
Access `/api/cache/status` to view current cache status:

```json
[
  {
    "cityCode": "1248991",
    "expiresAt": 1234567890,
    "status": "HIT"
  }
]
```

### Trade-offs

- **In-memory vs. Persistent**: Chose in-memory for simplicity and speed, though data is lost on server restart. For production, Redis would be preferred.
- **Cache Duration**: 5 minutes balances freshness with API rate limits. Weather changes slowly, so this is reasonable for comfort assessment.
- **Single Cache vs. Layered**: Only raw API responses are cached. Could add a second layer for processed comfort scores to further reduce computation.

## ⚠️ Known Limitations

1. **Weather Data Freshness**: OpenWeatherMap provides current weather, not real-time. Data may be 10-60 minutes old depending on the location.

2. **Cache Persistence**: In-memory cache is lost on server restart. Production applications should use Redis or similar.

3. **Temperature Trends**: The forecast API provides predicted temperatures, not historical data. The "24H trend" shows forecast data rather than actual historical patterns.

4. **Comfort Index Generalization**: The algorithm uses general human comfort preferences and doesn't account for individual variations, acclimatization, or seasonal expectations.

5. **Limited City Set**: Currently uses 8 cities from the provided cities.json. Could be expanded to include more global locations.

6. **Auth0 Configuration**: Requires proper Auth0 setup with MFA enabled and signup restrictions configured in the Auth0 dashboard.

7. **Error Handling**: Basic error handling is implemented but could be more robust for production use (retry logic, circuit breakers, etc.).

## 🧪 Testing

### Manual Testing Checklist
- [ ] Authentication flow (login/logout)
- [ ] Weather data retrieval for all cities
- [ ] Comfort index calculation
- [ ] City ranking display
- [ ] Temperature trend charts
- [ ] Dark mode toggle
- [ ] Mobile responsiveness
- [ ] Cache functionality (check `/api/cache/status`)
- [ ] Sorting by different criteria

### API Endpoints
- `GET /api/health` - Health check
- `GET /api/analytics` - Get weather analytics (protected)
- `GET /api/cities` - Get city list
- `GET /api/weather/:cityCode` - Get weather for specific city
- `GET /api/cache/status` - View cache status (debug)

## 📦 Deployment

### Production Considerations
1. **Environment Variables**: Ensure all required environment variables are set in production
2. **Auth0 Configuration**: Configure Auth0 application for production domain
3. **Cache Solution**: Replace in-memory cache with Redis for production
4. **Error Monitoring**: Add error tracking (e.g., Sentry)
5. **Rate Limiting**: Implement API rate limiting for production
6. **HTTPS**: Ensure both frontend and backend use HTTPS
7. **Build Optimization**: Run `pnpm build` for optimized production builds

## 🤝 Contributing

This project was developed as a full-stack assignment. For questions or suggestions, please contact the development team.

## 📄 License

This project is developed for assessment purposes.