import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';

const useListStore = create(
  immer((set) => ({
    keyword: "",
    setKeyword: (keyword) =>
      set((state) => {
        state.keyword = keyword;
      }),
  }))
);

export default useListStore;