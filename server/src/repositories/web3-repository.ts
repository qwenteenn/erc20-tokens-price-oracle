import { publicClient } from '@/conf/viem.ts'
import { PRICE_ORACLE_ABI } from '@/constants.ts'
import { oracleRepository } from '@/repositories/oracle-repository.ts'
import { priceRepository } from '@/repositories/price-repository.ts'
import { parseEventLogs } from 'viem'

const web3Actions = () => {
  const listenToRequests = () => {
    publicClient.watchEvent(
      oracleRepository.priceUpdatedEvent(async (logs) => {
        const decoded = parseEventLogs({
          abi: PRICE_ORACLE_ABI,
          logs,
        })
        const [firstLog] = decoded
        // @ts-ignore
        const { requester, symbol, currency } = firstLog.args

        if (!requester || !symbol || !currency) return

        console.log(`🔔 Request by ${requester} for ${symbol}/${currency}`)
        await priceRepository.update(requester, symbol, currency).catch(console.error)
      }),
    )
  }

  return {
    listenToRequests,
  } as const
}

export const web3Repository = web3Actions()
