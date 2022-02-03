

import Web3 from 'web3';
import {ERC20_FULL_ABI} from '../constants/abis'
import { AbiItem } from "web3-utils";
import { TokenInfo } from '../types/types';

export async function fetchTokenInfo(web3:Web3, tokenAddress: string, poolAddress: string): Promise<TokenInfo> {
 
    const tokenContract = new web3.eth.Contract(ERC20_FULL_ABI as AbiItem[], tokenAddress)
    const name = await tokenContract.methods.name().call()
    const symbol = await tokenContract.methods.symbol().call()
    let totalSupply = await tokenContract.methods.totalSupply().call()
    let decimals = await tokenContract.methods.decimals().call()

    decimals = parseInt(decimals)
    totalSupply = parseInt(totalSupply)
    tokenAddress = tokenAddress.toLowerCase()
    poolAddress = poolAddress.toLowerCase()

    const ret = {
        name,
        decimals,
        symbol,
        totalSupply,
        tokenAddress,
        poolAddress,
    }
    return ret
}