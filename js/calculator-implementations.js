// Calculator Implementation Functions
// This file contains all the setup functions for each calculator

// Extend the FullCalApp class with all calculator implementations
FullCalApp.prototype.setupLoanCalculator = function() {
    const form = document.getElementById('loan-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const regionCode = document.getElementById('loan-region').value;
            const currency = window.taxConfig ? window.taxConfig.taxConfigs[regionCode].currency : '$';
            
            const principal = parseFloat(document.getElementById('loan-principal').value);
            const annualRate = parseFloat(document.getElementById('loan-interest').value) / 100;
            const years = parseFloat(document.getElementById('loan-years').value);
            
            let monthlyPayment, totalAmount, totalInterest, apr;

            // Different loan calculation methods by country
            switch (regionCode) {
                case 'US':
                    // US: Monthly compounding
                    const monthlyRateUS = annualRate / 12;
                    const numberOfPaymentsUS = years * 12;
                    monthlyPayment = principal * (monthlyRateUS * Math.pow(1 + monthlyRateUS, numberOfPaymentsUS)) / 
                                   (Math.pow(1 + monthlyRateUS, numberOfPaymentsUS) - 1);
                    totalAmount = monthlyPayment * numberOfPaymentsUS;
                    apr = ((totalAmount - principal) / principal / years) * 100;
                    break;

                case 'UK':
                    // UK: APR includes fees and charges
                    const monthlyRateUK = annualRate / 12;
                    const numberOfPaymentsUK = years * 12;
                    monthlyPayment = principal * (monthlyRateUK * Math.pow(1 + monthlyRateUK, numberOfPaymentsUK)) / 
                                   (Math.pow(1 + monthlyRateUK, numberOfPaymentsUK) - 1);
                    // UK often includes arrangement fees (typically 1-2%)
                    const ukFees = principal * 0.015;
                    totalAmount = (monthlyPayment * numberOfPaymentsUK) + ukFees;
                    apr = ((totalAmount - principal) / principal / years) * 100;
                    break;

                case 'DE':
                    // Germany: Effective annual rate calculation
                    const monthlyRateDE = annualRate / 12;
                    const numberOfPaymentsDE = years * 12;
                    monthlyPayment = principal * (monthlyRateDE * Math.pow(1 + monthlyRateDE, numberOfPaymentsDE)) / 
                                   (Math.pow(1 + monthlyRateDE, numberOfPaymentsDE) - 1);
                    // German loans often include processing fees
                    const germanFees = principal * 0.02;
                    totalAmount = (monthlyPayment * numberOfPaymentsDE) + germanFees;
                    apr = ((totalAmount - principal) / principal / years) * 100;
                    break;

                case 'JP':
                    // Japan: Often uses different payment frequency
                    const monthlyRateJP = annualRate / 12;
                    const numberOfPaymentsJP = years * 12;
                    monthlyPayment = principal * (monthlyRateJP * Math.pow(1 + monthlyRateJP, numberOfPaymentsJP)) / 
                                   (Math.pow(1 + monthlyRateJP, numberOfPaymentsJP) - 1);
                    totalAmount = monthlyPayment * numberOfPaymentsJP;
                    // Japan loan calculation style
                    apr = ((totalAmount - principal) / principal / years) * 100;
                    break;

                case 'CA':
                    // Canada: Similar to US but with different compounding
                    const monthlyRateCA = annualRate / 12;
                    const numberOfPaymentsCA = years * 12;
                    monthlyPayment = principal * (monthlyRateCA * Math.pow(1 + monthlyRateCA, numberOfPaymentsCA)) / 
                                   (Math.pow(1 + monthlyRateCA, numberOfPaymentsCA) - 1);
                    totalAmount = monthlyPayment * numberOfPaymentsCA;
                    apr = ((totalAmount - principal) / principal / years) * 100;
                    break;

                default:
                    // Default calculation
                    const monthlyRateDefault = annualRate / 12;
                    const numberOfPaymentsDefault = years * 12;
                    monthlyPayment = principal * (monthlyRateDefault * Math.pow(1 + monthlyRateDefault, numberOfPaymentsDefault)) / 
                                   (Math.pow(1 + monthlyRateDefault, numberOfPaymentsDefault) - 1);
                    totalAmount = monthlyPayment * numberOfPaymentsDefault;
                    apr = ((totalAmount - principal) / principal / years) * 100;
            }

            totalInterest = totalAmount - principal;
            
            document.getElementById('loan-payment').textContent = `${currency}${monthlyPayment.toFixed(2)}`;
            document.getElementById('loan-total-interest').textContent = `${currency}${totalInterest.toFixed(2)}`;
            document.getElementById('loan-total-amount').textContent = `${currency}${totalAmount.toFixed(2)}`;
            document.getElementById('loan-apr').textContent = `${apr.toFixed(2)}%`;
            document.getElementById('loan-result').style.display = 'block';
        });
    }
};

FullCalApp.prototype.setupInvestmentCalculator = function() {
    const form = document.getElementById('investment-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const regionCode = document.getElementById('investment-region').value;
            const currency = window.taxConfig ? window.taxConfig.taxConfigs[regionCode].currency : '$';
            
            const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
            const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value) || 0;
            const annualReturn = parseFloat(document.getElementById('annual-return').value) / 100;
            const years = parseFloat(document.getElementById('investment-years').value);
            
            const monthlyRate = annualReturn / 12;
            const numberOfPayments = years * 12;
            
            // Future value of initial investment
            const futureValueInitial = initialInvestment * Math.pow(1 + annualReturn, years);
            
            // Future value of monthly contributions
            let futureValueContributions = 0;
            if (monthlyContribution > 0) {
                futureValueContributions = monthlyContribution * 
                    ((Math.pow(1 + monthlyRate, numberOfPayments) - 1) / monthlyRate);
            }
            
            const grossFinalAmount = futureValueInitial + futureValueContributions;
            const totalContributions = initialInvestment + (monthlyContribution * numberOfPayments);
            const grossInterestEarned = grossFinalAmount - totalContributions;

            // Apply country-specific investment taxation
            let finalAmount, totalInterestEarned, taxOnGains = 0;

            switch (regionCode) {
                case 'US':
                    // US: Long-term capital gains tax (simplified)
                    if (years >= 1) {
                        taxOnGains = grossInterestEarned * 0.15; // 15% long-term capital gains
                    } else {
                        taxOnGains = grossInterestEarned * 0.22; // Ordinary income tax rate
                    }
                    break;

                case 'UK':
                    // UK: Capital gains tax with annual allowance
                    const ukCGTAllowance = 6000; // 2024 allowance
                    const taxableGains = Math.max(0, grossInterestEarned - ukCGTAllowance);
                    taxOnGains = taxableGains * 0.20; // 20% for higher rate taxpayers
                    break;

                case 'DE':
                    // Germany: Abgeltungsteuer (withholding tax)
                    taxOnGains = grossInterestEarned * 0.25; // 25% withholding tax + solidarity surcharge
                    break;

                case 'CA':
                    // Canada: 50% of capital gains taxable
                    taxOnGains = (grossInterestEarned * 0.5) * 0.25; // 50% inclusion rate, 25% tax rate
                    break;

                case 'JP':
                    // Japan: Separate taxation for investment income
                    taxOnGains = grossInterestEarned * 0.2015; // 20.315% (20% + 0.315% reconstruction tax)
                    break;

                case 'FR':
                    // France: Flat tax on capital gains
                    taxOnGains = grossInterestEarned * 0.30; // 30% flat tax (PFU)
                    break;

                case 'AU':
                    // Australia: Capital gains tax with 50% discount for assets held >1 year
                    if (years >= 1) {
                        taxOnGains = (grossInterestEarned * 0.5) * 0.30; // 50% discount, 30% tax rate
                    } else {
                        taxOnGains = grossInterestEarned * 0.30; // Full rate
                    }
                    break;

                default:
                    // Default: No tax adjustment
                    taxOnGains = 0;
            }

            finalAmount = grossFinalAmount - taxOnGains;
            totalInterestEarned = grossInterestEarned - taxOnGains;
            const roiPercentage = ((totalInterestEarned) / totalContributions) * 100;
            
            document.getElementById('final-amount').textContent = `${currency}${finalAmount.toFixed(2)}`;
            document.getElementById('total-contributions').textContent = `${currency}${totalContributions.toFixed(2)}`;
            document.getElementById('total-interest-earned').textContent = `${currency}${totalInterestEarned.toFixed(2)}`;
            document.getElementById('roi-percentage').textContent = `${roiPercentage.toFixed(2)}%`;
            document.getElementById('investment-result').style.display = 'block';
        });
    }
};

FullCalApp.prototype.setupIncomeTaxCalculator = function() {
    const form = document.getElementById('income-tax-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const annualIncome = parseFloat(document.getElementById('annual-income').value);
            const filingStatus = document.getElementById('filing-status').value;
            const useStandardDeduction = document.getElementById('standard-deduction').value === 'yes';
            
            // 2024 tax brackets (simplified)
            const taxBrackets = {
                single: [
                    { min: 0, max: 11000, rate: 0.10 },
                    { min: 11000, max: 44725, rate: 0.12 },
                    { min: 44725, max: 95375, rate: 0.22 },
                    { min: 95375, max: 182050, rate: 0.24 },
                    { min: 182050, max: 231250, rate: 0.32 },
                    { min: 231250, max: 578125, rate: 0.35 },
                    { min: 578125, max: Infinity, rate: 0.37 }
                ],
                'married-joint': [
                    { min: 0, max: 22000, rate: 0.10 },
                    { min: 22000, max: 89450, rate: 0.12 },
                    { min: 89450, max: 190750, rate: 0.22 },
                    { min: 190750, max: 364200, rate: 0.24 },
                    { min: 364200, max: 462500, rate: 0.32 },
                    { min: 462500, max: 693750, rate: 0.35 },
                    { min: 693750, max: Infinity, rate: 0.37 }
                ]
            };
            
            const standardDeductions = {
                single: 13850,
                'married-joint': 27700,
                'married-separate': 13850,
                'head-household': 20800
            };
            
            const deduction = useStandardDeduction ? standardDeductions[filingStatus] : 0;
            const taxableIncome = Math.max(0, annualIncome - deduction);
            
            let tax = 0;
            const brackets = taxBrackets[filingStatus] || taxBrackets.single;
            
            for (const bracket of brackets) {
                if (taxableIncome > bracket.min) {
                    const taxableInBracket = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min);
                    tax += taxableInBracket * bracket.rate;
                }
            }
            
            const effectiveRate = (tax / annualIncome) * 100;
            const afterTaxIncome = annualIncome - tax;
            const monthlyTakeHome = afterTaxIncome / 12;
            
            document.getElementById('total-tax').textContent = `$${tax.toFixed(2)}`;
            document.getElementById('effective-rate').textContent = `${effectiveRate.toFixed(2)}%`;
            document.getElementById('after-tax-income').textContent = `$${afterTaxIncome.toFixed(2)}`;
            document.getElementById('monthly-take-home').textContent = `$${monthlyTakeHome.toFixed(2)}`;
            document.getElementById('income-tax-result').style.display = 'block';
        });
    }
};

FullCalApp.prototype.setupSalesTaxCalculator = function() {
    const form = document.getElementById('sales-tax-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const purchaseAmount = parseFloat(document.getElementById('purchase-amount').value);
            const taxRate = parseFloat(document.getElementById('tax-percentage').value) / 100;
            const method = document.getElementById('calculation-method').value;
            
            let taxAmount, subtotal, totalWithTax;
            
            if (method === 'add-tax') {
                subtotal = purchaseAmount;
                taxAmount = subtotal * taxRate;
                totalWithTax = subtotal + taxAmount;
            } else { // reverse-tax
                totalWithTax = purchaseAmount;
                subtotal = totalWithTax / (1 + taxRate);
                taxAmount = totalWithTax - subtotal;
            }
            
            document.getElementById('tax-amount').textContent = `$${taxAmount.toFixed(2)}`;
            document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('total-with-tax').textContent = `$${totalWithTax.toFixed(2)}`;
            document.getElementById('sales-tax-result').style.display = 'block';
        });
    }
};

FullCalApp.prototype.setupSelfEmploymentTaxCalculator = function() {
    const form = document.getElementById('self-employment-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const netEarnings = parseFloat(document.getElementById('net-earnings').value);
            const taxYear = document.getElementById('tax-year').value;
            
            // 2024 rates
            const ssRate = 0.124; // 12.4%
            const medicareRate = 0.029; // 2.9%
            const ssWageBase = 160200; // 2024 limit
            
            const seTax = netEarnings * 0.9235; // 92.35% of net earnings subject to SE tax
            
            const ssTax = Math.min(seTax, ssWageBase) * ssRate;
            const medicareTax = seTax * medicareRate;
            const totalSeTax = ssTax + medicareTax;
            const quarterlyPayment = totalSeTax / 4;
            
            document.getElementById('se-tax').textContent = `$${totalSeTax.toFixed(2)}`;
            document.getElementById('ss-tax').textContent = `$${ssTax.toFixed(2)}`;
            document.getElementById('medicare-tax').textContent = `$${medicareTax.toFixed(2)}`;
            document.getElementById('quarterly-payment').textContent = `$${quarterlyPayment.toFixed(2)}`;
            document.getElementById('self-employment-result').style.display = 'block';
        });
    }
};

FullCalApp.prototype.setupPropertyTaxCalculator = function() {
    const form = document.getElementById('property-tax-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const homeValue = parseFloat(document.getElementById('home-value').value);
            const assessmentRate = parseFloat(document.getElementById('assessment-rate').value) / 100;
            const millRate = parseFloat(document.getElementById('mill-rate').value);
            const exemptions = parseFloat(document.getElementById('exemptions').value) || 0;
            
            const assessedValue = (homeValue * assessmentRate) - exemptions;
            const annualPropertyTax = (assessedValue / 1000) * millRate;
            const monthlyEscrow = annualPropertyTax / 12;
            const effectiveTaxRate = (annualPropertyTax / homeValue) * 100;
            
            document.getElementById('annual-property-tax').textContent = `$${annualPropertyTax.toFixed(2)}`;
            document.getElementById('assessed-value').textContent = `$${assessedValue.toFixed(2)}`;
            document.getElementById('monthly-escrow').textContent = `$${monthlyEscrow.toFixed(2)}`;
            document.getElementById('effective-tax-rate').textContent = `${effectiveTaxRate.toFixed(3)}%`;
            document.getElementById('property-tax-result').style.display = 'block';
        });
    }
};

FullCalApp.prototype.setupDateCalculator = function() {
    const form = document.getElementById('date-form');
    const typeSelect = document.getElementById('calculation-type-date');
    
    if (form && typeSelect) {
        // Set default dates
        const today = new Date();
        const startDateInput = document.getElementById('start-date');
        const endDateInput = document.getElementById('end-date');
        
        startDateInput.valueAsDate = today;
        const futureDate = new Date(today);
        futureDate.setDate(futureDate.getDate() + 30);
        endDateInput.valueAsDate = futureDate;
        
        typeSelect.addEventListener('change', () => {
            const type = typeSelect.value;
            const endDateGroup = document.getElementById('end-date-group');
            const daysGroup = document.getElementById('days-group');
            
            if (type === 'add-days') {
                endDateGroup.style.display = 'none';
                daysGroup.style.display = 'block';
                endDateInput.required = false;
                document.getElementById('days-to-add').required = true;
            } else {
                endDateGroup.style.display = 'block';
                daysGroup.style.display = 'none';
                endDateInput.required = true;
                document.getElementById('days-to-add').required = false;
            }
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const type = typeSelect.value;
            const startDate = new Date(startDateInput.value);
            
            let result, label, breakdown;
            
            if (type === 'difference' || type === 'business-days' || type === 'age') {
                const endDate = new Date(endDateInput.value);
                const diffTime = Math.abs(endDate - startDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (type === 'difference') {
                    result = `${diffDays} days`;
                    label = 'Time Difference';
                    const weeks = Math.floor(diffDays / 7);
                    const months = Math.floor(diffDays / 30.44);
                    const years = Math.floor(diffDays / 365.25);
                    breakdown = `<strong>${weeks} weeks</strong><br><strong>${months} months</strong><br><strong>${years.toFixed(1)} years</strong>`;
                } else if (type === 'business-days') {
                    const businessDays = this.calculateBusinessDays(startDate, endDate);
                    result = `${businessDays} business days`;
                    label = 'Business Days';
                    breakdown = `<strong>Total days: ${diffDays}</strong><br><strong>Weekends excluded</strong>`;
                } else if (type === 'age') {
                    const age = this.calculateAge(startDate, endDate);
                    result = `${age.years} years`;
                    label = 'Age';
                    breakdown = `<strong>${age.years} years, ${age.months} months, ${age.days} days</strong><br><strong>Total days: ${diffDays}</strong>`;
                }
            } else if (type === 'add-days') {
                const daysToAdd = parseInt(document.getElementById('days-to-add').value);
                const resultDate = new Date(startDate);
                resultDate.setDate(resultDate.getDate() + daysToAdd);
                
                result = resultDate.toLocaleDateString();
                label = daysToAdd >= 0 ? 'Date After Adding Days' : 'Date After Subtracting Days';
                breakdown = `<strong>Days ${daysToAdd >= 0 ? 'added' : 'subtracted'}: ${Math.abs(daysToAdd)}</strong>`;
            }
            
            document.getElementById('date-answer').textContent = result;
            document.getElementById('date-label').textContent = label;
            document.getElementById('date-breakdown').innerHTML = breakdown;
            document.getElementById('date-result').style.display = 'block';
        });
    }
};

FullCalApp.prototype.calculateBusinessDays = function(startDate, endDate) {
    let count = 0;
    const current = new Date(startDate);
    
    while (current <= endDate) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
            count++;
        }
        current.setDate(current.getDate() + 1);
    }
    
    return count;
};

FullCalApp.prototype.calculateAge = function(birthDate, currentDate) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();
    
    if (days < 0) {
        months--;
        const lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days += lastDayOfPrevMonth;
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years, months, days };
};

FullCalApp.prototype.setupAreaCalculator = function() {
    const form = document.getElementById('area-form');
    const shapeSelect = document.getElementById('shape-type');
    const shapeInputs = document.getElementById('shape-inputs');
    
    if (form && shapeSelect && shapeInputs) {
        shapeSelect.addEventListener('change', () => {
            this.updateShapeInputs();
        });
        
        // Initialize with default shape
        this.updateShapeInputs();
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const shape = shapeSelect.value;
            let area, perimeter;
            
            switch (shape) {
                case 'rectangle':
                    const length = parseFloat(document.getElementById('length').value);
                    const width = parseFloat(document.getElementById('width').value);
                    area = length * width;
                    perimeter = 2 * (length + width);
                    break;
                    
                case 'circle':
                    const radius = parseFloat(document.getElementById('radius').value);
                    area = Math.PI * radius * radius;
                    perimeter = 2 * Math.PI * radius;
                    break;
                    
                case 'triangle':
                    const base = parseFloat(document.getElementById('base').value);
                    const height = parseFloat(document.getElementById('height').value);
                    area = 0.5 * base * height;
                    perimeter = 'N/A (need all sides)';
                    break;
                    
                case 'square':
                    const side = parseFloat(document.getElementById('side').value);
                    area = side * side;
                    perimeter = 4 * side;
                    break;
                    
                case 'parallelogram':
                    const pBase = parseFloat(document.getElementById('p-base').value);
                    const pHeight = parseFloat(document.getElementById('p-height').value);
                    area = pBase * pHeight;
                    perimeter = 'N/A (need both sides)';
                    break;
                    
                case 'trapezoid':
                    const base1 = parseFloat(document.getElementById('base1').value);
                    const base2 = parseFloat(document.getElementById('base2').value);
                    const tHeight = parseFloat(document.getElementById('t-height').value);
                    area = 0.5 * (base1 + base2) * tHeight;
                    perimeter = 'N/A (need all sides)';
                    break;
            }
            
            document.getElementById('area-value').textContent = `${area.toFixed(2)} units²`;
            document.getElementById('perimeter-value').textContent = typeof perimeter === 'number' ? `${perimeter.toFixed(2)} units` : perimeter;
            document.getElementById('area-result').style.display = 'block';
        });
    }
};

FullCalApp.prototype.updateShapeInputs = function() {
    const shape = document.getElementById('shape-type').value;
    const shapeInputs = document.getElementById('shape-inputs');
    
    const inputTemplates = {
        rectangle: `
            <div class="form-group">
                <label for="length">Length</label>
                <input type="number" id="length" placeholder="10" step="0.1" required>
            </div>
            <div class="form-group">
                <label for="width">Width</label>
                <input type="number" id="width" placeholder="5" step="0.1" required>
            </div>
        `,
        circle: `
            <div class="form-group">
                <label for="radius">Radius</label>
                <input type="number" id="radius" placeholder="5" step="0.1" required>
            </div>
        `,
        triangle: `
            <div class="form-group">
                <label for="base">Base</label>
                <input type="number" id="base" placeholder="8" step="0.1" required>
            </div>
            <div class="form-group">
                <label for="height">Height</label>
                <input type="number" id="height" placeholder="6" step="0.1" required>
            </div>
        `,
        square: `
            <div class="form-group">
                <label for="side">Side Length</label>
                <input type="number" id="side" placeholder="7" step="0.1" required>
            </div>
        `,
        parallelogram: `
            <div class="form-group">
                <label for="p-base">Base</label>
                <input type="number" id="p-base" placeholder="10" step="0.1" required>
            </div>
            <div class="form-group">
                <label for="p-height">Height</label>
                <input type="number" id="p-height" placeholder="4" step="0.1" required>
            </div>
        `,
        trapezoid: `
            <div class="form-group">
                <label for="base1">Base 1 (top)</label>
                <input type="number" id="base1" placeholder="6" step="0.1" required>
            </div>
            <div class="form-group">
                <label for="base2">Base 2 (bottom)</label>
                <input type="number" id="base2" placeholder="10" step="0.1" required>
            </div>
            <div class="form-group">
                <label for="t-height">Height</label>
                <input type="number" id="t-height" placeholder="4" step="0.1" required>
            </div>
        `
    };
    
    shapeInputs.innerHTML = inputTemplates[shape] || '';
};

FullCalApp.prototype.setupWaterCalculator = function() {
    const form = document.getElementById('water-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const weight = parseFloat(document.getElementById('water-weight').value);
            const activityLevel = document.getElementById('activity-level-water').value;
            const climate = document.getElementById('climate').value;
            
            // Base calculation: 35ml per kg body weight
            let dailyWaterML = weight * 35;
            
            // Activity level multipliers
            const activityMultipliers = {
                'sedentary': 1.0,
                'light': 1.2,
                'moderate': 1.4,
                'active': 1.6,
                'very-active': 1.8
            };
            
            // Climate multipliers
            const climateMultipliers = {
                'temperate': 1.0,
                'hot': 1.3,
                'humid': 1.5,
                'cold': 0.9
            };
            
            dailyWaterML *= activityMultipliers[activityLevel];
            dailyWaterML *= climateMultipliers[climate];
            
            const dailyWaterL = dailyWaterML / 1000;
            const glasses8oz = dailyWaterML / 237; // 1 glass = ~237ml
            const bottles16oz = dailyWaterML / 473; // 1 bottle = ~473ml
            const hourlyML = dailyWaterML / 16; // Assuming 16 waking hours
            
            document.getElementById('daily-water').textContent = `${dailyWaterL.toFixed(1)}L`;
            document.getElementById('water-glasses').textContent = Math.round(glasses8oz);
            document.getElementById('water-bottles').textContent = Math.round(bottles16oz);
            document.getElementById('water-hourly').textContent = `${Math.round(hourlyML)}ml`;
            document.getElementById('water-result').style.display = 'block';
        });
    }
};

FullCalApp.prototype.setupBodyFatCalculator = function() {
    const form = document.getElementById('body-fat-form');
    const genderSelect = document.getElementById('bf-gender');
    
    if (form && genderSelect) {
        genderSelect.addEventListener('change', () => {
            const hipGroup = document.getElementById('hip-group');
            if (genderSelect.value === 'female') {
                hipGroup.style.display = 'block';
                document.getElementById('bf-hip').required = true;
            } else {
                hipGroup.style.display = 'none';
                document.getElementById('bf-hip').required = false;
            }
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const gender = genderSelect.value;
            const height = parseFloat(document.getElementById('bf-height').value);
            const waist = parseFloat(document.getElementById('bf-waist').value);
            const neck = parseFloat(document.getElementById('bf-neck').value);
            const hip = parseFloat(document.getElementById('bf-hip').value) || 0;
            
            let bodyFatPercentage;
            
            // US Navy Body Fat Formula
            if (gender === 'male') {
                bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
            } else {
                bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
            }
            
            let category;
            if (gender === 'male') {
                if (bodyFatPercentage < 6) category = 'Essential Fat';
                else if (bodyFatPercentage < 14) category = 'Athletes';
                else if (bodyFatPercentage < 18) category = 'Fitness';
                else if (bodyFatPercentage < 25) category = 'Average';
                else category = 'Obese';
            } else {
                if (bodyFatPercentage < 16) category = 'Essential Fat';
                else if (bodyFatPercentage < 21) category = 'Athletes';
                else if (bodyFatPercentage < 25) category = 'Fitness';
                else if (bodyFatPercentage < 32) category = 'Average';
                else category = 'Obese';
            }
            
            // Assuming weight from height (rough estimate for display)
            const estimatedWeight = gender === 'male' ? 
                (height - 100) * 0.9 : 
                (height - 100) * 0.85;
            
            const fatMass = (bodyFatPercentage / 100) * estimatedWeight;
            const leanMass = estimatedWeight - fatMass;
            
            document.getElementById('body-fat-percentage').textContent = `${bodyFatPercentage.toFixed(1)}%`;
            document.getElementById('bf-category').textContent = category;
            document.getElementById('fat-mass').textContent = `${fatMass.toFixed(1)}kg`;
            document.getElementById('lean-mass').textContent = `${leanMass.toFixed(1)}kg`;
            document.getElementById('body-fat-result').style.display = 'block';
        });
    }
};

// Continue with sports calculators...
FullCalApp.prototype.setupCaloriesBurnedCalculator = function() {
    const form = document.getElementById('calories-burned-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const weight = parseFloat(document.getElementById('cb-weight').value);
            const activity = document.getElementById('activity-type').value;
            const duration = parseFloat(document.getElementById('duration').value);
            
            // MET values for different activities
            const metValues = {
                'walking-slow': 3.8,
                'walking-fast': 5.0,
                'jogging': 7.0,
                'running': 9.8,
                'cycling-leisurely': 5.8,
                'cycling-moderate': 7.5,
                'swimming': 8.0,
                'weightlifting': 6.0,
                'yoga': 2.5,
                'dancing': 4.8,
                'hiking': 6.0,
                'basketball': 8.0,
                'tennis': 7.3,
                'soccer': 10.0
            };
            
            const met = metValues[activity];
            const caloriesPerMinute = (met * 3.5 * weight) / 200;
            const totalCalories = caloriesPerMinute * duration;
            const caloriesPerHour = caloriesPerMinute * 60;
            
            document.getElementById('calories-burned-value').textContent = Math.round(totalCalories);
            document.getElementById('calories-per-hour').textContent = Math.round(caloriesPerHour);
            document.getElementById('calories-per-minute').textContent = caloriesPerMinute.toFixed(1);
            document.getElementById('calories-burned-result').style.display = 'block';
        });
    }
};

FullCalApp.prototype.setupRunningPaceCalculator = function() {
    const form = document.getElementById('running-pace-form');
    const calculationSelect = document.getElementById('pace-calculation');
    
    if (form && calculationSelect) {
        calculationSelect.addEventListener('change', () => {
            const calculation = calculationSelect.value;
            const distanceGroup = document.getElementById('distance-group');
            const timeGroup = document.getElementById('time-group');
            const paceGroup = document.getElementById('pace-group');
            
            if (calculation === 'pace') {
                distanceGroup.style.display = 'block';
                timeGroup.style.display = 'block';
                paceGroup.style.display = 'none';
            } else if (calculation === 'time') {
                distanceGroup.style.display = 'block';
                timeGroup.style.display = 'none';
                paceGroup.style.display = 'block';
            } else if (calculation === 'distance') {
                distanceGroup.style.display = 'none';
                timeGroup.style.display = 'block';
                paceGroup.style.display = 'block';
            }
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const calculation = calculationSelect.value;
            
            let result, label, breakdown;
            
            if (calculation === 'pace') {
                const distance = parseFloat(document.getElementById('run-distance').value);
                const unit = document.getElementById('distance-unit').value;
                const hours = parseInt(document.getElementById('hours').value) || 0;
                const minutes = parseInt(document.getElementById('minutes').value) || 0;
                const seconds = parseInt(document.getElementById('seconds').value) || 0;
                
                const totalMinutes = (hours * 60) + minutes + (seconds / 60);
                let distanceInKm = distance;
                
                if (unit === 'miles') {
                    distanceInKm = distance * 1.60934;
                } else if (unit === 'm') {
                    distanceInKm = distance / 1000;
                }
                
                const pacePerKm = totalMinutes / distanceInKm;
                const paceMinutes = Math.floor(pacePerKm);
                const paceSeconds = Math.round((pacePerKm - paceMinutes) * 60);
                
                result = `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`;
                label = `Pace per ${unit === 'miles' ? 'mile' : 'km'}`;
                breakdown = `<strong>Total time: ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</strong><br><strong>Distance: ${distance} ${unit}</strong>`;
            }
            // Add other calculations for time and distance...
            
            document.getElementById('pace-result-value').textContent = result;
            document.getElementById('pace-result-label').textContent = label;
            document.getElementById('pace-breakdown').innerHTML = breakdown;
            document.getElementById('running-pace-result').style.display = 'block';
        });
    }
};

FullCalApp.prototype.setupOneRepMaxCalculator = function() {
    const form = document.getElementById('one-rep-max-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const weight = parseFloat(document.getElementById('weight-lifted').value);
            const reps = parseInt(document.getElementById('repetitions').value);
            const formula = document.getElementById('formula-type').value;
            
            let oneRepMax;
            
            switch (formula) {
                case 'epley':
                    oneRepMax = weight * (1 + reps / 30);
                    break;
                case 'brzycki':
                    oneRepMax = weight / (1.0278 - 0.0278 * reps);
                    break;
                case 'lander':
                    oneRepMax = (100 * weight) / (101.3 - 2.67123 * reps);
                    break;
                case 'oconner':
                    oneRepMax = weight * (1 + 0.025 * reps);
                    break;
                default:
                    oneRepMax = weight * (1 + reps / 30);
            }
            
            const ninetyPercent = oneRepMax * 0.9;
            const eightyPercent = oneRepMax * 0.8;
            const seventyPercent = oneRepMax * 0.7;
            const sixtyPercent = oneRepMax * 0.6;
            
            document.getElementById('one-rep-max-value').textContent = `${oneRepMax.toFixed(1)}`;
            document.getElementById('ninety-percent').textContent = `${ninetyPercent.toFixed(1)}`;
            document.getElementById('eighty-percent').textContent = `${eightyPercent.toFixed(1)}`;
            document.getElementById('seventy-percent').textContent = `${seventyPercent.toFixed(1)}`;
            document.getElementById('sixty-percent').textContent = `${sixtyPercent.toFixed(1)}`;
            document.getElementById('one-rep-max-result').style.display = 'block';
        });
    }
};

FullCalApp.prototype.setupTrainingZonesCalculator = function() {
    const form = document.getElementById('training-zones-form');
    const methodSelect = document.getElementById('max-hr-method');
    
    if (form && methodSelect) {
        methodSelect.addEventListener('change', () => {
            const customGroup = document.getElementById('custom-max-hr');
            if (methodSelect.value === 'custom') {
                customGroup.style.display = 'block';
                document.getElementById('custom-max').required = true;
            } else {
                customGroup.style.display = 'none';
                document.getElementById('custom-max').required = false;
            }
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const age = parseInt(document.getElementById('age-tz').value);
            const restingHR = parseInt(document.getElementById('resting-hr').value) || 60;
            const method = methodSelect.value;
            
            let maxHeartRate;
            
            switch (method) {
                case 'basic':
                    maxHeartRate = 220 - age;
                    break;
                case 'tanaka':
                    maxHeartRate = 208 - (0.7 * age);
                    break;
                case 'karvonen':
                    const hrReserve = (220 - age) - restingHR;
                    // We'll use this for zone calculations below
                    maxHeartRate = 220 - age;
                    break;
                case 'custom':
                    maxHeartRate = parseInt(document.getElementById('custom-max').value);
                    break;
                default:
                    maxHeartRate = 220 - age;
            }
            
            // Training zones
            const zones = [
                { name: 'Recovery Zone', min: Math.round(maxHeartRate * 0.5), max: Math.round(maxHeartRate * 0.6), color: '#2ecc71' },
                { name: 'Aerobic Base Zone', min: Math.round(maxHeartRate * 0.6), max: Math.round(maxHeartRate * 0.7), color: '#3498db' },
                { name: 'Aerobic Zone', min: Math.round(maxHeartRate * 0.7), max: Math.round(maxHeartRate * 0.8), color: '#f39c12' },
                { name: 'Lactate Threshold', min: Math.round(maxHeartRate * 0.8), max: Math.round(maxHeartRate * 0.9), color: '#e67e22' },
                { name: 'Neuromuscular Zone', min: Math.round(maxHeartRate * 0.9), max: maxHeartRate, color: '#e74c3c' }
            ];
            
            let zonesHTML = '';
            zones.forEach(zone => {
                zonesHTML += `
                    <div style="margin-bottom: 10px; padding: 10px; background: ${zone.color}20; border-left: 4px solid ${zone.color}; border-radius: 4px;">
                        <strong>${zone.name}</strong><br>
                        ${zone.min} - ${zone.max} BPM
                    </div>
                `;
            });
            
            document.getElementById('max-heart-rate').textContent = `${maxHeartRate} BPM`;
            document.getElementById('zones-breakdown').innerHTML = zonesHTML;
            document.getElementById('training-zones-result').style.display = 'block';
        });
    }
};