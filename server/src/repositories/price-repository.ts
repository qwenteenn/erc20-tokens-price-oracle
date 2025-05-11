import { walletClient } from '@/conf/viem.ts'
import { COINGECKO_HOST, DEFAULT_CURRENCY } from '@/constants.ts'
import type { Currency } from '@/models/currency.ts'
import { oracleRepository } from '@/repositories/oracle-repository.ts'
import { type Address } from 'viem'

const priceActions = () => {
  const getTokenPrice = async (symbol: string, currency: Currency = DEFAULT_CURRENCY): Promise<number> => {
    const res = await fetch(
      `${COINGECKO_HOST}/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=${currency.toLowerCase()}`,
    )
    if (!res.ok) throw new Error('Invalid symbol or currency')

    const data = (await res.json()) as Record<string, Record<string, number>>
    const price = data[symbol.toLowerCase()]?.[currency.toLowerCase()]
    if (!price) throw new Error('Invalid symbol or currency')

    return price
  }

  const update = async (requester: Address, symbol: string, currency: Currency = DEFAULT_CURRENCY): Promise<void> => {
    const price = await getTokenPrice(symbol, currency)
    const scaledPrice = BigInt(Math.round(price * 1e8))

    console.log(`[${symbol}/${currency}] ${price} → ${scaledPrice.toString()}`)
    // @ts-ignore
    const txHash = await walletClient.writeContract(
      oracleRepository.updatePrice(requester, symbol, currency, scaledPrice),
    )

    console.log(`✅ TX sent: ${txHash}`)
  }

  return {
    getTokenPrice,
    update,
  } as const
}

export const priceRepository = priceActions()
