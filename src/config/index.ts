
interface AppConfig  {
    archiveEndpoint : string,
    publicEndpoint: string,
}

const appConfig:AppConfig = {
    archiveEndpoint: "https://speedy-nodes-nyc.moralis.io/c8ccd1da3dba5d5443566b69/bsc/mainnet/archive",
    publicEndpoint: "https://bsc-dataseed.binance.org/"
}
export default appConfig
