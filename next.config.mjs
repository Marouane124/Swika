/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [new URL(process.env.NEXT_PUBLIC_STRAPI_URL).hostname],
    },
  };
  
  export default nextConfig;
  