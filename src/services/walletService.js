import { supabase } from "../utils/supabaseClient";

export const WalletService = {
  // Add or update wallet points
  async updateWalletPoints(walletAddress, pointsToAdd) {
    // Check if wallet exists
    const { data: existingWallet, error: fetchError } = await supabase
      .from("Wallet_details")
      .select("*")
      .eq("address", walletAddress)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // Ignore "not found" error
      console.error("Error fetching wallet:", fetchError);
      throw fetchError;
    }

    if (existingWallet) {
      // Update existing wallet
      const { data, error } = await supabase
        .from("Wallet_details")
        .update({
          points: existingWallet.points + pointsToAdd,
          last_updated: new Date().toISOString(),
        })
        .eq("address", walletAddress)
        .select();

      if (error) throw error;
      return data[0];
    } else {
      // Create new wallet record
      const { data, error } = await supabase
        .from("Wallet_details")
        .insert([
          {
            address: walletAddress,
            points: pointsToAdd,
          },
        ])
        .select();

      if (error) throw error;
      return data[0];
    }
  },

  // Get wallet points
  async getWalletPoints(walletAddress) {
    const { data, error } = await supabase
      .from("Wallet_details")
      .select("points")
      .eq("address", walletAddress)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Not found
        return 0;
      }
      throw error;
    }

    return data?.points || 0;
  },

  // Get all wallets (for admin view)
  async getAllWallets() {
    const { data, error } = await supabase
      .from("Wallet_details")
      .select("*")
      .order("points", { ascending: false });

    if (error) throw error;
    return data;
  },
};
