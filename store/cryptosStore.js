import { create } from "zustand";
import axiosInstance from "../src/lib/axios-instance";
import { showSnackbar } from "../src/lib/show-snackbar";

const useCryptosStore = create((set) => ({
  cryptos: [],
  isLoading: false,

  getCryptos: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/api/cryptos");
      set({ cryptos: res.data.cryptos, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ errorMsg: `Error: ${error}`, isLoading: false });
    }
  },

  addCrypto: async (data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/api/cryptos", data);
      if (res.data.success) {
        set((state) => ({
          cryptos: [...state.cryptos, res.data.addedCrypto],
          isLoading: false,
        }));
        showSnackbar(res.data.message, "success");
      } else {
        showSnackbar(res.data.message, "error");
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Add Error: ", error);
      showSnackbar(
        error.response?.data?.message || "Failed to add option",
        "error"
      );
      set({ isLoading: false });
    }
  },

  updateCrypto: async (cryptoId, data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.put(`/api/cryptos/${cryptoId}`, data);
      if (res.data.success) {
        set((state) => ({
          cryptos: state.cryptos.map((crypto) =>
            crypto.id === cryptoId ? res.data.updatedCrypto : crypto
          ),
          isLoading: false,
        }));
        showSnackbar(res.data.message, "success");
      } else {
        showSnackbar(res.data.message, "error");
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Update Error: ", error);
      showSnackbar(
        error.response?.data?.message || "Failed to update option",
        "error"
      );
      set({ isLoading: false });
    }
  },

  deleteCrypto: async (cryptoId) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.delete(`/api/cryptos/${cryptoId}`);
      if (res.data.success) {
        set((state) => ({
          cryptos: state.cryptos.filter((crypto) => crypto.id !== cryptoId),
          isLoading: false,
        }));
        showSnackbar(res.data.message, "success");
      } else {
        showSnackbar(res.data.message, "error");
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Delete Error: ", error);
      showSnackbar(
        error.response?.data?.message || "Failed to delete option",
        "error"
      );
      set({ isLoading: false });
    }
  },
}));

export default useCryptosStore;
