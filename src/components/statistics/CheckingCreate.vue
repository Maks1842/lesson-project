<template>
  <v-container>

    <v-dialog v-model="checkingDialog" persistent max-width="800">
      <v-card class="pa-4">
        <v-row justify="center">
          <v-card-title> Создать проверку</v-card-title>
        </v-row>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="nameChecking" :rules="nameRules" label="Добавить наименование проверки" required class="px-2"
          ></v-text-field>

          <v-text-field :value="dateChecking" label="Выбрать дату проверки" dense readonly class="px-2 pt-2" required
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

          <v-select v-model="regions" :items="itemsReg" :rules="[v => !!v || 'Регион не указан']" label="Выбрать регион проверки"
              required class="px-2"
          ></v-select>

          <v-select v-model="departments" :items="itemsDep" :rules="[v => !!v || 'Департамент не указан']" label="Выбрать департамент/министерство проверки"
              required class="px-2"
          ></v-select>

          <v-row justify="center" class="py-2">
            <v-btn @click="addChecking" class="ml-6 button">
              Сохранить
            </v-btn>
            <v-btn @click="checkingDialog = false" class="ml-6 button">
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
    value: Boolean
  },
  computed: {
    checkingDialog: {
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
    nameChecking: '',
    regions: null,
    departments: null,
    nameRules: [
      v => !!v || 'Наименование проверки не указано',
      v => (v && v.length <= 50) || 'Количество символов в наименовании не должно превышать 50 символов',
    ],
    select: null,
    itemsReg: [
      'Ставропольский край',
      'Краснодарский край',
      'Чеченская республика',
      'Ростовская область',
    ],
    itemsDep: [
      'Министерство здравоохранения',
      'Министерство культуры',
      'Министерство образования',
    ],
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    addChecking() {
      let checking = {
        nameCheck: this.nameChecking,
        dateCheck: this.dateChecking,
        regionCheck: this.regions,
        departmentCheck: this.departments,
        countQuest: 0,
        countAnser: 0,
      }
      this.$emit('addChecking', checking)
    },
  },
}
</script>

<style scoped>
.button {
  color: blue;


}

</style>