import { AbiItem } from "web3-utils";
import { TOKEN_PAIR_POOL_ABI, UNISWAP_FACTORY_ABI } from "../constants/abis";
import Web3 from 'web3'

export async function createContract(web3:Web3, address:string, addressType: string) {
  if (addressType == "uniFactory") {
    return new web3.eth.Contract(
      UNISWAP_FACTORY_ABI as AbiItem[],
      address
    );
  } else if (addressType == "tokenPool") {
    return new web3.eth.Contract(
      TOKEN_PAIR_POOL_ABI as AbiItem[],
      address
    );
} else {
    throw new Error(
      "Could not instantiate web3 contract instance. Invalid address type input."
    );
  }
}
