<script>
import {CorporateBondService} from "../services/corporate-bond.service.js";
import BondResultsTable from "../components/bond-results-table.component.vue";
import ToolbarComponent from "../../public/components/toolbar.component.vue";
import HomeChart from "../components/home-chart.component.vue";

export default {
  name: "home",
  components: {HomeChart, ToolbarComponent, BondResultsTable},
  data() {
    return {
      results: [],
      bondService: new CorporateBondService(),
    }
  },
  methods: {
    async fetchData(userId) {
      try {
        const response = await this.bondService.getAllResultsByUserId(userId);
        this.results = await response.data.map(({
                                            id,
                                            corporateBondId,
                                            name,
                                            tceaIssuer,
                                            tceaIssuerWithTaxShield,
                                            treaBondHolder,
                                            createdAt
                                          }) => ({
          id,
          corporateBondId,
          name,
          tceaIssuer,
          tceaIssuerWithTaxShield,
          treaBondHolder,
          createdAt
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    handleRefresh() {
      const userId = Number(localStorage.getItem("userId"));
      if (userId) {
        this.fetchData(userId);
      } else {
        console.error("User ID is not provided in the route parameters.");
      }
    },
    newBond() {
      this.$router.push({name: "create-bond"});
    }
  },
  async mounted() {
    const userId = Number(localStorage.getItem("userId"));
    if (userId) {
      await this.fetchData(userId);
    } else {
      console.error("User ID is not provided in the route parameters.");
    }
  },
}
</script>

<template>
  <div class="flex flex-col justify-center p-6 gap-4">
    <div class="flex justify-between items-center w-full gap-4">
      <h1 class="text-xl md:text-4xl font-bold text-black text-nowrap">Registered Bonds</h1>
      <pv-button icon="pi pi-plus" label="New Bond" type="button" class="w-sm bg-primary hover:bg-primary-emphasis text-white uppercase font-bold"
                 raised @click="newBond" />
    </div>
    <bond-results-table :bond-results="results" @refresh="handleRefresh" class="bg-white"/>
    <home-chart :data="results" />
  </div>
</template>

<style scoped>

</style>