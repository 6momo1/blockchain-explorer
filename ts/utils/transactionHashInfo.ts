import Web3 from "web3"
import { Transaction } from "web3-eth"


export const transactionHashInfo = async (web3: Web3, transactionHash: string): Promise<Transaction> => {
    let res = await web3.eth.getTransaction(transactionHash)
    return res
}

export const transactionHashSender = async (web3: Web3, transactionHash: string): Promise<String> => {
    let res = await web3.eth.getTransaction(transactionHash)
    return res.from
}