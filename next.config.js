/** @type {import('next').NextConfig} */
// proxyの設定
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "http://localhost:50001/api/:slug*",
      },
    ];
  },
}

module.exports = nextConfig
