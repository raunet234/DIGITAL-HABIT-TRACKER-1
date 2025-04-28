// src/services/blockchainService.js

import { IotaClient, getFullnodeUrl } from '@iota/iota-sdk/client';

/**
 * Send MIOTA to a recipient address on the IOTA Tangle.
 *
 * @param {string} recipientAddress   Bech32-encoded IOTA address (e.g., "rms1q…").
 * @param {number} amountMiota        Amount in MIOTA to send (1 MIOTA = 1 000 000 IOTA).
 * @returns {Promise<{ messageId: string }>}  The Tangle message identifier.
 */
export async function sendMiotaRewardTransaction(recipientAddress, amountMiota) {
  // 1. Initialize the client for Devnet
  const client = new IotaClient({
    url: getFullnodeUrl('devnet')            // get Devnet RPC URL :contentReference[oaicite:0]{index=0}
  });

  // 2. Convert MIOTA to IOTA base units
  const amount = amountMiota * 1_000_000;    // 1 MIOTA = 1 000 000 IOTA :contentReference[oaicite:1]{index=1}

  // 3. Build and submit the message
  const message = await client
    .message()                                 // begin message build :contentReference[oaicite:2]{index=2}
    .index('habit-reward')                     // indexation payload for easier querying :contentReference[oaicite:3]{index=3}
    .data(new TextEncoder().encode(
      `Converted ${amountMiota} MIOTA → ${amount} IOTA`
    ))
    .output(recipientAddress, amount)          // value transfer output :contentReference[oaicite:4]{index=4}
    .finish();                                 // submit to the Tangle :contentReference[oaicite:5]{index=5}

  return { messageId: message.id };            // return the message ID
}
