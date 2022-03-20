import Web3 from 'web3'
import appConfig from '../src/config'
import { CAKE_ADDRESS, WBNB_CAKE_LP , BUSD_WBNB_LP} from '../src/constants'
import { fetchHistoricalReserves } from '../src/utils/fetchHistoricalReserves'

describe("Test historical reserves", () => {

    it.only("Should fetch historical token reserve data by minute", async () => {
        let lpAddres = BUSD_WBNB_LP
        const web3 = new Web3(appConfig.archiveEndpoint)
        // let recentTime = Math.floor(Date.now() / 1000)
        // let oldestTime = recentTime - 60 * 60 * 24 * 30// = 30 days
        let interval = 60
        let currentDate = new Date()
        // let recentTime = Math.floor(Date.now() / 1000)
        let recentTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours()).getTime() /1000

        let oldestTime = recentTime - (60 * 60 * 24 * 30)// = 30 days ago
        // console.log(recentTime,oldestTime);
        
        const minuteData = await fetchHistoricalReserves(web3, lpAddres, oldestTime, recentTime, interval)
        // console.log(minuteData);
    })
})