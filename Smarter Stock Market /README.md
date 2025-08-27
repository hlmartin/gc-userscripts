# [GC] Smarter Stock Market

This script improves the Grundo's Cafe Stock Market experience by making relevant stocks easier to find and manipulate.

It's inspired greatly by the [Stock Market Extras](https://gist.github.com/jkingaround/4c53f92988dffa1bfb47) userscript, and uses the [`sortable`](https://github.com/tofsjonas/sortable) library to facilitate sorting functions.

## Features

- Streamline and simplify the display of the Stock tables
- Allow sorting of the Stock tables by any field
- Highlight buyable and sellable stocks that meet a configurable threshold

## Configuration

Currently done at the top of the script itself. If there's interest, I'll create a configuration UI - let me know in discord!

**BUY_THRESHOLD (integer):** The value you want to buy stocks at. Default is 15 NP.
**SELL_THRESHOLD (float):** The minimum change percentage you want to sell stocks at. Default is 150%.
**HIGHLIGHT_COLOUR (string):** A hex colour or HTML-safe colour name that is used to highlight stocks above/below. Defaults to something that kind of matches the existing table theme.

## Changelog

**1.0.0:** Initial release.
