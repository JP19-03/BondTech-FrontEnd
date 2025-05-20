export class CorporateBond {
    constructor({
        id = 0,
        userId = 0,
        faceValue = 0,
        marketValue = 0,
        numberOfYears = 0,
        couponFrequency = 0,
        daysPerYear = 0,
        interestRateType = "",
        capitalizationPeriod = "",
        interestRate = 0,
        annualDiscountRate = 0,
        incomeTaxRate = 0,
        emissionDate = "",
        premiumRate = 0,
        structuringRate = 0,
        placementFeeRate = 0,
        flotationFeeRate = 0,
        cavaliFeeRate = 0,
        annualInflationRate = 0,
        graceType = "",
        numberOfGracePeriods = 0,
                }) {
        this.id = id;
        this.userId = userId;
        this.faceValue = faceValue;
        this.marketValue = marketValue;
        this.numberOfYears = numberOfYears;
        this.couponFrequency = couponFrequency;
        this.daysPerYear = daysPerYear;
        this.interestRateType = interestRateType;
        this.capitalizationPeriod = capitalizationPeriod;
        this.interestRate = interestRate;
        this.annualDiscountRate = annualDiscountRate;
        this.incomeTaxRate = incomeTaxRate;
        this.emissionDate = emissionDate;
        this.premiumRate = premiumRate;
        this.structuringRate = structuringRate;
        this.placementFeeRate = placementFeeRate;
        this.flotationFeeRate = flotationFeeRate;
        this.cavaliFeeRate = cavaliFeeRate;
        this.annualInflationRate = annualInflationRate;
        this.graceType = graceType;
        this.numberOfGracePeriods = numberOfGracePeriods;
    }
}