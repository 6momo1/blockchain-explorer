import Web3 from "web3";
import http from "http";
import dotenv from 'dotenv'
// import fetch from "node-fetch";
import axios, { AxiosResponse } from 'axios'
import { EtherscanTransaction, EtherscanTransactionResponse } from "../types/types";


export async function searchContractCreationBlock(
  web3: Web3,
  contract_address: string
): Promise<number> {
  var highest_block = await web3.eth.getBlockNumber();
  var lowest_block = Math.floor((14034615 + highest_block) / 2);

  var contract_code = await web3.eth.getCode(contract_address, highest_block);
  if (contract_code == "0x") {
    throw new Error("Contract " + contract_address + " does not exist!");
  }

  while (lowest_block <= highest_block) {
    let search_block = Math.floor((lowest_block + highest_block) / 2);
    contract_code = await web3.eth.getCode(contract_address, search_block);

    //console.log(highest_block, lowest_block, search_block, contract_code);

    if (contract_code != "0x") {
      highest_block = search_block;
    } else if (contract_code == "0x") {
      lowest_block = search_block;
    }

    if (highest_block == lowest_block + 1) {
      return highest_block;
    }
  }
  throw new Error("Failed to search contract creation block")
}

// data-original-title="Creator Txn Hash"
export async function searchAddressFirstTx(address:string):Promise<EtherscanTransaction> {
  const apiKey = "X59Z9SXR47SUTUK7C3KERAJ7J3VUCI5IJJ" // must change this
  const startblock = 0
  const endBlock = 99999999
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=${endBlock}&page=1&offset=10&sort=asc&apikey=${apiKey}`;

  let res:AxiosResponse<EtherscanTransactionResponse>
  try {
    res = await axios.get(url)
  } catch (error) {
      throw error
  }
return res.data.result[0]
}

// export async function search_contract_creator(
//   web3: Web3,
//   contract_address: string,
//   blockNumber: number
// ) {
//   let block = await web3.eth.getBlock(blockNumber);

//   let transactions = block.transactions;

//   let creator = -1;
//   for (let i = 0; i < transactions.length; i++) {
//     const transaction:string = transactions[i];
//     // let receipt = await web3.eth.getTransactionReceipt(
//     //   transactions[transaction]
//     // );
//     if (receipt.contractAddress == contract_address) {
//       return receipt.from;
//     }
//   }

//   return -1;
// }

// export async function find_contract_creator(web3: Web3, contract_address) {
//   var block = await searchContractCreationBlock(web3, contract_address);
//   var creator = await search_contract_creator(web3, contract_address, block);
//   return creator;
// }
