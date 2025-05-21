<script>
export default {
  name: "home-chart",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartData: null,
      chartOptions: null
    }
  },
  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.documentElement);

      return {
        labels: this.data.map(item => item.name),
        datasets: [
          {
            label: "TCEA Issuer",
            data: this.data.map(item => item.tceaIssuer),
            backgroundColor: documentStyle.getPropertyValue('--p-amber-500'),
            borderColor: documentStyle.getPropertyValue('--p-amber-500'),
            borderWidth: 2,
            fill: false,
          },
          {
            label: "TREA Bond Holder",
            data: this.data.map(item => item.treaBondHolder),
            backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            borderColor: documentStyle.getPropertyValue('--p-gray-500'),
            borderWidth: 2,
            fill: false,
          }
        ]
      };
    },
    setChartDataMock() {
      return {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "TCEA Issuer",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: "#FF6384",
            borderColor: "#FF6384",
            borderWidth: 2,
            fill: false,
          },
          {
            label: "TREA Bond Holder",
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: "#36A2EB",
            borderColor: "#36A2EB",
            borderWidth: 2,
            fill: false,
          }
        ]
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500
              }
            },
            grid: {
              display: false,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
    },
  },
  mounted() {
    console.log(this.data);
    this.chartData = this.setChartDataMock();
    this.chartOptions = this.setChartOptions();
  },
  watch: {
    data: {
      immediate: true,
      handler() {
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
      }
    }
  }
}
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <pv-chart type="bar" :data="chartData" :options="chartOptions" class="h-[23rem]" />
  </div>
</template>

<style scoped>

</style>