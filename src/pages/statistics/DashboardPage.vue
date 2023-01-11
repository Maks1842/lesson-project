<template>
  <v-container fluid>
  <v-row class="d-flex justify-center mb-1">
    <v-col lg="2" style="text-align: right">
      <h1>
        Статистика за
      </h1>
      </v-col>
        <v-col lg="1" >
          <div>
      <v-autocomplete
          v-model="yearsValue"
          :items="years"
          height="25"
      ></v-autocomplete>
          </div>
          </v-col>
            <v-col lg="1">
      <h1>
        год
      </h1>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-card elevation="2" outlined height="220">
        <v-card-title>
          <h2>
          Проверки
          </h2>
        </v-card-title>
        <v-card-text style="padding-top: 20px">
          <div style="font-size: 100px; font-weight: bold; color: black; text-align: center">
            5
          </div>
        </v-card-text>
        <v-card-text style="padding-top: 20px">
          <div style="font-size: 20px; color: black">
            Текущие: 3
          </div>
          <div style="font-size: 20px; color: black">
            Завершенные: 2
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col>
      <v-card elevation="2" outlined height="220">
        <v-card-title>
          <h2>
            Проверяемые организации
          </h2>
        </v-card-title>
        <v-card-text style="padding-top: 20px">
          <div style="font-size: 100px; font-weight: bold; color: black; text-align: center">
            360
          </div>
        </v-card-text>
        <v-card-text style="padding-top: 20px">
          <div style="font-size: 20px; color: black">
            Текущие: 255
          </div>
          <div style="font-size: 20px; color: black">
            Завершенные: 105
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col>
      <v-card elevation="2" outlined>
      <div id="chart-bar">
        <apexchart type="bar" height="200" :options="optionsExpert" :series="seriesExpert"></apexchart>
      </div>
      </v-card>
    </v-col>
  </v-row>

    <v-row style="padding-top: 20px">
      <v-col>
        <v-card elevation="2" outlined>
          <apexchart type="pie" height="350" width="500" :options="optionsReg" :series="seriesReg"></apexchart>
        </v-card>
      </v-col>

      <v-col>
        <v-card elevation="2" outlined>
        <apexchart type="pie" height="350" width="500" :options="optionsDepart" :series="seriesDepart"></apexchart>
        </v-card>
      </v-col>

      <v-col>
        <v-card elevation="2" outlined>
          <div id="chart">
            <apexchart type="bar" height="335" :options="optionsBar" :series="seriesBar"></apexchart>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "DebtorsPage",
  el: '#appl',
  data: function() {
    return {
      yearsValue: null,
      years: [
        '2020',
        '2021',
        '2022',
        '2023',
      ],



      seriesReg: [44, 55, 13, 43, 22],
      optionsReg: {

        title: {
          text: 'Рейтинг регионов',
          offsetX: 0,
          style: {
            fontSize: '24px',
          }
        },
        subtitle: {
          text: 'по организациям',
          offsetX: 0,
          style: {
            fontSize: '12px',
          }
        },
        legend: {
          position: 'right'
        },
        labels: ['Ставрополь', 'Краснодар', 'Чечня', 'Ингушетия', 'Ростов-на-Дону'],
      },

      seriesDepart: [44, 55, 13, 5],
      optionsDepart: {

        title: {
          text: 'Рейтинг департаментов',
          offsetX: 0,
          style: {
            fontSize: '24px',
          }
        },
        subtitle: {
          text: 'по организациям',
          offsetX: 0,
          style: {
            fontSize: '12px',
          }
        },
        legend: {
          position: 'right'
        },
        labels: ['Здравоохранение', 'Образование', 'Культура', 'Социалка'],
      },

        seriesBar: [{
          name: 'Здравоохранение',
          data: [86, 92, 97, 75, 61]
        }, {
          name: 'Образование',
          data: [76, 85, 93, 98, 87]
        }, {
          name: 'Культура',
          data: [78, 85, 96, 83, 68]
        }, {
          name: 'Социалка',
          data: [87, 99, 81, 79, 91]
        }],
        optionsBar: {
          title: {
            text: 'Средний бал',
            offsetX: 0,
            style: {
              fontSize: '24px',
            }
          },
          subtitle: {
            text: 'Регион - Департамент',
            offsetX: 0,
            style: {
              fontSize: '12px',
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['Ставрополь', 'Краснодар', 'Чечня', 'Ингушетия', 'Ростов'],
          },
          yaxis: {
            title: {
              text: 'Средний бал'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + " баллов"
              }
            }
          }
        },

      seriesExpert: [{
        data: [98, 130, 240, 67]
      }],
      optionsExpert: {
        title: {
          text: 'Рейтинг экспертов',
          offsetX: 0,
          style: {
            fontSize: '24px',
          }
        },
        subtitle: {
          text: 'Количество проверенных организаций',
          offsetX: 0,
          style: {
            fontSize: '12px',
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Эксперт 1', 'Эксперт 2', 'Эксперт 3', 'Эксперт 4'],
        }
      },





    }
  },

}


</script>

<style scoped>

</style>