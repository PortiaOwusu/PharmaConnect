import create from "zustand";
import { persist } from "zustand/middleware";

let pharmacyState = (set) => ({
  token: null,
  pharmacy: null,
  isLoggedIn: false,
  setCurrentPharmacy: ({ token, pharmacy }) =>
    set({ token, pharmacy, isLoggedIn: true }),
  logOut: () => set({ token: null, pharmacy: null, isLoggedIn: false }),
});

pharmacyState = persist(pharmacyState, { name: "pharmacy-setting" });

export const usePharmacyState = create(pharmacyState);
