// Tax Configuration System - Configurable for different regions
class TaxConfiguration {
    constructor() {
        this.currentRegion = 'US'; // Default to US
        this.taxConfigs = {
            'US': {
                name: 'United States',
                currency: '$',
                incomeTax: {
                    brackets: {
                        single: [
                            { min: 0, max: 11000, rate: 0.10 },
                            { min: 11000, max: 44725, rate: 0.12 },
                            { min: 44725, max: 95375, rate: 0.22 },
                            { min: 95375, max: 182050, rate: 0.24 },
                            { min: 182050, max: 231250, rate: 0.32 },
                            { min: 231250, max: 578125, rate: 0.35 },
                            { min: 578125, max: Infinity, rate: 0.37 }
                        ],
                        marriedJoint: [
                            { min: 0, max: 22000, rate: 0.10 },
                            { min: 22000, max: 89450, rate: 0.12 },
                            { min: 89450, max: 190750, rate: 0.22 },
                            { min: 190750, max: 364200, rate: 0.24 },
                            { min: 364200, max: 462500, rate: 0.32 },
                            { min: 462500, max: 693750, rate: 0.35 },
                            { min: 693750, max: Infinity, rate: 0.37 }
                        ]
                    },
                    standardDeductions: {
                        single: 13850,
                        marriedJoint: 27700,
                        marriedSeparate: 13850,
                        headOfHousehold: 20800
                    }
                },
                selfEmploymentTax: {
                    socialSecurityRate: 0.124,
                    medicareRate: 0.029,
                    socialSecurityWageBase: 160200,
                    applicableEarningsRate: 0.9235
                },
                salesTax: {
                    averageRate: 6.35, // National average
                    note: 'Varies by state and locality'
                }
            },
            'CN': {
                name: 'China',
                currency: '¥',
                incomeTax: {
                    brackets: {
                        individual: [
                            { min: 0, max: 36000, rate: 0.03 },
                            { min: 36000, max: 144000, rate: 0.10 },
                            { min: 144000, max: 300000, rate: 0.20 },
                            { min: 300000, max: 420000, rate: 0.25 },
                            { min: 420000, max: 660000, rate: 0.30 },
                            { min: 660000, max: 960000, rate: 0.35 },
                            { min: 960000, max: Infinity, rate: 0.45 }
                        ]
                    },
                    standardDeductions: {
                        individual: 60000, // Annual basic deduction
                        additional: {
                            specialDeductions: true,
                            childEducation: 12000,
                            continuingEducation: 4800,
                            majorMedical: 80000,
                            housingLoanInterest: 12000,
                            housingRent: 18000,
                            elderCare: 24000
                        }
                    }
                },
                socialInsurance: {
                    pension: { employee: 0.08, employer: 0.16 },
                    medical: { employee: 0.02, employer: 0.06 },
                    unemployment: { employee: 0.005, employer: 0.005 },
                    workInjury: { employee: 0, employer: 0.002 },
                    maternity: { employee: 0, employer: 0.008 },
                    housingFund: { employee: 0.12, employer: 0.12 }
                },
                salesTax: {
                    vatRate: 0.13, // Standard VAT rate
                    note: 'VAT system with different rates for different goods'
                }
            },
            'UK': {
                name: 'United Kingdom',
                currency: '£',
                incomeTax: {
                    brackets: {
                        standard: [
                            { min: 0, max: 12570, rate: 0 }, // Personal allowance
                            { min: 12570, max: 50270, rate: 0.20 }, // Basic rate
                            { min: 50270, max: 125140, rate: 0.40 }, // Higher rate
                            { min: 125140, max: Infinity, rate: 0.45 } // Additional rate
                        ]
                    },
                    nationalInsurance: {
                        class1: [
                            { min: 0, max: 12570, rate: 0 },
                            { min: 12570, max: 50270, rate: 0.12 },
                            { min: 50270, max: Infinity, rate: 0.02 }
                        ]
                    }
                },
                lastUpdated: '2024-04-06'
            },
            'DE': {
                name: 'Germany',
                currency: '€',
                incomeTax: {
                    brackets: {
                        single: [
                            { min: 0, max: 10908, rate: 0 }, // Grundfreibetrag (basic allowance)
                            { min: 10908, max: 15999, rate: 0.14 }, // Eingangssteuersatz
                            { min: 15999, max: 62809, rate: 0.24 }, // Progressive zone
                            { min: 62809, max: 277825, rate: 0.42 }, // Spitzensteuersatz
                            { min: 277825, max: Infinity, rate: 0.45 } // Reichensteuer
                        ]
                    },
                    solidarityTax: 0.055, // Solidaritätszuschlag (5.5% of income tax)
                    churchTax: 0.08 // Kirchensteuer (8-9%, using 8% average)
                },
                socialInsurance: {
                    pension: { rate: 0.186, max: 87600 }, // Rentenversicherung (18.6%)
                    unemployment: { rate: 0.024, max: 87600 }, // Arbeitslosenversicherung (2.4%)
                    health: { rate: 0.146, max: 62550 }, // Krankenversicherung (14.6%)
                    nursing: { rate: 0.0305, max: 62550 } // Pflegeversicherung (3.05%)
                },
                lastUpdated: '2024-01-01'
            },
            'JP': {
                name: 'Japan',
                currency: '¥',
                incomeTax: {
                    brackets: {
                        individual: [
                            { min: 0, max: 1950000, rate: 0.05 },
                            { min: 1950000, max: 3300000, rate: 0.10 },
                            { min: 3300000, max: 6950000, rate: 0.20 },
                            { min: 6950000, max: 9000000, rate: 0.23 },
                            { min: 9000000, max: 18000000, rate: 0.33 },
                            { min: 18000000, max: 40000000, rate: 0.40 },
                            { min: 40000000, max: Infinity, rate: 0.45 }
                        ]
                    },
                    basicDeduction: 480000, // 基礎控除
                    employmentDeduction: 550000 // 給与所得控除
                },
                socialInsurance: {
                    pension: { rate: 0.183, max: 6500000 }, // 厚生年金 (18.3%)
                    health: { rate: 0.099, max: 13950000 }, // 健康保険 (9.9%)
                    employment: { rate: 0.006, max: 13950000 }, // 雇用保険 (0.6%)
                    longTermCare: { rate: 0.0123, max: 13950000 } // 介護保険 (1.23%)
                },
                lastUpdated: '2024-04-01'
            },
            'FR': {
                name: 'France',
                currency: '€',
                incomeTax: {
                    brackets: {
                        single: [
                            { min: 0, max: 10777, rate: 0 },
                            { min: 10777, max: 27478, rate: 0.11 },
                            { min: 27478, max: 78570, rate: 0.30 },
                            { min: 78570, max: 168994, rate: 0.41 },
                            { min: 168994, max: Infinity, rate: 0.45 }
                        ],
                        married: [
                            { min: 0, max: 21554, rate: 0 },
                            { min: 21554, max: 54956, rate: 0.11 },
                            { min: 54956, max: 157140, rate: 0.30 },
                            { min: 157140, max: 337988, rate: 0.41 },
                            { min: 337988, max: Infinity, rate: 0.45 }
                        ]
                    }
                },
                socialContributions: {
                    csg: 0.092, // Contribution sociale généralisée
                    crds: 0.005, // Contribution au remboursement de la dette sociale
                    pensionEmployee: 0.1128, // Retraite employé
                    unemployment: 0.024, // Assurance chômage
                    health: 0.0075 // Assurance maladie
                },
                lastUpdated: '2024-01-01'
            },
            'CA': {
                name: 'Canada',
                currency: 'C$',
                incomeTax: {
                    federal: {
                        brackets: [
                            { min: 0, max: 55867, rate: 0.15 },
                            { min: 55867, max: 111733, rate: 0.205 },
                            { min: 111733, max: 173205, rate: 0.26 },
                            { min: 173205, max: 246752, rate: 0.29 },
                            { min: 246752, max: Infinity, rate: 0.33 }
                        ],
                        basicPersonalAmount: 15000
                    },
                    // Ontario as example provincial tax
                    provincial: {
                        brackets: [
                            { min: 0, max: 51446, rate: 0.0505 },
                            { min: 51446, max: 102894, rate: 0.0915 },
                            { min: 102894, max: 150000, rate: 0.1116 },
                            { min: 150000, max: 220000, rate: 0.1216 },
                            { min: 220000, max: Infinity, rate: 0.1316 }
                        ],
                        basicPersonalAmount: 12399
                    }
                },
                socialInsurance: {
                    cpp: { rate: 0.0595, max: 68500 }, // Canada Pension Plan
                    ei: { rate: 0.0163, max: 63300 } // Employment Insurance
                },
                lastUpdated: '2024-01-01'
            },
            'AU': {
                name: 'Australia',
                currency: 'A$',
                incomeTax: {
                    brackets: {
                        resident: [
                            { min: 0, max: 18200, rate: 0 }, // Tax-free threshold
                            { min: 18200, max: 45000, rate: 0.19 },
                            { min: 45000, max: 120000, rate: 0.325 },
                            { min: 120000, max: 180000, rate: 0.37 },
                            { min: 180000, max: Infinity, rate: 0.45 }
                        ]
                    },
                    medicareLevy: 0.02, // Medicare Levy (2%)
                    medicareLevySurcharge: 0.01 // For high earners without private health insurance
                },
                superannuation: {
                    guaranteeRate: 0.115, // Superannuation Guarantee (11.5%)
                    concessionalCap: 30000 // Annual concessional contributions cap
                },
                lastUpdated: '2024-07-01'
            }
        };
    }

    setRegion(region) {
        if (this.taxConfigs[region]) {
            this.currentRegion = region;
            return true;
        }
        return false;
    }

    getCurrentConfig() {
        return this.taxConfigs[this.currentRegion];
    }

    calculateIncomeTax(income, filingStatus = 'single', region = null) {
        const config = region ? this.taxConfigs[region] : this.getCurrentConfig();
        if (!config) return null;

        let tax = 0;
        let brackets;

        // Map filing statuses for different regions
        switch (region || this.currentRegion) {
            case 'US':
                brackets = config.incomeTax.brackets[filingStatus] || config.incomeTax.brackets.single;
                break;
            case 'CN':
                brackets = config.incomeTax.brackets.individual;
                break;
            case 'UK':
                brackets = config.incomeTax.brackets.standard;
                break;
            default:
                brackets = config.incomeTax.brackets.single || config.incomeTax.brackets.individual;
        }

        // Calculate tax using brackets
        for (const bracket of brackets) {
            if (income > bracket.min) {
                const taxableInBracket = Math.min(income - bracket.min, bracket.max - bracket.min);
                tax += taxableInBracket * bracket.rate;
            }
        }

        return {
            tax: tax,
            effectiveRate: income > 0 ? (tax / income) * 100 : 0,
            marginalRate: this.getMarginalRate(income, brackets) * 100,
            afterTaxIncome: income - tax,
            currency: config.currency
        };
    }

    getMarginalRate(income, brackets) {
        for (let i = brackets.length - 1; i >= 0; i--) {
            if (income > brackets[i].min) {
                return brackets[i].rate;
            }
        }
        return 0;
    }

    calculateSalaryTax(grossSalary, region = null, filingStatus = 'single') {
        const config = region ? this.taxConfigs[region] : this.getCurrentConfig();
        if (!config) return null;

        let result = {
            grossSalary: grossSalary,
            currency: config.currency,
            breakdown: {}
        };

        switch (region || this.currentRegion) {
            case 'US':
                const incomeTaxResult = this.calculateIncomeTax(grossSalary, filingStatus, 'US');
                result.breakdown.federalIncomeTax = incomeTaxResult.tax;
                result.breakdown.socialSecurity = Math.min(grossSalary * 0.062, 160200 * 0.062);
                result.breakdown.medicare = grossSalary * 0.0145;
                result.totalTax = result.breakdown.federalIncomeTax + 
                                result.breakdown.socialSecurity + 
                                result.breakdown.medicare;
                break;

            case 'CN':
                const cnIncomeTax = this.calculateIncomeTax(grossSalary - 60000, 'individual', 'CN'); // After basic deduction
                result.breakdown.incomeTax = Math.max(0, cnIncomeTax.tax);
                
                // Social insurance calculations
                const socialInsurance = config.socialInsurance;
                result.breakdown.pension = grossSalary * socialInsurance.pension.employee;
                result.breakdown.medical = grossSalary * socialInsurance.medical.employee;
                result.breakdown.unemployment = grossSalary * socialInsurance.unemployment.employee;
                result.breakdown.housingFund = grossSalary * socialInsurance.housingFund.employee;
                
                result.totalTax = result.breakdown.incomeTax + 
                                result.breakdown.pension + 
                                result.breakdown.medical + 
                                result.breakdown.unemployment + 
                                result.breakdown.housingFund;
                break;

            case 'UK':
                const ukIncomeTax = this.calculateIncomeTax(grossSalary, 'standard', 'UK');
                result.breakdown.incomeTax = ukIncomeTax.tax;
                
                // National Insurance
                let nationalInsurance = 0;
                for (const bracket of config.incomeTax.nationalInsurance.class1) {
                    if (grossSalary > bracket.min) {
                        const taxableInBracket = Math.min(grossSalary - bracket.min, bracket.max - bracket.min);
                        nationalInsurance += taxableInBracket * bracket.rate;
                    }
                }
                result.breakdown.nationalInsurance = nationalInsurance;
                result.totalTax = result.breakdown.incomeTax + result.breakdown.nationalInsurance;
                break;

            case 'DE':
                // German tax calculation
                const deIncomeTax = this.calculateIncomeTax(Math.max(0, grossSalary - 10908), 'single', 'DE'); // After Grundfreibetrag
                result.breakdown.incomeTax = deIncomeTax.tax;
                result.breakdown.solidarityTax = deIncomeTax.tax * config.incomeTax.solidarityTax;
                result.breakdown.churchTax = deIncomeTax.tax * config.incomeTax.churchTax;
                
                // Social insurance (employee portion = 50%)
                const socialIns = config.socialInsurance;
                result.breakdown.pension = Math.min(grossSalary, socialIns.pension.max) * socialIns.pension.rate * 0.5;
                result.breakdown.unemployment = Math.min(grossSalary, socialIns.unemployment.max) * socialIns.unemployment.rate * 0.5;
                result.breakdown.health = Math.min(grossSalary, socialIns.health.max) * socialIns.health.rate * 0.5;
                result.breakdown.nursing = Math.min(grossSalary, socialIns.nursing.max) * socialIns.nursing.rate * 0.5;
                
                result.totalTax = result.breakdown.incomeTax + result.breakdown.solidarityTax + 
                                result.breakdown.churchTax + result.breakdown.pension + 
                                result.breakdown.unemployment + result.breakdown.health + result.breakdown.nursing;
                break;

            case 'JP':
                // Japanese tax calculation (after basic and employment deductions)
                const jpTaxableIncome = Math.max(0, grossSalary - config.incomeTax.basicDeduction - config.incomeTax.employmentDeduction);
                const jpIncomeTax = this.calculateIncomeTax(jpTaxableIncome, 'individual', 'JP');
                result.breakdown.incomeTax = jpIncomeTax.tax;
                
                // Social insurance (employee portion)
                const jpSocial = config.socialInsurance;
                result.breakdown.pension = Math.min(grossSalary, jpSocial.pension.max) * jpSocial.pension.rate * 0.5;
                result.breakdown.health = Math.min(grossSalary, jpSocial.health.max) * jpSocial.health.rate * 0.5;
                result.breakdown.employment = Math.min(grossSalary, jpSocial.employment.max) * jpSocial.employment.rate;
                result.breakdown.longTermCare = grossSalary > 4000000 ? Math.min(grossSalary, jpSocial.longTermCare.max) * jpSocial.longTermCare.rate * 0.5 : 0;
                
                result.totalTax = result.breakdown.incomeTax + result.breakdown.pension + 
                                result.breakdown.health + result.breakdown.employment + result.breakdown.longTermCare;
                break;

            case 'FR':
                // French tax calculation (household system)
                const frIncomeTax = this.calculateIncomeTax(grossSalary, filingStatus === 'marriedJoint' ? 'married' : 'single', 'FR');
                result.breakdown.incomeTax = frIncomeTax.tax;
                
                // Social contributions
                const frSocial = config.socialContributions;
                result.breakdown.csg = grossSalary * frSocial.csg; // CSG
                result.breakdown.crds = grossSalary * frSocial.crds; // CRDS
                result.breakdown.pension = grossSalary * frSocial.pensionEmployee;
                result.breakdown.unemployment = grossSalary * frSocial.unemployment;
                result.breakdown.health = grossSalary * frSocial.health;
                
                result.totalTax = result.breakdown.incomeTax + result.breakdown.csg + result.breakdown.crds +
                                result.breakdown.pension + result.breakdown.unemployment + result.breakdown.health;
                break;

            case 'CA':
                // Canadian federal + provincial tax
                const caFederalTax = this.calculateCanadianFederalTax(grossSalary, config);
                const caProvincialTax = this.calculateCanadianProvincialTax(grossSalary, config, 'ontario'); // Default Ontario
                result.breakdown.federalTax = caFederalTax;
                result.breakdown.provincialTax = caProvincialTax;
                
                // Social insurance
                const caSocial = config.socialInsurance;
                result.breakdown.cpp = Math.min(grossSalary, caSocial.cpp.max) * caSocial.cpp.rate;
                result.breakdown.ei = Math.min(grossSalary, caSocial.ei.max) * caSocial.ei.rate;
                
                result.totalTax = result.breakdown.federalTax + result.breakdown.provincialTax + 
                                result.breakdown.cpp + result.breakdown.ei;
                break;

            case 'AU':
                // Australian tax calculation
                const auIncomeTax = this.calculateIncomeTax(grossSalary, 'resident', 'AU');
                result.breakdown.incomeTax = auIncomeTax.tax;
                result.breakdown.medicareLevy = grossSalary * config.incomeTax.medicareLevy;
                // Medicare Levy Surcharge for high earners (simplified)
                result.breakdown.medicareLevySurcharge = grossSalary > 90000 ? grossSalary * config.incomeTax.medicareLevySurcharge : 0;
                
                result.totalTax = result.breakdown.incomeTax + result.breakdown.medicareLevy + result.breakdown.medicareLevySurcharge;
                break;
        }

        result.netSalary = grossSalary - result.totalTax;
        result.effectiveRate = grossSalary > 0 ? (result.totalTax / grossSalary) * 100 : 0;

        return result;
    }

    calculateCanadianFederalTax(income, config) {
        const brackets = config.incomeTax.federal.brackets;
        const basicAmount = config.incomeTax.federal.basicPersonalAmount;
        const taxableIncome = Math.max(0, income - basicAmount);
        
        let tax = 0;
        for (const bracket of brackets) {
            if (taxableIncome > bracket.min) {
                const taxableInBracket = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min);
                tax += taxableInBracket * bracket.rate;
            }
        }
        return tax;
    }

    calculateCanadianProvincialTax(income, config, province = 'ontario') {
        const provincial = config.incomeTax.provincial[province];
        if (!provincial) return 0;
        
        const basicAmount = provincial.basicPersonalAmount;
        const taxableIncome = Math.max(0, income - basicAmount);
        
        let tax = 0;
        for (const bracket of provincial.brackets) {
            if (taxableIncome > bracket.min) {
                const taxableInBracket = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min);
                tax += taxableInBracket * bracket.rate;
            }
        }
        return tax;
    }

    getAvailableRegions() {
        return Object.keys(this.taxConfigs).map(key => ({
            code: key,
            name: window.i18n ? window.i18n.t(`region.${key.toLowerCase()}`) : this.taxConfigs[key].name,
            currency: this.taxConfigs[key].currency
        }));
    }

    // Method to add or update tax configuration for a new region
    addRegionConfig(regionCode, config) {
        this.taxConfigs[regionCode] = config;
    }

    // Method to validate tax calculations against official sources
    validateCalculation(income, expectedTax, region = null, filingStatus = 'single') {
        const result = this.calculateIncomeTax(income, filingStatus, region);
        const difference = Math.abs(result.tax - expectedTax);
        const tolerance = expectedTax * 0.01; // 1% tolerance
        
        return {
            isValid: difference <= tolerance,
            calculated: result.tax,
            expected: expectedTax,
            difference: difference,
            tolerance: tolerance
        };
    }
}

// Initialize global tax configuration
window.taxConfig = new TaxConfiguration();