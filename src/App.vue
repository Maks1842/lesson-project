<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon size="40">mdi-rocket-launch-outline</v-icon>
        <div class="text-h4">CRM</div>
      </div>

    </v-app-bar>

    <v-main>
      <Booking/>
      <NavBar/>
    </v-main>
  </v-app>
</template>

<script>
import Booking from "@/components/booking/Booking";

export default {
  name: 'App',

  components: {
    Booking,
  },

  data: () => ({
    //
  }),
};
</script>
