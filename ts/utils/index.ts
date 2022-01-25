import Web3 from "web3"

export async function getBlockTimestamp(web3: Web3, blockNum):Promise<Number|String|null> {
    try {
        const blockInfo = await web3.eth.getBlock(blockNum)
        return blockInfo.timestamp
    } catch (error) {
        return null
    }
}


const getCurrentBlockNumber = async (): Promise<number> => {
    let bNumber = -1
    await web3.eth.getBlockNumber()
        .then( res => {
            res = bNumber
        })
    return bNumber
}