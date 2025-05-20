<script>
import {FilterMatchMode, FilterOperator} from '@primevue/core/api';

export default {
  name: "bond-results-table",
  props: {
    bondResults: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      filters: null,
    }
  },
  methods: {
    initFilters() {
      this.filters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS}
      }
    },
    clearFilter() {
      this.initFilters();
    },
    refreshData() {
      this.$emit('refresh');
    }
  },
  created() {
    this.initFilters();
  }
}
</script>

<template>
  <pv-data-table v-model:filters="filters" resizableColumns columnResizeMode="fit" filterDisplay="menu" :value="bondResults" sortField="date" :sortOrder="-1"
                 stripedRows removableSort tableStyle="min-width: 50rem" :paginator="true" :rows="10"
                 :showGridlines="true">
    <template #header>
      <div class="flex justify-between">
        <pv-button type="button" icon="pi pi-filter-slash" label="Clear"  @click="clearFilter()" raised/>
        <pv-icon-field>
          <pv-icon-field>
            <pv-input-icon>
              <i class="pi pi-search"/>
            </pv-input-icon>
            <pv-input-text v-model="filters['global'].value" placeholder="Keyword Search"/>
          </pv-icon-field>
        </pv-icon-field>
        <pv-button icon="pi pi-refresh" rounded raised label="Refresh" @click="refreshData"/>
      </div>
    </template>
    <template #empty> No data found.</template>
    <pv-column field="createdAt" header="Date" :sortable="true " style="width: 20%"/>
    <pv-column field="name" header="Name" style="width: 20%"/>
    <pv-column field="tceaIssuer" header="TCEA Issuer" style="width: 20%"/>
    <pv-column field="tceaIssuerWithTaxShield" header="TCEA Issuer With Tax Shield" style="width: 20%"/>
    <pv-column field="treaBondHolder" header="TREA Bond Holder" style="width: 20%"/>
  </pv-data-table>
</template>

<style scoped>

</style>