import { loadSIPRI } from "./parseSIPRI.js";
import { csvFormat } from "d3-dsv";

const data = await loadSIPRI("absolute", { millions: true });

process.stdout.write(csvFormat(data));