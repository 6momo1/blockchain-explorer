export interface SwapEvent {
  address: string,
  blockHash: string,
  blockNumber: number,
  logIndex: number,
  removed: Boolean,
  transactionHash: string,
  transactionIndex: number,
  id: string,
  returnValues: {
    '0': string,
    '1': string,
    '2': string,
    '3': string,
    '4': string,
    '5': string,
    sender: string,
    amount0In: string,
    amount1In: string,
    amount0Out: string,
    amount1Out: string,
    to: string
  },
  event: string,
  signature: any,
  raw: {
    data: string,
    topics: any[]
  }
}

export interface Swap {
  block?:number,
  time?: Date,
  sender: string,
  transactionHash: string,
  amount0In?: string,
  amount1In: string,
  amount0Out: string,
  amount1Out: string
}

export interface SwapResult {
  '0': string,
  '1': string,
  '2': string,
  '3': string,
  '4': string,
  '5': string,
  sender: string,
  amount0In: string,
  amount1In: string,
  amount0Out: string,
  amount1Out: string,
  to: string
}