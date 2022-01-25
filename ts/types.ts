export interface SwapEvent {
  address: String,
  blockHash: String,
  blockNumber: number,
  logIndex: number,
  removed: Boolean,
  transactionHash: String,
  transactionIndex: number,
  id: String,
  returnValues: {
    Result: SwapResult
  },
  event: String,
  signature: any,
  raw: {
    data: String,
    topics: any[]
  }
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