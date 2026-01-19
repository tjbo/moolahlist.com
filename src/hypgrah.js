import { glob } from "astro/loaders";

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
                fileName
                width
                height
                size
              }
              bestFeatures
              headline
              description {
                markdown
              }
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
                title
                description
                loanType
                propertyTypes
                loanToValueMax
                loanToCostMax
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
                requirements
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
                    ... on LenderProfile {
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
                    ... on LenderProfile {
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
              headline
              subheadline
              __typename
              introText
              lenderProfiles {
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
                  fileName
                  width
                  height
                  size
                }
                slug
                bestFeatures
                name
              }
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

const allPages = [...lenderProfiles, ...pages].map((p) => {
  return p;
});

export const globalSettings = (await (await getGlobalSettings()).json()).data
  .globalSettings[0];

export function getPageBySlug(slug) {
  return pages.find((page) => {
    return page.slug === slug;
  });
}
