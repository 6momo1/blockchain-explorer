import dotenv from 'dotenv'
dotenv.config()
import ethers from 'ethers'

const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_ENDPOINT_URL);
// const wallet = new ethers.Wallet(privateKey)
// const account2 = wallet.connect(provider);

const factory = new ethers.Contract(
'0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
[
    'event Transfer(address indexed from, address indexed to, uint256 value)',
    'event Approval(address indexed owner, address indexed spender, uint256 value)',
]
);

factory.on('Transfer', async (from, to, value) => {
    console.log('transfer ' + from + ' ' + to + ' ' + value)
})