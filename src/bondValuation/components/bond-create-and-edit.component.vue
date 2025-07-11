<script>
import {CorporateBond} from "../models/corporate-bond.entity.js";
import {CorporateBondService} from "../services/corporate-bond.service.js";
import InputTextComponent from "../../shared/components/input-text.component.vue";
import InputNumberComponent from "../../shared/components/input-number.component.vue";
import SelectComponent from "../../shared/components/select.component.vue";
import SelectButtonWrapper from "../../shared/components/select-button.component.vue";
import ButtonComponent from "../../shared/components/button.component.vue";

export default {
  name: "bond-create-and-edit",
  components: {ButtonComponent, SelectButtonWrapper, InputTextComponent, InputNumberComponent, SelectComponent},
  data() {
    return {
      bondService: new CorporateBondService(),
      submitted: false,
      currency: 'PEN',
      options: ['PEN', 'USD'],
      daysPerYearsOptions: [360, 365],
      couponFrequencyOptions: ['MENSUAL', 'BIMESTRAL', 'TRIMESTRAL', 'CUATRIMESTRAL', 'SEMESTRAL', 'ANUAL'],
      capitalizationOptions: ['DIARIO', 'QUINCENAL', 'MENSUAL', 'BIMESTRAL', 'TRIMESTRAL', 'CUATRIMESTRAL', 'SEMESTRAL', 'ANUAL'],
      graceTypeOptions: ['TOTAL', 'PARCIAL', 'NONE'],
      bond: {...new CorporateBond({})},
      minDate: null,
      maxDate: null,
      checked: false,
    }
  },
  computed: {
    conversion: {
      get() {
        return this.currency === 'PEN' ? 'USD' : 'PEN';
      },
      set(val) {
        this.currency = val === 'PEN' ? 'USD' : 'PEN';
      }
    },
    numberOfYearsString: {
      get() {
        return this.bond.numberOfYears != null ? String(this.bond.numberOfYears) : '';
      },
      set(val) {
        this.bond.numberOfYears = val === '' ? null : Number(val);
      }
    }
  },
  methods: {
    resetForm() {
      this.bond = {...new CorporateBond({})};
      this.submitted = false;
      this.conversion = '';
    },
    validateForm() {
      console.log(this.bond);
      return (
          this.bond.name &&
          this.bond.faceValue &&
          this.bond.marketValue &&
          this.bond.exchangeRate &&
          this.bond.numberOfYears &&
          this.bond.daysPerYear &&
          this.bond.couponFrequency &&
          this.bond.interestRateType &&
          (this.bond.interestRateType === 'NOMINAL' ? this.bond.capitalizationPeriod : true) &&
          this.bond.interestRate &&
          this.bond.annualDiscountRate &&
          this.bond.incomeTaxRate &&
          this.bond.emissionDate &&
          this.bond.graceType &&
          (this.bond.graceType === 'NONE' ? this.bond.capitalizationPeriod : false))
    },
    configBeforeCreate() {
      if (this.bond.interestRateType === 'EFECTIVA') {
        this.bond.capitalizationPeriod = 'NONE';
      }

      if (this.bond.graceType === 'NONE') {
        this.bond.numberOfGracePeriods = 0;
      }
      this.bond.originalCurrency = this.currency;
      this.bond.currencyToConvert = this.checked ? this.conversion : this.currency;
    },
    transformPercentageToNormal(value) {
      return Math.round(value * 100 * 100) / 100;
    },
    adjustReceivedBond(bond) {
      this.currency = bond.originalCurrency !== bond.currencyToConvert ? bond.currencyToConvert : bond.originalCurrency;

      const percentageFields = [
        "interestRate",
        "annualDiscountRate",
        "incomeTaxRate",
        "premiumRate",
        "structuringFeeRate",
        "placementFeeRate",
        "flotationFeeRate",
        "cavaliFeeRate",
        "annualInflationRate",
      ];

      percentageFields.forEach(field => {
        if (bond[field] !== undefined && bond[field] !== null) {
          bond[field] = this.transformPercentageToNormal(bond[field]);
        }
      });

      this.bond = bond;
    },
    async fetchBondById(id) {
      try {
        const response = await this.bondService.getById(id);
        const localBond = new CorporateBond(response.data);
        this.adjustReceivedBond(localBond);
      } catch (error) {
        console.error("Error fetching bond:", error);
      }
    },
    async postBond() {
      try {
        const response = await this.bondService.create(this.bond);
        if (response.status === 201) {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Bond created successfully',
            life: 3000
          });
          this.resetForm();
          setTimeout(() => {
            this.$router.push({name: 'bond-result', params: {id: response.data.id}});
          }, 2000);
        }
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while creating the bond.',
          life: 3000
        });
      }
    },
    async putBond() {
      try {
        const response = await this.bondService.update(this.bond, this.bond.id);
        if (response.status === 200) {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Bond updated successfully',
            life: 3000
          });
          this.resetForm();
          setTimeout(() => {
            this.$router.push({name: 'bond-result', params: {id: response.data.id}});
          }, 3000);
        }
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while updating the bond.',
          life: 3000
        });
      }
    },
    async submitForm() {

      this.configBeforeCreate();

      this.bond.userId = Number(localStorage.getItem('userId'));

      this.submitted = true;

      if (this.validateForm()) {
        if (this.bond.id) {
          console.log(this.bond);
          await this.putBond();
        } else {
          delete this.bond.id;
          console.log(this.bond)
          await this.postBond();
        }
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please fill in all required fields correctly.',
          life: 3000
        });
      }
    },
    goToHome() {
      this.$router.push({name: 'home'});
    }
  },
  created() {
    const today = new Date();
    this.minDate = today;
    // Si quieres mantener maxDate como un año después:
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    this.maxDate = nextYear;
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id) {
      await this.fetchBondById(id);
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-2 p-4">
    <h1 class="text-3xl font-bold">{{ bond.id ? $t('corporateBond.editBond') : $t('corporateBond.createBond') }}</h1>

    <div class="border rounded-sm shadow-md/20 bg-white w-full lg:w-4xl xl:w-5xl">
      <div class="flex justify-between items-center flex-col md:flex-row md:items-start">
        <div class="flex flex-col justify-between items-center gap-4 w-full h-full p-4">
          <h2 class="text-xl font-bold text-center">{{ $t('corporateBond.bondData') }}</h2>

          <!-- Currency and Name -->
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2  w-full">
            <div class="w-full" v-if="bond.id">
              <InputTextComponent v-model="currency" id="currentCurrency" label="Current Currency" :disabled="true"/>
            </div>
            <div class="w-full" v-else>
              <SelectButtonWrapper v-model="currency" :options="options" id="currencySelect"/>
            </div>
            <div>
              <InputNumberComponent v-model="bond.exchangeRate" :label="$t('corporateBond.exchangeRate')"
                                    :min="0.0000001"
                                    :min-fraction-digits="7" id="bondExchangeRate"/>
              <small v-if="submitted && !bond.exchangeRate" class="text-red-500">Exchange Rate is required.</small>
            </div>
          </div>

          <!-- Bond Name -->
          <div class="w-full">
            <InputTextComponent v-model="bond.name" :label="$t('corporateBond.name')" id="bondName"/>
            <small v-if="submitted && !bond.name" class="text-red-500">Name is required.</small>
          </div>

          <!-- Face Value and Market Value -->
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2  w-full">
            <div>
              <InputNumberComponent v-model="bond.faceValue" :label="$t('corporateBond.faceValue')" mode="currency"
                                    :currency="currency"
                                    id="bondFaceValue"/>
              <small v-if="submitted && !bond.faceValue" class="text-red-500">Face Value is required.</small>
            </div>

            <div>
              <InputNumberComponent v-model="bond.marketValue" :label="$t('corporateBond.marketValue')" mode="currency"
                                    :currency="currency"
                                    id="bondMarketValue"/>
              <small v-if="submitted && !bond.marketValue" class="text-red-500">Market Value is required.</small>
            </div>
          </div>

          <!-- Number of Years and Days Per Year -->
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
            <div v-if="bond.id">
              <InputTextComponent v-model="numberOfYearsString" :label="$t('corporateBond.numberOfYears')"
                                  :disabled="true"
                                  id="bondNumberOfYears"/>
            </div>

            <div v-else>
              <InputNumberComponent v-model="bond.numberOfYears" :label="$t('corporateBond.numberOfYears')" :min="1"
                                    :showButtons="true"
                                    id="bondNumberOfYears"/>
              <small v-if="submitted && !bond.numberOfYears" class="text-red-500">Number of Years is required.</small>
            </div>

            <div>
              <SelectComponent :options="daysPerYearsOptions" v-model="bond.daysPerYear"
                               :placeholder="$t('corporateBond.daysPerYear')" id="daysPerYearSelect"/>
              <small v-if="submitted && !bond.marketValue" class="text-red-500">Market Value is required.</small>
            </div>
          </div>

          <!-- Coupon Frequency and Interest Rate Type -->
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
            <div>
              <SelectComponent :options="couponFrequencyOptions" v-model="bond.couponFrequency"
                               :placeholder="$t('corporateBond.couponFrequency')" id="couponFrequencySelect"/>
              <small v-if="submitted && !bond.couponFrequency" class="text-red-500">Coupon Frequency is
                required.</small>
            </div>

            <div>
              <SelectComponent :options="['EFECTIVA', 'NOMINAL']" v-model="bond.interestRateType"
                               :placeholder="$t('corporateBond.interestRateType')" id="interestRateTypeSelect"/>
              <small v-if="submitted && !bond.interestRateType" class="text-red-500">
                Interest Rate Type is required.
              </small>
            </div>

          </div>

          <!-- Capitalization Period -->
          <div v-if="bond.interestRateType === 'NOMINAL'" class="w-full">
            <SelectComponent :options="capitalizationOptions" v-model="bond.capitalizationPeriod"
                             :placeholder="$t('corporateBond.capitalizationPeriod')" id="capitalizationPeriodSelect"/>
            <small v-if="submitted && !bond.capitalizationPeriod" class="text-red-500">
              Capitalization Period is required.
            </small>
          </div>

          <!-- Interest Rate and Annual Discount Rate -->
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
            <div>
              <InputNumberComponent v-model="bond.interestRate" :label="$t('corporateBond.interestRate')"
                                    :min="0.0000001"
                                    :min-fraction-digits="7" suffix=" %" id="bondInterestRate"/>
              <small v-if="submitted && !bond.interestRate" class="text-red-500">Interest Rate is required.</small>
            </div>

            <div>
              <InputNumberComponent v-model="bond.annualDiscountRate" :label="$t('corporateBond.annualDiscountRate')"
                                    :min="0.0000001"
                                    :min-fraction-digits="7" suffix=" %" id="bondAnnualDiscountRate"/>
              <small v-if="submitted && !bond.annualDiscountRate" class="text-red-500">
                Annual Discount Rate is required.
              </small>
            </div>
          </div>

          <!-- Income Rate and Emission Date -->
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
            <div>
              <InputNumberComponent v-model="bond.incomeTaxRate" :label="$t('corporateBond.incomeTaxRate')"
                                    :min="0.0000001"
                                    :min-fraction-digits="7" suffix=" %" id="bondIncomeRate"/>
              <small v-if="submitted && !bond.incomeTaxRate" class="text-red-500">
                Income Rate is required.
              </small>
            </div>

            <div>
              <pv-date-picker v-model="bond.emissionDate" :placeholder="$t('corporateBond.emissionDate')"
                              id="bondEmissionDate" class="w-full"
                              showIcon fluid :showOnFocus="false" :minDate="minDate" :maxDate="maxDate"
                              :manualInput="false" dateFormat="yy-mm-dd"
              />
              <small v-if="submitted && !bond.emissionDate" class="text-red-500">Emission Date is required.</small>
            </div>
          </div>

          <!-- Grace Type and Grace Periods -->
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
            <div>
              <SelectComponent :options="graceTypeOptions" v-model="bond.graceType"
                               :placeholder="$t('corporateBond.graceType')" id="graceTypeSelect"/>
              <small v-if="submitted && !bond.graceType" class="text-red-500">Grace Type is required.</small>
            </div>

            <div v-if="bond.graceType !== 'NONE'">
              <InputNumberComponent v-model="bond.numberOfGracePeriods"
                                    :label="$t('corporateBond.numberOfGracePeriods')" :min="0"
                                    :showButtons="true"
                                    id="bondGracePeriods"/>
              <small v-if="submitted && !bond.numberOfGracePeriods" class="text-red-500">Grace Periods is
                required.</small>
            </div>
          </div>

        </div>

        <div class="flex flex-col justify-between items-center gap-4 w-full md:w-1/2 h-full p-4">
          <h2 class="text-xl font-bold text-center">{{ $t('corporateBond.initialCostData') }}</h2>

          <div class="w-full">
            <InputNumberComponent v-model="bond.premiumRate" :label="$t('corporateBond.premiumRate')" :min="0.0000001"
                                  :min-fraction-digits="7" suffix=" %" id="bondPremiumRate"/>
            <small v-if="submitted && !bond.premiumRate" class="text-red-500">
              Premium Rate is required.
            </small>
          </div>

          <div class="w-full">
            <InputNumberComponent v-model="bond.structuringFeeRate" :label="$t('corporateBond.structuringFeeRate')" :min="0.0000001"
                                  :min-fraction-digits="7" suffix=" %" id="bondStructuringRate"/>
            <small v-if="submitted && !bond.structuringFeeRate" class="text-red-500">
              Structuring Rate is required.
            </small>
          </div>

          <div class="w-full">
            <InputNumberComponent v-model="bond.placementFeeRate" :label="$t('corporateBond.placementFeeRate')" :min="0.0000001"
                                  :min-fraction-digits="7" suffix=" %" id="bondPlacementFeeRate"/>
            <small v-if="submitted && !bond.placementFeeRate" class="text-red-500">
              Placement Fee Rate is required.
            </small>
          </div>

          <div class="w-full">
            <InputNumberComponent v-model="bond.flotationFeeRate" :label="$t('corporateBond.flotationFeeRate')" :min="0.0000001"
                                  :min-fraction-digits="7" suffix=" %" id="bondFlotationFeeRate"/>
            <small v-if="submitted && !bond.flotationFeeRate" class="text-red-500">
              Flotation Fee Rate is required.
            </small>
          </div>

          <div class="w-full">
            <InputNumberComponent v-model="bond.cavaliFeeRate" :label="$t('corporateBond.cavaliFeeRate')" :min="0.0000001"
                                  :min-fraction-digits="7" suffix=" %" id="bondCavaliFeeRate"/>
            <small v-if="submitted && !bond.cavaliFeeRate" class="text-red-500">
              Cavali Fee Rate is required.
            </small>
          </div>

          <div class="w-full">
            <InputNumberComponent v-model="bond.annualInflationRate" :label="$t('corporateBond.annualInflationRate')" :min="0.0000001"
                                  :min-fraction-digits="7" suffix=" %" id="bondAnnualInflationRate"/>
            <small v-if="submitted && !bond.annualInflationRate" class="text-red-500">
              Annual Inflation Rate is required.
            </small>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center gap-2">
      <pv-checkbox v-model="checked" inputId="conversion" name="conversion" binary/>
      <label for="conversion">
        {{ currency === 'USD' ? $t('corporateBond.convertPEN') : $t('corporateBond.convertUSD') }}
      </label>
    </div>

    <div class="flex gap-6 w-full md:w-1/2">
      <pv-button
          icon="pi pi-times"
          :label="$t('cancel')"
          type="button"
          class="text-black md:text-lg rounded-border p-4 border border-transparent flex items-center justify-center bg-primary-200 hover:bg-primary-100 font-medium flex-auto transition-colors"
          raised
          @click="goToHome"
      />

      <pv-button
          :label="bond.id ? $t('update') : $t('save')"
          :icon="bond.id ? 'pi pi-pencil' : 'pi pi-save'"
          type="button"
          class="font-bold md:text-xl rounded-border p-4 border border-transparent flex items-center justify-center bg-primary hover:bg-primary-emphasis text-primary-contrast flex-auto transition-colors"
          raised
          @click="submitForm"
      />
    </div>
  </div>
</template>

<style scoped>

</style>