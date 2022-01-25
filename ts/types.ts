export interface Event {
    address: String,
    blockHash: String,
    blockNumber: number,
    logIndex: number,
    removed: Boolean,
    transactionHash: String,
    transactionIndex: number,
    id: String,
    returnValues: {
        Result: {}
    },
    event: String,
    signature: any,
    raw: {
      data: String,
      topics: any[]
    }
}