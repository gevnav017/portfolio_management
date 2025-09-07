import { create } from "zustand";
import axiosInstance from "../src/lib/axios-instance";
import { showSnackbar } from "../src/lib/show-snackbar";

const useOptionsStore = create((set) => ({
  options: [],
  isLoading: false,

  getOptions: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/api/options");
      set({ options: res.data.options, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ errorMsg: `Error: ${error}`, isLoading: false });
    }
  },

  addOption: async (data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/api/options", data);
      if (res.data.success) {
        set((state) => ({
          options: [...state.options, res.data.addedOption],
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

  updateOption: async (optionId, data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.put(`/api/options/${optionId}`, data);
      if (res.data.success) {
        set((state) => ({
          options: state.options.map((option) =>
            option.id === optionId ? res.data.updatedOption : option
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

  deleteOption: async (optionId) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.delete(`/api/options/${optionId}`);
      if (res.data.success) {
        set((state) => ({
          options: state.options.filter((option) => option.id !== optionId),
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

export default useOptionsStore;
