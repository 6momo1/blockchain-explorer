import Web3 from "web3";
import { BUSD_WBNB_LP } from "../constants";
import { createContract } from "./createContract";
import {getReserves} from '../types'
export async function fetchBNBPrice(web3:Web3) {

    let bnbPrice:getReserves
    const WBNBLPContract = createContract(
        web3,
        BUSD_WBNB_LP,
        'liquidityPool'
    );
    bnbPrice = await WBNBLPContract.methods
        .getReserves()
        .call();

    return parseInt(bnbPrice._reserve1) / parseInt(bnbPrice._reserve0)
}