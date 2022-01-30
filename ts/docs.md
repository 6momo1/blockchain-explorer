
process:

find out contract pair:
- find out uniswap pair contract ( can be done manually )
- figure out which is token1 and token0 ( can be done manually )
- find out which block to sync prices from ( can be done manually )

sync
- to database
- 


Example:

UNISWAP PAIRS:
year and eth: 
- 0x9A1071d17b8126679Aeca3EF152F784bca339c3A
- block created: 13910265
- token address: 9010a15184da16e3a7c5b4aa50094dfe3bb36989
- paired token: 42960c7f91e7aca98f374296df900cb4d6b09601
- token0 = wrapped eth
- token1 = year

npx ts-node ./event_scanner.ts eth 0x9A1071d17b8126679Aeca3EF152F784bca339c3A 13910265 13910965 100 Swap tokenExchange


issues:
- how can I organize clients? E.g. I have to pass web3 everywhere
- how can I cache timestamp?
- how to measure latency
