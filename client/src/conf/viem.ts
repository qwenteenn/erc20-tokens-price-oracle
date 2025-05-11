import { createPublicClient, createWalletClient, http } from "viem";
import { localhost } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { PRIVATE_KEY } from "@/constants.ts";

export const account = privateKeyToAccount(PRIVATE_KEY);

export const publicClient = createPublicClient({
  chain: localhost,
  transport: http(),
});

export const walletClient = createWalletClient({
  account,
  chain: localhost,
  transport: http(),
});
