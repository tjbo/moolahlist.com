import queryString from "query-string";

export default function generateSrcset(url, sizes = [], isCrop = false) {
  let srcset = [];

  for (let size in sizes) {
    const parts = url.split("?");
    const parsed = queryString.parse(parts[1]);

    const img = {
      ...parsed,
      w: sizes[size].w,
      h: sizes[size].h,
    };

    if (isCrop) {
      img.fit = "crop"
    }

    const args = queryString.stringify(img, { encode: false });
    const str = parts[0] + "?" + args + " " + sizes[size].w + "w";
    srcset.push(str);
  }
  return srcset;
}
