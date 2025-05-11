import type { Currency } from '@/models/currency.ts'
import PRICE_ORACLE_CONTRACT from '@oracle/build/contracts/PriceOracle.json' with { type: 'json' }
import process from 'node:process'
import { type Address, type Chain, type Hex } from 'viem'
import { bsc, localhost, mainnet, polygon, sepolia } from 'viem/chains'

export const PRICE_ORACLE_ABI = PRICE_ORACLE_CONTRACT.abi

export const PRIVATE_KEY = process.env.PRIVATE_KEY as Hex
export const CHAIN_ID = Number(process.env.CHAIN_ID ?? localhost.id)

export const MAINET_PRICE_ORACLE_ADDRESS = process.env.MAINET_PRICE_ORACLE_ADDRESS! as Address
export const SEPOLIA_PRICE_ORACLE_ADDRESS: Address = process.env.SEPOLIA_PRICE_ORACLE_ADDRESS! as Address
export const BSC_PRICE_ORACLE_ADDRESS: Address = process.env.BSC_PRICE_ORACLE_ADDRESS! as Address
export const GANACHE_PRICE_ORACLE_ADDRESS: Address = process.env.GANACHE_PRICE_ORACLE_ADDRESS! as Address
export const POLYGON_PRICE_ORACLE_ADDRESS: Address = process.env.POLYGON_PRICE_ORACLE_ADDRESS! as Address

export const APP_CHAINS: Chain[] = [mainnet, sepolia, bsc, localhost, polygon]
export const SELECTED_CHAIN = APP_CHAINS.find((chain) => chain.id === CHAIN_ID)

export const PRICE_ORACLE_CONTRACT_ADDRESS: Record<Chain['id'], Address> = {
  [mainnet.id]: MAINET_PRICE_ORACLE_ADDRESS,
  [sepolia.id]: SEPOLIA_PRICE_ORACLE_ADDRESS,
  [bsc.id]: BSC_PRICE_ORACLE_ADDRESS,
  [localhost.id]: GANACHE_PRICE_ORACLE_ADDRESS,
  [polygon.id]: POLYGON_PRICE_ORACLE_ADDRESS,
}

export const DEFAULT_CURRENCY: Currency = 'USD'

export const COINGECKO_HOST = 'https://api.coingecko.com/api/v3'
