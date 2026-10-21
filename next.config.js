/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { globalNotFound: true },
  async redirects() {
    return [{ source: "/", destination: "/fa", permanent: false }];
  },
};

module.exports = nextConfig;