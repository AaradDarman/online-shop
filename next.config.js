module.exports = {
  reactStrictMode: true,
};
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://onlineshop-api.vercel.app/:path*", // Proxy to Backend
      },
    ];
  },
};
module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};