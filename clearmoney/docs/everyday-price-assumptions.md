# Everyday price assumptions

SuperGap uses these prices only to make a retirement-balance gap easier to
picture. They are Australian reference prices in today's dollars. They are not
personal spending advice and, where a reliable national unit price is not
published, they are deliberately labelled as editorial reference prices rather
than averages.

## Change a value

Edit the `price` for the relevant item in
[`src/app/SuperGap/everydayItems.ts`](../src/app/SuperGap/everydayItems.ts).
That file is the single source of truth for all SuperGap everyday comparisons.

When changing a price, also update its `definition`, `source`, `sourceUrl` and
`asOf` fields so the next review has a clear audit trail. Round only when it
makes the comparison easier to understand.

## Current references

| Comparison | Reference price | What it means | Source and review method | As of |
| --- | ---: | --- | --- | --- |
| Barista coffee | $4.70 | One regular barista-made coffee | [Hey You and Westpac DataX national survey, reported by Time Out](https://www.timeout.com/australia/news/good-news-australias-coffee-price-hikes-are-slowing-down-heres-what-a-cuppa-costs-in-each-state-082526). Replace when a newer national survey is available. | June 2026 |
| Casual dinner for two | $60 | Two casual restaurant meals, excluding drinks | Editorial Australian reference. Review annually, using the [ABS meals-out and takeaway CPI](https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/jul-2026) to check price movement. | September 2026 |
| Routine dental visit | $220 | Check-up, scale and clean, including fluoride treatment | [CHOICE summary of the Australian Dental Association fee survey](https://www.choice.com.au/health-and-body/dentists-and-dental-care/dental-treatment/articles/dental-fees). Replace when the ADA publishes a newer comparable national fee source. | September 2026 |
| New iPhone | $1,249 | Apple iPhone 16, 128GB, before accessories | [Apple Australia](https://www.apple.com/au/shop/buy-iphone/iphone-16/6.1-inch-display-128gb-black). Review whenever Apple releases a new entry model. | September 2026 |
| Hotel night | $220 | One standard hotel room night in Australia | Editorial Australian reference. Review annually against accommodation data from [Tourism Research Australia](https://www.tra.gov.au/en/tourism-statistics) and a current national booking sample. | September 2026 |
| Budget overseas trip | $1,800 | A modest international holiday budget | Editorial Australian reference. Review annually against current travel prices. [Tourism Research Australia international tourism data](https://www.tra.gov.au/en/tourism-statistics/international-tourism-results) provides context, but is not used as a direct price because it measures inbound visitor spend. | September 2026 |

## Why the ABS is not the direct source for every price

The ABS Consumer Price Index reports how categories such as restaurant meals,
travel and health prices change over time. It does not provide a dependable
nationwide dollar price for a coffee, hotel night or overseas trip. Use it to
check whether reference prices should move between direct surveys or retailer
prices; do not present it as the source of a national average unit price.

Review this table every July, after the latest ABS CPI release, and whenever a
direct source above publishes a newer comparable figure.
