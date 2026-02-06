import { glob } from "astro/loaders";

const isProd = !!import.meta.env && import.meta.env.MODE === "production";
const rootUrl = isProd ? "https://moolahlist.com" : "http://localhost:4321";

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
              __typename
              slug
              email
              profileStatus
              listingType
              name
              website
              licenses {
                type
                value
              }
              lenderNews {
                link
                headline
                body
                date
                image {
                  url(
                    transformation: {
                      image: { resize: { width: 640, height: 360, fit: crop } }
                    }
                  )
                  fileName
                  width
                  height
                  size
                }
              }
              logo {
                url(
                  transformation: {
                    image: {
                      resize: { width: 400, height: 400, fit: crop }
                      quality: { value: 90 }
                      compress: { metadata: true }
                    }
                  }
                )
              }
              bestFeatures
              whyWePickedThis
              headline
              description {
                markdown
              }
              areasServed
              states
              metaDescription
              phone
              streetAddress
              postalCode
              city
              state
              yearEstablished
              numberOfEmployees
              socialMedia {
                type
                url
              }
              slug
              positiveConsiderations
              negativeConsiderations
              loanPrograms {
                bestForTagline
                title
                description
                loanType
                propertyTypes
                lendingRatios {
                  id
                  type
                  value
                }
                loanAmountMin
                loanAmountMax
                interestRateMin
                interestRateMax
                termLengthMin
                termLengthMax
                originationFeeMin
                originationFeeMax
                paymentOptions
                paymentStructure
                closingTimeMin
                closingTimeMax
                documentation
                keyRequirements
                additionalDetails
                borrowerProfile {
                  ... on BorrowerProfile {
                    choice
                    ficoScoreMin
                    option
                  }
                }
                loanProfile {
                  ... on LoanProfile {
                    option
                    note
                    cltv
                    choice
                  }
                }
                propertyProfile {
                  ... on PropertyProfile {
                    choice
                    option
                  }
                }
              }
            }
          }
        `,
      }),
    },
  );
}

async function getPages() {
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
            pages(stage: PUBLISHED) {
              __typename
              metaDescription
              metaTitle
              slug
              content {
                __typename
                ... on TextWithTitleSlice {
                  body {
                    markdown
                  }
                  title
                }
              }
            }
          }
        `,
      }),
    },
  );
}

async function getGlobalSettings() {
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
            globalSettings {
              footerLinks1Title
              footerLinks1 {
                ... on InternalLink {
                  text
                  internalPage {
                    ... on Page {
                      slug
                    }
                  }
                }
              }
              footerLinks2Title
              footerLinks2 {
                ... on InternalLink {
                  text
                  internalPage {
                    ... on PillarPage {
                      slug
                    }
                  }
                }
              }
              footerLinks3Title
              footerLinks3 {
                ... on InternalLink {
                  text
                  internalPage {
                    ... on PillarPage {
                      slug
                    }
                  }
                }
              }
              footerLinks4Title
              footerLinks4 {
                ... on InternalLink {
                  text
                  internalPage {
                    ... on LenderProfile {
                      slug
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    },
  );
}

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
              slug
              metaDescription
              metaTitle
              headline1
              headline2
              __typename
              introText {
                markdown
              }
              areasServed
              isAllLoanTypes
              loanTypes
              isAllPropertyTypes
              propertyTypes
              states
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

export const pages = (await (await getPages()).json()).data.pages;

const urls = [...lenderProfiles, ...pillarPages, ...pages].map((page) => {
  let url = page.__typename;
  if (page.slug === "home") {
    url = rootUrl + "/";
  } else if (page.__typename === "LenderProfile") {
    url = rootUrl + "/profile/" + page.slug + "/";
  } else {
    url = rootUrl + "/" + page.slug + "/";
  }

  return {
    id: page.id,
    slug: page.slug,
    url: url,
  };
});

export function getLenderProfileFromSlug(slug) {
  return lenderProfiles.filter((profile) => {
    return profile.slug === slug;
  })[0];
}

export function getUrlFromSlug(slug) {
  return urls.filter((url) => {
    return url.slug === slug;
  })[0].url;
}

export const globalSettings = (await (await getGlobalSettings()).json()).data
  .globalSettings[0];

export function getPageBySlug(slug) {
  return pages.find((page) => {
    return page.slug === slug;
  });
}

export function doesPageExist(slug) {
  return urls.some((page) => {
    return page.slug === slug;
  });
}
