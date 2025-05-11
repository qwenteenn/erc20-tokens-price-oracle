import TOKEN_CONSUMER_CONTRACT from "@consumer/build/contracts/TokenConsumer.json" with { type: "json" };
import process from "node:process";
import type { Address, Hex } from "viem";

export const TOKEN_CONSUMER_ABI = TOKEN_CONSUMER_CONTRACT.abi;

export const PRIVATE_KEY = process.env.PRIVATE_KEY as Hex;
export const TOKEN_CONSUMER_ADDRESS = process.env
  .TOKEN_CONSUMER_ADDRESS! as Address;

export const DEFAULT_TOKEN_SYMBOL = "ETHEREUM";
export const DEFAULT_CURRENCY = "USD";
