<script>
import {BondResult} from "../models/bond-result.entity.js";
import InputTextComponent from "../../shared/components/input-text.component.vue";
import InputNumberComponent from "../../shared/components/input-number.component.vue";

export default {
  name: "bond-result-detail",
  components: {InputNumberComponent, InputTextComponent},
  props: {
    bondResult: {
      type: BondResult,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  }
}
</script>

<template>
  <!--  lg:w-4xl xl:w-5xl -->
  <div class="border rounded-sm shadow-md/20 bg-white w-full">
    <div class="flex flex-col justify-between items-center p-2 md:items-start xl:flex-row">
      <div class="flex flex-col justify-between items-center w-full md:items-start md:flex-row">
        <div class="flex flex-col justify-between items-center gap-2 w-full h-full p-2">
          <h2 class="text-xl font-bold text-center">{{ $t('bondResult.bondData') }}</h2>

          <!-- Bond Frequency and Capitalization Days -->
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
            <InputNumberComponent
                v-model="bondResult.couponFrequency"
                :label="$t('bondResult.couponFrequency')"
                :disabled="true"
                suffix=" days"
                id="couponFrequency"
            />

            <InputNumberComponent
                v-model="bondResult.capitalizationDays"
                :label="$t('bondResult.capitalizationDays')"
                :disabled="true"
                suffix=" days"
                id="capitalizationDays"
            />
          </div>

          <!-- Bond Number of Periods Per Year and Number of Periods -->
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
            <InputNumberComponent
                v-model="bondResult.periodsPerYear"
                :label="$t('bondResult.periodsPerYear')"
                :disabled="true"
                suffix=" periods"
                id="periodsPerYear"
            />

            <InputNumberComponent
                v-model="bondResult.totalPeriods"
                :label="$t('bondResult.totalPeriods')"
                :disabled="true"
                suffix=" periods"
                id="periods"
            />
          </div>

          <!-- Bond Annual Effective Rate and Periodic Effective Rate -->
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
            <InputNumberComponent
                v-model="bondResult.annualEffectiveRate"
                :label="$t('bondResult.annualEffectiveRate')"
                :disabled="true"
                suffix="%"
                id="annualEffectiveRate"
            />

            <InputNumberComponent
                v-model="bondResult.periodicEffectiveRate"
                :label="$t('bondResult.periodicEffectiveRate')"
                :disabled="true"
                suffix="%"
                id="periodicEffectiveRate"
            />
          </div>

          <!-- COK -->
          <InputNumberComponent
              v-model="bondResult.periodicDiscountRate"
              :label="$t('bondResult.periodicDiscountRate')"
              :disabled="true"
              suffix="%"
              id="cok"
              class="w-full"
          />

          <!-- Issuer and Bond Holder Initial Costs -->
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
            <InputNumberComponent
                v-model="bondResult.issuerInitialCosts"
                :label="$t('bondResult.issuerInitialCosts')"
                :disabled="true"
                mode="currency"
                :currency="currency"
                id="issuerInitialCost"
            />

            <InputNumberComponent
                v-model="bondResult.bondholderInitialCosts"
                :label="$t('bondResult.bondholderInitialCosts')"
                :disabled="true"
                mode="currency"
                :currency="currency"
                id="bondHolderInitialCost"
            />
          </div>
        </div>

        <div class="flex flex-col justify-between items-center gap-2 w-full md:w-1/2 lg:w-1/3 h-full p-2">
          <h2 class="text-xl font-bold text-center text-nowrap">{{ $t('bondResult.currentPriceAndProfitability') }}</h2>

          <!-- Bond Current Price and Profit/Loss -->
          <div class="grid grid-cols-1 gap-2 xlg:grid-cols-2 w-full">
            <InputNumberComponent
                v-model="bondResult.currentPrice"
                :label="$t('bondResult.currentPrice')"
                :disabled="true"
                mode="currency"
                :currency="currency"
                id="bondPrice"
            />

            <InputNumberComponent
                v-model="bondResult.gainOrLoss"
                :label="$t('bondResult.gainOrLoss')"
                :disabled="true"
                mode="currency"
                :currency="currency"
                id="profitLoss"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col justify-between items-center w-full xl:w-1/3 md:items-start md:flex-row">
        <div class="flex flex-col justify-between items-center gap-2 w-full h-full p-2">
          <h2 class="text-xl font-bold text-center">{{ $t('bondResult.decisionRatios') }}</h2>

          <!-- Bond Duration -->
          <InputNumberComponent
              v-model="bondResult.duration"
              :label="$t('bondResult.duration')"
              :disabled="true"
              id="duration"
              class="w-full"
          />

          <!-- Bond Convexity -->
          <InputNumberComponent
              v-model="bondResult.convexity"
              :label="$t('bondResult.convexity')"
              :disabled="true"
              id="convexity"
              class="w-full"
          />

          <!-- Bond Total Duration Convexity -->
          <InputNumberComponent
              v-model="bondResult.totalDurationConvexity"
              :label="$t('bondResult.totalDurationConvexity')"
              :disabled="true"
              id="totalDurationConvexity"
              class="w-full"
          />

          <!-- Bond Modified Duration -->
          <InputNumberComponent
              v-model="bondResult.modifiedDuration"
              :label="$t('bondResult.modifiedDuration')"
              :disabled="true"
              id="modifiedDuration"
              class="w-full"
          />

        </div>

        <div class="flex flex-col justify-between items-center gap-2 w-full h-full p-2">
          <h2 class="text-xl font-bold text-center text-nowrap">{{ $t('bondResult.profitabilityIndicators') }}</h2>

          <!-- Bond Issuer's TCEA -->
          <InputNumberComponent
              v-model="bondResult.tceaIssuer"
              :label="$t('bondResult.tceaIssuer')"
              :disabled="true"
              suffix="%"
              id="issuerTCEA"
              class="w-full"
          />

          <!-- Bond Issuer's TCEA with Shield -->
          <InputNumberComponent
              v-model="bondResult.tceaIssuerWithTaxShield"
              :label="$t('bondResult.tceaIssuerWithShield')"
              :disabled="true"
              suffix="%"
              id="issuerTCEAShield"
              class="w-full"
          />

          <!-- Bond Holder's TREA -->
          <InputNumberComponent
              v-model="bondResult.treaBondHolder"
              :label="$t('bondResult.treaBondholder')"
              :disabled="true"
              suffix="%"
              id="bondHolderTREA"
              class="w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>