const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

let web3 = new Web3(ganache.provider());
let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys contract", () => {
    assert.ok(inbox.options.address);
  });
  it("has default message", async () => {
    let message = await inbox.methods.message().call();
    assert.equal(message, "Hi there");
  });
  it("sets message", async () => {
    let set = await inbox.methods.setMessage("bye").send({ from: accounts[0] });
    assert.ok(set.transactionHash);
  });
});
