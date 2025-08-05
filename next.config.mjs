import dotenv from "dotenv";

dotenv.config();

// Extract hostname and protocol from API URL
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
let remotePattern;

try {
  const url = new URL(apiUrl);
  remotePattern = {
    protocol: url.protocol.replace(':', ''), // Remove the trailing colon
    hostname: url.hostname,
  };
} catch (error) {
  console.error("Invalid NEXT_PUBLIC_API_URL:", apiUrl, error);
  // Fallback to localhost
  remotePattern = {
    protocol: "http",
    hostname: "localhost",
    port: "8000",
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [remotePattern],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
