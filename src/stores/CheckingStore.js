import {defineStore} from "pinia";

export const useCheckingStore = defineStore('checkingStore', {
    state: () => ({
        checkings: [],
    }),
});