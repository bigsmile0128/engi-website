export const COOKBOOK_LINK = 'https://links.engi.network/cookbook';
export const COOKBOOK_NOTION_SITE_BASE_URL =
  'https://engi-network.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10';
export const GITHUB_APP_LINK = `https://github.com/apps/${
  /localhost/.test(process.env.NEXT_PUBLIC_API_URL ?? '')
    ? 'engi-test'
    : /staging/.test(process.env.NEXT_PUBLIC_API_URL ?? '')
    ? 'engi-github-app-staging'
    : 'engi-github-app'
}/installations/new?state=uuid`;
export const LIGHTPAPER_LINK =
  'https://engi-website.s3.us-east-2.amazonaws.com/Engi-Lightpaper.pdf';
