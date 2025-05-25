<script>
import {CorporateBondService} from "../services/corporate-bond.service.js";
import {BondResult} from "../models/bond-result.entity.js";
import {CashFlow} from "../models/cash-flow.entity.js";
import BondResultDetail from "../components/bond-result-detail.component.vue";
import BondCashFlowTable from "../components/bond-cash-flow-table.component.vue";
import {CorporateBond} from "../models/corporate-bond.entity.js";

export default {
  name: "bond-result",
  components: {BondCashFlowTable, BondResultDetail},
  data() {
    return {
      bondService: new CorporateBondService(),
      corporateBond: null,
      bondResult: null,
      cashFlows: [],
      currency: 'USD'
    }
  },
  methods: {
    async fetchCorporateBond(id) {
      try {
        const response = await this.bondService.getById(id);
        if (response.status === 200) {
          this.corporateBond = new CorporateBond(response.data);
          this.currency = this.corporateBond.currencyToConvert;
        } else {
          console.error("Error fetching corporate bond:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching corporate bond:", error);
      }
    },
    async fetchBondResult(id) {
      try {
        const response = await this.bondService.getResultByCorporateBondId(id);
        if (response.status === 200) {
          this.bondResult = new BondResult(response.data);
          this.$toast.add(
              {
                severity: "success",
                summary: "Success",
                detail: "Bond result fetched successfully.",
                life: 3000
              }
          )
        } else {
          this.$toast.add(
              {
                severity: "error",
                summary: "Error",
                detail: "Failed to fetch bond result.",
                life: 3000
              }
          )
          console.error("Error fetching bond result:", response.statusText);
        }
      } catch (error) {
        this.$toast.add(
            {
              severity: "error",
              summary: "Error",
              detail: "An error occurred while fetching bond result.",
              life: 3000
            }
        )
        console.error("Error fetching bond result:", error);
      }
    },
    async fetchCashFlows(id) {
      try {
        const response = await this.bondService.getAllCashFlowsByResultId(id);
        if (response.status === 200) {
          this.cashFlows = response.data.map(cf => new CashFlow(cf));
          this.$toast.add(
              {
                severity: "success",
                summary: "Success",
                detail: "Cash flows fetched successfully.",
                life: 3000
              }
          )
        } else {
          this.$toast.add(
              {
                severity: "error",
                summary: "Error",
                detail: "Failed to fetch cash flows.",
                life: 3000
              }
          )
          console.error("Error fetching cash flows:", response.statusText);
        }
      } catch (error) {
        this.$toast.add(
            {
              severity: "error",
              summary: "Error",
              detail: "An error occurred while fetching cash flows.",
              life: 3000
            }
        )
        console.error("Error fetching cash flows:", error);
      }
    }
  },
  async mounted() {
    const bondId = this.$route.params.id;
    if (bondId) {
      await this.fetchCorporateBond(bondId);
      await this.fetchBondResult(bondId);
      await this.fetchCashFlows(bondId);
    } else {
      this.$toast.add(
          {
            severity: "error",
            summary: "Error",
            detail: "No bond ID provided in route parameters.",
            life: 3000
          }
      )
      console.error("No bond ID provided in route parameters.");
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-3 p-2 ">
    <h1 class="text-3xl font-bold">Results</h1>

    <bond-result-detail
        v-if="bondResult"
        :bondResult="bondResult"
        :currency="currency"
    />

    <div class="border rounded-sm shadow-md/20 bg-white w-full">
      <bond-cash-flow-table
          v-if="cashFlows"
          :cashFlows="cashFlows"
          :currency="currency"
      />
    </div>

  </div>
</template>

<style scoped>

</style>