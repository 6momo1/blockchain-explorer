import Web3 from "web3"
import appConfig from "../src/config"
import Blocks from "../src/utils/blockTimestamp"
import fs from 'fs'

jest.useRealTimers();
describe("Testing timestamp to block number", () => {
    it("Should return block number closest to a timestamp", async () => {
        // const web3 = new Web3(appConfig.archiveEndpoint)
        let res = await new Blocks(appConfig.archiveEndpoint).getDate('latest')
        expect(res).not.toBe(undefined)
        expect(res).not.toBe(null)

    })
    it("Should return a day's worth of timestamp with hour interval", async () => {
        let currentDate = new Date()
        let currentUnix = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours()).getTime() / 1000
        let hour = 60 * 60 // 1 hour in seconds
        const blocks = new Blocks(appConfig.archiveEndpoint)
        let res = []
        for (let i = 0; i < 24; i++) {
            const b = await blocks.getDate((currentUnix - (i * hour)).toString())
            res.push(b)
        }

        console.log(res);
    }, 1000 * 60 * 60)

    it.only("Should write a months worth of hourly timestamp (feb to march) to a json file", async () => {
        // let currentUnix = 1647655200
        let currentDate = new Date()
        let currentUnix = new Date(currentDate.getFullYear(), currentDate.getMonth()).getTime() / 1000
        let hour = 60 * 60 // 1 hour in seconds

        const blocks = new Blocks(appConfig.archiveEndpoint)
        let res = []
        for (let i = 0; i < 24 * 28; i++) {
            const b = await blocks.getDate((currentUnix - (i * hour)).toString())
            res.push(b)
        }
        const jsonContent = JSON.stringify(res);

        fs.writeFile("src/constants/timestampDB.json", jsonContent, 'utf8', (err) => {
            if (err) {
                return console.log(err);
            }
            // console.log("The file was saved!");
        });
        // console.log(res);
        expect(res).toHaveLength(24*28)
    }, 1000 * 60 * 60* 10)
})