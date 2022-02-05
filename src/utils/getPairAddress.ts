import Web3 from 'web3'
import { UNI_FACTORY_ADDRESS } from '../constants'
import { createContract } from './createContract'

export async function getUniswapPairAddress(web3:Web3, address0:string,address1:string ): Promise<string> {
    let uniFactoryContract = await createContract(web3, UNI_FACTORY_ADDRESS, "uniFactory")
    let pairAddress:string
    try {
       pairAddress = await uniFactoryContract.methods.getPair(address0, address1).call() 
    } catch (error) {
       console.log(error);
       throw new Error(`Failed to fetch uniswap pair address for token ${address0} and ${address1}.`)
    }
    return pairAddress
}


export async function getSushiSwapPairAddress(web3:Web3, address0: string, address1:string) {
    return
}