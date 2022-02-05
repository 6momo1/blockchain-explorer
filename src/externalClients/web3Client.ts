import Web3 from 'web3'
import dotenv from 'dotenv'
dotenv.config()

const web3 = new Web3(process.env["ETH_ENDPOINT_URL"])
const wssWeb3 = new Web3(process.env["WSS_ETH_ENDPOINT"])
export{
    web3,
    wssWeb3
}

