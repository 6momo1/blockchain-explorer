
process:


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


difficulties:
- how can I organize clients? E.g. I have to pass web3 everywhere
- how can I cache timestamp? So that I don't need to fetch block timestamp every time
- how to measure latency? 
- how can I sync to database
- from which block should I start syncing?


additional features:
- liquidity pool amount

