<template>
  <v-container>
    <v-row>
      <v-col lg="6" offset-lg="3">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step
                :complete="e1 > 1"
                step="1"
            >
              Name of step 1
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                :complete="e1 > 2"
                step="2"
            >
              Name of step 2
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
              Name of step 3
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-form ref="destinationForm">
                <v-autocomplete
                    class="mt-2"
                    v-model="destination"
                    :items="destinations"
                    label="Destination"
                    outlined
                    dense
                    rounded
                    :rules="destinationRules"
                />
                <v-row>
                  <v-col>
                    <v-text-field
                        :value="dates[0]"
                        label="Start"
                        outlined
                        rounded
                        dense
                        readonly
                        @click="dateDialog = true"
                        :rules="dateStartRules"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                        :value="dates[1]"
                        label="End"
                        outlined
                        rounded
                        dense
                        readonly
                        @click="dateDialog = true"
                        :rules="dateEndRules"
                    />
                  </v-col>
                </v-row>
                <v-btn block color="primary" rounded @click="search">
                  Перейти на следующий шаг
                </v-btn>
              </v-form>
              <v-dialog v-model="dateDialog" width="500">
                <!--<v-card> - компонента диалогового окна-->
                <v-card>
                  <div class="d-flex flex-column">
                    <v-date-picker v-model="dates" range></v-date-picker>
                    <!--Добавление кнопок в диалоговое окно-->
                    <v-btn @click="dateDialog = false" rounded color="primary">Ok</v-btn>
                  </div>

                </v-card>


              </v-dialog>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-list>
                <v-list-item two-line v-for="(item, i) in flightsList" :key="i">
                  <v-list-item-avatar>
                    <v-img :src="item.image"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.dates }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-row>
                <v-col>
                  <v-btn block color="primary"  rounded dense outlined  @click="e1 = 1">Отмена</v-btn>
                </v-col>
                <v-col>
                  <v-btn block color="primary" rounded  disabled>Дальше</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
              >
                <div class="text-h4">Девчонка</div>
              </v-card>

              <v-btn
                  color="primary"
                  @click="e1 = 1"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>


</template>

<script>
import {fakeList} from "@/helpers/fakeData";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Booking",
  data() {
    return {
      e1: 1,
      dateDialog: false,
      dates: [],
      destinations: ["Mars", "Moon"],
      destination: null,
      // добавление валидации
      destinationRules: [(v) => !!v || "Выберите значение"],
      dateStartRules: [(v) => !!v || "Выберите начальную дату"],
      dateEndRules: [(v) => !!v || "Выберите конечную дату"],

    };
  },
  methods: {
    search() {
      const isValid = this.$refs["destinationForm"].validate();
      if (!isValid) {
        return;
      }
      this.e1 = 2;
    },
  },
  computed: {
    flightsList() {
      return fakeList(['2022-12-01', '2022-12-31'], 10);
    }
  }
};
</script>

<style scoped>

</style>