import { urls } from "../hypgrah.js";

export async function GET() {
  const result = `  
<?xml version="1.0" encoding="UTF-8"?>  
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">  
  ${urls
    .filter((item) => {
      return item.url !== "/404/";
    })
    .map((item) => {
      return `<url><loc>${item.url}</loc><lastmod>${new Date(item.updatedAt).toISOString()}</lastmod></url>`;
    })
    .join("\n")}  
</urlset>  
  `.trim();

  return new Response(result, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
