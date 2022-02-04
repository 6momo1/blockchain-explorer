import Web3 from 'web3'
import { UNI_FACTORY_ADDRESS } from '../constants'
import { createContract } from './createContract'

export async function getUniswapPairAddress(web3:Web3, address0:string,address1:string ) {
    let uniFactoryContract = await createContract(web3, UNI_FACTORY_ADDRESS, "uniFactory")
    return await uniFactoryContract.methods.getPair(address0, address1).call()
}

export async function getSushiSwapPairAddress(web3:Web3, address0: string, address1:string) {
    return
}