async function getPillarPages() {
  return await fetch(
    "https://us-east-1.cdn.hygraph.com/content/cke1u42u73qoz01z20ckw7eij/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: /* GraphQL */ `
          {
            pillarPages(stage: PUBLISHED) {
              keywords
            }
          }
        `,
      }),
    },
  );
}

async function getLenderProfiles() {
  return await fetch(
    "https://us-east-1.cdn.hygraph.com/content/cke1u42u73qoz01z20ckw7eij/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: /* GraphQL */ `
          {
            lenderProfiles(stage: PUBLISHED) {
              keywords
            }
          }
        `,
      }),
    },
  );
}

export const pillarPages = (await (await getPillarPages()).json()).data
  .pillarPages;

export const lenderProfiles = (await (await getLenderProfiles()).json()).data
  .lenderProfiles;

const keywords = [...pillarPages, ...lenderProfiles].reduce((p, c) => {
  return [...p, ...c.keywords];
}, []);

keywords.map((k) => {
  console.log(k);
});
