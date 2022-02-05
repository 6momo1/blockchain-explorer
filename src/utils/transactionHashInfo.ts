import { isAssertClause } from "typescript"
import Web3 from "web3"
import { Transaction } from "web3-eth"
import logger from "../externalClients/logger"


export const transactionHashInfo = async (web3: Web3, transactionHash: string): Promise<Transaction> => {
    let res = await web3.eth.getTransaction(transactionHash)
    return res
}

export const transactionHashCaller = async (web3: Web3, transactionHash: string): Promise<string> => {
    
    if (!transactionHash) throw new Error("Transaction hash value is undefined")

    let res = await web3.eth.getTransaction(transactionHash).catch( err => {
        console.log(err)
        throw new Error("Failed to call web3.eth.getTransaction(transactionHash)")        
    })
    return res.from
}