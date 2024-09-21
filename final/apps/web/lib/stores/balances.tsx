import { create } from "zustand";
import { Client, useClientStore } from "./client";
import { immer } from "zustand/middleware/immer";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { Balance, BalancesKey, TokenId } from "@proto-kit/library";
import { PublicKey, UInt64 } from "o1js";
import { useCallback, useEffect } from "react";
import { useChainStore } from "./chain";
import { useWalletStore } from "./wallet";

export interface BalancesState {
  loading: boolean;
  balances: {
    // address - balance
    [key: string]: string;
  };
  loadBalance: (client: Client, address: string) => Promise<void>;
  faucet: (client: Client, address: string) => Promise<PendingTransaction>;
  checkEligibility: (client: Client, address: string, monthlyIncome: number, householdMembers: number, studentIncome: number) => Promise<PendingTransaction>;
  uploadEligibility: (client: Client, address: string, ghi: number, pci: number) => Promise<PendingTransaction>;
}

function isPendingTransaction(
  transaction: PendingTransaction | UnsignedTransaction | undefined,
): asserts transaction is PendingTransaction {
  if (!(transaction instanceof PendingTransaction))
    throw new Error("Transaction is not a PendingTransaction");
}

export const tokenId = TokenId.from(0);

export const useBalancesStore = create<
  BalancesState,
  [["zustand/immer", never]]
>(
  immer((set) => ({
    loading: Boolean(false),
    balances: {},
    async loadBalance(client: Client, address: string) {
      set((state) => {
        state.loading = true;
      });

      const key = BalancesKey.from(tokenId, PublicKey.fromBase58(address));

      const balance = await client.query.runtime.Balances.balances.get(key);

      set((state) => {
        state.loading = false;
        state.balances[address] = balance?.toString() ?? "0";
      });
    },
    async faucet(client: Client, address: string) {
      const balances = client.runtime.resolve("Balances");
      const sender = PublicKey.fromBase58(address);

      const tx = await client.transaction(sender, async () => {
        await balances.addBalance(tokenId, sender, Balance.from(1000));
      });

      await tx.sign();
      await tx.send();

      isPendingTransaction(tx.transaction);
      return tx.transaction;
    },

    async uploadEligibility(client: Client, address: string, ghi: number, pci: number) {
      const balances = client.runtime.resolve("Balances");
      const sender = PublicKey.fromBase58(address);

      const tx = await client.transaction(sender, async () => {
        const ghiUInt64 = UInt64.from(ghi);
        const pciUInt64 = UInt64.from(pci);

        await balances.updateEligibilityCriteria(pciUInt64, ghiUInt64);
      });

      await tx.sign();
      await tx.send();

      isPendingTransaction(tx.transaction);
      return tx.transaction;
    },

    async checkEligibility(client: Client, address: string, monthlyIncome: number, householdMembers: number, studentIncome: number) {
      const balances = client.runtime.resolve("Balances");
      const sender = PublicKey.fromBase58(address);

      const tx = await client.transaction(sender, async () => {
        const monthlyIncomeUInt64 = UInt64.from(monthlyIncome);
        const householdMembersUInt64 = UInt64.from(householdMembers);
        const studentIncomeUInt64 = UInt64.from(studentIncome);

        await balances.checkEligibilityCriteria(sender, tokenId, monthlyIncomeUInt64, householdMembersUInt64, studentIncomeUInt64);
      });

      await tx.sign();
      await tx.send();

      isPendingTransaction(tx.transaction);
      return tx.transaction;
    },

  })),
);

export const useObserveBalance = () => {
  const client = useClientStore();
  const chain = useChainStore();
  const wallet = useWalletStore();
  const balances = useBalancesStore();

  useEffect(() => {
    if (!client.client || !wallet.wallet) return;

    balances.loadBalance(client.client, wallet.wallet);
  }, [client.client, chain.block?.height, wallet.wallet]);
};

export const useFaucet = () => {
  const client = useClientStore();
  const balances = useBalancesStore();
  const wallet = useWalletStore();

  return useCallback(async () => {
    if (!client.client || !wallet.wallet) return;

    const pendingTransaction = await balances.faucet(
      client.client,
      wallet.wallet,
    );

    wallet.addPendingTransaction(pendingTransaction);
  }, [client.client, wallet.wallet]);

};

export const useUploadEligibility = () => {
  const client = useClientStore();
  const balances = useBalancesStore();
  const wallet = useWalletStore();

  return useCallback(async (ghi: number, pci: number) => {
    if (!client.client || !wallet.wallet) return;

    const pendingTransaction = await balances.uploadEligibility(
      client.client,
      wallet.wallet,
      ghi,
      pci,
    );

    wallet.addPendingTransaction(pendingTransaction);
  }, [client.client, wallet.wallet]);
};

export const useCheckEligibility = () => {
  const client = useClientStore();
  const balances = useBalancesStore();
  const wallet = useWalletStore();

  return useCallback(async (monthlyIncome: number, householdMembers: number, studentIncome: number) => {
    if (!client.client || !wallet.wallet) return;

    const pendingTransaction = await balances.checkEligibility(
      client.client,
      wallet.wallet,
      monthlyIncome,
      householdMembers,
      studentIncome,
    );

    wallet.addPendingTransaction(pendingTransaction);
  }, [client.client, wallet.wallet]);
};
