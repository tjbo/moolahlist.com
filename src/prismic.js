
import * as prismic from "@prismicio/client";
const isProd = !!import.meta.env && import.meta.env.MODE === "production";
const rootUrl = isProd
  ? "https://www.moolahlist.com"
  : "http://localhost:4321";

const client = prismic.createClient("moolahlist");
const _pages = await client.getAllByType("page");

const urls = []

export function getUrl(id) {
  return urls.filter((url) => {
    return url.id === id;
  })[0].url;
}

export const pages = [..._pages].map((page) => {
  return {
    ...page,
    url: page.uid === "root" ? rootUrl : rootUrl + "/" + page.uid + "/",
  };
});

export async function getPage(uid) {
  return pages.filter((page) => {
    return page.uid === uid;
  })[0];
}
