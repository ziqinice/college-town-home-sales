# Campus & Keys

## What this site is for

An interactive explorer for students and other readers comparing housing markets near university campuses. Explore city median sale prices, price distributions, price per square foot, time on market, and the individual sales behind each view. Campus, city, straight-line distance, and price filters update all views together. The table supports sorting, pagination, and CSV downloads.

## Live site

https://ziqinice.github.io/college-town-home-sales/

## Data notes

The original five dataset files are unchanged. The browser reads `data/college_town_home_sales.csv` directly; the original data includes 35,442 sales in 18 cities/towns around 11 campuses across 11 states. The available sale dates span March 27, 2023 through March 25, 2026; six sales have no closing date. Collection occurred in March 2026, so this is a historical sample, not current listings or a complete census of each local market.

All views retain sale prices from $10,000 to $5,000,000, inclusive. This excludes 71 records, leaving 35,371 eligible sales. This explicit rule limits implausible transactions; it does not certify that every retained record is correct. Budget filters include their upper endpoint. Price distributions use left-inclusive, right-exclusive bins, with the final bin including all eligible sales at or above $2 million.

- Eligible sales counts rows, with `listing_id` as the identifier. No deduplication by address occurs; separate units and repeat transactions may share addresses. ZIP codes, county FIPS, and parcel numbers remain text.
- Median price is the median of individual eligible sale prices, not the median or average of city medians. City bars show that city's eligible sales and are sorted by price.
- Median price per square foot is the median of each eligible sale's price divided by positive, nonmissing reported living area. Blank and zero living areas are excluded from this metric only; the metric shows its usable row count.
- Days on market is `(contract_date - list_date)` in days. Both dates are required; nonnegative values including zero are retained. Missing values are not zero. The median card shows valid-date count and coverage. Missing dates are not random, which limits comparisons.
- University and distance use the dataset's nearest-campus assignment and straight-line miles, not city-based grouping or driving distance.
- `home_type` is unreliable and is not used to categorize or filter. Lot size, bathroom counts, and tax fields contain extreme errors; none enter these metrics. Different cities sell different mixes of homes, so price comparisons are descriptive and do not establish causes.
- Empty filter results show no data and disable download and pagination. Missing metric values display a dash. The newest-date sort puts undated records last.

See [the full data description](docs/data_description_sheet.md) for source limitations.

## Tools we used

ChatGPT Codex assisted with implementation, data validation, repository configuration, and deployment. The website uses plain HTML, CSS, and JavaScript with no third-party runtime libraries or external API keys. Python's standard library and SQLite were used to check the CSV and statistics independently. GitHub Actions publishes the repository root through GitHub Pages; no framework build is needed. See [AGENT_LOG.md](AGENT_LOG.md).

## Validation

The browser calculation engine was compared against independently computed statistics from the supplied SQLite dataset for five scenarios: all eligible sales, Champaign, Illinois campus area, Urbana within 3 miles and up to $250,000, and Davis up to $250,000. All six metrics matched in every scenario. Browser checks covered linked filters, empty results, sorting, pagination, and a 390-pixel mobile layout with no page-level horizontal overflow. Validation was performed by Codex; this does not claim the student independently audited each result.

## Citation

College-town home sales dataset, version 1.0 (2026). University of Illinois-Deloitte Foundation Center for Business Emerging Technologies. Data collected March 2026.
