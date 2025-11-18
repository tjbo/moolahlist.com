import * as prismic from "@prismicio/client";

const isProd = !!import.meta.env && import.meta.env.MODE === "production";
const rootUrl = isProd ? "https://www.moolahlist.com" : "http://localhost:4321";

const client = prismic.createClient("moolahlist");
const _pages = await client.getAllByType("page");
const _profiles = await client.getAllByType("profile");

export const profiles = _profiles.map((p) => {
  return {
    ...p,
    url: rootUrl + "/profile/" + p.uid + "/",
  };
});

export const pages = [..._pages].map((page) => {
  return {
    ...page,
    url: page.uid === "root" ? rootUrl : rootUrl + "/" + page.uid + "/",
  };
});

export const urls = [...pages, ...profiles].map((item) => {
  return {
    uid: item.uid,
    id: item.id,
    last_mod: item.last_publication_date,
    url: item.url,
  };
});

export function getUrl(id) {
  console.log(
    urls.filter((url) => {
      return url.id === id;
    })[0].url,
  );
  return urls.filter((url) => {
    return url.id === id;
  })[0].url;
}

export async function getPage(uid) {
  return pages.filter((page) => {
    return page.uid === uid;
  })[0];
}

const _settings = await client.getAllByType("settings");
export const settings = _settings[0];
