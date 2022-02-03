import Web3 from 'web3'

async function search_contract_cretion_block(contract_address) {
    var highest_block = await web3.eth.getBlockNumber();
    var lowest_block = 0;

    var contract_code = await web3.eth.getCode(contract_address, highest_block);
    if (contract_code == "0x") {
        console.error("Contract " + contract_address + " does not exist!");
        return -1;
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

async function search_contract_creator (contract_address, block) {
    var block = await web3.eth.getBlock(block);

    var transactions = block.transactions;

    for (transaction in transactions) {
        let receipt = await web3.eth.getTransactionReceipt(transactions[transaction]);

        //console.log(receipt);

        if (receipt.contractAddress == contract_address) {
            return receipt.from
        }
    }

    return -1;
}

async function find_contract_creator (contract_address) {
    var block = await search_contract_cretion_block(contract_address);
    var creator = await search_contract_creator(contract_address, block);
    return creator;
}