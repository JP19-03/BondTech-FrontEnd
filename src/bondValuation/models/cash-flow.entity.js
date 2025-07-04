export class CashFlow {
    constructor({
                    id = 0,
                    bondAnalysisResultId = 0,
                    idx = 0,
                    scheduledDate = "",
                    annualInflationRate = 0,
                    periodInflationRate = 0,
                    gracePeriodType = "",
                    bondNominal = 0,
                    indexedBond = 0,
                    interestCoupon = 0,
                    totalPayment = 0,
                    amortization = 0,
                    premium = 0,
                    taxShield = 0,
                    issuerFlow = 0,
                    issuerFlowWithShield = 0,
                    bondholderFlow = 0,
                    discountedFlow = 0,
                    discountedFlowByPeriod = 0,
                    convexityFactor = 0
                }) {
        this.id = id;
        this.bondAnalysisResultId = bondAnalysisResultId;
        this.idx = idx;
        this.scheduledDate = scheduledDate;
        this.annualInflationRate = annualInflationRate;
        this.periodInflationRate = periodInflationRate;
        this.gracePeriodType = gracePeriodType;
        this.bondNominal = bondNominal;
        this.indexedBond = indexedBond;
        this.interestCoupon = interestCoupon;
        this.totalPayment = totalPayment;
        this.amortization = amortization;
        this.premium = premium;
        this.taxShield = taxShield;
        this.issuerFlow = issuerFlow;
        this.issuerFlowWithShield = issuerFlowWithShield;
        this.bondholderFlow = bondholderFlow;
        this.discountedFlow = discountedFlow;
        this.discountedFlowByPeriod = discountedFlowByPeriod;
        this.convexityFactor = convexityFactor;
    }
}