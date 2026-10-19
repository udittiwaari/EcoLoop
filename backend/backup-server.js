// Backup local server for EcoLoop. Uses port 4174 by default to avoid clashes.
process.env.PORT = process.env.PORT || "4174";
require("./server.js");
