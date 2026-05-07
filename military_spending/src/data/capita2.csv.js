import { loadSIPRI } from "./parseSIPRI.js";
import { csvFormat } from "d3-dsv";

const data = await loadSIPRI("capita");

process.stdout.write(csvFormat(data));
