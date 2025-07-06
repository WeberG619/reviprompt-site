/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static optimization to prevent prerendering issues with client components
  trailingSlash: false,
  generateBuildId: () => 'build',
}

module.exports = nextConfig