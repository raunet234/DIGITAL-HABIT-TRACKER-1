import { getFullnodeUrl, IotaClient } from "@iota/iota-sdk/client";
export async function useGetBalance(myAddress) {
  const iotaClient = new IotaClient({ url: getFullnodeUrl("testnet") });

  const balance = await iotaClient.getBalance({
    owner: myAddress,
  });

  console.log(
    "Balance in Nano (1_000_000_000 Nano = 1 IOTA): ",
    balance.totalBalance,
  );

  return balance.totalBalance;
}
