<template>
  <v-container fluid>
    <!--    <OrganisationAdd v-model="dialogOrg" @addOrganisation="addOrganisation"/>-->
    <OrganisationAdd v-model="dialogOrg" @addOrganisation="addOrganisation"/>

    <v-row>
      <v-col class="text-center">
        <h1>
          Проверка:
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <h2>
          Проверяемые организации
        </h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col lg="10" offset-lg="1">
        <v-card>
          <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details
            ></v-text-field>
            <div>
              <!--              <v-btn outlined @click="dialogOrg=true ">-->
              <!--                Добавить организацию-->
              <!--              </v-btn>-->
              <v-btn outlined @click="addOrganisation">
                Добавить организацию
              </v-btn>
            </div>
          </v-card-title>
          <v-data-table dense :headers="headers" :items="listOrganisation" :search="search">
            <template v-slot:item.progresCheck="{ item }">
              <v-progress-linear class="mb-3" :value="item.countAnswr / item.countQuest * 100" height="15" color="green">
                {{ item.countAnswr }} из {{ item.countQuest }}
              </v-progress-linear>
            </template>

            <template v-slot:item.delete="">

              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>

      </v-col>
    </v-row>

    <div>
      {{ listOrganisation }}
    </div>


  </v-container>
</template>

<script>
import OrganisationAdd from "@/components/statistics/OrganisationAdd";
import {useAuthStore} from "@/stores/AuthStore";
import {useCheckingStore} from "@/stores/CheckingStore";

export default {
  name: "OrganistionsPage",
  components: {OrganisationAdd},

  data: () => ({
    dialogOrg: false,
    search: '',
    authStore: useAuthStore(),
    checkingStore: useCheckingStore(),
    headers: [
      {text: 'id', value: 'id', width: 20,},
      {
        text: 'Организация',
        value: 'name',
        align: 'start',
        sortable: true,
        filterable: true,
        width: 350,
      },
      {text: 'Дата проверки', value: 'dateCheck', width: 150,},
      {text: 'Эксперт', value: 'userCheck', width: 300,},
      {text: 'Представитель', value: 'personOrg', width: 300,},
      {text: 'Прогресс', value: 'progresCheck', width: 250,},
      {text: 'Удалить', value: 'delete', sortable: false},
    ],
    listOrganisation: [
      {
        name: 'Детский сад №3 Грозный',
        dateCheck: '15.10.2022',
        userCheck: 'Admin',
        personOrg: 'Ковалев',
        countQuest: 76,
        countAnswr: 45,
      },
    ],
  }),
  mounted() {
    this.getOrganisationList()
  },
  methods: {
    // addOrganisation(checking) {
    //   this.listChecking.push(checking)
    // },
    getOrganisationList(){
      let access = this.authStore.access

      this.axios.get('http://localhost:8000/api/v1/getOrganisationList/', { headers: {"Authorization" : `Bearer ${access}`}, params: {checking_id: 2}})
          .then(response => this.listOrganisation = response.data)
    },
  }
}



</script>

<style scoped>

</style>