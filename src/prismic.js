import * as prismic from "@prismicio/client";

const isProd = !!import.meta.env && import.meta.env.MODE === "production";
const rootUrl = isProd
  ? "https://www.moolahlist.com"
  : "http://localhost:4321";

const client = prismic.createClient("moolahlist");
const _pages = await client.getAllByType("page");
const _profiles = await client.getAllByType("profile");

const urls = []

export function getUrl(id) {
  return urls.filter((url) => {
    return url.id === id;
  })[0].url;
}

export const profiles = _profiles 
  .map((deal) => {
    return {
      ...deal,
      category: "profile",
      url: rootUrl + "/recent/" + deal.uid + "/",
    };
  })
  .toSorted((a, b) => {
    return (
      new Date(b.first_publication_date) - new Date(a.first_publication_date)
    );
  });


export const pages = [..._pages, ..._profiles].map((page) => {
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
