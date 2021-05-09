const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const HDWalletProvider = require("truffle-hdwallet-provider");

const provider = new HDWalletProvider(
  "spy pigeon grit destroy across salad version sheriff cube duck black box",
  "https://rinkeby.infura.io/v3/1065d5fd79b147db92917038438caca7"
);

const web3 = new Web3(provider);

const deployContract = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("deploying contract using: ", accounts[0]);
  const sendContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there"],
    })
    .send({ from: accounts[0], gas: "1000000" });
  console.log("contract deployed at: ", sendContract.options.address);
};

deployContract();
