

import Web3 from 'web3';
import {ERC20_FULL_ABI} from '../constants/abis'
import { AbiItem } from "web3-utils";
import { TokenInfo } from '../types/types';

export async function fetchTokenInfo(web3:Web3, tokenAddress: string, poolAddress: string): Promise<TokenInfo> {
    // const bnum = await web3.eth.getBlockNumber()
    // console.log(bnum)

    const tokenContract = new web3.eth.Contract(ERC20_FULL_ABI as AbiItem[], tokenAddress)
    const name = await tokenContract.methods.name().call()
    const decimals = await tokenContract.methods.decimals().call()
    const symbol = await tokenContract.methods.symbol().call()
    const totalSupply = await tokenContract.methods.totalSupply().call()

    // const name = "name"
    // const decimals = 2222
    // const symbol = "symbol"
    // const totalSupply= 1111

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