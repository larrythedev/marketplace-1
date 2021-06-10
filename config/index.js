const IS_MAINNET = process.env.NETWORK === 'mainnet'

const PROXY_URL = process.env.NODE_ENV === 'production'
  ? 'https://leda.gojupiter.tech/'
  : 'http://localhost:8000'

const JUPITER_URL = 'https://newnode.gojupiter.tech'
const ERC_CHAIN_ID = IS_MAINNET ? 1 : 4

const GATEWAY = IS_MAINNET
  ? '0x3bFe8E530DaeadC773950892E1ab69EA2bdc25Dc'
  : '0x90eccEE390e9172e6091e1B14678a79D2F564cB5'

const CONTRACTS = IS_MAINNET
  ? {
    NFT: '0x60f80121c31a0d46b5279700f9df786054aa5ee5',
    ERC: '0x4b1e80cac91e2216eeb63e29b957eb91ae9c2be8',
    BEP: '0x0231f91e02DebD20345Ae8AB7D71A41f8E140cE7'
  }
  : {
    NFT: '0xd8B023AA2D99e6036ec5d59f0f025Ef44AE47f7E',
    ERC: '0xEDCC73f4763378E00B9a9602d5cB8e9697cC6B86',
    BEP: '0x770e1a8A1c04B5abdb54F810253540E91959488c'
  }

export {
  PROXY_URL,
  JUPITER_URL,
  ERC_CHAIN_ID,
  GATEWAY,
  CONTRACTS
}