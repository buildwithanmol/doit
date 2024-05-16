"use client";
import { create } from "zustand";
import { toast } from "sonner";

const useZustStore = create((set, get) => ({
  test: "test", //for test purpose
    // It will contains the dynamically rendered collection links from the database to be used in the shop page and navbars 
}));

export default useZustStore;
