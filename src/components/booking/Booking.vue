<template>
  <v-container>
    <v-row>
      <v-col>
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
                    <v-text-field :value="dates[0]" label="Start" outlined rounded dense readonly @click="dateDialog = true"/>
                  </v-col>
                  <v-col>
                    <v-text-field :value="dates[1]" label="End" outlined rounded dense readonly @click="dateDialog = true"/>
                  </v-col>
                </v-row>
                <v-btn block color="primary" rounded @click="search">
                  Какая-то кнопка
                </v-btn>
              </v-form>
              <v-dialog v-model="dateDialog">
                <v-date-picker
                    v-model="dates"
                    range
                ></v-date-picker>

              </v-dialog>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
              >
                <div class="text-h4">Классная</div>
              </v-card>

              <v-btn
                  color="primary"
                  @click="e1 = 3"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
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
      destinationRules: [(v) => !!v || "Проверка валидации"],
    };
  },
  methods: {
    search() {
      const isValid = this.$refs["destinationForm"].validate()
      if (!isValid) {
        return;
      }
      this.e1 = 2;
    },
  },
};
</script>

<style scoped>

</style>