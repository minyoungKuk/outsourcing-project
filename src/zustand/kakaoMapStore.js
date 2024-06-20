import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';

const useKakaoMapStore = create(
  immer((set) => ({
    map: {
      longitude: 0,
      latitude: 0,
      placeName: "",
      address: "",
      region: "",
    },
    setMap: (map) =>
      set((state) => {
        state.map = map;
      }),
  }))
);

export default useKakaoMapStore;