

import Web3 from 'web3';
import {ERC20_FULL_ABI} from '../constants/abis'
import { AbiItem } from "web3-utils";
import { TokenInfo } from '../types/types';

function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }

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