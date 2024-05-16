"use client";
import { create } from "zustand";
import { toast } from "sonner";

const useZustStore = create((set, get) => ({
    test: "test", //for test purpose
}));

export default useZustStore;
