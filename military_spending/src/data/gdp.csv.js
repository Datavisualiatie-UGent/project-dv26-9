import { loadSIPRI } from "./parseSIPRI.js";
import { csvFormat } from "d3-dsv";
const data = await loadSIPRI("gdp", { stripPercent: true });

process.stdout.write(csvFormat(data));
