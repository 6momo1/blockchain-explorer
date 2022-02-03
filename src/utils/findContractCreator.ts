import Web3 from 'web3'

export async function searchContractCreationBlock(web3:Web3, contract_address:string):Promise<number> {
    var highest_block = await web3.eth.getBlockNumber();
    var lowest_block = 0;

    var contract_code = await web3.eth.getCode(contract_address, highest_block);
    if (contract_code == "0x") {
        throw new Error("Contract " + contract_address + " does not exist!")
    }

    while (lowest_block <= highest_block) {
        let search_block = ((lowest_block + highest_block) / 2)
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

}

export async function search_contract_creator (web3:Web3, contract_address:string, blockNumber:number) {
    let block = await web3.eth.getBlock(blockNumber);

    let transactions = block.transactions;

    let creator = -1
    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        let receipt = await web3.eth.getTransactionReceipt(transactions[transaction]);
        
        if (receipt.contractAddress == contract_address) {
            return receipt.from
        }
    }

    return -1;
}

export async function find_contract_creator (web3:Web3, contract_address) {
    var block = await searchContractCreationBlock(web3,contract_address);
    var creator = await search_contract_creator(web3,contract_address, block);
    return creator;
}