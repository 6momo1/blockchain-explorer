export interface SwapEvent {
  address: string;
  blockHash: string;
  blockNumber: number;
  logIndex: number;
  removed: Boolean;
  transactionHash: string;
  transactionIndex: number;
  id: string;
  returnValues: {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
    sender: string;
    amount0In: string;
    amount1In: string;
    amount0Out: string;
    amount1Out: string;
    to: string;
  };
  event: string;
  signature: any;
  raw: {
    data: string;
    topics: any[];
  };
}
export interface EtherscanTransactionResponse {
  status: string,
  message: string,
  result: [EtherscanTransaction]
}

export interface EtherscanTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
}

export interface Swap {
  transactionHash: string;
  poolAddress: string;
  blockHash: string;
  blockNumber: number;
  timestamp?: number;
  transactionIndex: number;
  sender: string;
  event: string;
  amount0In: number;
  amount1In: number;
  amount0Out: number;
  amount1Out: number;
}

export interface SwapResult {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  sender: string;
  amount0In: string;
  amount1In: string;
  amount0Out: string;
  amount1Out: string;
  to: string;
}

export interface TokenInfo {
  name: string;
  decimals: number;
  symbol: string;
  totalSupply: number;
  tokenAddress: string;
  WETHPairAddress: string;
  USDCPairAddress: string;
  USDTPairAddress: string;
}
