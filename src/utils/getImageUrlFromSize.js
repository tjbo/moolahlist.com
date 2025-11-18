import queryString from "query-string";

export default function generateSrcset(url, w, h, isCrop) {

  const parts = url.split("?");
  const parsed = queryString.parse(parts[1]);

  const img = {
    ...parsed,
    w: w,
    h: h,
  };

  if (isCrop) {
    img.fit = "crop"
  }


  const args = queryString.stringify(img, { encode: false });
  const str = parts[0] + "?" + args;

  return str
}
