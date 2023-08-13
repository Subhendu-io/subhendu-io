/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "subhendu.io"],
  },
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "connect-src": ["'self'", "https:"],
      "img-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
      "media-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
      upgradeInsecureRequests: null,
    },
  },
};

module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; img-src *; child-src *;`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
