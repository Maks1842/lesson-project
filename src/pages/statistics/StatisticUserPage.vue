<template>
  <v-container fluid>

    <v-row>
      <v-col class="text-center">
        <h1>
          Статистика Эксперта {{ listChecking[0].user }}
        </h1>
      </v-col>
    </v-row>

    <div
        v-for="(check, idx) in listChecking"
        :key="idx"
    >

    <v-row justify="center">
      <v-col lg="7">

          <v-data-table class="table" :headers="headers" :items="check.organisations" dense :disable-sort=true hide-default-footer>
            <template v-slot:top>
              <v-row style="padding-left: 10px">

                <v-col lg="5">
                  <h2>
                    Проверка:
                  </h2>
                  <h3>
                    {{ check.nameCheck }}
                  </h3>
                </v-col>

                <v-col lg="4">
                  <h2>
                    Период:
                  </h2>
                  <h3>
                    {{ check.dateCheck }}
                  </h3>
                </v-col>

                <v-col lg="3">
                  <h2>
                    Проверено:
                  </h2>
                  <h3>
                    {{ check.organisationsNum.checkEnd }} из {{ check.organisationsNum.checkAll }}
                  </h3>
                </v-col>

              </v-row>
            </template>
          </v-data-table>

      </v-col>
    </v-row>
    </div>

<!--        <div>-->
<!--          test = {{ test }}-->
<!--        </div>-->


  </v-container>
</template>

<script>

import {useAuthStore} from "@/stores/AuthStore";
import {useOrganisationStore} from "@/stores/OrganisationStore";

export default {
  name: "StatisticUserPage",
  data: () => ({
    dialog: false,
    search: '',
    authStore: useAuthStore(),
    organisationStore: useOrganisationStore(),
    user: 'User',

    headers: [
      {text: 'Организация', value: 'nameOrg', align: 'start', width: 350,},
      {text: 'Дата проверки', value: 'dateCheckOrg', width: 150,},
      {text: 'Статус', value: 'statusCheck', width: 150,},
    ],
    listChecking: [
      { user: '',
        nameCheck: '',
        dateCheck: '',
        organisationsNum: {
          checkEnd: '',
          checkAll: ''
        },
        organisations: [{
        nameOrg: '',
        dateCheckOrg: '',
        statusCheck: '',
      },]
  }],
    test: []
  }),
  mounted() {
    this.getCheckingApi()
  },
  methods: {

    addChecking(checking) {
      this.listChecking.push(checking,)
    },

    getCheckingApi(){
      const access = this.authStore.access
      // console.log("accessCheck =" + access);

      this.axios.get('http://localhost:8000/api/v1/getStatisticUser/', { headers: {"Authorization" : `Bearer ${access}`}, params: {user_id: 2}})
          .then(response => this.listChecking = response.data)
    },
  },
}
</script>

<style scoped>
.btn-check {
  display: inline-block;
  color: white;
  text-decoration: none;
  padding: .5em 2em;
  outline: none;
  border-width: 2px 0;
  border-style: solid none;
  border-color: #e3be78 #cea609 #8f6e03;
  border-radius: 6px;
  background: linear-gradient(#e4f30f, #b7e316) #058036;
  transition: 0.2s;
}
</style>