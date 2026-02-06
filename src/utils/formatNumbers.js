import numeral from "numeral";

export function formatLTV(val) {
  const formatted = numeral(val / 100).format("0.0%");
  return formatted.endsWith(".0%") ? formatted.replace(".0%", "%") : formatted;
}

export function formatInterestRate(min, max) {
  if (!!min || !!max) {
    if (!!min && !!max) {
      return `${numeral(min / 100).format("0.00%")} to ${numeral(max / 100).format("0.00%")}`;
    } else {
      return `${numeral(min / 100).format("0.00%")}`;
    }
  }
}

function formatMoneyAbbrev(n) {
  // use abbreviation for 1,000 and above, otherwise show usual amount
  const abs = Math.abs(n);
  const pattern = abs >= 1000 ? "0,0.[00]a" : "0,0.[00]";
  return "$" + numeral(n).format(pattern);
}

export function formatTerm(min, max) {
  return `${min} to ${max} months`;
}

export function formatAmount(min, max) {
  return `${formatMoneyAbbrev(min)} to ${formatMoneyAbbrev(max)}`;
}
