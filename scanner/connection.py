from web3 import Web3, EthereumTesterProvider
import os
import sys
from dotenv import load_dotenv
load_dotenv()

if len(sys.argv) < 2:
    print("Usage: eventscanner.py <NETWORK TO BE TESTED>")
    sys.exit(1)

network = sys.argv[1]
if network == "BSC":
    w3 = Web3(Web3.HTTPProvider(os.getenv('BSC_ENDPOINT_URL')))
elif network == "ETH":
    w3 = Web3(Web3.HTTPProvider(os.getenv('ETH_ENDPOINT_URL')))
else:
    print(f"{network} is not a supported network")
    sys.exit(1)
    
print(w3.isConnected())