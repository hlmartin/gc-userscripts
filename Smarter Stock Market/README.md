# [GC] Smarter Stock Market

This script improves the Grundo's Cafe Stock Market experience by making relevant stocks easier to find and manipulate.

It's inspired greatly by the [Stock Market Extras](https://gist.github.com/jkingaround/4c53f92988dffa1bfb47) userscript, and uses the [`sortable`](https://github.com/tofsjonas/sortable) library to facilitate sorting functions.

## Features

- Allow sorting of the Stock tables by any field
- Highlight buyable and sellable stocks that meet a configurable threshold

## Configuration

Currently only able to be done by editing the script in Tampermonkey, where you'll find some variables marked as such. An interface on the website to do this instead will come soon™.

**BUY_THRESHOLD (integer):** The value you want to buy stocks at. Default is 15 NP.

**SELL_THRESHOLD (float):** The minimum change percentage you want to sell stocks at. Default is 150%.

**HIGHLIGHT_COLOUR (string; optional):** A hex colour or HTML-safe colour name that is used to highlight stocks above/below. Defaults to something that kind of matches the existing table theme.

## Changelog

**1.1.1**

* Fixed a bug where when selling highlighted stocks, the "sell" form will show in the wrong location in the list.
* Fixed a bug where highlighted stocks were displayed in the reverse order to what the rest of the table was sorted by.

**1.1.0**

* If you have dark mode enabled, the default highlight colour will now be something that you can more easily read the grey and white text on. Configuring your own custom colour with the `HIGHLIGHT_COLOUR` variable will still take preference either way.

**1.0.0**

* Initial release.
