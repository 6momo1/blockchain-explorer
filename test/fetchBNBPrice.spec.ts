import Web3 from "web3"
import appConfig from "../src/config"
import { fetchBNBPrice } from "../src/utils/fetchBNBPrice"

describe("Testing fetch current bnb price", () => {
    it("Should fetch current BNB price", async() => {
        const web3 = new Web3(appConfig.publicEndpoint)
        let bnbPrice = await fetchBNBPrice(web3)
        expect(bnbPrice).not.toBe(0)
    })
})