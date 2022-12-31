<template>
  <v-container style="margin:10px 0 35px 35px" fluid>
    <CheckingCreate v-model="dialog" @addChecking="addChecking"/>
    <div>
      <v-btn class="botton" @click="getCheckingApi" outlined>
        Получить список проверок
      </v-btn>
    </div>

    <v-row>
      <v-col class="text-center">
        <h1>
          Статистика Администратора
        </h1>
      </v-col>
    </v-row>

    <v-col class="text-center">
      <h2>
        Проверки
      </h2>
    </v-col>

    <v-row>
      <v-col lg="10" offset-lg="1">
        <v-card>
          <v-card-title>
            <v-text-field v-model="search" label="Search" single-line hide-details
            ></v-text-field>
            <div>
              <v-btn class="btn-check" outlined @click="dialog=true">
                Создать проверку
              </v-btn>
            </div>
          </v-card-title>

          <v-data-table class="table" :headers="headers" :items="listChecking" :search="search" dense :disable-sort=true>
            <template v-slot:item.progresCheck="{ item }">
              <v-progress-linear class="mb-3" :value="item.countOrgComplit / item.countOrgAll * 100" height="15" color="green">
                {{ item.countOrgComplit }} из {{ item.countOrgAll }}
              </v-progress-linear>
            </template>

            <template v-slot:item.actions="">
              <router-link to="/organisations">
                <v-icon small class="mr-2">
                  mdi-pencil
                </v-icon>
              </router-link>

              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>

      </v-col>
    </v-row>

    <div>
      getAccess = {{ authStore.access }}
    </div>


  </v-container>
</template>

<script>
import CheckingCreate from "@/components/statistics/CheckingCreate";

import {useAuthStore} from "@/stores/AuthStore";
import {useCheckingStore} from "@/stores/CheckingStore";

export default {
  name: "StatisicsPage",
  components: {CheckingCreate},
  data: () => ({
    dialog: false,
    search: '',
    authStore: useAuthStore(),
    checkingStore: useCheckingStore(),

    headers: [
      {
        text: 'id',
        value: 'id',
        width: 20,
      },
      {
        text: 'Проверка',
        value: 'nameCheck',
        align: 'start',
        sortable: true,
        filterable: true,
        width: 350,
        // filter: (value: any, search: string, item: any) => boolean,
        // sort: (a: any, b: any) => number
      },
      {text: 'Дата', value: 'dateCheck', width: 150,},
      {text: 'Регион', value: 'regionCheck', width: 300,},
      {text: 'Департамент', value: 'departmentCheck', width: 300,},
      {text: 'Прогресс', value: 'progresCheck', width: 250,},
      { text: 'Редактор', value: 'actions', sortable: false },
    ],
    listChecking: [
      {
        id: 5,
        nameCheck: 'Проверка Грозный школы',
        dateCheck: '15.10.2022',
        regionCheck: 'Чеченская республика',
        departmentCheck: 'Министерство образования',
        countOrgAll: 50,
        countOrgComplit: 45,
      },
      {
        id: 3,
        nameCheck: 'Проверка Ставрополь больницы',
        dateCheck: '22.08.2022',
        regionCheck: 'Ставропольский край',
        departmentCheck: 'Министерство здравоохранения',
        countOrgAll: 76,
        countOrgComplit: 25,
      },

    ],
    // listOrgsss: [
    //   {
    //     name: 'Детский сад №33333 Тест',
    //     dateCheck: '15.10.2022',
    //     userCheck: 'Admin',
    //     personOrg: 'ЖЖЖЖЖЖЖЖЖЖЖ',
    //     countQuest: 76,
    //     countAnswr: 45,
    //   },
    //   {
    //     name: 'Республиканская больница 7777777777',
    //     dateCheck: '15.10.2022',
    //     userCheck: 'Admin',
    //     personOrg: 'УУУУУУУУУУУ',
    //     countQuest: 56,
    //     countAnswr: 13,
    //   },
    //     ]
  }),
  // mounted() {
  //   this.getCheckingApi()
  // },
  methods: {

    addChecking(checking) {
      this.listChecking.push(checking,)
    },

    getCheckingApi(){
      const access = this.authStore.access
      console.log("accessCheck =" + access);

      this.axios.get('http://localhost:8000/api/v1/getCheckingsList/', { headers: {"Authorization" : `Bearer ${access}`},})
          .then(response => this.listChecking = response.data)
      this.checkingStore.checkings.push(this.listChecking)
    },

    // getOrganisationApi() {
    //   // console.log("tokens = " + accessToken)
    //   this.axios.post('http://localhost:8000/api/v1/getOrganisationList/?checking_id=1', { headers: {"Authorization" : `Bearer ${this.$data.tokens.access}`}, })
    //       .then(response => this.itemsOrg = response.data)
    // },
  }
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