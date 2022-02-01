Table TokenInfo {
  poolAddress varchar(42) [ref: - TokenPool.poolAddress]
  tokenAddress varchar(42) [pk]
  name varchar
  symbol varchar
  decimals int
  supply  int

}

Table TokenPool {
  tokenAddress varchar(42) [ref: - TokenInfo.tokenAddress]
  poolAddress varchar(42) [pk]
  token0 varchar(42)
  token1 varchar(42)
  liquidity number
}

Table SwapTransaction {
  transactionHash varchar(66) [pk]
  poolAddress varchar(42) [ref: > TokenPool.poolAddress]
  blockHash varchar 
  transactionIndex int
  id int
  event varchar
  block int
  timestamp int
  sender varchar
  amount0In int
  amount1In int
  amount0Out int
  amount1Out int
}

-- or 

Table TokenInfo {
  poolAddress varchar(42) [ref: < TokenPool.poolAddress]
  tokenAddress varchar(42) [pk]
  name varchar
  symbol varchar
  decimals int
  supply  int

}

Table TokenPool {
  poolAddress varchar(42) [pk]
  token0 varchar(42)
  token1 varchar(42)
  liquidity number
}

Table SwapTransaction {
  transactionHash varchar(66) [pk]
  poolAddress varchar(42) [ref: > TokenPool.poolAddress]
  blockHash varchar 
  transactionIndex int
  id int
  event varchar
  block int
  timestamp int
  sender varchar
  amount0In int
  amount1In int
  amount0Out int
  amount1Out int
}