require('dotenv').config();
import Web3 from 'web3';



const web3 = new Web3(process.env["ETH_ENDPOINT_URL"]);
YEAR_ADDRESS = "0x9010a15184da16e3a7c5b4aa50094dfe3bb36989"
const myContract = new Web3.Contract(ABI, YEAR_ADDRESS);

ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]

let options = {
    filter: {
        value: ['1000', '1337']    //Only get events where transfer value was 1000 or 1337
    },
    fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
    toBlock: 'latest'
};

myContract.getPastEvents('Transfer', options)
    .then(results => console.log(results))
    .catch(err => {throw err});