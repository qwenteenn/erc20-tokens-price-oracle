import { CHAIN_ID, DEFAULT_CURRENCY, PRICE_ORACLE_ABI, PRICE_ORACLE_CONTRACT_ADDRESS } from '@/constants.ts'
import type { Currency } from '@/models/currency.ts'
import { type Address } from 'viem'

const oracleActions = () => {
  const updatePrice = (requester: Address, symbol: string, currency: Currency = DEFAULT_CURRENCY, price: bigint) => ({
    address: PRICE_ORACLE_CONTRACT_ADDRESS[CHAIN_ID],
    abi: PRICE_ORACLE_ABI,
    functionName: 'updatePrice',
    args: [requester, symbol, currency, price],
  })

  const priceUpdatedEvent = (callback: (logs: any) => void) => ({
    address: PRICE_ORACLE_CONTRACT_ADDRESS[CHAIN_ID],
    abi: PRICE_ORACLE_ABI,
    eventName: 'PriceUpdateRequested',
    onLogs: callback,
  })

  return {
    updatePrice,
    priceUpdatedEvent,
  } as const
}

export const oracleRepository = oracleActions()
