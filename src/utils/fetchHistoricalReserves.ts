import Web3 from "web3";
import { createContract } from "./createContract";


async function getPrice(contract: any, blockNumber: number, bnbPrice?: number) {
    // contract.defaultBlock = blockNumber
    let response = await contract.methods.getReserves().call({}, blockNumber);
    let price =
        parseInt(response._reserve1) / parseInt(response._reserve0);
    if (bnbPrice) {
        price = price * bnbPrice
    }
    return price
}

function unixToDate(unixTime: number | string) {
    if (typeof unixTime == 'string') {
        unixTime = parseInt(unixTime)
    }
    const date = new Date(unixTime * 1000);
    return date
}

function unixToTimestring(unixTime: number | string) {
    let date = unixToDate(unixTime)
    return date.toLocaleTimeString()
}

function secondsToBlocks(seconds: number, newBlockRate: number) {
    // newBLockRate = new block / second
    return Math.floor(seconds * newBlockRate)
}




export async function fetchHistoricalReserves(web3: Web3, lpAddres: string, fromTimestamp: number, toTimestamp: number, interval: number) {

    if (fromTimestamp > toTimestamp) {
        throw new Error("'fromTimestamp' cannot be created than 'toTimestamp'")
    }
    const lpContract = createContract(web3, lpAddres, 'liquidityPool')
    try {
        console.log('****************************');

        let b = 6810706 + 100000

        let creationDate = await getPrice(lpContract, b)
        console.log('CREATION','BLOCK',lpContract.defaultBlock, 'PRICE**', creationDate);

        // let currentPrice = await getPrice(WBNBLPContract, currentBlockNumber, bnbPrice)
        // console.log('CURRENT TIME','BLOCK',WBNBLPContract.defaultBlock, 'PRICE**', currentPrice);

        // for (let i = 0; i < 24; i++) {
        // WBNBLPContract.defaultBlock = currentBlockNumber - (3600 * i);
        // let dayPrice = await getPrice(WBNBLPContract, currentBlockNumber - secondsToBlocks(3600 * 23, newBlockRate), bnbPrice)
        // console.log(i, 'AGO...','BLOCK',WBNBLPContract.defaultBlock, 'PRICE**', dayPrice);
        // }

        console.log('****************************');
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch historical Prices");
    }

}