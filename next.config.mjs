/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "localhost",
        port: "8000",
      },
      {
        hostname: process.env.SERVER_API_HOST,
        port: "8000",
      },
      {
        hostname: "media.giphy.com",
      },
    ],
  },
  env: {
    SERVER_API_URL: process.env.SERVER_API_URL,
    SERVER_API_HOST: process.env.SERVER_API_HOST,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
      {
        source: "/dashboard/:path*",
        missing: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        permanent: false,
        destination: "/login?redirect_to=/dashboard",
      },
      {
        source: "/login",
        has: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        permanent: false,
        destination: "/",
      },
      {
        source: "/profile/:username/change",
        missing: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        permanent: false,
        destination: "/login",
      },
    ];
  },
};

export default nextConfig;
