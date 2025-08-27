// ==UserScript==
// @name         [GC] - Smarter Stock Market
// @description  Highlights stocks that meet thresholds for buying and selling.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=grundos.cafe
// @match        https://www.grundos.cafe/games/stockmarket/*
// @author       aether
// @namespace    https://github.com/hlmartin/gc-userscripts/
// @version      1.0.0
// @license      MIT
// @supportURL   https://github.com/hlmartin/gc-userscripts/issues
// @require      https://cdn.jsdelivr.net/gh/tofsjonas/sortable@4.1.1/dist/sortable.min.js
// @grant        GM_addStyle
// ==/UserScript==

// ------------------------------------------------------
// User editable variables

const BUY_THRESHOLD = 15; // in neopoints
const SELL_THRESHOLD = 150.00; // in change percentage
const HIGHLIGHT_COLOUR = '#bdbdff'; // a hex colour or HTML-safe colour name

// ------------------------------------------------------

const css = `
  .highlighted-cell {
    background-color: ${HIGHLIGHT_COLOUR} !important;
  }
  .no-stocks {
    font-size: 24px;
    text-align: center;
  }
`;
GM_addStyle(css);

const sortTable = ({tableName, applyHighlightFn, displayNoHighlightMessage, noHighlightMessage}) => {
  const tableClass = `.${tableName}-table`;
  const cellClass = `.${tableName}-cell`;

  const table = document.querySelector(tableClass);
  table.classList.add("sortable", "n-last");

  // Exclude the top-most headers and logo column from being sortable
  const hasTieredHeaders = document.querySelectorAll(`${tableClass} > thead > tr`).length > 1;
  if (hasTieredHeaders) {
    const topHeaders = document.querySelectorAll(`${tableClass} > thead > tr:first-of-type > th`);
    topHeaders.forEach((header) => header.classList.add("no-sort"));
  }

  const logo = document.querySelector(`${tableClass} > thead > tr:last-of-type > th:first-of-type`);
  logo.classList.add("no-sort");

  // Give the totals row a unique id so we can find it later
  const lastRow = document.querySelector(`${tableClass} > tbody > tr:last-of-type`);
  if (lastRow.textContent.includes("Totals")) {
    lastRow.id = "totals-row";
  }

  // Give the % Change rows a more normative sort value so it properly sorts them
  // in the order of positive, zero, and negative percentages.
  const rows = document.querySelectorAll(`${tableClass} > tbody > tr`);
  rows.forEach((row) => {
    const isHidden = window.getComputedStyle(row).display === "none";
    if (isHidden) {
      return;
    }

    const change = row.querySelector(`${cellClass}:last-of-type`);
    const sortValue = change.textContent.replace(/\s|%|\+/g, '');

    change.setAttribute("data-sort", sortValue)

    if (applyHighlightFn(row, cellClass)) {
      row.classList.add("highlighted-row");
      Object.values(row.children).forEach((cell) => cell.classList.add("highlighted-cell"));
    }
  });

  const highlightedRows = document.querySelectorAll(".highlighted-row");
  highlightsToTop(highlightedRows, tableClass);

  if (highlightedRows.length === 0 && displayNoHighlightMessage) {
    const div = document.createElement("div");
    div.textContent = noHighlightMessage;
    div.classList.add("no-stocks");
    const tableContainer = table.closest("div.center");
    tableContainer.prepend(div);
  };
}

const isSellable = (row, cellClass) => {
  const change = row.querySelector(`${cellClass}:last-of-type`);
  const sortValue = change.getAttribute("data-sort");
  return parseFloat(sortValue) >= SELL_THRESHOLD;
};

const isBuyable = (row, cellClass) => {
  const currentValue = row.querySelector(`${cellClass}:nth-child(6)`).textContent;
  return parseInt(currentValue) == BUY_THRESHOLD;
};

const sortPortfolio = () => {
  const config = {
    tableName: "portfolio",
    applyHighlightFn: isSellable,
    displayNoHighlightMessage: false
  };
  sortTable(config);
}

const sortStocks = () => {
  const config = {
    tableName: "stock",
    applyHighlightFn: isBuyable,
    displayNoHighlightMessage: true,
    noHighlightMessage: "😭 There are no buyable stocks at this time."
  };
  sortTable(config);
}

const highlightsToTop = (highlighted, tableClass) => {
  // Moves any highlighted values to the top.
  if (!highlighted) {
    return;
  }

  const tbody = document.querySelector(`${tableClass} > tbody`);
  highlighted.forEach((row) => {
    const clonedRow = row.cloneNode(true);
    tbody.prepend(clonedRow);
    row.remove();
  });
}

const totalsToBottom = () => {
  // Ensures the total stays at the bottom.
  const totals = document.getElementById("totals-row");
  if (!totals) {
    return;
  }

  const tbody = document.querySelector(".portfolio-table > tbody");
  const cloneTotals = totals.cloneNode(true);
  tbody.append(cloneTotals);
  totals.remove();
}

document.addEventListener('sort-end', function() {
  totalsToBottom();
});

window.addEventListener('load', function() {
  switch (document.location.pathname) {
    case "/games/stockmarket/stocks/":
      sortStocks();
      break;
    case "/games/stockmarket/portfolio/":
      sortPortfolio();
      break;
  }
});
