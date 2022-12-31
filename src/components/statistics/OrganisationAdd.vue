<template>
  <v-container>
<!--    <OrganistionsA @showAccess="showAccess"/>-->

    <v-dialog v-model="orgDialog" persistent max-width="800">
      <v-card class="pa-4">
        <v-row justify="center">
          <v-card-title> Добавить организацию</v-card-title>
        </v-row>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-select v-model="name" :items="itemsOrg" item-text="name" :rules="nameRules" label="Выбрать организацию" required class="px-2"
          ></v-select>

          <v-text-field :value="dateChecking" label="Выбрать дату проверки организации" dense readonly class="px-2 pt-2" required
                        @click="dateDialog = true" :rules="[v => !!v || 'Дата не указана']"
          />
          <v-dialog v-model="dateDialog" width="300">
            <v-card>
              <div class="d-flex flex-column pa-3">
                <v-date-picker v-model="dateChecking"></v-date-picker>

                <v-row class="py-2" align="center" justify="center">
                  <v-btn color="primary" width="100" @click="dateDialog = false">
                    Ok
                  </v-btn>
                </v-row>
              </div>
            </v-card>
          </v-dialog>

          <v-select v-model="user" :items="itemsUser" :rules="[v => !!v || 'Эксперт не указан']" label="Выбрать эксперта"
                    required class="px-2"
          ></v-select>

          <v-row justify="center" class="py-2">
            <v-btn class="ml-6 button">
              Сохранить
            </v-btn>
            <v-btn @click="orgDialog = false" class="ml-6 button">
              Закрыть
            </v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

export default {
  props: {
    value: {
      Boolean,
    }
  },
  computed: {
    orgDialog: {
      get() {
        return this.value
      },

      set(value) {
        this.$emit('input', value)
      }
    }
  },
  data: () => ({
    valid: true,
    dateDialog: false,
    // dateChecking: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateChecking: '',
    name: '',
    user: null,
    nameRules: [
      v => !!v || 'Организация не указана',
    ],
    select: null,
    itemsOrg: [
      {
        "id": 9,
        "name": "Музыкальная школа"
      },
      {
        "id": 8,
        "name": "Медицинский техникум"
      },
      {
        "id": 7,
        "name": "Детсад г.Краснодар"
      },
      {
        "id": 6,
        "name": "Школа г. Краснодар"
      }
    ],
    itemsUser: [
      'Ставропольский край',
      'Краснодарский край',
      'Чеченская республика',
      'Ростовская область',
    ],
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    // addChecking() {
    //   let checking = {
    //     nameCheck: this.name,
    //     dateCheck: this.dateChecking,
    //     regionCheck: this.user,
    //     departmentCheck: this.departments,
    //     countQuest: 0,
    //     countAnser: 0,
    //   }
    //   this.$emit('addChecking', checking)
    // },
    // getOrganisationApi() {
    //   let accessToken = this.tokensTest[0].refresh
    //   console.log("tokens = " + accessToken)
    //   // this.axios.post('http://localhost:8000/api/v1/getOrganisationList/, { headers: {"Authorization" : `Bearer ${this.$data.accessToken}`}})
    //   //     .then(response => this.itemsOrg = response.data)
    // },
    // showAccess(access) {
    //   console.log("tokens = " + this.$data.accessToken)
    //   this.accessToken.push(access)
    // },
  },
}
</script>

<style scoped>

</style>