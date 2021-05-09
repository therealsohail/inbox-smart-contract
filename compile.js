const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "inbox.sol");
const sourceCode = fs.readFileSync(inboxPath, "utf-8");

let output = solc.compile(sourceCode, 1).contracts;
console.log(output[":Inbox"].interface);

module.exports = solc.compile(sourceCode, 1).contracts[":Inbox"];
