import { PRIVATE_KEY, SELECTED_CHAIN } from '@/constants.ts'
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

const account = privateKeyToAccount(PRIVATE_KEY)

export const publicClient = createPublicClient({
  chain: SELECTED_CHAIN,
  transport: http(),
})

export const walletClient = createWalletClient({
  account,
  chain: SELECTED_CHAIN,
  transport: http(),
})
