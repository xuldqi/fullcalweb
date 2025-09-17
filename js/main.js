// Main application functionality
class FullCalApp {
    constructor() {
        this.currentCalculator = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSmoothScrolling();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', this.toggleMobileMenu);
        }

        // Close modal when clicking outside
        const modal = document.getElementById('calculator-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeCalculator();
                }
            });
        }

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentCalculator) {
                this.closeCalculator();
            }
        });
    }

    setupSmoothScrolling() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && toggle) {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            toggle.classList.toggle('active');
        }
    }

    openCalculator(calculatorType) {
        this.currentCalculator = calculatorType;
        const modal = document.getElementById('calculator-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('calculator-content');

        if (modal && modalTitle && modalContent) {
            modalTitle.textContent = this.getCalculatorTitle(calculatorType);
            modalContent.innerHTML = this.getCalculatorContent(calculatorType);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Add fade-in animation
            setTimeout(() => {
                modal.querySelector('.modal-content').classList.add('fade-in');
            }, 10);

            // Setup calculator-specific functionality
            this.setupCalculator(calculatorType);
        }
    }

    closeCalculator() {
        const modal = document.getElementById('calculator-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.currentCalculator = null;
        }
    }

    getCalculatorTitle(type) {
        const titles = {
            'salary': 'Salary Calculator',
            'mortgage': 'Mortgage Calculator',
            'loan': 'Loan Calculator',
            'investment': 'Investment Calculator',
            'income-tax': 'Income Tax Calculator',
            'sales-tax': 'Sales Tax Calculator',
            'self-employment': 'Self-Employment Tax Calculator',
            'property-tax': 'Property Tax Calculator',
            'date': 'Date Calculator',
            'unit-converter': 'Unit Converter',
            'percentage': 'Percentage Calculator',
            'area': 'Area Calculator',
            'bmi': 'BMI Calculator',
            'calories': 'Calorie Calculator',
            'water': 'Water Intake Calculator',
            'body-fat': 'Body Fat Calculator',
            'calories-burned': 'Calories Burned Calculator',
            'running-pace': 'Running Pace Calculator',
            'one-rep-max': 'One Rep Max Calculator',
            'training-zones': 'Training Zones Calculator'
        };
        return titles[type] || 'Calculator';
    }

    getCalculatorContent(type) {
        // This method returns the HTML content for each calculator
        switch (type) {
            case 'salary':
                return this.getSalaryCalculatorHTML();
            case 'mortgage':
                return this.getMortgageCalculatorHTML();
            case 'loan':
                return this.getLoanCalculatorHTML();
            case 'investment':
                return this.getInvestmentCalculatorHTML();
            case 'income-tax':
                return this.getIncomeTaxCalculatorHTML();
            case 'sales-tax':
                return this.getSalesTaxCalculatorHTML();
            case 'self-employment':
                return this.getSelfEmploymentTaxCalculatorHTML();
            case 'property-tax':
                return this.getPropertyTaxCalculatorHTML();
            case 'date':
                return this.getDateCalculatorHTML();
            case 'unit-converter':
                return this.getUnitConverterHTML();
            case 'percentage':
                return this.getPercentageCalculatorHTML();
            case 'area':
                return this.getAreaCalculatorHTML();
            case 'bmi':
                return this.getBMICalculatorHTML();
            case 'calories':
                return this.getCaloriesCalculatorHTML();
            case 'water':
                return this.getWaterCalculatorHTML();
            case 'body-fat':
                return this.getBodyFatCalculatorHTML();
            case 'calories-burned':
                return this.getCaloriesBurnedCalculatorHTML();
            case 'running-pace':
                return this.getRunningPaceCalculatorHTML();
            case 'one-rep-max':
                return this.getOneRepMaxCalculatorHTML();
            case 'training-zones':
                return this.getTrainingZonesCalculatorHTML();
            default:
                return this.getComingSoonHTML();
        }
    }

    getSalaryCalculatorHTML() {
        const regions = window.taxConfig ? window.taxConfig.getAvailableRegions() : [
            { code: 'US', name: 'United States', currency: '$' }
        ];
        
        const regionOptions = regions.map(region => 
            `<option value="${region.code}">${region.name} (${region.currency})</option>`
        ).join('');

        return `
            <form class="calc-form" id="salary-form">
                <div class="form-group">
                    <label for="tax-region">Tax Region</label>
                    <select id="tax-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="gross-salary">Gross Annual Salary</label>
                    <input type="number" id="gross-salary" placeholder="50000" required>
                    <small class="currency-label">Amount in local currency</small>
                </div>
                <div class="form-group" id="filing-status-group">
                    <label for="filing-status">Filing Status (US)</label>
                    <select id="filing-status">
                        <option value="single">Single</option>
                        <option value="marriedJoint">Married Filing Jointly</option>
                        <option value="marriedSeparate">Married Filing Separately</option>
                        <option value="headOfHousehold">Head of Household</option>
                    </select>
                </div>
                <button type="submit" class="calc-button">Calculate Net Salary</button>
            </form>
            <div id="salary-result" class="calc-result" style="display: none;">
                <div class="result-value" id="net-salary"></div>
                <div class="result-label">Annual Net Salary</div>
                <div class="mt-1" id="salary-breakdown">
                    <div class="tax-breakdown"></div>
                    <div class="salary-periods">
                        <strong>Monthly: <span id="monthly-salary"></span></strong><br>
                        <strong>Bi-weekly: <span id="biweekly-salary"></span></strong><br>
                        <strong>Weekly: <span id="weekly-salary"></span></strong>
                    </div>
                </div>
                <div class="mt-2">
                    <small class="disclaimer">* Calculations are estimates. Consult a tax professional for precise calculations.</small>
                </div>
            </div>
        `;
    }

    getMortgageCalculatorHTML() {
        const regions = window.taxConfig ? window.taxConfig.getAvailableRegions() : [
            { code: 'US', name: 'United States', currency: '$' }
        ];
        
        const regionOptions = regions.map(region => 
            `<option value="${region.code}">${region.name} (${region.currency})</option>`
        ).join('');

        return `
            <form class="calc-form" id="mortgage-form">
                <div class="form-group">
                    <label for="mortgage-region">Currency</label>
                    <select id="mortgage-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="loan-amount">Loan Amount</label>
                    <input type="number" id="loan-amount" placeholder="300000" required>
                    <small class="currency-label">Amount in selected currency</small>
                </div>
                <div class="form-group">
                    <label for="interest-rate">Annual Interest Rate (%)</label>
                    <input type="number" id="interest-rate" placeholder="3.5" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="loan-term">Loan Term (years)</label>
                    <input type="number" id="loan-term" placeholder="30" required>
                </div>
                <div class="form-group">
                    <label for="down-payment">Down Payment</label>
                    <input type="number" id="down-payment" placeholder="60000">
                    <small class="currency-label">Amount in selected currency</small>
                </div>
                <button type="submit" class="calc-button">Calculate Monthly Payment</button>
            </form>
            <div id="mortgage-result" class="calc-result" style="display: none;">
                <div class="result-value" id="monthly-payment"></div>
                <div class="result-label">Monthly Payment</div>
                <div class="mt-1">
                    <strong>Total Interest: <span id="total-interest"></span></strong><br>
                    <strong>Total Amount: <span id="total-amount"></span></strong>
                </div>
            </div>
        `;
    }

    getBMICalculatorHTML() {
        const regions = window.taxConfig ? window.taxConfig.getAvailableRegions() : [
            { code: 'US', name: 'United States', currency: '$' }
        ];
        
        const regionOptions = regions.map(region => 
            `<option value="${region.code}">${region.name}</option>`
        ).join('');

        return `
            <form class="calc-form" id="bmi-form">
                <div class="form-group">
                    <label for="bmi-region">Health Standards</label>
                    <select id="bmi-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="height">Height (cm)</label>
                    <input type="number" id="height" placeholder="170" required>
                </div>
                <div class="form-group">
                    <label for="weight">Weight (kg)</label>
                    <input type="number" id="weight" placeholder="70" step="0.1" required>
                </div>
                <button type="submit" class="calc-button">Calculate BMI</button>
            </form>
            <div id="bmi-result" class="calc-result" style="display: none;">
                <div class="result-value" id="bmi-value"></div>
                <div class="result-label">Your BMI</div>
                <div class="mt-1">
                    <strong>Category: <span id="bmi-category"></span></strong><br>
                    <small id="bmi-description"></small>
                </div>
            </div>
        `;
    }

    getPercentageCalculatorHTML() {
        return `
            <form class="calc-form" id="percentage-form">
                <div class="form-group">
                    <label for="calculation-type">Calculation Type</label>
                    <select id="calculation-type" required>
                        <option value="percentage-of">What is X% of Y?</option>
                        <option value="what-percent">X is what percent of Y?</option>
                        <option value="percent-change">Percent change from X to Y</option>
                    </select>
                </div>
                <div class="form-group" id="percentage-inputs">
                    <label for="percent-value">Percentage (%)</label>
                    <input type="number" id="percent-value" placeholder="25" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="base-value">Base Value</label>
                    <input type="number" id="base-value" placeholder="100" step="0.01" required>
                </div>
                <button type="submit" class="calc-button">Calculate</button>
            </form>
            <div id="percentage-result" class="calc-result" style="display: none;">
                <div class="result-value" id="percentage-answer"></div>
                <div class="result-label" id="percentage-label">Result</div>
            </div>
        `;
    }

    getUnitConverterHTML() {
        return `
            <form class="calc-form" id="unit-converter-form">
                <div class="form-group">
                    <label for="conversion-type">Conversion Type</label>
                    <select id="conversion-type" required>
                        <option value="length">Length</option>
                        <option value="weight">Weight</option>
                        <option value="temperature">Temperature</option>
                        <option value="area">Area</option>
                        <option value="volume">Volume</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="from-unit">From</label>
                    <select id="from-unit" required>
                        <option value="m">Meters</option>
                        <option value="ft">Feet</option>
                        <option value="in">Inches</option>
                        <option value="cm">Centimeters</option>
                        <option value="km">Kilometers</option>
                        <option value="mi">Miles</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="to-unit">To</label>
                    <select id="to-unit" required>
                        <option value="ft">Feet</option>
                        <option value="m">Meters</option>
                        <option value="in">Inches</option>
                        <option value="cm">Centimeters</option>
                        <option value="km">Kilometers</option>
                        <option value="mi">Miles</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="input-value">Value</label>
                    <input type="number" id="input-value" placeholder="1" step="any" required>
                </div>
                <button type="submit" class="calc-button">Convert</button>
            </form>
            <div id="unit-result" class="calc-result" style="display: none;">
                <div class="result-value" id="converted-value"></div>
                <div class="result-label" id="conversion-label">Converted Value</div>
            </div>
        `;
    }

    getCaloriesCalculatorHTML() {
        return `
            <form class="calc-form" id="calories-form">
                <div class="form-group">
                    <label for="gender">Gender</label>
                    <select id="gender" required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="age">Age (years)</label>
                    <input type="number" id="age" placeholder="30" min="1" max="120" required>
                </div>
                <div class="form-group">
                    <label for="calorie-height">Height (cm)</label>
                    <input type="number" id="calorie-height" placeholder="170" required>
                </div>
                <div class="form-group">
                    <label for="calorie-weight">Weight (kg)</label>
                    <input type="number" id="calorie-weight" placeholder="70" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="activity-level">Activity Level</label>
                    <select id="activity-level" required>
                        <option value="1.2">Sedentary (little/no exercise)</option>
                        <option value="1.375">Light (light exercise 1-3 days/week)</option>
                        <option value="1.55">Moderate (moderate exercise 3-5 days/week)</option>
                        <option value="1.725">Active (hard exercise 6-7 days/week)</option>
                        <option value="1.9">Very Active (very hard exercise/physical job)</option>
                    </select>
                </div>
                <button type="submit" class="calc-button">Calculate Daily Calories</button>
            </form>
            <div id="calories-result" class="calc-result" style="display: none;">
                <div class="result-value" id="daily-calories"></div>
                <div class="result-label">Daily Calories (Maintenance)</div>
                <div class="mt-1">
                    <strong>Weight Loss: <span id="weight-loss-calories"></span> calories/day</strong><br>
                    <strong>Weight Gain: <span id="weight-gain-calories"></span> calories/day</strong>
                </div>
            </div>
        `;
    }

    getComingSoonHTML() {
        return `
            <div class="calc-result">
                <div class="result-value">🚧</div>
                <div class="result-label">Coming Soon</div>
                <p class="mt-1">This calculator is under development and will be available soon!</p>
            </div>
        `;
    }

    setupCalculator(type) {
        // Setup form submission handlers for each calculator
        switch (type) {
            case 'salary':
                this.setupSalaryCalculator();
                break;
            case 'mortgage':
                this.setupMortgageCalculator();
                break;
            case 'loan':
                this.setupLoanCalculator();
                break;
            case 'investment':
                this.setupInvestmentCalculator();
                break;
            case 'income-tax':
                this.setupIncomeTaxCalculator();
                break;
            case 'sales-tax':
                this.setupSalesTaxCalculator();
                break;
            case 'self-employment':
                this.setupSelfEmploymentTaxCalculator();
                break;
            case 'property-tax':
                this.setupPropertyTaxCalculator();
                break;
            case 'date':
                this.setupDateCalculator();
                break;
            case 'unit-converter':
                this.setupUnitConverter();
                break;
            case 'percentage':
                this.setupPercentageCalculator();
                break;
            case 'area':
                this.setupAreaCalculator();
                break;
            case 'bmi':
                this.setupBMICalculator();
                break;
            case 'calories':
                this.setupCaloriesCalculator();
                break;
            case 'water':
                this.setupWaterCalculator();
                break;
            case 'body-fat':
                this.setupBodyFatCalculator();
                break;
            case 'calories-burned':
                this.setupCaloriesBurnedCalculator();
                break;
            case 'running-pace':
                this.setupRunningPaceCalculator();
                break;
            case 'one-rep-max':
                this.setupOneRepMaxCalculator();
                break;
            case 'training-zones':
                this.setupTrainingZonesCalculator();
                break;
        }
    }

    setupSalaryCalculator() {
        const form = document.getElementById('salary-form');
        const regionSelect = document.getElementById('tax-region');
        const filingStatusGroup = document.getElementById('filing-status-group');
        
        if (form && regionSelect) {
            // Update filing status visibility based on region
            regionSelect.addEventListener('change', () => {
                const selectedRegion = regionSelect.value;
                if (selectedRegion === 'US') {
                    filingStatusGroup.style.display = 'block';
                    filingStatusGroup.querySelector('label').textContent = 'Filing Status';
                } else {
                    filingStatusGroup.style.display = 'none';
                }
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const grossSalary = parseFloat(document.getElementById('gross-salary').value);
                const selectedRegion = regionSelect.value;
                const filingStatus = document.getElementById('filing-status').value;

                if (!window.taxConfig) {
                    alert('Tax configuration not loaded. Please refresh the page.');
                    return;
                }

                // Calculate salary using the tax configuration system
                const result = window.taxConfig.calculateSalaryTax(grossSalary, selectedRegion, filingStatus);
                
                if (!result) {
                    alert('Unable to calculate for selected region. Please try again.');
                    return;
                }

                // Display results
                document.getElementById('net-salary').textContent = `${result.currency}${result.netSalary.toLocaleString()}`;
                
                // Create tax breakdown
                let breakdownHTML = '<h4>Tax Breakdown:</h4>';
                for (const [key, value] of Object.entries(result.breakdown)) {
                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    breakdownHTML += `<div><strong>${label}:</strong> ${result.currency}${value.toFixed(2)}</div>`;
                }
                breakdownHTML += `<div style="border-top: 1px solid #ddd; margin-top: 10px; padding-top: 10px;"><strong>Total Tax: ${result.currency}${result.totalTax.toFixed(2)} (${result.effectiveRate.toFixed(2)}%)</strong></div>`;
                
                document.querySelector('#salary-breakdown .tax-breakdown').innerHTML = breakdownHTML;

                // Calculate periods
                const monthly = result.netSalary / 12;
                const biweekly = result.netSalary / 26;
                const weekly = result.netSalary / 52;

                document.getElementById('monthly-salary').textContent = `${result.currency}${monthly.toLocaleString()}`;
                document.getElementById('biweekly-salary').textContent = `${result.currency}${biweekly.toLocaleString()}`;
                document.getElementById('weekly-salary').textContent = `${result.currency}${weekly.toLocaleString()}`;
                
                document.getElementById('salary-result').style.display = 'block';
            });

            // Initialize form state
            if (regionSelect.value === 'US') {
                filingStatusGroup.style.display = 'block';
            } else {
                filingStatusGroup.style.display = 'none';
            }
        }
    }

    setupMortgageCalculator() {
        const form = document.getElementById('mortgage-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const regionCode = document.getElementById('mortgage-region').value;
                const currency = window.taxConfig ? window.taxConfig.taxConfigs[regionCode].currency : '$';
                
                const loanAmount = parseFloat(document.getElementById('loan-amount').value);
                const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
                const principal = loanAmount - downPayment;
                const annualRate = parseFloat(document.getElementById('interest-rate').value) / 100;
                const years = parseFloat(document.getElementById('loan-term').value);

                let monthlyPayment, totalAmount, totalInterest;

                // Different mortgage calculation methods by country
                switch (regionCode) {
                    case 'US':
                        // US: Monthly compounding
                        const monthlyRateUS = annualRate / 12;
                        const numberOfPaymentsUS = years * 12;
                        monthlyPayment = principal * (monthlyRateUS * Math.pow(1 + monthlyRateUS, numberOfPaymentsUS)) / 
                                        (Math.pow(1 + monthlyRateUS, numberOfPaymentsUS) - 1);
                        totalAmount = monthlyPayment * numberOfPaymentsUS;
                        break;

                    case 'CA':
                        // Canada: Semi-annual compounding, but monthly payments
                        const semiAnnualRateCA = annualRate / 2;
                        const monthlyRateCA = Math.pow(1 + semiAnnualRateCA, 1/6) - 1;
                        const numberOfPaymentsCA = years * 12;
                        monthlyPayment = principal * (monthlyRateCA * Math.pow(1 + monthlyRateCA, numberOfPaymentsCA)) / 
                                        (Math.pow(1 + monthlyRateCA, numberOfPaymentsCA) - 1);
                        totalAmount = monthlyPayment * numberOfPaymentsCA;
                        break;

                    case 'UK':
                        // UK: Often uses annual percentage rate calculation
                        const monthlyRateUK = annualRate / 12;
                        const numberOfPaymentsUK = years * 12;
                        monthlyPayment = principal * (monthlyRateUK * Math.pow(1 + monthlyRateUK, numberOfPaymentsUK)) / 
                                        (Math.pow(1 + monthlyRateUK, numberOfPaymentsUK) - 1);
                        totalAmount = monthlyPayment * numberOfPaymentsUK;
                        break;

                    case 'DE':
                        // Germany: Annuity loans with different calculation
                        const monthlyRateDE = annualRate / 12;
                        const numberOfPaymentsDE = years * 12;
                        monthlyPayment = principal * (monthlyRateDE * Math.pow(1 + monthlyRateDE, numberOfPaymentsDE)) / 
                                        (Math.pow(1 + monthlyRateDE, numberOfPaymentsDE) - 1);
                        // Add German notary and registration fees (typically 3-5%)
                        const germanFees = loanAmount * 0.04;
                        totalAmount = (monthlyPayment * numberOfPaymentsDE) + germanFees;
                        break;

                    case 'AU':
                        // Australia: Principal and Interest standard calculation
                        const monthlyRateAU = annualRate / 12;
                        const numberOfPaymentsAU = years * 12;
                        monthlyPayment = principal * (monthlyRateAU * Math.pow(1 + monthlyRateAU, numberOfPaymentsAU)) / 
                                        (Math.pow(1 + monthlyRateAU, numberOfPaymentsAU) - 1);
                        totalAmount = monthlyPayment * numberOfPaymentsAU;
                        break;

                    default:
                        // Default calculation for other countries
                        const monthlyRateDefault = annualRate / 12;
                        const numberOfPaymentsDefault = years * 12;
                        monthlyPayment = principal * (monthlyRateDefault * Math.pow(1 + monthlyRateDefault, numberOfPaymentsDefault)) / 
                                        (Math.pow(1 + monthlyRateDefault, numberOfPaymentsDefault) - 1);
                        totalAmount = monthlyPayment * numberOfPaymentsDefault;
                }

                totalInterest = totalAmount - principal;

                document.getElementById('monthly-payment').textContent = `${currency}${monthlyPayment.toLocaleString()}`;
                document.getElementById('total-interest').textContent = `${currency}${totalInterest.toLocaleString()}`;
                document.getElementById('total-amount').textContent = `${currency}${totalAmount.toLocaleString()}`;
                document.getElementById('mortgage-result').style.display = 'block';
            });
        }
    }

    setupBMICalculator() {
        const form = document.getElementById('bmi-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const regionCode = document.getElementById('bmi-region').value;
                const height = parseFloat(document.getElementById('height').value) / 100; // Convert to meters
                const weight = parseFloat(document.getElementById('weight').value);

                const bmi = weight / (height * height);
                let category, description;

                // Different BMI standards by region
                switch (regionCode) {
                    case 'CN':
                    case 'JP':
                        // Asian BMI standards (WHO Asian criteria)
                        if (bmi < 18.5) {
                            category = 'Underweight';
                            description = 'Consider consulting with a healthcare provider about healthy weight gain.';
                        } else if (bmi < 23) {
                            category = 'Normal weight';
                            description = 'You have a healthy body weight. Keep up the good work!';
                        } else if (bmi < 25) {
                            category = 'Overweight';
                            description = 'Consider adopting a healthier lifestyle with balanced diet and exercise.';
                        } else if (bmi < 30) {
                            category = 'Obese Class I';
                            description = 'Consider consulting with a healthcare provider about weight management.';
                        } else {
                            category = 'Obese Class II+';
                            description = 'Strongly recommend consulting with a healthcare provider immediately.';
                        }
                        break;

                    case 'US':
                    case 'CA':
                    case 'AU':
                    case 'UK':
                        // Western BMI standards (WHO standard)
                        if (bmi < 18.5) {
                            category = 'Underweight';
                            description = 'Consider consulting with a healthcare provider about healthy weight gain.';
                        } else if (bmi < 25) {
                            category = 'Normal weight';
                            description = 'You have a healthy body weight. Keep up the good work!';
                        } else if (bmi < 30) {
                            category = 'Overweight';
                            description = 'Consider adopting a healthier lifestyle with balanced diet and exercise.';
                        } else if (bmi < 35) {
                            category = 'Obese Class I';
                            description = 'Consider consulting with a healthcare provider about weight management.';
                        } else if (bmi < 40) {
                            category = 'Obese Class II';
                            description = 'Strongly recommend consulting with a healthcare provider.';
                        } else {
                            category = 'Obese Class III';
                            description = 'Immediate medical consultation recommended for severe obesity.';
                        }
                        break;

                    case 'DE':
                    case 'FR':
                        // European BMI standards (similar to WHO but with regional variations)
                        if (bmi < 18.5) {
                            category = 'Untergewicht / Insuffisance pondérale';
                            description = 'Consider consulting with a healthcare provider about healthy weight gain.';
                        } else if (bmi < 25) {
                            category = 'Normalgewicht / Poids normal';
                            description = 'You have a healthy body weight. Keep up the good work!';
                        } else if (bmi < 30) {
                            category = 'Übergewicht / Surpoids';
                            description = 'Consider adopting a healthier lifestyle with balanced diet and exercise.';
                        } else {
                            category = 'Adipositas / Obésité';
                            description = 'Consider consulting with a healthcare provider about weight management.';
                        }
                        break;

                    default:
                        // Default WHO standards
                        if (bmi < 18.5) {
                            category = 'Underweight';
                            description = 'Consider consulting with a healthcare provider about healthy weight gain.';
                        } else if (bmi < 25) {
                            category = 'Normal weight';
                            description = 'You have a healthy body weight. Keep up the good work!';
                        } else if (bmi < 30) {
                            category = 'Overweight';
                            description = 'Consider adopting a healthier lifestyle with balanced diet and exercise.';
                        } else {
                            category = 'Obese';
                            description = 'Consider consulting with a healthcare provider about weight management.';
                        }
                }

                document.getElementById('bmi-value').textContent = bmi.toFixed(1);
                document.getElementById('bmi-category').textContent = category;
                document.getElementById('bmi-description').textContent = description;
                document.getElementById('bmi-result').style.display = 'block';
            });
        }
    }

    setupPercentageCalculator() {
        const form = document.getElementById('percentage-form');
        const typeSelect = document.getElementById('calculation-type');
        
        if (form && typeSelect) {
            typeSelect.addEventListener('change', () => {
                this.updatePercentageInputs();
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const type = typeSelect.value;
                const baseValue = parseFloat(document.getElementById('base-value').value);
                let result, label;

                if (type === 'percentage-of') {
                    const percent = parseFloat(document.getElementById('percent-value').value) / 100;
                    result = baseValue * percent;
                    label = `${document.getElementById('percent-value').value}% of ${baseValue}`;
                } else if (type === 'what-percent') {
                    const value = parseFloat(document.getElementById('percent-value').value);
                    result = (value / baseValue) * 100;
                    label = `${value} is ${result.toFixed(2)}% of ${baseValue}`;
                    result = result.toFixed(2) + '%';
                } else if (type === 'percent-change') {
                    const newValue = parseFloat(document.getElementById('percent-value').value);
                    result = ((newValue - baseValue) / baseValue) * 100;
                    label = `Percent change from ${baseValue} to ${newValue}`;
                    result = result.toFixed(2) + '%';
                }

                document.getElementById('percentage-answer').textContent = result;
                document.getElementById('percentage-label').textContent = label;
                document.getElementById('percentage-result').style.display = 'block';
            });
        }
    }

    setupUnitConverter() {
        const form = document.getElementById('unit-converter-form');
        const typeSelect = document.getElementById('conversion-type');

        if (form && typeSelect) {
            typeSelect.addEventListener('change', () => {
                this.updateUnitOptions();
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const value = parseFloat(document.getElementById('input-value').value);
                const fromUnit = document.getElementById('from-unit').value;
                const toUnit = document.getElementById('to-unit').value;
                const conversionType = typeSelect.value;

                const result = this.convertUnits(value, fromUnit, toUnit, conversionType);
                const fromUnitText = document.getElementById('from-unit').options[document.getElementById('from-unit').selectedIndex].text;
                const toUnitText = document.getElementById('to-unit').options[document.getElementById('to-unit').selectedIndex].text;

                document.getElementById('converted-value').textContent = result.toFixed(6);
                document.getElementById('conversion-label').textContent = `${value} ${fromUnitText} = ${result.toFixed(6)} ${toUnitText}`;
                document.getElementById('unit-result').style.display = 'block';
            });
        }
    }

    setupCaloriesCalculator() {
        const form = document.getElementById('calories-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const gender = document.getElementById('gender').value;
                const age = parseFloat(document.getElementById('age').value);
                const height = parseFloat(document.getElementById('calorie-height').value);
                const weight = parseFloat(document.getElementById('calorie-weight').value);
                const activityLevel = parseFloat(document.getElementById('activity-level').value);

                // Harris-Benedict Formula
                let bmr;
                if (gender === 'male') {
                    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
                } else {
                    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
                }

                const dailyCalories = Math.round(bmr * activityLevel);
                const weightLossCalories = Math.round(dailyCalories - 500); // 1 lb per week
                const weightGainCalories = Math.round(dailyCalories + 500); // 1 lb per week

                document.getElementById('daily-calories').textContent = `${dailyCalories} cal`;
                document.getElementById('weight-loss-calories').textContent = weightLossCalories;
                document.getElementById('weight-gain-calories').textContent = weightGainCalories;
                document.getElementById('calories-result').style.display = 'block';
            });
        }
    }

    updatePercentageInputs() {
        const type = document.getElementById('calculation-type').value;
        const percentInput = document.getElementById('percentage-inputs');
        const label = percentInput.querySelector('label');
        const input = document.getElementById('percent-value');

        if (type === 'percentage-of') {
            label.textContent = 'Percentage (%)';
            input.placeholder = '25';
        } else if (type === 'what-percent') {
            label.textContent = 'Value';
            input.placeholder = '25';
        } else if (type === 'percent-change') {
            label.textContent = 'New Value';
            input.placeholder = '125';
        }
    }

    updateUnitOptions() {
        const conversionType = document.getElementById('conversion-type').value;
        const fromUnit = document.getElementById('from-unit');
        const toUnit = document.getElementById('to-unit');

        const units = {
            length: [
                { value: 'm', text: 'Meters' },
                { value: 'ft', text: 'Feet' },
                { value: 'in', text: 'Inches' },
                { value: 'cm', text: 'Centimeters' },
                { value: 'km', text: 'Kilometers' },
                { value: 'mi', text: 'Miles' }
            ],
            weight: [
                { value: 'kg', text: 'Kilograms' },
                { value: 'lb', text: 'Pounds' },
                { value: 'g', text: 'Grams' },
                { value: 'oz', text: 'Ounces' },
                { value: 't', text: 'Tonnes' }
            ],
            temperature: [
                { value: 'c', text: 'Celsius' },
                { value: 'f', text: 'Fahrenheit' },
                { value: 'k', text: 'Kelvin' }
            ]
        };

        if (units[conversionType]) {
            fromUnit.innerHTML = '';
            toUnit.innerHTML = '';
            
            units[conversionType].forEach(unit => {
                fromUnit.innerHTML += `<option value="${unit.value}">${unit.text}</option>`;
                toUnit.innerHTML += `<option value="${unit.value}">${unit.text}</option>`;
            });
        }
    }

    convertUnits(value, fromUnit, toUnit, type) {
        if (fromUnit === toUnit) return value;

        const conversions = {
            length: {
                m: 1,
                ft: 3.28084,
                in: 39.3701,
                cm: 100,
                km: 0.001,
                mi: 0.000621371
            },
            weight: {
                kg: 1,
                lb: 2.20462,
                g: 1000,
                oz: 35.274,
                t: 0.001
            }
        };

        if (type === 'temperature') {
            return this.convertTemperature(value, fromUnit, toUnit);
        }

        if (conversions[type]) {
            const meters = value / conversions[type][fromUnit];
            return meters * conversions[type][toUnit];
        }

        return value;
    }

    convertTemperature(value, from, to) {
        if (from === to) return value;

        // Convert to Celsius first
        let celsius = value;
        if (from === 'f') {
            celsius = (value - 32) * 5/9;
        } else if (from === 'k') {
            celsius = value - 273.15;
        }

        // Convert from Celsius to target
        if (to === 'f') {
            return celsius * 9/5 + 32;
        } else if (to === 'k') {
            return celsius + 273.15;
        }

        return celsius;
    }

    // Additional Calculator HTML Methods
    getLoanCalculatorHTML() {
        const regions = window.taxConfig ? window.taxConfig.getAvailableRegions() : [
            { code: 'US', name: 'United States', currency: '$' }
        ];
        
        const regionOptions = regions.map(region => 
            `<option value="${region.code}">${region.name} (${region.currency})</option>`
        ).join('');

        return `
            <form class="calc-form" id="loan-form">
                <div class="form-group">
                    <label for="loan-region">Currency</label>
                    <select id="loan-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="loan-principal">Loan Amount</label>
                    <input type="number" id="loan-principal" placeholder="25000" required>
                    <small class="currency-label">Amount in selected currency</small>
                </div>
                <div class="form-group">
                    <label for="loan-interest">Annual Interest Rate (%)</label>
                    <input type="number" id="loan-interest" placeholder="5.5" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="loan-years">Loan Term (years)</label>
                    <input type="number" id="loan-years" placeholder="5" required>
                </div>
                <button type="submit" class="calc-button">Calculate Loan Payment</button>
            </form>
            <div id="loan-result" class="calc-result" style="display: none;">
                <div class="result-value" id="loan-payment"></div>
                <div class="result-label">Monthly Payment</div>
                <div class="mt-1">
                    <strong>Total Interest: <span id="loan-total-interest"></span></strong><br>
                    <strong>Total Amount: <span id="loan-total-amount"></span></strong><br>
                    <strong>APR: <span id="loan-apr"></span></strong>
                </div>
            </div>
        `;
    }

    getInvestmentCalculatorHTML() {
        const regions = window.taxConfig ? window.taxConfig.getAvailableRegions() : [
            { code: 'US', name: 'United States', currency: '$' }
        ];
        
        const regionOptions = regions.map(region => 
            `<option value="${region.code}">${region.name} (${region.currency})</option>`
        ).join('');

        return `
            <form class="calc-form" id="investment-form">
                <div class="form-group">
                    <label for="investment-region">Currency</label>
                    <select id="investment-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="initial-investment">Initial Investment</label>
                    <input type="number" id="initial-investment" placeholder="10000" required>
                    <small class="currency-label">Amount in selected currency</small>
                </div>
                <div class="form-group">
                    <label for="monthly-contribution">Monthly Contribution</label>
                    <input type="number" id="monthly-contribution" placeholder="500">
                    <small class="currency-label">Amount in selected currency</small>
                </div>
                <div class="form-group">
                    <label for="annual-return">Expected Annual Return (%)</label>
                    <input type="number" id="annual-return" placeholder="7" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="investment-years">Investment Period (years)</label>
                    <input type="number" id="investment-years" placeholder="10" required>
                </div>
                <button type="submit" class="calc-button">Calculate Investment Growth</button>
            </form>
            <div id="investment-result" class="calc-result" style="display: none;">
                <div class="result-value" id="final-amount"></div>
                <div class="result-label">Final Amount</div>
                <div class="mt-1">
                    <strong>Total Contributions: <span id="total-contributions"></span></strong><br>
                    <strong>Total Interest Earned: <span id="total-interest-earned"></span></strong><br>
                    <strong>Return on Investment: <span id="roi-percentage"></span></strong>
                </div>
            </div>
        `;
    }

    getIncomeTaxCalculatorHTML() {
        return `
            <form class="calc-form" id="income-tax-form">
                <div class="form-group">
                    <label for="annual-income">Annual Income ($)</label>
                    <input type="number" id="annual-income" placeholder="75000" required>
                </div>
                <div class="form-group">
                    <label for="filing-status">Filing Status</label>
                    <select id="filing-status" required>
                        <option value="single">Single</option>
                        <option value="married-joint">Married Filing Jointly</option>
                        <option value="married-separate">Married Filing Separately</option>
                        <option value="head-household">Head of Household</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="standard-deduction">Use Standard Deduction</label>
                    <select id="standard-deduction" required>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <button type="submit" class="calc-button">Calculate Income Tax</button>
            </form>
            <div id="income-tax-result" class="calc-result" style="display: none;">
                <div class="result-value" id="total-tax"></div>
                <div class="result-label">Total Federal Tax</div>
                <div class="mt-1">
                    <strong>Effective Tax Rate: <span id="effective-rate"></span></strong><br>
                    <strong>After-Tax Income: <span id="after-tax-income"></span></strong><br>
                    <strong>Monthly Take-Home: <span id="monthly-take-home"></span></strong>
                </div>
            </div>
        `;
    }

    getSalesTaxCalculatorHTML() {
        return `
            <form class="calc-form" id="sales-tax-form">
                <div class="form-group">
                    <label for="purchase-amount">Purchase Amount ($)</label>
                    <input type="number" id="purchase-amount" placeholder="100" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="tax-percentage">Sales Tax Rate (%)</label>
                    <input type="number" id="tax-percentage" placeholder="8.25" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="calculation-method">Calculation Method</label>
                    <select id="calculation-method" required>
                        <option value="add-tax">Add Tax to Amount</option>
                        <option value="reverse-tax">Reverse Calculate (Tax Included)</option>
                    </select>
                </div>
                <button type="submit" class="calc-button">Calculate Sales Tax</button>
            </form>
            <div id="sales-tax-result" class="calc-result" style="display: none;">
                <div class="result-value" id="tax-amount"></div>
                <div class="result-label">Sales Tax</div>
                <div class="mt-1">
                    <strong>Subtotal: <span id="subtotal"></span></strong><br>
                    <strong>Total with Tax: <span id="total-with-tax"></span></strong>
                </div>
            </div>
        `;
    }

    getSelfEmploymentTaxCalculatorHTML() {
        return `
            <form class="calc-form" id="self-employment-form">
                <div class="form-group">
                    <label for="net-earnings">Net Self-Employment Earnings ($)</label>
                    <input type="number" id="net-earnings" placeholder="50000" required>
                </div>
                <div class="form-group">
                    <label for="tax-year">Tax Year</label>
                    <select id="tax-year" required>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                <button type="submit" class="calc-button">Calculate Self-Employment Tax</button>
            </form>
            <div id="self-employment-result" class="calc-result" style="display: none;">
                <div class="result-value" id="se-tax"></div>
                <div class="result-label">Self-Employment Tax</div>
                <div class="mt-1">
                    <strong>Social Security Tax: <span id="ss-tax"></span></strong><br>
                    <strong>Medicare Tax: <span id="medicare-tax"></span></strong><br>
                    <strong>Quarterly Payment: <span id="quarterly-payment"></span></strong>
                </div>
            </div>
        `;
    }

    getPropertyTaxCalculatorHTML() {
        return `
            <form class="calc-form" id="property-tax-form">
                <div class="form-group">
                    <label for="home-value">Home Value ($)</label>
                    <input type="number" id="home-value" placeholder="350000" required>
                </div>
                <div class="form-group">
                    <label for="assessment-rate">Assessment Rate (%)</label>
                    <input type="number" id="assessment-rate" placeholder="80" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="mill-rate">Mill Rate (per $1,000)</label>
                    <input type="number" id="mill-rate" placeholder="15.5" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="exemptions">Exemptions ($)</label>
                    <input type="number" id="exemptions" placeholder="0">
                </div>
                <button type="submit" class="calc-button">Calculate Property Tax</button>
            </form>
            <div id="property-tax-result" class="calc-result" style="display: none;">
                <div class="result-value" id="annual-property-tax"></div>
                <div class="result-label">Annual Property Tax</div>
                <div class="mt-1">
                    <strong>Assessed Value: <span id="assessed-value"></span></strong><br>
                    <strong>Monthly Escrow: <span id="monthly-escrow"></span></strong><br>
                    <strong>Effective Tax Rate: <span id="effective-tax-rate"></span></strong>
                </div>
            </div>
        `;
    }

    getDateCalculatorHTML() {
        return `
            <form class="calc-form" id="date-form">
                <div class="form-group">
                    <label for="calculation-type-date">Calculation Type</label>
                    <select id="calculation-type-date" required>
                        <option value="difference">Date Difference</option>
                        <option value="add-days">Add/Subtract Days</option>
                        <option value="age">Calculate Age</option>
                        <option value="business-days">Business Days</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="start-date">Start Date</label>
                    <input type="date" id="start-date" required>
                </div>
                <div class="form-group" id="end-date-group">
                    <label for="end-date">End Date</label>
                    <input type="date" id="end-date">
                </div>
                <div class="form-group" id="days-group" style="display: none;">
                    <label for="days-to-add">Days to Add/Subtract</label>
                    <input type="number" id="days-to-add" placeholder="30">
                </div>
                <button type="submit" class="calc-button">Calculate</button>
            </form>
            <div id="date-result" class="calc-result" style="display: none;">
                <div class="result-value" id="date-answer"></div>
                <div class="result-label" id="date-label">Result</div>
                <div class="mt-1" id="date-breakdown"></div>
            </div>
        `;
    }

    getAreaCalculatorHTML() {
        return `
            <form class="calc-form" id="area-form">
                <div class="form-group">
                    <label for="shape-type">Shape</label>
                    <select id="shape-type" required>
                        <option value="rectangle">Rectangle</option>
                        <option value="circle">Circle</option>
                        <option value="triangle">Triangle</option>
                        <option value="square">Square</option>
                        <option value="parallelogram">Parallelogram</option>
                        <option value="trapezoid">Trapezoid</option>
                    </select>
                </div>
                <div id="shape-inputs">
                    <!-- Dynamic inputs based on shape selection -->
                </div>
                <button type="submit" class="calc-button">Calculate Area</button>
            </form>
            <div id="area-result" class="calc-result" style="display: none;">
                <div class="result-value" id="area-value"></div>
                <div class="result-label">Area</div>
                <div class="mt-1">
                    <strong>Perimeter: <span id="perimeter-value"></span></strong>
                </div>
            </div>
        `;
    }

    getWaterCalculatorHTML() {
        return `
            <form class="calc-form" id="water-form">
                <div class="form-group">
                    <label for="water-weight">Weight (kg)</label>
                    <input type="number" id="water-weight" placeholder="70" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="activity-level-water">Activity Level</label>
                    <select id="activity-level-water" required>
                        <option value="sedentary">Sedentary</option>
                        <option value="light">Light Activity</option>
                        <option value="moderate">Moderate Activity</option>
                        <option value="active">Active</option>
                        <option value="very-active">Very Active</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="climate">Climate</label>
                    <select id="climate" required>
                        <option value="temperate">Temperate</option>
                        <option value="hot">Hot</option>
                        <option value="humid">Hot & Humid</option>
                        <option value="cold">Cold</option>
                    </select>
                </div>
                <button type="submit" class="calc-button">Calculate Water Intake</button>
            </form>
            <div id="water-result" class="calc-result" style="display: none;">
                <div class="result-value" id="daily-water"></div>
                <div class="result-label">Daily Water Intake</div>
                <div class="mt-1">
                    <strong>Glasses (8oz): <span id="water-glasses"></span></strong><br>
                    <strong>Bottles (16oz): <span id="water-bottles"></span></strong><br>
                    <strong>Per Hour: <span id="water-hourly"></span></strong>
                </div>
            </div>
        `;
    }

    getBodyFatCalculatorHTML() {
        return `
            <form class="calc-form" id="body-fat-form">
                <div class="form-group">
                    <label for="bf-gender">Gender</label>
                    <select id="bf-gender" required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="bf-height">Height (cm)</label>
                    <input type="number" id="bf-height" placeholder="175" required>
                </div>
                <div class="form-group">
                    <label for="bf-waist">Waist (cm)</label>
                    <input type="number" id="bf-waist" placeholder="85" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="bf-neck">Neck (cm)</label>
                    <input type="number" id="bf-neck" placeholder="40" step="0.1" required>
                </div>
                <div class="form-group" id="hip-group" style="display: none;">
                    <label for="bf-hip">Hip (cm)</label>
                    <input type="number" id="bf-hip" placeholder="95" step="0.1">
                </div>
                <button type="submit" class="calc-button">Calculate Body Fat</button>
            </form>
            <div id="body-fat-result" class="calc-result" style="display: none;">
                <div class="result-value" id="body-fat-percentage"></div>
                <div class="result-label">Body Fat Percentage</div>
                <div class="mt-1">
                    <strong>Category: <span id="bf-category"></span></strong><br>
                    <strong>Fat Mass: <span id="fat-mass"></span></strong><br>
                    <strong>Lean Mass: <span id="lean-mass"></span></strong>
                </div>
            </div>
        `;
    }

    getCaloriesBurnedCalculatorHTML() {
        return `
            <form class="calc-form" id="calories-burned-form">
                <div class="form-group">
                    <label for="cb-weight">Weight (kg)</label>
                    <input type="number" id="cb-weight" placeholder="70" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="activity-type">Activity</label>
                    <select id="activity-type" required>
                        <option value="walking-slow">Walking (3 mph)</option>
                        <option value="walking-fast">Walking (4.5 mph)</option>
                        <option value="jogging">Jogging</option>
                        <option value="running">Running (8 mph)</option>
                        <option value="cycling-leisurely">Cycling (leisurely)</option>
                        <option value="cycling-moderate">Cycling (moderate)</option>
                        <option value="swimming">Swimming</option>
                        <option value="weightlifting">Weight Lifting</option>
                        <option value="yoga">Yoga</option>
                        <option value="dancing">Dancing</option>
                        <option value="hiking">Hiking</option>
                        <option value="basketball">Basketball</option>
                        <option value="tennis">Tennis</option>
                        <option value="soccer">Soccer</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="duration">Duration (minutes)</label>
                    <input type="number" id="duration" placeholder="60" required>
                </div>
                <button type="submit" class="calc-button">Calculate Calories Burned</button>
            </form>
            <div id="calories-burned-result" class="calc-result" style="display: none;">
                <div class="result-value" id="calories-burned-value"></div>
                <div class="result-label">Calories Burned</div>
                <div class="mt-1">
                    <strong>Per Hour: <span id="calories-per-hour"></span></strong><br>
                    <strong>Per Minute: <span id="calories-per-minute"></span></strong>
                </div>
            </div>
        `;
    }

    getRunningPaceCalculatorHTML() {
        return `
            <form class="calc-form" id="running-pace-form">
                <div class="form-group">
                    <label for="pace-calculation">Calculate</label>
                    <select id="pace-calculation" required>
                        <option value="pace">Pace from Distance & Time</option>
                        <option value="time">Time from Distance & Pace</option>
                        <option value="distance">Distance from Time & Pace</option>
                    </select>
                </div>
                <div class="form-group" id="distance-group">
                    <label for="run-distance">Distance</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="number" id="run-distance" placeholder="5" step="0.1" required style="flex: 1;">
                        <select id="distance-unit" style="width: 100px;">
                            <option value="km">km</option>
                            <option value="miles">miles</option>
                            <option value="m">meters</option>
                        </select>
                    </div>
                </div>
                <div class="form-group" id="time-group">
                    <label for="run-time">Time</label>
                    <div style="display: flex; gap: 5px;">
                        <input type="number" id="hours" placeholder="0" min="0" style="width: 60px;">
                        <span>:</span>
                        <input type="number" id="minutes" placeholder="25" min="0" max="59" style="width: 60px;">
                        <span>:</span>
                        <input type="number" id="seconds" placeholder="30" min="0" max="59" style="width: 60px;">
                        <small style="margin-left: 10px; color: #666;">H:M:S</small>
                    </div>
                </div>
                <div class="form-group" id="pace-group" style="display: none;">
                    <label for="target-pace">Pace (min/km or min/mile)</label>
                    <div style="display: flex; gap: 5px;">
                        <input type="number" id="pace-minutes" placeholder="5" min="0" style="width: 60px;">
                        <span>:</span>
                        <input type="number" id="pace-seconds" placeholder="30" min="0" max="59" style="width: 60px;">
                        <small style="margin-left: 10px; color: #666;">M:S per unit</small>
                    </div>
                </div>
                <button type="submit" class="calc-button">Calculate</button>
            </form>
            <div id="running-pace-result" class="calc-result" style="display: none;">
                <div class="result-value" id="pace-result-value"></div>
                <div class="result-label" id="pace-result-label">Result</div>
                <div class="mt-1" id="pace-breakdown"></div>
            </div>
        `;
    }

    getOneRepMaxCalculatorHTML() {
        return `
            <form class="calc-form" id="one-rep-max-form">
                <div class="form-group">
                    <label for="weight-lifted">Weight Lifted (kg or lbs)</label>
                    <input type="number" id="weight-lifted" placeholder="80" step="0.5" required>
                </div>
                <div class="form-group">
                    <label for="repetitions">Repetitions Performed</label>
                    <input type="number" id="repetitions" placeholder="8" min="1" max="30" required>
                </div>
                <div class="form-group">
                    <label for="formula-type">Formula</label>
                    <select id="formula-type" required>
                        <option value="epley">Epley Formula</option>
                        <option value="brzycki">Brzycki Formula</option>
                        <option value="lander">Lander Formula</option>
                        <option value="oconner">O'Conner Formula</option>
                    </select>
                </div>
                <button type="submit" class="calc-button">Calculate One Rep Max</button>
            </form>
            <div id="one-rep-max-result" class="calc-result" style="display: none;">
                <div class="result-value" id="one-rep-max-value"></div>
                <div class="result-label">Estimated 1RM</div>
                <div class="mt-1">
                    <strong>90% (1-2 reps): <span id="ninety-percent"></span></strong><br>
                    <strong>80% (3-5 reps): <span id="eighty-percent"></span></strong><br>
                    <strong>70% (6-8 reps): <span id="seventy-percent"></span></strong><br>
                    <strong>60% (9-12 reps): <span id="sixty-percent"></span></strong>
                </div>
            </div>
        `;
    }

    getTrainingZonesCalculatorHTML() {
        return `
            <form class="calc-form" id="training-zones-form">
                <div class="form-group">
                    <label for="age-tz">Age (years)</label>
                    <input type="number" id="age-tz" placeholder="30" min="15" max="80" required>
                </div>
                <div class="form-group">
                    <label for="resting-hr">Resting Heart Rate (optional)</label>
                    <input type="number" id="resting-hr" placeholder="60" min="40" max="100">
                </div>
                <div class="form-group">
                    <label for="max-hr-method">Max HR Calculation</label>
                    <select id="max-hr-method" required>
                        <option value="basic">Basic (220 - age)</option>
                        <option value="tanaka">Tanaka Formula</option>
                        <option value="karvonen">Karvonen Method (uses resting HR)</option>
                        <option value="custom">Custom Max HR</option>
                    </select>
                </div>
                <div class="form-group" id="custom-max-hr" style="display: none;">
                    <label for="custom-max">Custom Max Heart Rate</label>
                    <input type="number" id="custom-max" placeholder="190" min="150" max="220">
                </div>
                <button type="submit" class="calc-button">Calculate Training Zones</button>
            </form>
            <div id="training-zones-result" class="calc-result" style="display: none;">
                <div class="result-value" id="max-heart-rate"></div>
                <div class="result-label">Maximum Heart Rate</div>
                <div class="mt-1" id="zones-breakdown">
                    <!-- Training zones will be displayed here -->
                </div>
            </div>
        `;
    }
}

// Global functions for HTML onclick handlers
function openCalculator(type) {
    window.fullCalApp.openCalculator(type);
}

function closeCalculator() {
    window.fullCalApp.closeCalculator();
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.fullCalApp = new FullCalApp();
});