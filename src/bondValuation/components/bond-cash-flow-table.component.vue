<script>
export default {
  name: "bond-cash-flow-table",
  props: {
    cashFlows: {
      type: Array,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  methods: {
    formatWithPercentage(value) {
      if (value == null) return '';
      value = value * 100; // Convert to percentage
      return value.toFixed(7) + '%';
    },
    formatAmount(value) {
      if (value == null) return '';
      if (value === 0) return '-';
      if (value < 0) return `(${Math.abs(value).toLocaleString()})`;
      return value.toLocaleString();
    },
    getAmountClass(value) {
      if (value === 0) return 'text-gray-500 font-bold';
      if (value < 0) return 'text-red-500 font-bold';
      return 'text-blue-600 font-bold';
    }
  }
}
</script>

<template>
  <pv-data-table resizableColumns columnResizeMode="fit"
                 :value="cashFlows" sortField="scheduledDate" :sortOrder="1"
                 stripedRows showGridlines removableSort :paginator="true" :rows="5"
                 class="w-full">
    <pv-column field="scheduledDate" :sortable="true" style="width: 10%">
      <template #header>
        <span class="font-bold text-wrap">{{ "Scheduled Date" }}</span>
      </template>
    </pv-column>
    <pv-column field="idx" header="Nro" :sortable="true" style="width: 2%"/>
    <pv-column style="width: 10%">
      <template #header>
        <span class="font-bold text-wrap">{{ "Annual Inflation Rate" }}</span>
      </template>
      <template #body="slotProps">
        {{ formatWithPercentage(slotProps.data.annualInflationRate) }}
      </template>
    </pv-column>
    <pv-column style="width: 10%">
      <template #header>
        <span class="font-bold text-wrap">{{ "Period Inflation Rate" }}</span>
      </template>
      <template #body="slotProps">
        {{ formatWithPercentage(slotProps.data.periodInflationRate) }}
      </template>
    </pv-column>
    <pv-column field="gracePeriodType" style="width: 10%">
      <template #header>
        <span class="font-bold text-wrap">{{ "Grace Period" }}</span>
      </template>
    </pv-column>
    <pv-column style="width: 10%;">
      <template #header>
        <span class="font-bold text-wrap">{{ "Bond Nominal" }}</span>
      </template>
      <template #body="slotProps">
        <span :class="getAmountClass(slotProps.data.bondNominal)">
          {{ formatAmount(slotProps.data.bondNominal) }}
        </span>
      </template>
    </pv-column>
    <pv-column style="width: 10%;">
      <template #header>
        <span class="font-bold text-wrap">{{ "Indexed Bond" }}</span>
      </template>
      <template #body="slotProps">
        <span :class="getAmountClass(slotProps.data.indexedBond)">
          {{ formatAmount(slotProps.data.indexedBond) }}
        </span>
      </template>
    </pv-column>
    <pv-column style="width: 10%;">
      <template #header>
        <span class="font-bold text-wrap">{{ "Interest Coupon" }}</span>
      </template>
      <template #body="slotProps">
        <span :class="getAmountClass(slotProps.data.interestCoupon)">
          {{ formatAmount(slotProps.data.interestCoupon) }}
        </span>
      </template>
    </pv-column>
    <pv-column style="width: 10%;">
      <template #header>
        <span class="font-bold text-wrap">{{ "Payment" }}</span>
      </template>
      <template #body="slotProps">
        <span :class="getAmountClass(slotProps.data.totalPayment)">
          {{ formatAmount(slotProps.data.totalPayment) }}
        </span>
      </template>
    </pv-column>
    <pv-column style="width: 10%;">
      <template #header>
        <span class="font-bold text-wrap">{{ "Amortization" }}</span>
      </template>
      <template #body="slotProps">
        <span :class="getAmountClass(slotProps.data.amortization)">
          {{ formatAmount(slotProps.data.amortization) }}
        </span>
      </template>
    </pv-column>
    <pv-column style="width: 10%;">
      <template #header>
        <span class="font-bold text-wrap">{{ "Premium" }}</span>
      </template>
      <template #body="slotProps">
        <span :class="getAmountClass(slotProps.data.premium)">
          {{ formatAmount(slotProps.data.premium) }}
        </span>
      </template>
    </pv-column>
    <pv-column style="width: 10%;">
      <template #header>
        <span class="font-bold text-wrap">{{ "Shield" }}</span>
      </template>
      <template #body="slotProps">
        <span :class="getAmountClass(slotProps.data.taxShield)">
          {{ formatAmount(slotProps.data.taxShield) }}
        </span>
      </template>
    </pv-column>
    <pv-column style="width: 10%;">
      <template #header>
        <span class="font-bold text-wrap">{{ "Issuer Flow" }}</span>
      </template>
      <template #body="slotProps">
        <span :class="getAmountClass(slotProps.data.issuerFlow)">
          {{ formatAmount(slotProps.data.issuerFlow) }}
        </span>
      </template>
    </pv-column>
    <pv-column style="width: 10%;">
      <template #header>
        <span class="font-bold text-wrap" title="Issuer Flow with Shield">Flow w/ Shield</span>
      </template>
      <template #body="slotProps">
        <span :class="getAmountClass(slotProps.data.issuerFlowWithShield)">
          {{ formatAmount(slotProps.data.issuerFlowWithShield) }}
        </span>
      </template>
    </pv-column>
    <pv-column style="width: 10%;">
      <template #header>
        <span class="font-bold text-wrap">{{ "Bondholder Flow" }}</span>
      </template>
      <template #body="slotProps">
        <span :class="getAmountClass(slotProps.data.bondholderFlow)">
          {{ formatAmount(slotProps.data.bondholderFlow) }}
        </span>
      </template>
    </pv-column>
    <pv-column style="width: 10%;">
      <template #header>
        <span class="font-bold text-wrap">{{ "Current Flow" }}</span>
      </template>
      <template #body="slotProps">
        <span :class="getAmountClass(slotProps.data.discountedFlow)">
          {{ formatAmount(slotProps.data.discountedFlow) }}
        </span>
      </template>
    </pv-column>
    <pv-column style="width: 10%;">
      <template #header>
        <span class="font-bold text-wrap">{{ "Flow by Period" }}</span>
      </template>
      <template #body="slotProps">
        <span :class="getAmountClass(slotProps.data.discountedFlowByPeriod)">
          {{ formatAmount(slotProps.data.discountedFlowByPeriod) }}
        </span>
      </template>
    </pv-column>
    <pv-column style="width: 10%;">
    <template #header>
      <span class="font-bold text-wrap">{{ "Convexity Factor" }}</span>
    </template>
    <template #body="slotProps">
        <span :class="getAmountClass(slotProps.data.convexityFactor)">
          {{ formatAmount(slotProps.data.convexityFactor) }}
        </span>
    </template>
  </pv-column>
  </pv-data-table>
</template>

<style scoped>

</style>