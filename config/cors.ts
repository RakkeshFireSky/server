import cors from "cors";

const allowedOrigins = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://front-livid-nine.vercel.app",
]);

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow non-browser requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    // IMPORTANT: allow OPTIONS even if origin is unknown
    return callback(null, true);
  },
  credentials: true,
});
