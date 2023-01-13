<template>
  <v-container fluid>
      <v-app-bar color="deep-purple accent-4" dark app clipped-left>

        <v-toolbar-title>Page title</v-toolbar-title>

        <v-spacer/>
        <v-btn icon @click="getAuthenticationApi">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer app clipped permanent expand-on-hover mini-variant mini-variant-width=40 width=250>
        <v-list nav dense>
          <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
          >

            <router-link to="/">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            </router-link>

            <router-link to="/booking">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-step-forward-2</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Booking</v-list-item-title>
              </v-list-item>
            </router-link>

            <router-link to="/photo">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-image-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Фотографии</v-list-item-title>
              </v-list-item>
            </router-link>

            <router-link to="/dashboard">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-view-dashboard-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Дашборд</v-list-item-title>
              </v-list-item>
            </router-link>

            <router-link to="/statistics">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-file-chart-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Статистика</v-list-item-title>
              </v-list-item>
            </router-link>

            <router-link to="/statistic-user">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-library</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Статистика экспрерта</v-list-item-title>
            </v-list-item>
            </router-link>


          </v-list-item-group>
        </v-list>


      </v-navigation-drawer>

  </v-container>
</template>

<script>
import {useAuthStore} from "@/stores/AuthStore";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  data: () => ({
    group: null,
    authStore: useAuthStore(),
    userAuthentication: [
      {
        username: 'admin',
        password: '123456'
      }
    ],
    tokens: '',

  }),
  methods: {
    getAuthenticationApi() {
      let username = this.userAuthentication[0].username;
      let password = this.userAuthentication[0].password;

//Авторизация, получение refresh и access токенов
      const t = this.axios.post('http://localhost:8000/api/v1/auth/token/', {"username": username, "password": password})
          .then(response => this.tokens = response.data);

      (async () => {
        const meta = await t;
        this.authStore.access.push(meta.access);

      })();

      //Отправляю refresh токен, чтобы получить новый access. С задержкой (1 минута = 60000)
      setInterval(async () => {
        //Очищаю store от предыдущих записей
        useAuthStore().$reset();

        const tA= this.axios.post('http://localhost:8000/api/v1/auth/token/refresh/', {"refresh": this.tokens.refresh,})
            .then(response => response.data);

        const tokAccess = await tA;
        this.authStore.access.push(tokAccess.access);
        // console.log("access 2 =" + tokAccess.access);
      }, 300000)
    }
  }
}

</script>

<style scoped>


</style>