<script>
import {FilterMatchMode, FilterOperator} from '@primevue/core/api';
import InputTextComponent from "../../shared/components/input-text.component.vue";

export default {
  name: "bond-results-table",
  components: {InputTextComponent},
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
    },
    formatWithPercentage(value) {
      return value ? value.toFixed(7) + ' %' : '';
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString('en-US') : '';
    },
    goToEditPage(id) {
      this.$router.push({name: 'edit-bond', params: {id}});
    },
    goToDetailPage(id) {
      this.$router.push({name: 'bond-result', params: {id}});
    }
  },
  created() {
    this.initFilters();
  }
}
</script>

<template>
  <pv-data-table v-model:filters="filters" resizableColumns columnResizeMode="fit" filterDisplay="menu"
                 :value="bondResults" sortField="createdAt" :sortOrder="-1"
                 stripedRows removableSort tableStyle="min-width: 50rem" :paginator="true" :rows="5"
                 class="p-2">
    <template #header>
      <div class="flex  flex-col md:flex-row justify-between  items-center w-full gap-4">
        <pv-button type="button"
                   class="w-full md:w-1/5 bg-primary hover:bg-primary-emphasis text-white uppercase font-bold"
                   icon="pi pi-filter-slash" :label="$t('home.clear')" @click="clearFilter()" raised/>
        <pv-icon-field class="w-full flex justify-center">
          <pv-icon-field>
            <pv-input-icon>
              <i class="pi pi-search"/>
            </pv-input-icon>
            <pv-input-text v-model="filters['global'].value" :placeholder="$t('home.search')" class="w-full"/>
          </pv-icon-field>
        </pv-icon-field>
        <pv-button icon="pi pi-refresh"
                   class="w-full  md:w-1/5 bg-primary hover:bg-primary-emphasis text-white uppercase font-bold" raised
                   :label="$t('home.refresh')" @click="refreshData"/>
      </div>
    </template>
    <template #empty> No data found.</template>
    <pv-column field="createdAt" :sortable="true " style="width: 20%">
      <template #header>
        <span class="font-bold">{{ $t('home.date') }}</span>
      </template>
      <template #body="slotProps">
        {{ formatDate(slotProps.data.createdAt) }}
      </template>
    </pv-column>
    <pv-column field="name" style="width: 20%">
      <template #header>
        <span class="font-bold">{{ $t('home.name') }}</span>
      </template>
    </pv-column>
    <pv-column style="width: 20%">
      <template #header>
        <span class="font-bold line-clamp-2 text-wrap">{{ $t('home.tceaIssuer') }}</span>
      </template>
      <template #body="slotProps">
        {{ formatWithPercentage(slotProps.data.tceaIssuer) }}
      </template>
    </pv-column>
    <pv-column style="width: 20%">
      <template #header>
        <span class="font-bold line-clamp-2 text-wrap">{{ $t('home.tceaIssuerWithShield') }}</span>
      </template>
      <template #body="slotProps">
        {{ formatWithPercentage(slotProps.data.tceaIssuerWithTaxShield) }}
      </template>
    </pv-column>
    <pv-column style="width: 20%">
      <template #header>
        <span class="font-bold line-clamp-2 text-wrap">{{ $t('home.treaBondholder') }}</span>
      </template>
      <template #body="slotProps">
        {{ formatWithPercentage(slotProps.data.treaBondHolder) }}
      </template>
    </pv-column>
    <pv-column header="Actions" style="width: 10%">
      <template #body="slotProps">
        <pv-button icon="pi pi-eye"
                   class="bg-primary hover:bg-primary-emphasis text-white rounded-full p-2 transition mr-2"
                   @click="goToDetailPage(slotProps.data.corporateBondId)"/>
        <pv-button icon="pi pi-pencil"
                   class="bg-primary hover:bg-primary-emphasis text-white rounded-full p-2 transition"
                   @click="goToEditPage(slotProps.data.corporateBondId)"/>
      </template>
    </pv-column>
  </pv-data-table>
</template>

<style scoped>

</style>