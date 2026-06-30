import { create } from "zustand"

type SearchType = {
    search: string
    handleSearch: (value: string) => void
}

export const useSearchStore = create<SearchType>((set) => ({
    search: "",
    handleSearch: (value) => set({ search: value }),
}))
