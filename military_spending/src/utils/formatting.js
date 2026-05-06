const formatValueOnYAxis = (value, type) => {
  if (value == null || isNaN(value)) return "No data";

  if (type === "govt" || type === "gdp") {
    return `${value}%`;
  }

  return (
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)
  );
};

const formatValueOnYLabel = (type) => {
  if (type === "govt" || type === "gdp") {
    return `percentage of ${type === "govt" ? "government expenditure" : "GDP"} spent on military`;
  }

  else if (type === "absolute") {
    return "Military expenditure";
  } 

  else if (type === "capita") {
    return "Military expenditure per capita in USD";
  }

  return "";
};

const formatValueOnTooltip = (value, type) => {
  if (value == null || isNaN(value)) return "No data";

  if (type === "govt" || type === "gdp") {
    return `${value}% of ${type === "govt" ? "government spending" : "GDP"}`;
  }

  if (type === "absolute") {
    return `${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      notation: "compact"
    }).format(value)} USD`;
  }

  return (
    `${new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)} USD per capita`
  );
};

export { formatValueOnYAxis, formatValueOnYLabel, formatValueOnTooltip };