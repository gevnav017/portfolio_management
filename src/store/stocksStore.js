import { create } from "zustand";
import axiosInstance from "@/lib/axios-instance";
import { showSnackbar } from "@/lib/show-snackbar";

const useStocksStore = create((set) => ({
  stocks: [],
  isLoading: false,

  getStocks: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/api/stocks");
      set({ stocks: res.data.stocks, isLoading: false });
    } catch (error) {
      console.log(error);
      showSnackbar("Failed to fetch stocks", "error");
      set({ isLoading: false });
    }
  },

  addStock: async (data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/api/stocks", data);
      if (res.data.success) {
        showSnackbar(res.data.message, "success");
        await useStocksStore.getState().getStocks(); // refetch grouped data
        set({ isLoading: false });
      } else {
        showSnackbar(res.data.message, "error");
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Add Error: ", error);
      showSnackbar("Failed to add", "error");
      set({ isLoading: false });
    }
  },

  updateStock: async (stockId, data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.put(`/api/stocks/${stockId}`, data);
      if (res.data.success) {
        showSnackbar(res.data.message, "success");
        await useStocksStore.getState().getStocks(); // refetch grouped data
        set({ isLoading: false });
      } else {
        showSnackbar(res.data.message, "error");
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Update Error: ", error);
      showSnackbar("Failed to update", "error");
      set({ isLoading: false });
    }
  },

  deleteStock: async (stockId) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.delete(`/api/stocks/${stockId}`);
      if (res.data.success) {
        showSnackbar(res.data.message, "success");
        await useStocksStore.getState().getStocks(); // refetch grouped data
        set({ isLoading: false });
      } else {
        showSnackbar(res.data.message, "error");
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Delete Error: ", error);
      showSnackbar("Failed to delete", "error");
      set({ isLoading: false });
    }
  },
}));

export default useStocksStore;
