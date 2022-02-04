import Web3 from "web3";

function isNumeric(n: any): n is number | string {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function intVal(n: number | string): number {
  return typeof n === "number" ? n : parseInt(n, 10);
}

export async function getBlockTimestamp(web3: Web3, blockNum): Promise<any> {
  try {
    const blockInfo = await web3.eth.getBlock(blockNum);
    return isNumeric(blockInfo.timestamp)
      ? blockInfo.timestamp
      : parseInt(blockInfo.timestamp);
  } catch (error) {
    throw error;
  }
}

export const getCurrentBlockNumber = async (web3): Promise<number> => {
  let bNumber = -1;
  try {
    bNumber = await web3.eth.getBlockNumber();
  } catch (error) {
    throw error;
  }
  return bNumber;
};

export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

