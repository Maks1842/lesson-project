import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

//Настройка темы приложения
export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.green,
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    },
});
