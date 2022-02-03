
process:
transaction hash length: 66 -2
sender lenght = 42 -2


input:
- tokenAddress

internal:
program should find out: 
- tokenInfo
- poolAddress
- swap history


find out contract pair:
- go through holders
- see which is contract

Possible Schemas:
tokenInfo: {
    name
    symbol
    decimals
    supply
    poolAddress
    tokenAddress
}

tokenPool {
    tokenAddress
    token0
    token1
    totalLiquidity
}

swapHistory {
    tokenAddress
    Swaps
}

Swap {
  blockHash: string,
  blockNumber:number,
  timestamp: number,
  transactionIndex: number,
  sender: string,
  transactionHash: string,
  id: string,
  event: string,
  amount0In: number,
  amount1In: number,
  amount0Out: number,
  amount1Out: number
}


difficulties:
- how can I organize clients? E.g. I have to pass web3 everywhere
- how can I cache timestamp? So that I don't need to fetch block timestamp every time
- how to measure latency? 
- how can I sync to database
- from which block should I start syncing?

update pool liquidity

additional features:
- liquidity pool amount

