/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://meet-ease-charan.vercel.app/',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/meeting/*'],
      },
    ],
  },
  exclude: ['/api/*', '/meeting/*'],
  generateIndexSitemap: false,
  outDir: 'public',
} 