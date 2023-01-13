import {defineStore} from "pinia";

export const useOrganisationStore = defineStore('organisationStore', {
    state: () => ({
        organisations: [],
    }),
});