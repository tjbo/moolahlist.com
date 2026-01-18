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
        query: `
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
                    image: {
                      resize: {
                        width: 640 
                        height: 360 
                        fit: crop
                      }
                    }
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
                    resize: {
                      width: 400
                      height: 400
                      fit: crop
                    }
                    quality: {
                      value: 90
                    }
                    compress: {
                      metadata: true
                    }
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
                ...on PropertyProfile {
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

async function getLandingPages() {
  return await fetch(
    "https://us-east-1.cdn.hygraph.com/content/cke1u42u73qoz01z20ckw7eij/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{
          landingPages(stage: PUBLISHED) {
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
        }`,
      }),
    },
  );
}

export const lenderProfiles = (await (await getLenderProfiles()).json()).data
  .lenderProfiles;

export const landingPages = (await (await getLandingPages()).json()).data
  .landingPages;

const pages = [...lenderProfiles, ...landingPages].map((p) => {
  return p;
});

export function getPageBySlug(slug) {
  return pages.find((page) => {
    return page.slug === slug;
  });
}
