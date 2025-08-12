import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yllaaa.com',
        port: '',
        pathname: '/**',
      },
      // Add other domains if needed
      {
        protocol: 'https',
        hostname: 'example.com', // Add any other domains you might use
        port: '',
        pathname: '/**',
      },
    ],
  },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);