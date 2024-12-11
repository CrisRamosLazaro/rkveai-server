server.ts: THE ENTRY POINT. Focused on the environment and server startup logic. It's where we load environment variables and call app.listen to start the server.

app.ts: focused on the setup and configuration of the app. Defines the structure of the app (middleware, routes, error handling, etc.), while server.ts is the file that actually runs the app

config/index.ts: defines the bahaviour of certain aspects of the app:
app.set("trust proxy", 1): For production. This is typically used in production environments where your app is behind a proxy (e.g., a load balancer). It tells Express to trust the proxy headers when determining the client's IP address (important for things like rate-limiting or logging client IPs).
Middleware setup:
app.use(cors({ origin: '*' })): This sets up CORS (Cross-Origin Resource Sharing) middleware to allow requests from all origins. This is useful if your frontend is served from a different origin than your backend (e.g., the frontend is hosted at http://localhost:3000 while the backend runs at http://localhost:5000).
app.use(express.json()): This middleware is used to parse incoming requests with JSON payloads.
app.use(express.urlencoded({ extended: false })): This is used to parse incoming requests with URL-encoded payloads (common in form submissions).