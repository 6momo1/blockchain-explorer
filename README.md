

Roadmap:
- [x] fetch token information
- [x] discover when contract was created
- [x] fetch token liquidity pair
- [] fetch token swaps
- [] listen for swaps via socket


fetch token swaps process:
1. input: token address
1. get token liquidity pool address
1. find out when the contract was created
1. fetch swaps from the day it was created
1. update datbase
1. listen for swaps on socket

notes:
- handle edge cases for all functions

bugs:
- search address first transaction may take more than 1 try to get result (?)
- find a better way to incorporate api keys, especially in the etherscan search addrs first tx function