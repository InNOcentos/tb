const Web3 = require('web3');
const OneSplitAbi = require('./1splitabi/OneSplitAudit.full.json');
const { default: BigNumber } = require( 'bignumber.js' );
const weiEthDecimals = 18;

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/d72efbcdb90a4d93898aa55785f71cec')

let web3 = new Web3(provider)

let fromTokenAdress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' // Eth
let toTokenAdress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // Dai
let amount = 1;

let oneSplitContract = new web3.eth.Contract(OneSplitAbi, '0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E')

let splitExchanges = [
  "Uniswap",
  "Kyber",
  "Bancor",
  "Oasis",
  "Curve Compound",
  "Curve USDT",
  "Curve Y",
  "Curve Binance",
  "Curve Synthetix",
  "Uniswap Compound",
  "Uniswap CHAI",
  "Uniswap Aave",
  "Mooniswap",
  "Uniswap V2",
  "Uniswap V2 ETH",
  "Uniswap V2 DAI",
  "Uniswap V2 USDC",
  "Curve Pax",
  "Curve renBTC",
  "Curve tBTC",
  "Dforce XSwap",
  "Shell",
  "mStable mUSD",
  "Curve sBTC",
  "Balancer 1",
  "Balancer 2",
  "Balancer 3",
    "Kyber 1",
  "Kyber 2",
  "Kyber 3",
  "Kyber 4"
];

oneSplitContract.methods.getExpectedReturn(fromTokenAdress, toTokenAdress, new BigNumber(amount).shiftedBy(weiEthDecimals), 100, 0).call({}, (err,res)=> {
  if (err) {
    console.log(err)
  }
  console.log(`
    from: ${fromTokenAdress} 
    to: ${toTokenAdress} 
    amount: ${amount}
    returnAmount: ${new BigNumber(res.returnAmount).shiftedBy(-weiEthDecimals)}
  `)
  res.distribution.forEach((e, idx)=> {
    console.log(splitExchanges[idx] + ' : ' + e)
  }) 
})
