# URL Shortener

A simple URL shortener service built with Node.js, Express, and MongoDB.

## **Endpoints**
1. `POST /api/shorten`  
   - Request: `{ "originalUrl": "https://example.com" }`
   - Response: `{ "shortUrl": "http://localhost:5000/abcd1234" }`

2. `GET /:shortId`  
   - Redirects to the original URL.

3. `GET /api/stats/:shortId`  
   - Response:  
     ```json
     {
       "originalUrl": "https://example.com",
       "clicks": 42,
       "lastAccessed": "2024-11-26T12:34:56Z"
     }
     ```

## **Setup**
1. Clone the repo.
2. Install dependencies: `npm install`.
3. Set environment variables in `.env`.
4. Start the server: `npm start`.

## **Deployment**
Deployed on render at https://hom-2qm4.onrender.com
