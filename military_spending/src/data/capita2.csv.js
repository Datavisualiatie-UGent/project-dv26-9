import { loadSIPRI } from "./parseSIPRI.js";
import { csvFormat } from "d3-dsv";

const data = await loadSIPRI("capita", {
  valueKey: "Military_expenditure",
});

process.stdout.write(csvFormat(data));
