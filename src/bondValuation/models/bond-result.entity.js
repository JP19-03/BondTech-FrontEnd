export class BondResult {
    constructor({
                    id = 0,
                    corporateBondId = 0,
                    name = '',
                    couponFrequency = 0,
                    capitalizationDays = 0,
                    periodsPerYear = 0,
                    totalPeriods = 0,
                    annualEffectiveRate = 0,
                    periodicEffectiveRate = 0,
                    periodicDiscountRate = 0,
                    issuerInitialCosts = 0,
                    bondholderInitialCosts = 0,
                    currentPrice = 0,
                    gainOrLoss = 0,
                    duration = 0,
                    convexity = 0,
                    totalDurationConvexity = 0,
                    modifiedDuration = 0,
                    tceaIssuer = 0,
                    tceaIssuerWithTaxShield = 0,
                    treaBondHolder = 0
                }) {
        this.id = id;
        this.corporateBondId = corporateBondId;
        this.name = name;
        this.couponFrequency = couponFrequency;
        this.capitalizationDays = capitalizationDays;
        this.periodsPerYear = periodsPerYear;
        this.totalPeriods = totalPeriods;
        this.annualEffectiveRate = annualEffectiveRate;
        this.periodicEffectiveRate = periodicEffectiveRate;
        this.periodicDiscountRate = periodicDiscountRate;
        this.issuerInitialCosts = issuerInitialCosts;
        this.bondholderInitialCosts = bondholderInitialCosts;
        this.currentPrice = currentPrice;
        this.gainOrLoss = gainOrLoss;
        this.duration = duration;
        this.convexity = convexity;
        this.totalDurationConvexity = totalDurationConvexity;
        this.modifiedDuration = modifiedDuration;
        this.tceaIssuer = tceaIssuer;
        this.tceaIssuerWithTaxShield = tceaIssuerWithTaxShield;
        this.treaBondHolder = treaBondHolder;
    }
}