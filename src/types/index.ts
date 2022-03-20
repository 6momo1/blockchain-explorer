
export interface SwapEvent {
  address: string;
  blockHash: string;
  blockNumber: number;
  logIndex: number;
  removed?: Boolean;
  transactionHash: string;
  transactionIndex: number;
  id?: string;
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

export type PrimaryToken = {
  value: 1 | 0
  address: string,
  secondaryAddress?: string,
  seondaryValue?: 1 | 0
}

export interface Transaction {
  // bought {amount} denominatorToken's at {price}
  amount: number;
  price: number;
}

export type Trade = {
  token0TradedAmount: number;
  token1TradedAmount: number;
  bought: boolean;
  valuedAt: number;
  priceTraded: number;
  transactionHash: string
  estimateTimestamp: number
};

export interface EtherscanTransactionResponse {
  status: string;
  message: string;
  result: [EtherscanTransaction];
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
  sender?: string;
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

export interface getReserves {
  0: string;
  1: string;
  2: string;
  _blockTimestampLast: string;
  _reserve0: string;
  _reserve1: string;
}

export interface BSCTokenReserveState {
  hourStartUnix: number;
  id: number,
  pair: { 
    token0: { id: string }; 
    token1: { id: string } 
  }
  reserve0: string;
  reserve1: string;
  reserveUSD: string
}

export interface TokenInfo {
  name: string;
  decimals: number;
  symbol: string;
  totalSupply: number;
  tokenAddress: string;
  USDCPairAddress?: string;
  USDTPairAddress?: string;
  BUSDPairAddress?: string;
  WETHPairAddress?: string;
  WBNBPairAddress: string;
  WBNBPoolInfo?: PoolInfo
}

export interface TokenPairInfo {
  tokenInfo0: TokenInfo,
  tokenInfo1: TokenInfo,
  token0: string,
  token1: string,
  denominatorToken: number,
  numeratorToken:number,
  tokenOfInterest:number,
  primaryTokenInfo:TokenInfo,
  secondaryTokenInfo:TokenInfo
}

interface PoolInfo {
  token0: string,
  token1: string,
  denominatorToken: number,
  numeratorToken:number,
}

export interface TokenInfoBinance {
  name: string;
  decimals: number;
  symbol: string;
  totalSupply: number;
  tokenAddress: string;
  BUSDPairAddress: string;
}
