import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:[
      {
        protocol:'https',
        hostname:'*',
      }
    ],
    domains: ["placehold.co"],
    dangerouslyAllowSVG: true, // Enables SVG rendering
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
};

export default nextConfig;
