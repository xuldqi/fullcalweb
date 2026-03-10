// Currency formatting function
function formatCurrency(amount, currency = 'USD') {
    const currencySymbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'JPY': '¥',
        'CNY': '¥',
        'CAD': 'C$',
        'AUD': 'A$'
    };
    
    const symbol = currencySymbols[currency] || '$';
    
    // Format number with commas and 2 decimal places
    const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
    
    return symbol + formatted;
}

// Main application functionality
class FullCalApp {
    constructor() {
        console.log('FullCalApp constructor called');
        this.currentCalculator = null;
        this.calculationCache = new Map(); // Cache for expensive calculations
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutes cache expiry
        this.init();
        console.log('FullCalApp constructor completed');
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
        console.log('openCalculator called with type:', calculatorType);
        this.currentCalculator = calculatorType;
        const modal = document.getElementById('calculator-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('calculator-content');

        if (modal && modalTitle && modalContent) {
            const title = this.getCalculatorTitle(calculatorType);
            console.log('Setting modal title to:', title);
            modalTitle.textContent = title;
            modalContent.innerHTML = this.getCalculatorContent(calculatorType);
            
            // Update translations for the modal content
            if (window.i18n) {
                // Wait a moment for DOM to update, then update translations
                setTimeout(() => {
                    // Update all data-i18n elements in the modal
                    const modalElements = modalContent.querySelectorAll('[data-i18n]');
                    modalElements.forEach(element => {
                        const key = element.getAttribute('data-i18n');
                        if (key) {
                            element.textContent = window.i18n.t(key);
                        }
                    });
                    
                    // Update placeholders
                    const placeholderElements = modalContent.querySelectorAll('[data-i18n-placeholder]');
                    placeholderElements.forEach(element => {
                        const key = element.getAttribute('data-i18n-placeholder');
                        if (key) {
                            element.placeholder = window.i18n.t(key);
                        }
                    });
                }, 100);
            } else {
                // Try to wait a bit and check again
                setTimeout(() => {
                    if (window.i18n) {
                        // Retry translation update
                        const modalElements = modalContent.querySelectorAll('[data-i18n]');
                        modalElements.forEach(element => {
                            const key = element.getAttribute('data-i18n');
                            if (key) {
                                element.textContent = window.i18n.t(key);
                            }
                        });
                    }
                }, 200);
            }
            
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
        console.log('getCalculatorTitle called with type:', type);
        if (window.i18n) {
            const keyMap = {
                'salary': 'calc.salary',
                'mortgage': 'calc.mortgage',
                'loan': 'calc.loan',
                'investment': 'calc.investment',
                'compound': 'calc.compound',
                'cagr': 'calc.cagr',
                'inflation': 'calc.inflation',
                'personal-loan': 'calc.personal_loan',
                'margins': 'calc.margins',
                'variable-mortgage': 'calc.variable_mortgage',
                'income-tax': 'calc.income-tax',
                'sales-tax': 'calc.sales-tax',
                'self-employment': 'calc.self-employment',
                'property-tax': 'calc.property-tax',
                'date': 'calc.date',
                'time-calculator': 'calc.time_calculator',
                'working-days': 'calc.working_days',
                'unit-converter': 'calc.unit-converter',
                'size-converter': 'calc.size_converter',
                'percentage': 'calc.percentage',
                'area': 'calc.area',
                'holiday-optimizer': 'calc.holiday_optimizer',
                'password-generator': 'calc.password_generator',
                'unit-price': 'calc.unit_price',
                'reading-time': 'calc.reading_time',
                'bmi': 'calc.bmi',
                'calories': 'calc.calories',
                'water': 'calc.water',
                'body-fat': 'calc.body-fat',
                'cholesterol': 'calc.cholesterol',
                'calorie-deficit': 'calc.calorie_deficit',
                'biological-age': 'calc.biological_age',
                'ideal-weight': 'calc.ideal_weight',
                'calories-burned': 'calc.calories-burned',
                'running-pace': 'calc.running-pace',
                'one-rep-max': 'calc.one-rep-max',
                'training-zones': 'calc.training-zones',
                'steps-to-calories': 'calc.steps_to_calories',
                'pace-to-speed': 'calc.pace_to_speed',
                'vo2max': 'calc.vo2max',
                'crosstraining': 'calc.crosstraining',
                'grade-calculator': 'calc.grade_calculator'
            };
            const i18nKey = keyMap[type] || 'calc.salary';
            console.log('Translated key:', i18nKey);
            const translatedTitle = window.i18n.t(i18nKey);
            console.log('Translated title:', translatedTitle);
            return translatedTitle;
        }
        
        // Fallback to English titles
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
            case 'cagr':
                return this.getCAGRCalculatorHTML();
            case 'inflation':
                return this.getInflationCalculatorHTML();
            case 'personal-loan':
                return this.getPersonalLoanCalculatorHTML();
            case 'margins':
                return this.getMarginsCalculatorHTML();
            case 'variable-mortgage':
                return this.getVariableMortgageCalculatorHTML();
            case 'time-calculator':
                return this.getTimeCalculatorHTML();
            case 'working-days':
                return this.getWorkingDaysCalculatorHTML();
            case 'size-converter':
                return this.getSizeConverterHTML();
            case 'holiday-optimizer':
                return this.getHolidayOptimizerHTML();
            case 'unit-price':
                return this.getUnitPriceCalculatorHTML();
            case 'reading-time':
                return this.getReadingTimeCalculatorHTML();
            case 'cholesterol':
                return this.getCholesterolCalculatorHTML();
            case 'calorie-deficit':
                return this.getCalorieDeficitCalculatorHTML();
            case 'biological-age':
                return this.getBiologicalAgeCalculatorHTML();
            case 'ideal-weight':
                return this.getIdealWeightCalculatorHTML();
            case 'steps-to-calories':
                return this.getStepsToCaloriesCalculatorHTML();
            case 'pace-to-speed':
                return this.getPaceToSpeedCalculatorHTML();
            case 'vo2max':
                return this.getVO2maxCalculatorHTML();
            case 'crosstraining':
                return this.getCrossTrainingCalculatorHTML();
            case 'grade-calculator':
                return this.getGradeCalculatorHTML();
            case 'password-generator':
                return this.getPasswordGeneratorHTML();
            case 'unit-converter':
                return this.getUnitConverterHTML();
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
                    <label for="tax-region" data-i18n="field.tax_region">Tax Region</label>
                    <select id="tax-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="gross-salary" data-i18n="salary.gross_annual">Gross Annual Salary</label>
                    <input type="number" id="gross-salary" placeholder="50000" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div class="form-group" id="filing-status-group">
                    <label for="filing-status" data-i18n="salary.filing_status">Filing Status (US)</label>
                    <select id="filing-status">
                        <option value="single" data-i18n="filing.single">Single</option>
                        <option value="marriedJoint" data-i18n="filing.married_joint">Married Filing Jointly</option>
                        <option value="marriedSeparate" data-i18n="filing.married_separate">Married Filing Separately</option>
                        <option value="headOfHousehold" data-i18n="filing.head_household">Head of Household</option>
                    </select>
                </div>
                <button type="submit" class="calc-button" data-i18n="salary.calculate_net">Calculate Net Salary</button>
            </form>
            <div id="salary-result" class="calc-result" style="display: none;">
                <div class="result-value" id="net-salary"></div>
                <div class="result-label" data-i18n="salary.annual_net">Annual Net Salary</div>
                <div class="mt-1" id="salary-breakdown">
                    <div class="tax-breakdown"></div>
                    <div class="salary-periods">
                        <strong><span data-i18n="salary.monthly">Monthly</span>: <span id="monthly-salary"></span></strong><br>
                        <strong><span data-i18n="salary.biweekly">Bi-weekly</span>: <span id="biweekly-salary"></span></strong><br>
                        <strong><span data-i18n="salary.weekly">Weekly</span>: <span id="weekly-salary"></span></strong>
                    </div>
                </div>
                <div class="mt-2">
                    <small class="disclaimer" data-i18n="salary.disclaimer">* Calculations are estimates. Consult a tax professional for precise calculations.</small>
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
                    <label for="mortgage-region" data-i18n="field.currency">Currency</label>
                    <select id="mortgage-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="loan-amount" data-i18n="mortgage.loan_amount">Loan Amount</label>
                    <input type="number" id="loan-amount" placeholder="300000" required>
                    <small class="currency-label" data-i18n="placeholder.amount_selected">Amount in selected currency</small>
                </div>
                <div class="form-group">
                    <label for="interest-rate" data-i18n="mortgage.interest_rate">Annual Interest Rate (%)</label>
                    <input type="number" id="interest-rate" placeholder="3.5" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="loan-term" data-i18n="mortgage.loan_term">Loan Term (years)</label>
                    <input type="number" id="loan-term" placeholder="30" required>
                </div>
                <div class="form-group">
                    <label for="down-payment" data-i18n="mortgage.down_payment">Down Payment</label>
                    <input type="number" id="down-payment" placeholder="60000">
                    <small class="currency-label" data-i18n="placeholder.amount_selected">Amount in selected currency</small>
                </div>
                <button type="submit" class="calc-button" data-i18n="mortgage.calculate_payment">Calculate Monthly Payment</button>
            </form>
            <div id="mortgage-result" class="calc-result" style="display: none;">
                <div class="result-value" id="monthly-payment"></div>
                <div class="result-label" data-i18n="mortgage.monthly_payment">Monthly Payment</div>
                <div class="mt-1">
                    <strong><span data-i18n="mortgage.total_interest">Total Interest</span>: <span id="total-interest"></span></strong><br>
                    <strong><span data-i18n="mortgage.total_amount">Total Amount</span>: <span id="total-amount"></span></strong>
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
                    <label for="bmi-region" data-i18n="bmi.health_standards">Health Standards</label>
                    <select id="bmi-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="height" data-i18n="bmi.height_cm">Height (cm)</label>
                    <input type="number" id="height" placeholder="170" required>
                </div>
                <div class="form-group">
                    <label for="weight" data-i18n="bmi.weight_kg">Weight (kg)</label>
                    <input type="number" id="weight" placeholder="70" step="0.1" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="bmi.calculate">Calculate BMI</button>
            </form>
            <div id="bmi-result" class="calc-result" style="display: none;">
                <div class="result-value" id="bmi-value"></div>
                <div class="result-label" data-i18n="bmi.your_bmi">Your BMI</div>
                <div class="mt-1">
                    <strong><span data-i18n="bmi.category">Category</span>: <span id="bmi-category"></span></strong><br>
                    <small id="bmi-description"></small>
                </div>
            </div>
        `;
    }

    getPercentageCalculatorHTML() {
        return `
            <form class="calc-form" id="percentage-form">
                <div class="form-group">
                    <label for="calculation-type" data-i18n="percentage.calculation_type">Calculation Type</label>
                    <select id="calculation-type" required>
                        <option value="percentage-of" data-i18n="percentage.percentage_of">What is X% of Y?</option>
                        <option value="what-percent" data-i18n="percentage.what_percent">X is what percent of Y?</option>
                        <option value="percent-change" data-i18n="percentage.percent_change">Percent change from X to Y</option>
                    </select>
                </div>
                <div class="form-group" id="percentage-inputs">
                    <label for="percent-value" data-i18n="percentage.percentage">Percentage (%)</label>
                    <input type="number" id="percent-value" placeholder="25" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="base-value" data-i18n="percentage.base_value">Base Value</label>
                    <input type="number" id="base-value" placeholder="100" step="0.01" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="common.calculate">Calculate</button>
            </form>
            <div id="percentage-result" class="calc-result" style="display: none;">
                <div class="result-value" id="percentage-answer"></div>
                <div class="result-label" id="percentage-label" data-i18n="common.result">Result</div>
            </div>
        `;
    }

    // getUnitConverterHTML function moved to line 1391 with corrected translation keys

    getCaloriesCalculatorHTML() {
        return `
            <form class="calc-form" id="calories-form">
                <div class="form-group">
                    <label for="gender" data-i18n="field.gender">Gender</label>
                    <select id="gender" required>
                        <option value="male" data-i18n="gender.male">Male</option>
                        <option value="female" data-i18n="gender.female">Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="age" data-i18n="calorie.age_years">Age (years)</label>
                    <input type="number" id="age" placeholder="30" min="1" max="120" required>
                </div>
                <div class="form-group">
                    <label for="calorie-height" data-i18n="calorie.height_cm">Height (cm)</label>
                    <input type="number" id="calorie-height" placeholder="170" required>
                </div>
                <div class="form-group">
                    <label for="calorie-weight" data-i18n="calorie.weight_kg">Weight (kg)</label>
                    <input type="number" id="calorie-weight" placeholder="70" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="activity-level" data-i18n="field.activity_level">Activity Level</label>
                    <select id="activity-level" required>
                        <option value="1.2" data-i18n="activity.sedentary">Sedentary (little/no exercise)</option>
                        <option value="1.375" data-i18n="activity.light">Light (light exercise 1-3 days/week)</option>
                        <option value="1.55" data-i18n="activity.moderate">Moderate (moderate exercise 3-5 days/week)</option>
                        <option value="1.725" data-i18n="activity.active">Active (hard exercise 6-7 days/week)</option>
                        <option value="1.9" data-i18n="activity.very_active">Very Active (very hard exercise/physical job)</option>
                    </select>
                </div>
                <button type="submit" class="calc-button" data-i18n="calorie.calculate_daily">Calculate Daily Calories</button>
            </form>
            <div id="calories-result" class="calc-result" style="display: none;">
                <div class="result-value" id="daily-calories"></div>
                <div class="result-label" data-i18n="calorie.daily_calories">Daily Calories (Maintenance)</div>
                <div class="mt-1">
                    <strong><span data-i18n="calorie.weight_loss">Weight Loss</span>: <span id="weight-loss-calories"></span> <span data-i18n="calorie.calories_day">calories/day</span></strong><br>
                    <strong><span data-i18n="calorie.weight_gain">Weight Gain</span>: <span id="weight-gain-calories"></span> <span data-i18n="calorie.calories_day">calories/day</span></strong>
                </div>
            </div>
        `;
    }

    getCAGRCalculatorHTML() {
        const regions = window.taxConfig ? window.taxConfig.getAvailableRegions() : [
            { code: 'US', name: 'United States', currency: '$' }
        ];
        
        const regionOptions = regions.map(region => 
            `<option value="${region.code}">${region.name} (${region.currency})</option>`
        ).join('');

        return `
            <form class="calc-form" id="cagr-form">
                <div class="form-group">
                    <label for="cagr-region" data-i18n="field.tax_region">Region</label>
                    <select id="cagr-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="initial-value" data-i18n="cagr.initial_value">Initial Value</label>
                    <input type="number" id="initial-value" placeholder="10000" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div class="form-group">
                    <label for="final-value" data-i18n="cagr.final_value">Final Value</label>
                    <input type="number" id="final-value" placeholder="15000" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div class="form-group">
                    <label for="years" data-i18n="cagr.years">Number of Years</label>
                    <input type="number" id="years" placeholder="5" min="0.1" step="0.1" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="cagr.calculate">Calculate CAGR</button>
            </form>
            <div id="cagr-result" class="calc-result" style="display: none;">
                <div class="result-value" id="cagr-rate"></div>
                <div class="result-label" data-i18n="cagr.cagr_rate">CAGR Rate</div>
                <div class="mt-1">
                    <strong><span data-i18n="cagr.total_return">Total Return</span>: <span id="total-return"></span></strong><br>
                    <strong><span data-i18n="cagr.annual_return">Annual Return</span>: <span id="annual-return"></span></strong>
                </div>
            </div>
        `;
    }

    getInflationCalculatorHTML() {
        const regions = window.taxConfig ? window.taxConfig.getAvailableRegions() : [
            { code: 'US', name: 'United States', currency: '$' }
        ];
        
        const regionOptions = regions.map(region => 
            `<option value="${region.code}">${region.name} (${region.currency})</option>`
        ).join('');

        return `
            <form class="calc-form" id="inflation-form">
                <div class="form-group">
                    <label for="inflation-region" data-i18n="field.tax_region">Region</label>
                    <select id="inflation-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="current-amount" data-i18n="inflation.current_amount">Current Amount</label>
                    <input type="number" id="current-amount" placeholder="1000" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div class="form-group">
                    <label for="inflation-rate" data-i18n="inflation.inflation_rate">Annual Inflation Rate (%)</label>
                    <input type="number" id="inflation-rate" placeholder="3.5" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="years" data-i18n="inflation.years">Number of Years</label>
                    <input type="number" id="years" placeholder="10" min="1" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="inflation.calculate">Calculate Inflation Impact</button>
            </form>
            <div id="inflation-result" class="calc-result" style="display: none;">
                <div class="result-value" id="future-value"></div>
                <div class="result-label" data-i18n="inflation.future_value">Future Value</div>
                <div class="mt-1">
                    <strong><span data-i18n="inflation.purchasing_power">Purchasing Power</span>: <span id="purchasing-power"></span></strong><br>
                    <strong><span data-i18n="inflation.inflation_loss">Inflation Loss</span>: <span id="inflation-loss"></span></strong>
                </div>
            </div>
        `;
    }

    getPersonalLoanCalculatorHTML() {
        const regions = window.taxConfig ? window.taxConfig.getAvailableRegions() : [
            { code: 'US', name: 'United States', currency: '$' }
        ];
        
        const regionOptions = regions.map(region => 
            `<option value="${region.code}">${region.name} (${region.currency})</option>`
        ).join('');

        return `
            <form class="calc-form" id="personal-loan-form">
                <div class="form-group">
                    <label for="personal-loan-region" data-i18n="field.tax_region">Region</label>
                    <select id="personal-loan-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="loan-amount" data-i18n="personal_loan.amount">Loan Amount</label>
                    <input type="number" id="loan-amount" placeholder="25000" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div class="form-group">
                    <label for="interest-rate" data-i18n="personal_loan.interest_rate">Annual Interest Rate (%)</label>
                    <input type="number" id="interest-rate" placeholder="8.5" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="loan-term" data-i18n="personal_loan.term">Loan Term (years)</label>
                    <input type="number" id="loan-term" placeholder="5" min="1" max="30" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="personal_loan.calculate">Calculate Loan</button>
            </form>
            <div id="personal-loan-result" class="calc-result" style="display: none;">
                <div class="result-value" id="monthly-payment"></div>
                <div class="result-label" data-i18n="personal_loan.monthly_payment">Monthly Payment</div>
                <div class="mt-1">
                    <strong><span data-i18n="personal_loan.total_payment">Total Payment</span>: <span id="total-payment"></span></strong><br>
                    <strong><span data-i18n="personal_loan.total_interest">Total Interest</span>: <span id="total-interest"></span></strong>
                </div>
            </div>
        `;
    }

    getMarginsCalculatorHTML() {
        const regions = window.taxConfig ? window.taxConfig.getAvailableRegions() : [
            { code: 'US', name: 'United States', currency: '$' }
        ];
        
        const regionOptions = regions.map(region => 
            `<option value="${region.code}">${region.name} (${region.currency})</option>`
        ).join('');

        return `
            <form class="calc-form" id="margins-form">
                <div class="form-group">
                    <label for="margins-region" data-i18n="field.tax_region">Region</label>
                    <select id="margins-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="cost" data-i18n="margins.cost">Cost Price</label>
                    <input type="number" id="cost" placeholder="50" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div class="form-group">
                    <label for="selling-price" data-i18n="margins.selling_price">Selling Price</label>
                    <input type="number" id="selling-price" placeholder="75" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div class="form-group">
                    <label for="markup-percentage" data-i18n="margins.markup_percentage">Markup Percentage (%)</label>
                    <input type="number" id="markup-percentage" placeholder="50" step="0.1" readonly>
                </div>
                <button type="submit" class="calc-button" data-i18n="margins.calculate">Calculate Margins</button>
            </form>
            <div id="margins-result" class="calc-result" style="display: none;">
                <div class="result-value" id="profit-margin"></div>
                <div class="result-label" data-i18n="margins.profit_margin">Profit Margin</div>
                <div class="mt-1">
                    <strong><span data-i18n="margins.markup">Markup</span>: <span id="markup"></span></strong><br>
                    <strong><span data-i18n="margins.profit">Profit</span>: <span id="profit"></span></strong>
                </div>
            </div>
        `;
    }

    getVariableMortgageCalculatorHTML() {
        const regions = window.taxConfig ? window.taxConfig.getAvailableRegions() : [
            { code: 'US', name: 'United States', currency: '$' }
        ];
        
        const regionOptions = regions.map(region => 
            `<option value="${region.code}">${region.name} (${region.currency})</option>`
        ).join('');

        return `
            <form class="calc-form" id="variable-mortgage-form">
                <div class="form-group">
                    <label for="variable-mortgage-region" data-i18n="field.tax_region">Region</label>
                    <select id="variable-mortgage-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="loan-amount" data-i18n="variable_mortgage.amount">Loan Amount</label>
                    <input type="number" id="loan-amount" placeholder="300000" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div class="form-group">
                    <label for="initial-rate" data-i18n="variable_mortgage.initial_rate">Initial Interest Rate (%)</label>
                    <input type="number" id="initial-rate" placeholder="3.5" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="term" data-i18n="variable_mortgage.term">Loan Term (years)</label>
                    <input type="number" id="term" placeholder="30" min="1" max="50" required>
                </div>
                <div class="form-group">
                    <label for="rate-change" data-i18n="variable_mortgage.rate_change">Rate Change After Year (%)</label>
                    <input type="number" id="rate-change" placeholder="4.5" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="change-year" data-i18n="variable_mortgage.change_year">Rate Changes After Year</label>
                    <input type="number" id="change-year" placeholder="5" min="1" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="variable_mortgage.calculate">Calculate Variable Mortgage</button>
            </form>
            <div id="variable-mortgage-result" class="calc-result" style="display: none;">
                <div class="result-value" id="initial-payment"></div>
                <div class="result-label" data-i18n="variable_mortgage.initial_payment">Initial Payment</div>
                <div class="mt-1">
                    <strong><span data-i18n="variable_mortgage.new_payment">New Payment</span>: <span id="new-payment"></span></strong><br>
                    <strong><span data-i18n="variable_mortgage.payment_increase">Payment Increase</span>: <span id="payment-increase"></span></strong>
                </div>
            </div>
        `;
    }

    getTimeCalculatorHTML() {
        return `
            <form class="calc-form" id="time-calculator-form">
                <div class="form-group">
                    <label for="time1" data-i18n="time_calculator.time1">Time 1 (HH:MM:SS)</label>
                    <input type="text" id="time1" placeholder="10:30:45" required>
                </div>
                <div class="form-group">
                    <label for="operation" data-i18n="time_calculator.operation">Operation</label>
                    <select id="operation" required>
                        <option value="add" data-i18n="time_calculator.add">Add</option>
                        <option value="subtract" data-i18n="time_calculator.subtract">Subtract</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="time2" data-i18n="time_calculator.time2">Time 2 (HH:MM:SS)</label>
                    <input type="text" id="time2" placeholder="02:15:30" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="time_calculator.calculate">Calculate</button>
            </form>
            <div id="time-calculator-result" class="calc-result" style="display: none;">
                <div class="result-value" id="time-result"></div>
                <div class="result-label" data-i18n="time_calculator.result">Result</div>
            </div>
        `;
    }

    getWorkingDaysCalculatorHTML() {
        return `
            <form class="calc-form" id="working-days-form">
                <div class="form-group">
                    <label for="start-date" data-i18n="working_days.start_date">Start Date</label>
                    <input type="date" id="start-date" required>
                </div>
                <div class="form-group">
                    <label for="end-date" data-i18n="working_days.end_date">End Date</label>
                    <input type="date" id="end-date" required>
                </div>
                <div class="form-group">
                    <label for="exclude-weekends" data-i18n="working_days.exclude_weekends">Exclude Weekends</label>
                    <input type="checkbox" id="exclude-weekends" checked>
                </div>
                <div class="form-group">
                    <label for="exclude-holidays" data-i18n="working_days.exclude_holidays">Exclude Holidays</label>
                    <input type="checkbox" id="exclude-holidays">
                </div>
                <button type="submit" class="calc-button" data-i18n="working_days.calculate">Calculate Working Days</button>
            </form>
            <div id="working-days-result" class="calc-result" style="display: none;">
                <div class="result-value" id="working-days-count"></div>
                <div class="result-label" data-i18n="working_days.working_days">Working Days</div>
                <div class="mt-1">
                    <strong><span data-i18n="working_days.total_days">Total Days</span>: <span id="total-days"></span></strong><br>
                    <strong><span data-i18n="working_days.weekends">Weekends</span>: <span id="weekends"></span></strong>
                </div>
            </div>
        `;
    }

    getSizeConverterHTML() {
        return `
            <form class="calc-form" id="size-converter-form">
                <div class="form-group">
                    <label for="size-type" data-i18n="size_converter.type">Size Type</label>
                    <select id="size-type" required>
                        <option value="clothing" data-i18n="size_converter.clothing">Clothing</option>
                        <option value="shoes" data-i18n="size_converter.shoes">Shoes</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="from-size" data-i18n="size_converter.from_size">From Size</label>
                    <input type="text" id="from-size" placeholder="M" required>
                </div>
                <div class="form-group">
                    <label for="from-system" data-i18n="size_converter.from_system">From System</label>
                    <select id="from-system" required>
                        <option value="us" data-i18n="size_converter.us">US</option>
                        <option value="eu" data-i18n="size_converter.eu">EU</option>
                        <option value="uk" data-i18n="size_converter.uk">UK</option>
                        <option value="jp" data-i18n="size_converter.jp">Japan</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="to-system" data-i18n="size_converter.to_system">To System</label>
                    <select id="to-system" required>
                        <option value="us" data-i18n="size_converter.us">US</option>
                        <option value="eu" data-i18n="size_converter.eu">EU</option>
                        <option value="uk" data-i18n="size_converter.uk">UK</option>
                        <option value="jp" data-i18n="size_converter.jp">Japan</option>
                    </select>
                </div>
                <button type="submit" class="calc-button" data-i18n="size_converter.convert">Convert Size</button>
            </form>
            <div id="size-converter-result" class="calc-result" style="display: none;">
                <div class="result-value" id="converted-size"></div>
                <div class="result-label" data-i18n="size_converter.converted_size">Converted Size</div>
            </div>
        `;
    }

    getHolidayOptimizerHTML() {
        return `
            <form class="calc-form" id="holiday-optimizer-form">
                <div class="form-group">
                    <label for="start-date" data-i18n="holiday_optimizer.start_date">Start Date</label>
                    <input type="date" id="start-date" required>
                </div>
                <div class="form-group">
                    <label for="end-date" data-i18n="holiday_optimizer.end_date">End Date</label>
                    <input type="date" id="end-date" required>
                </div>
                <div class="form-group">
                    <label for="vacation-days" data-i18n="holiday_optimizer.vacation_days">Available Vacation Days</label>
                    <input type="number" id="vacation-days" placeholder="10" min="1" required>
                </div>
                <div class="form-group">
                    <label for="country" data-i18n="holiday_optimizer.country">Country</label>
                    <select id="country" required>
                        <option value="us" data-i18n="holiday_optimizer.us">United States</option>
                        <option value="uk" data-i18n="holiday_optimizer.uk">United Kingdom</option>
                        <option value="de" data-i18n="holiday_optimizer.de">Germany</option>
                        <option value="fr" data-i18n="holiday_optimizer.fr">France</option>
                        <option value="jp" data-i18n="holiday_optimizer.jp">Japan</option>
                    </select>
                </div>
                <button type="submit" class="calc-button" data-i18n="holiday_optimizer.optimize">Optimize Holidays</button>
            </form>
            <div id="holiday-optimizer-result" class="calc-result" style="display: none;">
                <div class="result-value" id="optimized-days"></div>
                <div class="result-label" data-i18n="holiday_optimizer.optimized_days">Optimized Days</div>
                <div class="mt-1">
                    <strong><span data-i18n="holiday_optimizer.total_days">Total Days</span>: <span id="total-days"></span></strong><br>
                    <strong><span data-i18n="holiday_optimizer.weekends">Weekends</span>: <span id="weekends"></span></strong><br>
                    <strong><span data-i18n="holiday_optimizer.holidays">Holidays</span>: <span id="holidays"></span></strong><br>
                    <strong><span data-i18n="holiday_optimizer.working_days">Working Days</span>: <span id="working-days"></span></strong><br>
                    <strong><span data-i18n="holiday_optimizer.efficiency">Efficiency</span>: <span id="efficiency"></span></strong><br>
                    <strong><span data-i18n="holiday_optimizer.remaining_days">Remaining Days</span>: <span id="remaining-days"></span></strong>
                </div>
                <div class="mt-2">
                    <h4 data-i18n="holiday_optimizer.suggestions">Vacation Suggestions</h4>
                    <div id="vacation-suggestions"></div>
                </div>
            </div>
        `;
    }

    getUnitPriceCalculatorHTML() {
        return `
            <form class="calc-form" id="unit-price-form">
                <div class="form-group">
                    <label for="price1" data-i18n="unit_price.price1">Price 1</label>
                    <input type="number" id="price1" placeholder="5.99" step="0.01" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div class="form-group">
                    <label for="quantity1" data-i18n="unit_price.quantity1">Quantity 1</label>
                    <input type="number" id="quantity1" placeholder="500" min="0.1" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="unit1" data-i18n="unit_price.unit1">Unit 1</label>
                    <input type="text" id="unit1" placeholder="ml" required>
                </div>
                <div class="form-group">
                    <label for="price2" data-i18n="unit_price.price2">Price 2</label>
                    <input type="number" id="price2" placeholder="12.99" step="0.01" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div class="form-group">
                    <label for="quantity2" data-i18n="unit_price.quantity2">Quantity 2</label>
                    <input type="number" id="quantity2" placeholder="1000" min="0.1" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="unit2" data-i18n="unit_price.unit2">Unit 2</label>
                    <input type="text" id="unit2" placeholder="ml" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="unit_price.compare">Compare Prices</button>
            </form>
            <div id="unit-price-result" class="calc-result" style="display: none;">
                <div class="result-value" id="better-deal"></div>
                <div class="result-label" data-i18n="unit_price.better_deal">Better Deal</div>
                <div class="mt-1">
                    <strong><span data-i18n="unit_price.unit_price1">Unit Price 1</span>: <span id="unit-price1"></span></strong><br>
                    <strong><span data-i18n="unit_price.unit_price2">Unit Price 2</span>: <span id="unit-price2"></span></strong>
                </div>
            </div>
        `;
    }

    getReadingTimeCalculatorHTML() {
        return `
            <form class="calc-form" id="reading-time-form">
                <div class="form-group">
                    <label for="text" data-i18n="reading_time.text">Text to Analyze</label>
                    <textarea id="text" placeholder="Paste your text here..." rows="6" required></textarea>
                </div>
                <div class="form-group">
                    <label for="reading-speed" data-i18n="reading_time.speed">Reading Speed (words per minute)</label>
                    <input type="number" id="reading-speed" placeholder="200" min="50" max="1000" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="reading_time.calculate">Calculate Reading Time</button>
            </form>
            <div id="reading-time-result" class="calc-result" style="display: none;">
                <div class="result-value" id="reading-time"></div>
                <div class="result-label" data-i18n="reading_time.reading_time">Reading Time</div>
                <div class="mt-1">
                    <strong><span data-i18n="reading_time.word_count">Word Count</span>: <span id="word-count"></span></strong><br>
                    <strong><span data-i18n="reading_time.character_count">Character Count</span>: <span id="character-count"></span></strong>
                </div>
            </div>
        `;
    }

    getCholesterolCalculatorHTML() {
        return `
            <form class="calc-form" id="cholesterol-form">
                <div class="form-group">
                    <label for="total-cholesterol" data-i18n="cholesterol.total">Total Cholesterol (mg/dL)</label>
                    <input type="number" id="total-cholesterol" placeholder="200" required>
                </div>
                <div class="form-group">
                    <label for="hdl" data-i18n="cholesterol.hdl">HDL (mg/dL)</label>
                    <input type="number" id="hdl" placeholder="50" required>
                </div>
                <div class="form-group">
                    <label for="ldl" data-i18n="cholesterol.ldl">LDL (mg/dL)</label>
                    <input type="number" id="ldl" placeholder="120" required>
                </div>
                <div class="form-group">
                    <label for="triglycerides" data-i18n="cholesterol.triglycerides">Triglycerides (mg/dL)</label>
                    <input type="number" id="triglycerides" placeholder="150" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="cholesterol.calculate">Calculate Cholesterol</button>
            </form>
            <div id="cholesterol-result" class="calc-result" style="display: none;">
                <div class="result-value" id="cholesterol-ratio"></div>
                <div class="result-label" data-i18n="cholesterol.ratio">Cholesterol Ratio</div>
                <div class="mt-1">
                    <strong><span data-i18n="cholesterol.risk_level">Risk Level</span>: <span id="risk-level"></span></strong><br>
                    <strong><span data-i18n="cholesterol.recommendation">Recommendation</span>: <span id="recommendation"></span></strong>
                </div>
            </div>
        `;
    }

    getCalorieDeficitCalculatorHTML() {
        return `
            <form class="calc-form" id="calorie-deficit-form">
                <div class="form-group">
                    <label for="current-weight" data-i18n="calorie_deficit.current_weight">Current Weight (kg)</label>
                    <input type="number" id="current-weight" placeholder="70" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="target-weight" data-i18n="calorie_deficit.target_weight">Target Weight (kg)</label>
                    <input type="number" id="target-weight" placeholder="65" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="height" data-i18n="calorie_deficit.height">Height (cm)</label>
                    <input type="number" id="height" placeholder="170" required>
                </div>
                <div class="form-group">
                    <label for="age" data-i18n="calorie_deficit.age">Age</label>
                    <input type="number" id="age" placeholder="30" min="1" max="120" required>
                </div>
                <div class="form-group">
                    <label for="activity-level" data-i18n="calorie_deficit.activity">Activity Level</label>
                    <select id="activity-level" required>
                        <option value="sedentary" data-i18n="calorie_deficit.sedentary">Sedentary</option>
                        <option value="light" data-i18n="calorie_deficit.light">Light Exercise</option>
                        <option value="moderate" data-i18n="calorie_deficit.moderate">Moderate Exercise</option>
                        <option value="active" data-i18n="calorie_deficit.active">Very Active</option>
                    </select>
                </div>
                <button type="submit" class="calc-button" data-i18n="calorie_deficit.calculate">Calculate Deficit</button>
            </form>
            <div id="calorie-deficit-result" class="calc-result" style="display: none;">
                <div class="result-value" id="daily-deficit"></div>
                <div class="result-label" data-i18n="calorie_deficit.daily_deficit">Daily Calorie Deficit</div>
                <div class="mt-1">
                    <strong><span data-i18n="calorie_deficit.weeks_to_goal">Weeks to Goal</span>: <span id="weeks-to-goal"></span></strong><br>
                    <strong><span data-i18n="calorie_deficit.safe_deficit">Safe Deficit</span>: <span id="safe-deficit"></span></strong>
                </div>
            </div>
        `;
    }

    getBiologicalAgeCalculatorHTML() {
        return `
            <form class="calc-form" id="biological-age-form">
                <div class="form-group">
                    <label for="chronological-age" data-i18n="biological_age.chronological">Chronological Age</label>
                    <input type="number" id="chronological-age" placeholder="30" min="1" max="120" required>
                </div>
                <div class="form-group">
                    <label for="resting-hr" data-i18n="biological_age.resting_hr">Resting Heart Rate (bpm)</label>
                    <input type="number" id="resting-hr" placeholder="70" min="30" max="200" required>
                </div>
                <div class="form-group">
                    <label for="vo2max" data-i18n="biological_age.vo2max">VO2max (ml/kg/min)</label>
                    <input type="number" id="vo2max" placeholder="40" min="10" max="100" required>
                </div>
                <div class="form-group">
                    <label for="body-fat" data-i18n="biological_age.body_fat">Body Fat %</label>
                    <input type="number" id="body-fat" placeholder="20" min="5" max="50" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="flexibility" data-i18n="biological_age.flexibility">Flexibility Score (1-10)</label>
                    <input type="number" id="flexibility" placeholder="7" min="1" max="10" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="biological_age.calculate">Calculate Biological Age</button>
            </form>
            <div id="biological-age-result" class="calc-result" style="display: none;">
                <div class="result-value" id="biological-age"></div>
                <div class="result-label" data-i18n="biological_age.biological_age">Biological Age</div>
                <div class="mt-1">
                    <strong><span data-i18n="biological_age.age_difference">Age Difference</span>: <span id="age-difference"></span></strong><br>
                    <strong><span data-i18n="biological_age.fitness_level">Fitness Level</span>: <span id="fitness-level"></span></strong>
                </div>
            </div>
        `;
    }

    getIdealWeightCalculatorHTML() {
        return `
            <form class="calc-form" id="ideal-weight-form">
                <div class="form-group">
                    <label for="height" data-i18n="ideal_weight.height">Height (cm)</label>
                    <input type="number" id="height" placeholder="170" required>
                </div>
                <div class="form-group">
                    <label for="gender" data-i18n="ideal_weight.gender">Gender</label>
                    <select id="gender" required>
                        <option value="male" data-i18n="ideal_weight.male">Male</option>
                        <option value="female" data-i18n="ideal_weight.female">Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="frame-size" data-i18n="ideal_weight.frame">Frame Size</label>
                    <select id="frame-size" required>
                        <option value="small" data-i18n="ideal_weight.small">Small</option>
                        <option value="medium" data-i18n="ideal_weight.medium">Medium</option>
                        <option value="large" data-i18n="ideal_weight.large">Large</option>
                    </select>
                </div>
                <button type="submit" class="calc-button" data-i18n="ideal_weight.calculate">Calculate Ideal Weight</button>
            </form>
            <div id="ideal-weight-result" class="calc-result" style="display: none;">
                <div class="result-value" id="ideal-weight"></div>
                <div class="result-label" data-i18n="ideal_weight.ideal_weight">Ideal Weight</div>
                <div class="mt-1">
                    <strong><span data-i18n="ideal_weight.range">Weight Range</span>: <span id="weight-range"></span></strong><br>
                    <strong><span data-i18n="ideal_weight.bmi_range">BMI Range</span>: <span id="bmi-range"></span></strong>
                </div>
            </div>
        `;
    }

    getStepsToCaloriesCalculatorHTML() {
        return `
            <form class="calc-form" id="steps-to-calories-form">
                <div class="form-group">
                    <label for="steps" data-i18n="steps_to_calories.steps">Number of Steps</label>
                    <input type="number" id="steps" placeholder="10000" min="1" required>
                </div>
                <div class="form-group">
                    <label for="weight" data-i18n="steps_to_calories.weight">Weight (kg)</label>
                    <input type="number" id="weight" placeholder="70" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="height" data-i18n="steps_to_calories.height">Height (cm)</label>
                    <input type="number" id="height" placeholder="170" required>
                </div>
                <div class="form-group">
                    <label for="age" data-i18n="steps_to_calories.age">Age</label>
                    <input type="number" id="age" placeholder="30" min="1" max="120" required>
                </div>
                <div class="form-group">
                    <label for="gender" data-i18n="steps_to_calories.gender">Gender</label>
                    <select id="gender" required>
                        <option value="male" data-i18n="steps_to_calories.male">Male</option>
                        <option value="female" data-i18n="steps_to_calories.female">Female</option>
                    </select>
                </div>
                <button type="submit" class="calc-button" data-i18n="steps_to_calories.calculate">Calculate Calories</button>
            </form>
            <div id="steps-to-calories-result" class="calc-result" style="display: none;">
                <div class="result-value" id="calories-burned"></div>
                <div class="result-label" data-i18n="steps_to_calories.calories">Calories Burned</div>
                <div class="mt-1">
                    <strong><span data-i18n="steps_to_calories.distance">Distance</span>: <span id="distance"></span></strong><br>
                    <strong><span data-i18n="steps_to_calories.duration">Duration</span>: <span id="duration"></span></strong>
                </div>
            </div>
        `;
    }

    getPaceToSpeedCalculatorHTML() {
        return `
            <form class="calc-form" id="pace-to-speed-form">
                <div class="form-group">
                    <label for="pace" data-i18n="pace_to_speed.pace">Pace (min/km)</label>
                    <input type="text" id="pace" placeholder="5:30" required>
                </div>
                <div class="form-group">
                    <label for="conversion-type" data-i18n="pace_to_speed.conversion">Conversion Type</label>
                    <select id="conversion-type" required>
                        <option value="pace-to-speed" data-i18n="pace_to_speed.pace_to_speed">Pace to Speed</option>
                        <option value="speed-to-pace" data-i18n="pace_to_speed.speed_to_pace">Speed to Pace</option>
                    </select>
                </div>
                <button type="submit" class="calc-button" data-i18n="pace_to_speed.convert">Convert</button>
            </form>
            <div id="pace-to-speed-result" class="calc-result" style="display: none;">
                <div class="result-value" id="converted-value"></div>
                <div class="result-label" id="result-label">Result</div>
                <div class="mt-1">
                    <strong><span data-i18n="pace_to_speed.equivalent">Equivalent</span>: <span id="equivalent"></span></strong>
                </div>
            </div>
        `;
    }

    getVO2maxCalculatorHTML() {
        return `
            <form class="calc-form" id="vo2max-form">
                <div class="form-group">
                    <label for="test-type" data-i18n="vo2max.test_type">Test Type</label>
                    <select id="test-type" required>
                        <option value="cooper" data-i18n="vo2max.cooper">Cooper Test (12 min run)</option>
                        <option value="beep" data-i18n="vo2max.beep">Beep Test</option>
                        <option value="treadmill" data-i18n="vo2max.treadmill">Treadmill Test</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="distance" data-i18n="vo2max.distance">Distance (meters)</label>
                    <input type="number" id="distance" placeholder="2400" min="100" required>
                </div>
                <div class="form-group">
                    <label for="age" data-i18n="vo2max.age">Age</label>
                    <input type="number" id="age" placeholder="30" min="1" max="120" required>
                </div>
                <div class="form-group">
                    <label for="weight" data-i18n="vo2max.weight">Weight (kg)</label>
                    <input type="number" id="weight" placeholder="70" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="gender" data-i18n="vo2max.gender">Gender</label>
                    <select id="gender" required>
                        <option value="male" data-i18n="vo2max.male">Male</option>
                        <option value="female" data-i18n="vo2max.female">Female</option>
                    </select>
                </div>
                <button type="submit" class="calc-button" data-i18n="vo2max.calculate">Calculate VO2max</button>
            </form>
            <div id="vo2max-result" class="calc-result" style="display: none;">
                <div class="result-value" id="vo2max-value"></div>
                <div class="result-label" data-i18n="vo2max.vo2max">VO2max</div>
                <div class="mt-1">
                    <strong><span data-i18n="vo2max.fitness_level">Fitness Level</span>: <span id="fitness-level"></span></strong><br>
                    <strong><span data-i18n="vo2max.age_rating">Age Rating</span>: <span id="age-rating"></span></strong>
                </div>
            </div>
        `;
    }

    getCrossTrainingCalculatorHTML() {
        return `
            <form class="calc-form" id="crosstraining-form">
                <div class="form-group">
                    <label for="activity" data-i18n="crosstraining.activity">Current Activity</label>
                    <select id="activity" required>
                        <option value="running" data-i18n="crosstraining.running">Running</option>
                        <option value="cycling" data-i18n="crosstraining.cycling">Cycling</option>
                        <option value="swimming" data-i18n="crosstraining.swimming">Swimming</option>
                        <option value="elliptical" data-i18n="crosstraining.elliptical">Elliptical</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="duration" data-i18n="crosstraining.duration">Duration (minutes)</label>
                    <input type="number" id="duration" placeholder="30" min="1" required>
                </div>
                <div class="form-group">
                    <label for="intensity" data-i18n="crosstraining.intensity">Intensity Level</label>
                    <select id="intensity" required>
                        <option value="low" data-i18n="crosstraining.low">Low</option>
                        <option value="moderate" data-i18n="crosstraining.moderate">Moderate</option>
                        <option value="high" data-i18n="crosstraining.high">High</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="weight" data-i18n="crosstraining.weight">Weight (kg)</label>
                    <input type="number" id="weight" placeholder="70" step="0.1" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="crosstraining.convert">Convert Activity</button>
            </form>
            <div id="crosstraining-result" class="calc-result" style="display: none;">
                <div class="result-value" id="equivalent-duration"></div>
                <div class="result-label" data-i18n="crosstraining.equivalent">Equivalent Duration</div>
                <div class="mt-1">
                    <strong><span data-i18n="crosstraining.calories">Calories Burned</span>: <span id="calories"></span></strong><br>
                    <strong><span data-i18n="crosstraining.equivalent_activity">Equivalent Activity</span>: <span id="equivalent-activity"></span></strong>
                </div>
            </div>
        `;
    }

    getGradeCalculatorHTML() {
        return `
            <form class="calc-form" id="grade-calculator-form">
                <div class="form-group">
                    <label for="current-gpa" data-i18n="grade_calculator.current_gpa">Current GPA</label>
                    <input type="number" id="current-gpa" placeholder="3.5" step="0.01" min="0" max="4" required>
                </div>
                <div class="form-group">
                    <label for="credits-completed" data-i18n="grade_calculator.credits_completed">Credits Completed</label>
                    <input type="number" id="credits-completed" placeholder="60" min="0" required>
                </div>
                <div class="form-group">
                    <label for="new-grade" data-i18n="grade_calculator.new_grade">New Grade</label>
                    <input type="number" id="new-grade" placeholder="85" min="0" max="100" required>
                </div>
                <div class="form-group">
                    <label for="new-credits" data-i18n="grade_calculator.new_credits">New Course Credits</label>
                    <input type="number" id="new-credits" placeholder="3" min="0.5" step="0.5" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="grade_calculator.calculate">Calculate New GPA</button>
            </form>
            <div id="grade-calculator-result" class="calc-result" style="display: none;">
                <div class="result-value" id="new-gpa"></div>
                <div class="result-label" data-i18n="grade_calculator.new_gpa">New GPA</div>
                <div class="mt-1">
                    <strong><span data-i18n="grade_calculator.gpa_change">GPA Change</span>: <span id="gpa-change"></span></strong><br>
                    <strong><span data-i18n="grade_calculator.letter_grade">Letter Grade</span>: <span id="letter-grade"></span></strong>
                </div>
            </div>
        `;
    }

    getPasswordGeneratorHTML() {
        return `
            <form class="calc-form" id="password-generator-form">
                <div class="form-group">
                    <label for="password-length" data-i18n="password_generator.length">Password Length</label>
                    <input type="number" id="password-length" placeholder="12" min="4" max="128" required>
                </div>
                <div class="form-group">
                    <label for="include-uppercase" data-i18n="password_generator.include_uppercase">Include Uppercase Letters</label>
                    <input type="checkbox" id="include-uppercase" checked>
                </div>
                <div class="form-group">
                    <label for="include-lowercase" data-i18n="password_generator.include_lowercase">Include Lowercase Letters</label>
                    <input type="checkbox" id="include-lowercase" checked>
                </div>
                <div class="form-group">
                    <label for="include-numbers" data-i18n="password_generator.include_numbers">Include Numbers</label>
                    <input type="checkbox" id="include-numbers" checked>
                </div>
                <div class="form-group">
                    <label for="include-symbols" data-i18n="password_generator.include_symbols">Include Symbols</label>
                    <input type="checkbox" id="include-symbols" checked>
                </div>
                <button type="submit" class="calc-button" data-i18n="password_generator.generate">Generate Password</button>
            </form>
            <div id="password-generator-result" class="calc-result" style="display: none;">
                <div class="result-value" id="generated-password"></div>
                <div class="result-label" data-i18n="password_generator.generated_password">Generated Password</div>
                <div class="mt-1">
                    <button class="copy-button" id="copy-password" data-i18n="password_generator.copy">Copy Password</button>
                </div>
            </div>
        `;
    }

    getUnitConverterHTML() {
        return `
            <form class="calc-form" id="unit-converter-form">
                <div class="form-group">
                    <label for="conversion-type" data-i18n="unit.conversion_type">Conversion Type</label>
                    <select id="conversion-type" required onchange="updateUnitOptions()">
                        <option value="length" data-i18n="conversion.length">Length</option>
                        <option value="weight" data-i18n="conversion.weight">Weight</option>
                        <option value="temperature" data-i18n="conversion.temperature">Temperature</option>
                        <option value="area" data-i18n="conversion.area">Area</option>
                        <option value="volume" data-i18n="conversion.volume">Volume</option>
                        <option value="time" data-i18n="conversion.time">Time</option>
                        <option value="speed" data-i18n="conversion.speed">Speed</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="from-value" data-i18n="unit.from_value">From Value</label>
                    <input type="number" id="from-value" placeholder="100" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="from-unit" data-i18n="unit.from_unit">From Unit</label>
                    <select id="from-unit" required>
                        <option value="meter" data-i18n="units.meter">Meter</option>
                        <option value="kilometer" data-i18n="units.kilometer">Kilometer</option>
                        <option value="centimeter" data-i18n="units.centimeter">Centimeter</option>
                        <option value="millimeter" data-i18n="units.millimeter">Millimeter</option>
                        <option value="inch" data-i18n="units.inch">Inch</option>
                        <option value="foot" data-i18n="units.foot">Foot</option>
                        <option value="yard" data-i18n="units.yard">Yard</option>
                        <option value="mile" data-i18n="units.mile">Mile</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="to-unit" data-i18n="unit.to_unit">To Unit</label>
                    <select id="to-unit" required>
                        <option value="meter" data-i18n="units.meter">Meter</option>
                        <option value="kilometer" data-i18n="units.kilometer">Kilometer</option>
                        <option value="centimeter" data-i18n="units.centimeter">Centimeter</option>
                        <option value="millimeter" data-i18n="units.millimeter">Millimeter</option>
                        <option value="inch" data-i18n="units.inch">Inch</option>
                        <option value="foot" data-i18n="units.foot">Foot</option>
                        <option value="yard" data-i18n="units.yard">Yard</option>
                        <option value="mile" data-i18n="units.mile">Mile</option>
                    </select>
                </div>
                <button type="submit" class="calc-button" data-i18n="unit.convert">Convert</button>
            </form>
            <div id="unit-converter-result" class="calc-result" style="display: none;">
                <div class="result-value" id="converted-value"></div>
                <div class="result-label" data-i18n="unit.converted_value">Converted Value</div>
            </div>
        `;
    }

    getComingSoonHTML() {
        return `
            <div class="calc-result">
                <div class="result-value">🚧</div>
                <div class="result-label" data-i18n="coming_soon.title">Coming Soon</div>
                <p class="mt-1" data-i18n="coming_soon.description">This calculator is under development and will be available soon!</p>
            </div>
        `;
    }

    setupCalculator(type) {
        console.log('setupCalculator called with type:', type);
        console.log('=== ENTERING SWITCH STATEMENT ===');
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
                console.log('=== SWITCH CASE: property-tax ===');
                try {
                    console.log('About to call setupPropertyTaxCalculator');
                    console.log('this object:', this);
                    console.log('setupPropertyTaxCalculator function exists?', typeof this.setupPropertyTaxCalculator);
                    if (typeof this.setupPropertyTaxCalculator === 'function') {
                        this.setupPropertyTaxCalculator();
                        console.log('setupPropertyTaxCalculator returned normally');
                    } else {
                        console.error('setupPropertyTaxCalculator is not a function!');
                    }
                } catch (error) {
                    console.error('Error calling setupPropertyTaxCalculator:', error);
                    console.error('Stack trace:', error.stack);
                }
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
            case 'cagr':
                this.setupCAGRCalculator();
                break;
            case 'inflation':
                this.setupInflationCalculator();
                break;
            case 'personal-loan':
                this.setupPersonalLoanCalculator();
                break;
            case 'margins':
                this.setupMarginsCalculator();
                break;
            case 'variable-mortgage':
                this.setupVariableMortgageCalculator();
                break;
            case 'time-calculator':
                this.setupTimeCalculator();
                break;
            case 'working-days':
                this.setupWorkingDaysCalculator();
                break;
            case 'size-converter':
                this.setupSizeConverter();
                break;
            case 'holiday-optimizer':
                this.setupHolidayOptimizer();
                break;
            case 'unit-price':
                this.setupUnitPriceCalculator();
                break;
            case 'reading-time':
                this.setupReadingTimeCalculator();
                break;
            case 'cholesterol':
                this.setupCholesterolCalculator();
                break;
            case 'calorie-deficit':
                this.setupCalorieDeficitCalculator();
                break;
            case 'biological-age':
                this.setupBiologicalAgeCalculator();
                break;
            case 'ideal-weight':
                this.setupIdealWeightCalculator();
                break;
            case 'steps-to-calories':
                this.setupStepsToCaloriesCalculator();
                break;
            case 'pace-to-speed':
                this.setupPaceToSpeedCalculator();
                break;
            case 'vo2max':
                this.setupVO2maxCalculator();
                break;
            case 'crosstraining':
                this.setupCrossTrainingCalculator();
                break;
            case 'grade-calculator':
                this.setupGradeCalculator();
                break;
            case 'password-generator':
                this.setupPasswordGenerator();
                break;
            case 'unit-converter':
                this.setupUnitConverter();
                break;
            case 'holiday-optimizer':
                this.setupHolidayOptimizer();
                break;
            default:
                console.log('=== DEFAULT CASE: Unknown calculator type ===', type);
                break;
        }
        console.log('=== EXITING SWITCH STATEMENT ===');
    }

    setupCAGRCalculator() {
        const form = document.getElementById('cagr-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const regionCode = document.getElementById('cagr-region').value;
                const currency = window.taxConfig ? window.taxConfig.taxConfigs[regionCode].currency : '$';
                
                const initialValue = parseFloat(document.getElementById('initial-value').value);
                const finalValue = parseFloat(document.getElementById('final-value').value);
                const years = parseFloat(document.getElementById('years').value);
                
                if (initialValue <= 0 || finalValue <= 0 || years <= 0) {
                    alert('Please enter valid positive numbers');
                    return;
                }
                
                // Calculate CAGR: (Final Value / Initial Value)^(1/years) - 1
                const cagr = Math.pow(finalValue / initialValue, 1 / years) - 1;
                const totalReturn = finalValue - initialValue;
                const annualReturn = totalReturn / years;
                
                // Display results
                document.getElementById('cagr-rate').textContent = (cagr * 100).toFixed(2) + '%';
                document.getElementById('total-return').textContent = formatCurrency(totalReturn, currency);
                document.getElementById('annual-return').textContent = formatCurrency(annualReturn, currency);
                document.getElementById('cagr-result').style.display = 'block';
            });
        }
    }

    setupInflationCalculator() {
        const form = document.getElementById('inflation-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const regionCode = document.getElementById('inflation-region').value;
                const currency = window.taxConfig ? window.taxConfig.taxConfigs[regionCode].currency : '$';
                
                const currentAmount = parseFloat(document.getElementById('current-amount').value);
                const inflationRate = parseFloat(document.getElementById('inflation-rate').value) / 100;
                const years = parseInt(document.getElementById('years').value);
                
                if (currentAmount <= 0 || inflationRate < 0 || years <= 0) {
                    alert('Please enter valid positive numbers');
                    return;
                }
                
                // Calculate future value with inflation
                const futureValue = currentAmount * Math.pow(1 + inflationRate, years);
                const purchasingPower = currentAmount; // Current purchasing power
                const inflationLoss = futureValue - currentAmount;
                
                // Display results
                document.getElementById('future-value').textContent = formatCurrency(futureValue, currency);
                document.getElementById('purchasing-power').textContent = formatCurrency(purchasingPower, currency);
                document.getElementById('inflation-loss').textContent = formatCurrency(inflationLoss, currency);
                document.getElementById('inflation-result').style.display = 'block';
            });
        }
    }

    setupPersonalLoanCalculator() {
        const form = document.getElementById('personal-loan-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const regionCode = document.getElementById('personal-loan-region').value;
                const currency = window.taxConfig ? window.taxConfig.taxConfigs[regionCode].currency : '$';
                
                const loanAmount = parseFloat(document.getElementById('loan-amount').value);
                const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
                const loanTerm = parseInt(document.getElementById('loan-term').value);
                
                if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
                    alert('Please enter valid positive numbers');
                    return;
                }
                
                // Calculate monthly payment using PMT formula
                const monthlyRate = interestRate / 12;
                const numPayments = loanTerm * 12;
                const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                                     (Math.pow(1 + monthlyRate, numPayments) - 1);
                const totalPayment = monthlyPayment * numPayments;
                const totalInterest = totalPayment - loanAmount;
                
                // Display results
                document.getElementById('monthly-payment').textContent = formatCurrency(monthlyPayment, currency);
                document.getElementById('total-payment').textContent = formatCurrency(totalPayment, currency);
                document.getElementById('total-interest').textContent = formatCurrency(totalInterest, currency);
                document.getElementById('personal-loan-result').style.display = 'block';
            });
        }
    }

    setupMarginsCalculator() {
        const form = document.getElementById('margins-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const regionCode = document.getElementById('margins-region').value;
                const currency = window.taxConfig ? window.taxConfig.taxConfigs[regionCode].currency : '$';
                
                const cost = parseFloat(document.getElementById('cost').value);
                const sellingPrice = parseFloat(document.getElementById('selling-price').value);
                
                if (cost <= 0 || sellingPrice <= 0) {
                    alert('Please enter valid positive numbers');
                    return;
                }
                
                // Calculate margins
                const profit = sellingPrice - cost;
                const profitMargin = (profit / sellingPrice) * 100;
                const markup = (profit / cost) * 100;
                
                // Update the markup percentage field with calculated value
                document.getElementById('markup-percentage').value = markup.toFixed(2);
                
                // Display results
                document.getElementById('profit-margin').textContent = profitMargin.toFixed(2) + '%';
                document.getElementById('markup').textContent = markup.toFixed(2) + '%';
                document.getElementById('profit').textContent = formatCurrency(profit, currency);
                document.getElementById('margins-result').style.display = 'block';
            });
        }
    }

    setupVariableMortgageCalculator() {
        const form = document.getElementById('variable-mortgage-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const regionCode = document.getElementById('variable-mortgage-region').value;
                const currency = window.taxConfig ? window.taxConfig.taxConfigs[regionCode].currency : '$';
                
                const loanAmount = parseFloat(document.getElementById('loan-amount').value);
                const initialRate = parseFloat(document.getElementById('initial-rate').value) / 100;
                const term = parseInt(document.getElementById('term').value);
                const rateChange = parseFloat(document.getElementById('rate-change').value) / 100;
                const changeYear = parseInt(document.getElementById('change-year').value);
                
                if (loanAmount <= 0 || initialRate < 0 || term <= 0 || changeYear <= 0) {
                    alert('Please enter valid positive numbers');
                    return;
                }
                
                // Calculate initial monthly payment
                const monthlyInitialRate = initialRate / 12;
                const numPayments = term * 12;
                const initialPayment = loanAmount * (monthlyInitialRate * Math.pow(1 + monthlyInitialRate, numPayments)) / 
                                    (Math.pow(1 + monthlyInitialRate, numPayments) - 1);
                
                // Calculate new payment after rate change
                const monthlyNewRate = rateChange / 12;
                const newPayment = loanAmount * (monthlyNewRate * Math.pow(1 + monthlyNewRate, numPayments)) / 
                                 (Math.pow(1 + monthlyNewRate, numPayments) - 1);
                
                const paymentIncrease = newPayment - initialPayment;
                
                // Display results
                document.getElementById('initial-payment').textContent = formatCurrency(initialPayment, currency);
                document.getElementById('new-payment').textContent = formatCurrency(newPayment, currency);
                document.getElementById('payment-increase').textContent = formatCurrency(paymentIncrease, currency);
                document.getElementById('variable-mortgage-result').style.display = 'block';
            });
        }
    }

    setupTimeCalculator() {
        const form = document.getElementById('time-calculator-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const time1 = document.getElementById('time1').value;
                const time2 = document.getElementById('time2').value;
                const operation = document.getElementById('operation').value;
                
                // Parse time strings (HH:MM:SS)
                const parseTime = (timeStr) => {
                    const parts = timeStr.split(':');
                    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
                };
                
                const formatTime = (seconds) => {
                    const hours = Math.floor(seconds / 3600);
                    const minutes = Math.floor((seconds % 3600) / 60);
                    const secs = seconds % 60;
                    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                };
                
                const seconds1 = parseTime(time1);
                const seconds2 = parseTime(time2);
                
                let result;
                if (operation === 'add') {
                    result = seconds1 + seconds2;
                } else {
                    result = Math.max(0, seconds1 - seconds2);
                }
                
                document.getElementById('time-result').textContent = formatTime(result);
                document.getElementById('time-calculator-result').style.display = 'block';
            });
        }
    }

    setupWorkingDaysCalculator() {
        const form = document.getElementById('working-days-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const startDate = new Date(document.getElementById('start-date').value);
                const endDate = new Date(document.getElementById('end-date').value);
                const excludeWeekends = document.getElementById('exclude-weekends').checked;
                const excludeHolidays = document.getElementById('exclude-holidays').checked;
                
                if (startDate >= endDate) {
                    alert('End date must be after start date');
                    return;
                }
                
                let workingDays = 0;
                let totalDays = 0;
                let weekends = 0;
                
                const currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    totalDays++;
                    const dayOfWeek = currentDate.getDay();
                    
                    if (excludeWeekends && (dayOfWeek === 0 || dayOfWeek === 6)) {
                        weekends++;
                    } else {
                        workingDays++;
                    }
                    
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                
                document.getElementById('working-days-count').textContent = workingDays;
                document.getElementById('total-days').textContent = totalDays;
                document.getElementById('weekends').textContent = weekends;
                document.getElementById('working-days-result').style.display = 'block';
            });
        }
    }

    setupSizeConverter() {
        const form = document.getElementById('size-converter-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const sizeType = document.getElementById('size-type').value;
                const fromSize = document.getElementById('from-size').value;
                const fromSystem = document.getElementById('from-system').value;
                const toSystem = document.getElementById('to-system').value;
                
                if (fromSystem === toSystem) {
                    document.getElementById('converted-size').textContent = fromSize;
                    document.getElementById('size-converter-result').style.display = 'block';
                    return;
                }
                
                // Simple size conversion logic (this would need to be expanded with actual conversion tables)
                let convertedSize = fromSize;
                
                if (sizeType === 'clothing') {
                    // Basic clothing size conversion
                    const sizeMap = {
                        'XS': { 'us': 'XS', 'eu': '34', 'uk': '6', 'jp': 'S' },
                        'S': { 'us': 'S', 'eu': '36', 'uk': '8', 'jp': 'M' },
                        'M': { 'us': 'M', 'eu': '38', 'uk': '10', 'jp': 'L' },
                        'L': { 'us': 'L', 'eu': '40', 'uk': '12', 'jp': 'XL' },
                        'XL': { 'us': 'XL', 'eu': '42', 'uk': '14', 'jp': 'XXL' }
                    };
                    
                    const size = sizeMap[fromSize.toUpperCase()];
                    if (size) {
                        convertedSize = size[toSystem] || fromSize;
                    }
                } else if (sizeType === 'shoes') {
                    // Basic shoe size conversion
                    const shoeMap = {
                        '6': { 'us': '6', 'eu': '39', 'uk': '5', 'jp': '24' },
                        '7': { 'us': '7', 'eu': '40', 'uk': '6', 'jp': '25' },
                        '8': { 'us': '8', 'eu': '41', 'uk': '7', 'jp': '26' },
                        '9': { 'us': '9', 'eu': '42', 'uk': '8', 'jp': '27' },
                        '10': { 'us': '10', 'eu': '43', 'uk': '9', 'jp': '28' }
                    };
                    
                    const size = shoeMap[fromSize];
                    if (size) {
                        convertedSize = size[toSystem] || fromSize;
                    }
                }
                
                document.getElementById('converted-size').textContent = convertedSize;
                document.getElementById('size-converter-result').style.display = 'block';
            });
        }
    }

    setupUnitPriceCalculator() {
        const form = document.getElementById('unit-price-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const price1 = parseFloat(document.getElementById('price1').value);
                const quantity1 = parseFloat(document.getElementById('quantity1').value);
                const unit1 = document.getElementById('unit1').value;
                const price2 = parseFloat(document.getElementById('price2').value);
                const quantity2 = parseFloat(document.getElementById('quantity2').value);
                const unit2 = document.getElementById('unit2').value;
                
                if (price1 <= 0 || quantity1 <= 0 || price2 <= 0 || quantity2 <= 0) {
                    alert('Please enter valid positive numbers');
                    return;
                }
                
                const unitPrice1 = price1 / quantity1;
                const unitPrice2 = price2 / quantity2;
                
                let betterDeal;
                if (unitPrice1 < unitPrice2) {
                    betterDeal = `Option 1 (${unitPrice1.toFixed(4)} per ${unit1})`;
                } else if (unitPrice2 < unitPrice1) {
                    betterDeal = `Option 2 (${unitPrice2.toFixed(4)} per ${unit2})`;
                } else {
                    betterDeal = 'Both options are equal';
                }
                
                document.getElementById('better-deal').textContent = betterDeal;
                document.getElementById('unit-price1').textContent = unitPrice1.toFixed(4);
                document.getElementById('unit-price2').textContent = unitPrice2.toFixed(4);
                document.getElementById('unit-price-result').style.display = 'block';
            });
        }
    }

    setupReadingTimeCalculator() {
        const form = document.getElementById('reading-time-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const text = document.getElementById('text').value;
                const readingSpeed = parseInt(document.getElementById('reading-speed').value);
                
                if (text.trim() === '' || readingSpeed <= 0) {
                    alert('Please enter valid text and reading speed');
                    return;
                }
                
                // Count words and characters
                const words = text.trim().split(/\s+/).length;
                const characters = text.length;
                const readingTimeMinutes = Math.ceil(words / readingSpeed);
                
                const hours = Math.floor(readingTimeMinutes / 60);
                const minutes = readingTimeMinutes % 60;
                
                let timeString;
                if (hours > 0) {
                    timeString = `${hours}h ${minutes}m`;
                } else {
                    timeString = `${minutes}m`;
                }
                
                document.getElementById('reading-time').textContent = timeString;
                document.getElementById('word-count').textContent = words;
                document.getElementById('character-count').textContent = characters;
                document.getElementById('reading-time-result').style.display = 'block';
            });
        }
    }

    setupCholesterolCalculator() {
        const form = document.getElementById('cholesterol-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const totalCholesterol = parseFloat(document.getElementById('total-cholesterol').value);
                const hdl = parseFloat(document.getElementById('hdl').value);
                const ldl = parseFloat(document.getElementById('ldl').value);
                const triglycerides = parseFloat(document.getElementById('triglycerides').value);
                
                if (totalCholesterol <= 0 || hdl <= 0 || ldl <= 0 || triglycerides <= 0) {
                    alert('Please enter valid positive numbers');
                    return;
                }
                
                // Calculate cholesterol ratio (Total/HDL)
                const ratio = totalCholesterol / hdl;
                
                // Determine risk level based on ratio
                let riskLevel, recommendation;
                if (ratio < 3.5) {
                    riskLevel = 'Low Risk';
                    recommendation = 'Excellent cholesterol profile';
                } else if (ratio < 5.0) {
                    riskLevel = 'Moderate Risk';
                    recommendation = 'Good cholesterol profile, maintain healthy lifestyle';
                } else {
                    riskLevel = 'High Risk';
                    recommendation = 'Consider lifestyle changes and consult healthcare provider';
                }
                
                document.getElementById('cholesterol-ratio').textContent = ratio.toFixed(2);
                document.getElementById('risk-level').textContent = riskLevel;
                document.getElementById('recommendation').textContent = recommendation;
                document.getElementById('cholesterol-result').style.display = 'block';
            });
        }
    }

    setupCalorieDeficitCalculator() {
        const form = document.getElementById('calorie-deficit-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const currentWeight = parseFloat(document.getElementById('current-weight').value);
                const targetWeight = parseFloat(document.getElementById('target-weight').value);
                const height = parseFloat(document.getElementById('height').value);
                const age = parseInt(document.getElementById('age').value);
                const activityLevel = document.getElementById('activity-level').value;
                
                if (currentWeight <= 0 || targetWeight <= 0 || height <= 0 || age <= 0) {
                    alert('Please enter valid positive numbers');
                    return;
                }
                
                // Calculate BMR using Mifflin-St Jeor Equation
                const bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5; // Male formula
                
                // Activity multipliers
                const activityMultipliers = {
                    'sedentary': 1.2,
                    'light': 1.375,
                    'moderate': 1.55,
                    'active': 1.725
                };
                
                const tdee = bmr * activityMultipliers[activityLevel];
                
                // Calculate weight loss (1 kg = 7700 calories)
                const weightToLose = currentWeight - targetWeight;
                const totalCaloriesToLose = weightToLose * 7700;
                
                // Safe deficit (500-1000 calories per day)
                const safeDeficit = Math.min(1000, tdee * 0.25); // Max 25% of TDEE
                const weeksToGoal = Math.ceil(totalCaloriesToLose / (safeDeficit * 7));
                
                document.getElementById('daily-deficit').textContent = Math.round(safeDeficit);
                document.getElementById('weeks-to-goal').textContent = weeksToGoal;
                document.getElementById('safe-deficit').textContent = Math.round(safeDeficit);
                document.getElementById('calorie-deficit-result').style.display = 'block';
            });
        }
    }

    setupBiologicalAgeCalculator() {
        const form = document.getElementById('biological-age-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const chronologicalAge = parseInt(document.getElementById('chronological-age').value);
                const restingHR = parseInt(document.getElementById('resting-hr').value);
                const vo2max = parseFloat(document.getElementById('vo2max').value);
                const bodyFat = parseFloat(document.getElementById('body-fat').value);
                const flexibility = parseInt(document.getElementById('flexibility').value);
                
                if (chronologicalAge <= 0 || restingHR <= 0 || vo2max <= 0 || bodyFat <= 0 || flexibility <= 0) {
                    alert('Please enter valid positive numbers');
                    return;
                }
                
                // Calculate biological age based on fitness metrics
                let biologicalAge = chronologicalAge;
                
                // VO2max adjustment (higher VO2max = younger biological age)
                const vo2maxScore = Math.max(0, Math.min(10, (vo2max - 20) / 5));
                biologicalAge -= vo2maxScore * 2;
                
                // Resting HR adjustment (lower HR = younger biological age)
                const hrScore = Math.max(0, Math.min(5, (80 - restingHR) / 10));
                biologicalAge -= hrScore;
                
                // Body fat adjustment (lower body fat = younger biological age)
                const bodyFatScore = Math.max(0, Math.min(5, (25 - bodyFat) / 5));
                biologicalAge -= bodyFatScore;
                
                // Flexibility adjustment
                const flexibilityScore = Math.max(0, flexibility - 5);
                biologicalAge -= flexibilityScore * 0.5;
                
                biologicalAge = Math.max(18, Math.round(biologicalAge));
                const ageDifference = biologicalAge - chronologicalAge;
                
                let fitnessLevel;
                if (biologicalAge < chronologicalAge - 5) {
                    fitnessLevel = 'Excellent';
                } else if (biologicalAge < chronologicalAge) {
                    fitnessLevel = 'Good';
                } else if (biologicalAge <= chronologicalAge + 5) {
                    fitnessLevel = 'Average';
                } else {
                    fitnessLevel = 'Below Average';
                }
                
                document.getElementById('biological-age').textContent = biologicalAge;
                document.getElementById('age-difference').textContent = ageDifference > 0 ? `+${ageDifference} years` : `${ageDifference} years`;
                document.getElementById('fitness-level').textContent = fitnessLevel;
                document.getElementById('biological-age-result').style.display = 'block';
            });
        }
    }

    setupIdealWeightCalculator() {
        const form = document.getElementById('ideal-weight-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const height = parseFloat(document.getElementById('height').value);
                const gender = document.getElementById('gender').value;
                const frameSize = document.getElementById('frame-size').value;
                
                if (height <= 0) {
                    alert('Please enter valid height');
                    return;
                }
                
                // Calculate ideal weight using Devine formula
                let idealWeight;
                if (gender === 'male') {
                    idealWeight = 50 + 2.3 * ((height - 152.4) / 2.54);
                } else {
                    idealWeight = 45.5 + 2.3 * ((height - 152.4) / 2.54);
                }
                
                // Adjust for frame size
                const frameAdjustments = {
                    'small': -0.9,
                    'medium': 0,
                    'large': 0.9
                };
                
                idealWeight += frameAdjustments[frameSize];
                
                // Calculate weight range (±10%)
                const minWeight = idealWeight * 0.9;
                const maxWeight = idealWeight * 1.1;
                
                // Calculate BMI range
                const heightM = height / 100;
                const minBMI = (minWeight / (heightM * heightM)).toFixed(1);
                const maxBMI = (maxWeight / (heightM * heightM)).toFixed(1);
                
                document.getElementById('ideal-weight').textContent = idealWeight.toFixed(1) + ' kg';
                document.getElementById('weight-range').textContent = `${minWeight.toFixed(1)} - ${maxWeight.toFixed(1)} kg`;
                document.getElementById('bmi-range').textContent = `${minBMI} - ${maxBMI}`;
                document.getElementById('ideal-weight-result').style.display = 'block';
            });
        }
    }

    setupStepsToCaloriesCalculator() {
        const form = document.getElementById('steps-to-calories-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const steps = parseInt(document.getElementById('steps').value);
                const weight = parseFloat(document.getElementById('weight').value);
                const height = parseFloat(document.getElementById('height').value);
                const age = parseInt(document.getElementById('age').value);
                const gender = document.getElementById('gender').value;
                
                if (steps <= 0 || weight <= 0 || height <= 0 || age <= 0) {
                    alert('Please enter valid positive numbers');
                    return;
                }
                
                // Calculate calories burned (approximately 0.04 calories per step per kg)
                const caloriesPerStep = 0.04;
                const caloriesBurned = steps * caloriesPerStep * weight;
                
                // Calculate distance (average step length based on height)
                const stepLength = height * 0.43; // Average step length as % of height
                const distance = (steps * stepLength) / 1000; // Convert to km
                
                // Calculate duration (average walking speed 5 km/h)
                const duration = (distance / 5) * 60; // Convert to minutes
                
                document.getElementById('calories-burned').textContent = Math.round(caloriesBurned);
                document.getElementById('distance').textContent = distance.toFixed(2) + ' km';
                document.getElementById('duration').textContent = Math.round(duration) + ' minutes';
                document.getElementById('steps-to-calories-result').style.display = 'block';
            });
        }
    }

    setupPaceToSpeedCalculator() {
        const form = document.getElementById('pace-to-speed-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const pace = document.getElementById('pace').value;
                const conversionType = document.getElementById('conversion-type').value;
                
                if (!pace || pace.trim() === '') {
                    alert('Please enter a valid pace');
                    return;
                }
                
                // Parse pace (MM:SS format)
                const paceParts = pace.split(':');
                const minutes = parseInt(paceParts[0]);
                const seconds = parseInt(paceParts[1]) || 0;
                const totalSeconds = minutes * 60 + seconds;
                
                let result, equivalent;
                
                if (conversionType === 'pace-to-speed') {
                    // Convert pace to speed (km/h)
                    const speed = 3600 / totalSeconds; // km/h
                    result = speed.toFixed(2) + ' km/h';
                    equivalent = `${minutes}:${seconds.toString().padStart(2, '0')} per km`;
                } else {
                    // Convert speed to pace
                    const speed = parseFloat(pace); // Assuming pace input is actually speed
                    const paceSeconds = 3600 / speed;
                    const paceMinutes = Math.floor(paceSeconds / 60);
                    const paceSecs = Math.round(paceSeconds % 60);
                    result = `${paceMinutes}:${paceSecs.toString().padStart(2, '0')} per km`;
                    equivalent = `${speed.toFixed(2)} km/h`;
                }
                
                document.getElementById('converted-value').textContent = result;
                document.getElementById('result-label').textContent = conversionType === 'pace-to-speed' ? 'Speed' : 'Pace';
                document.getElementById('equivalent').textContent = equivalent;
                document.getElementById('pace-to-speed-result').style.display = 'block';
            });
        }
    }

    setupVO2maxCalculator() {
        const form = document.getElementById('vo2max-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const testType = document.getElementById('test-type').value;
                const distance = parseFloat(document.getElementById('distance').value);
                const age = parseInt(document.getElementById('age').value);
                const weight = parseFloat(document.getElementById('weight').value);
                const gender = document.getElementById('gender').value;
                
                if (distance <= 0 || age <= 0 || weight <= 0) {
                    alert('Please enter valid positive numbers');
                    return;
                }
                
                let vo2max;
                
                if (testType === 'cooper') {
                    // Cooper Test: VO2max = (distance - 504.9) / 44.73
                    vo2max = (distance - 504.9) / 44.73;
                } else if (testType === 'beep') {
                    // Beep test approximation
                    vo2max = 3.5 + (distance / 100) * 2.5;
                } else {
                    // Treadmill test
                    vo2max = 3.5 + (distance / 100) * 3.0;
                }
                
                // Age and gender adjustments
                const ageAdjustment = age > 30 ? (age - 30) * 0.1 : 0;
                const genderAdjustment = gender === 'female' ? -2 : 0;
                
                vo2max = Math.max(20, vo2max - ageAdjustment + genderAdjustment);
                
                // Determine fitness level
                let fitnessLevel, ageRating;
                if (vo2max >= 50) {
                    fitnessLevel = 'Excellent';
                    ageRating = 'Above Average';
                } else if (vo2max >= 40) {
                    fitnessLevel = 'Good';
                    ageRating = 'Average';
                } else if (vo2max >= 30) {
                    fitnessLevel = 'Fair';
                    ageRating = 'Below Average';
                } else {
                    fitnessLevel = 'Poor';
                    ageRating = 'Below Average';
                }
                
                document.getElementById('vo2max-value').textContent = vo2max.toFixed(1) + ' ml/kg/min';
                document.getElementById('fitness-level').textContent = fitnessLevel;
                document.getElementById('age-rating').textContent = ageRating;
                document.getElementById('vo2max-result').style.display = 'block';
            });
        }
    }

    setupCrossTrainingCalculator() {
        const form = document.getElementById('crosstraining-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const activity = document.getElementById('activity').value;
                const duration = parseInt(document.getElementById('duration').value);
                const intensity = document.getElementById('intensity').value;
                const weight = parseFloat(document.getElementById('weight').value);
                
                if (duration <= 0 || weight <= 0) {
                    alert('Please enter valid positive numbers');
                    return;
                }
                
                // MET values for different activities
                const metValues = {
                    'running': { 'low': 6, 'moderate': 8, 'high': 12 },
                    'cycling': { 'low': 4, 'moderate': 6, 'high': 10 },
                    'swimming': { 'low': 5, 'moderate': 7, 'high': 11 },
                    'elliptical': { 'low': 4, 'moderate': 6, 'high': 9 }
                };
                
                const intensityMap = { 'low': 'low', 'moderate': 'moderate', 'high': 'high' };
                const met = metValues[activity][intensityMap[intensity]];
                
                // Calculate calories burned: MET × weight × time
                const calories = met * weight * (duration / 60);
                
                // Calculate equivalent duration for other activities
                const equivalentActivities = {
                    'running': 'Running',
                    'cycling': 'Cycling', 
                    'swimming': 'Swimming',
                    'elliptical': 'Elliptical'
                };
                
                const equivalentActivity = equivalentActivities[activity];
                const equivalentDuration = Math.round(duration * 0.8); // Rough conversion
                
                document.getElementById('equivalent-duration').textContent = equivalentDuration + ' minutes';
                document.getElementById('calories').textContent = Math.round(calories);
                document.getElementById('equivalent-activity').textContent = equivalentActivity;
                document.getElementById('crosstraining-result').style.display = 'block';
            });
        }
    }

    setupGradeCalculator() {
        const form = document.getElementById('grade-calculator-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const currentGPA = parseFloat(document.getElementById('current-gpa').value);
                const creditsCompleted = parseInt(document.getElementById('credits-completed').value);
                const newGrade = parseInt(document.getElementById('new-grade').value);
                const newCredits = parseFloat(document.getElementById('new-credits').value);
                
                if (currentGPA < 0 || currentGPA > 4 || creditsCompleted < 0 || newGrade < 0 || newGrade > 100 || newCredits <= 0) {
                    alert('Please enter valid numbers');
                    return;
                }
                
                // Convert percentage grade to GPA (4.0 scale)
                let gradePoints;
                if (newGrade >= 97) gradePoints = 4.0;
                else if (newGrade >= 93) gradePoints = 3.7;
                else if (newGrade >= 90) gradePoints = 3.3;
                else if (newGrade >= 87) gradePoints = 3.0;
                else if (newGrade >= 83) gradePoints = 2.7;
                else if (newGrade >= 80) gradePoints = 2.3;
                else if (newGrade >= 77) gradePoints = 2.0;
                else if (newGrade >= 73) gradePoints = 1.7;
                else if (newGrade >= 70) gradePoints = 1.3;
                else if (newGrade >= 67) gradePoints = 1.0;
                else if (newGrade >= 65) gradePoints = 0.7;
                else gradePoints = 0.0;
                
                // Calculate new GPA
                const totalQualityPoints = (currentGPA * creditsCompleted) + (gradePoints * newCredits);
                const totalCredits = creditsCompleted + newCredits;
                const newGPA = totalQualityPoints / totalCredits;
                
                const gpaChange = newGPA - currentGPA;
                
                // Convert GPA to letter grade
                let letterGrade;
                if (newGPA >= 3.7) letterGrade = 'A';
                else if (newGPA >= 3.3) letterGrade = 'A-';
                else if (newGPA >= 3.0) letterGrade = 'B+';
                else if (newGPA >= 2.7) letterGrade = 'B';
                else if (newGPA >= 2.3) letterGrade = 'B-';
                else if (newGPA >= 2.0) letterGrade = 'C+';
                else if (newGPA >= 1.7) letterGrade = 'C';
                else if (newGPA >= 1.3) letterGrade = 'C-';
                else if (newGPA >= 1.0) letterGrade = 'D';
                else letterGrade = 'F';
                
                document.getElementById('new-gpa').textContent = newGPA.toFixed(3);
                document.getElementById('gpa-change').textContent = (gpaChange >= 0 ? '+' : '') + gpaChange.toFixed(3);
                document.getElementById('letter-grade').textContent = letterGrade;
                document.getElementById('grade-calculator-result').style.display = 'block';
            });
        }
    }

    setupPasswordGenerator() {
        const form = document.getElementById('password-generator-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const length = parseInt(document.getElementById('password-length').value);
                const includeUppercase = document.getElementById('include-uppercase').checked;
                const includeLowercase = document.getElementById('include-lowercase').checked;
                const includeNumbers = document.getElementById('include-numbers').checked;
                const includeSymbols = document.getElementById('include-symbols').checked;
                
                if (length < 4 || length > 128) {
                    alert('Password length must be between 4 and 128 characters');
                    return;
                }
                
                if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
                    alert('Please select at least one character type');
                    return;
                }
                
                // Generate password with enhanced security
                let charset = '';
                if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
                if (includeNumbers) charset += '0123456789';
                if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
                
                // Enhanced password generation with better randomness
                let password = '';
                const array = new Uint32Array(length);
                window.crypto.getRandomValues(array);
                
                for (let i = 0; i < length; i++) {
                    password += charset[array[i] % charset.length];
                }
                
                // Ensure at least one character from each selected type
                if (includeUppercase && !/[A-Z]/.test(password)) {
                    password = password.slice(0, -1) + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
                }
                if (includeLowercase && !/[a-z]/.test(password)) {
                    password = password.slice(0, -1) + 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
                }
                if (includeNumbers && !/[0-9]/.test(password)) {
                    password = password.slice(0, -1) + '0123456789'[Math.floor(Math.random() * 10)];
                }
                if (includeSymbols && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
                    password = password.slice(0, -1) + '!@#$%^&*()_+-=[]{}|;:,.<>?'[Math.floor(Math.random() * 32)];
                }
                
                document.getElementById('generated-password').textContent = password;
                document.getElementById('password-generator-result').style.display = 'block';
                
                // Copy functionality
                document.getElementById('copy-password').onclick = () => {
                    navigator.clipboard.writeText(password).then(() => {
                        alert('Password copied to clipboard!');
                    });
                };
            });
        }
    }

    setupUnitConverter() {
        const form = document.getElementById('unit-converter-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const conversionType = document.getElementById('conversion-type').value;
                const fromValue = parseFloat(document.getElementById('from-value').value);
                const fromUnit = document.getElementById('from-unit').value;
                const toUnit = document.getElementById('to-unit').value;
                
                if (isNaN(fromValue)) {
                    alert('Please enter a valid number');
                    return;
                }
                
                // Conversion factors (to base units)
                const conversionFactors = {
                    'length': {
                        'meter': 1,
                        'kilometer': 1000,
                        'centimeter': 0.01,
                        'millimeter': 0.001,
                        'inch': 0.0254,
                        'foot': 0.3048,
                        'yard': 0.9144,
                        'mile': 1609.34,
                        'nautical_mile': 1852
                    },
                    'weight': {
                        'gram': 1,
                        'kilogram': 1000,
                        'pound': 453.592,
                        'ounce': 28.3495,
                        'ton': 1000000,
                        'stone': 6350.29
                    },
                    'area': {
                        'square_meter': 1,
                        'square_kilometer': 1000000,
                        'square_centimeter': 0.0001,
                        'square_inch': 0.00064516,
                        'square_foot': 0.092903,
                        'square_yard': 0.836127,
                        'acre': 4046.86,
                        'hectare': 10000
                    },
                    'volume': {
                        'liter': 1,
                        'milliliter': 0.001,
                        'cubic_meter': 1000,
                        'cubic_centimeter': 0.001,
                        'gallon': 3.78541,
                        'quart': 0.946353,
                        'pint': 0.473176,
                        'cup': 0.236588,
                        'fluid_ounce': 0.0295735
                    },
                    'time': {
                        'second': 1,
                        'minute': 60,
                        'hour': 3600,
                        'day': 86400,
                        'week': 604800,
                        'month': 2629746,
                        'year': 31556952
                    },
                    'speed': {
                        'mps': 1, // meters per second
                        'kmh': 0.277778, // km/h to m/s
                        'mph': 0.44704, // mph to m/s
                        'knot': 0.514444, // knot to m/s
                        'fps': 0.3048 // feet per second to m/s
                    },
                    'temperature': {
                        'celsius': 'celsius',
                        'fahrenheit': 'fahrenheit',
                        'kelvin': 'kelvin'
                    }
                };
                
                let result;
                if (conversionType === 'temperature') {
                    // Temperature conversion
                    result = this.convertTemperature(fromValue, fromUnit, toUnit);
                } else {
                    // Other conversions
                    const factors = conversionFactors[conversionType];
                    if (factors && factors[fromUnit] && factors[toUnit]) {
                        const baseValue = fromValue * factors[fromUnit];
                        result = baseValue / factors[toUnit];
                    } else {
                        result = fromValue; // Fallback
                    }
                }
                
                document.getElementById('converted-value').textContent = result.toFixed(6);
                document.getElementById('unit-converter-result').style.display = 'block';
            });
        }
    }

    setupHolidayOptimizer() {
        const form = document.getElementById('holiday-optimizer-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const startDate = new Date(document.getElementById('start-date').value);
                const endDate = new Date(document.getElementById('end-date').value);
                const vacationDays = parseInt(document.getElementById('vacation-days').value);
                const country = document.getElementById('country').value;
                
                // Create cache key for this calculation
                const cacheKey = `holiday_${country}_${startDate.getTime()}_${endDate.getTime()}_${vacationDays}`;
                
                // Check cache first
                if (this.calculationCache.has(cacheKey)) {
                    const cached = this.calculationCache.get(cacheKey);
                    if (Date.now() - cached.timestamp < this.cacheExpiry) {
                        this.displayHolidayResults(cached.data);
                        return;
                    }
                }
                
                if (startDate >= endDate) {
                    alert('End date must be after start date');
                    return;
                }
                
                if (vacationDays <= 0) {
                    alert('Please enter a valid number of vacation days');
                    return;
                }
                
                // Calculate total days in range
                const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                
                // Get country-specific holidays
                const holidays = this.getCountryHolidays(country, startDate.getFullYear());
                
                // Calculate working days (excluding weekends and holidays)
                let workingDays = 0;
                let weekendDays = 0;
                let holidayDays = 0;
                
                for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                    const dayOfWeek = d.getDay();
                    const dateStr = d.toISOString().split('T')[0];
                    
                    if (dayOfWeek === 0 || dayOfWeek === 6) {
                        weekendDays++;
                    } else if (holidays.includes(dateStr)) {
                        holidayDays++;
                    } else {
                        workingDays++;
                    }
                }
                
                // Optimize vacation days
                const optimizedDays = Math.min(vacationDays, workingDays);
                const remainingDays = vacationDays - optimizedDays;
                
                // Calculate vacation efficiency
                const efficiency = workingDays > 0 ? (optimizedDays / workingDays * 100).toFixed(1) : 0;
                
                // Suggest optimal vacation periods
                const suggestions = this.suggestVacationPeriods(startDate, endDate, vacationDays, holidays);
                
                document.getElementById('optimized-days').textContent = optimizedDays;
                document.getElementById('total-days').textContent = totalDays;
                document.getElementById('weekends').textContent = weekendDays;
                document.getElementById('holidays').textContent = holidayDays;
                document.getElementById('working-days').textContent = workingDays;
                document.getElementById('efficiency').textContent = efficiency + '%';
                document.getElementById('remaining-days').textContent = remainingDays;
                
                // Store result in cache
                const resultData = {
                    optimizedDays,
                    totalDays,
                    weekendDays,
                    holidayDays,
                    workingDays,
                    efficiency,
                    remainingDays,
                    suggestions
                };
                
                this.calculationCache.set(cacheKey, {
                    data: resultData,
                    timestamp: Date.now()
                });
                
                this.displayHolidayResults(resultData);
            });
        }
    }

    getCountryHolidays(country, year) {
        // Enhanced holiday data for major countries with more holidays
        const holidays = {
            'US': [
                `${year}-01-01`, // New Year's Day
                `${year}-01-15`, // Martin Luther King Jr. Day (approximate)
                `${year}-02-19`, // Presidents' Day (approximate)
                `${year}-05-27`, // Memorial Day (approximate)
                `${year}-07-04`, // Independence Day
                `${year}-09-02`, // Labor Day (approximate)
                `${year}-10-14`, // Columbus Day (approximate)
                `${year}-11-11`, // Veterans Day
                `${year}-11-28`, // Thanksgiving (approximate)
                `${year}-12-25`  // Christmas
            ],
            'CN': [
                `${year}-01-01`, // New Year's Day
                `${year}-02-10`, // Spring Festival (approximate)
                `${year}-04-05`, // Qingming Festival (approximate)
                `${year}-05-01`, // Labor Day
                `${year}-06-14`, // Dragon Boat Festival (approximate)
                `${year}-09-17`, // Mid-Autumn Festival (approximate)
                `${year}-10-01`  // National Day
            ],
            'UK': [
                `${year}-01-01`, // New Year's Day
                `${year}-04-19`, // Good Friday (approximate)
                `${year}-04-22`, // Easter Monday (approximate)
                `${year}-05-06`, // Early May Bank Holiday (approximate)
                `${year}-05-27`, // Spring Bank Holiday (approximate)
                `${year}-08-26`, // Summer Bank Holiday (approximate)
                `${year}-12-25`, // Christmas
                `${year}-12-26`  // Boxing Day
            ],
            'DE': [
                `${year}-01-01`, // New Year's Day
                `${year}-04-19`, // Good Friday (approximate)
                `${year}-04-22`, // Easter Monday (approximate)
                `${year}-05-01`, // Labor Day
                `${year}-05-30`, // Ascension Day (approximate)
                `${year}-06-10`, // Whit Monday (approximate)
                `${year}-10-03`, // German Unity Day
                `${year}-12-25`, // Christmas
                `${year}-12-26`  // Boxing Day
            ],
            'JP': [
                `${year}-01-01`, // New Year's Day
                `${year}-01-08`, // Coming of Age Day (approximate)
                `${year}-02-11`, // National Foundation Day
                `${year}-03-20`, // Vernal Equinox Day (approximate)
                `${year}-04-29`, // Showa Day
                `${year}-05-03`, // Constitution Memorial Day
                `${year}-05-04`, // Greenery Day
                `${year}-05-05`, // Children's Day
                `${year}-07-15`, // Marine Day (approximate)
                `${year}-08-11`, // Mountain Day
                `${year}-09-16`, // Respect for the Aged Day (approximate)
                `${year}-09-23`, // Autumnal Equinox Day (approximate)
                `${year}-10-14`, // Health and Sports Day (approximate)
                `${year}-11-03`, // Culture Day
                `${year}-11-23`, // Labor Thanksgiving Day
                `${year}-12-23`  // Emperor's Birthday
            ],
            'FR': [
                `${year}-01-01`, // New Year's Day
                `${year}-04-22`, // Easter Monday (approximate)
                `${year}-05-01`, // Labor Day
                `${year}-05-30`, // Ascension Day (approximate)
                `${year}-06-10`, // Whit Monday (approximate)
                `${year}-07-14`, // Bastille Day
                `${year}-08-15`, // Assumption Day
                `${year}-11-01`, // All Saints' Day
                `${year}-11-11`, // Armistice Day
                `${year}-12-25`  // Christmas
            ],
            'CA': [
                `${year}-01-01`, // New Year's Day
                `${year}-03-29`, // Good Friday (approximate)
                `${year}-05-20`, // Victoria Day (approximate)
                `${year}-07-01`, // Canada Day
                `${year}-09-02`, // Labor Day (approximate)
                `${year}-10-14`, // Thanksgiving (approximate)
                `${year}-11-11`, // Remembrance Day
                `${year}-12-25`  // Christmas
            ],
            'AU': [
                `${year}-01-01`, // New Year's Day
                `${year}-01-26`, // Australia Day
                `${year}-03-29`, // Good Friday (approximate)
                `${year}-04-01`, // Easter Monday (approximate)
                `${year}-04-25`, // ANZAC Day
                `${year}-06-10`, // Queen's Birthday (approximate)
                `${year}-12-25`, // Christmas
                `${year}-12-26`  // Boxing Day
            ]
        };
        
        return holidays[country] || [];
    }

    suggestVacationPeriods(startDate, endDate, vacationDays, holidays) {
        const suggestions = [];
        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        
        // Strategy 1: Long weekends
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dayOfWeek = d.getDay();
            if (dayOfWeek === 1 || dayOfWeek === 5) { // Monday or Friday
                const longWeekendDays = this.calculateLongWeekendDays(d, holidays);
                if (longWeekendDays >= vacationDays) {
                    suggestions.push({
                        period: `${d.toDateString()} (Long Weekend)`,
                        description: `Extend weekend with ${vacationDays} vacation days`,
                        workingDays: longWeekendDays,
                        efficiency: 100
                    });
                    break;
                }
            }
        }
        
        // Strategy 2: Bridge holidays
        holidays.forEach(holiday => {
            const holidayDate = new Date(holiday);
            const dayOfWeek = holidayDate.getDay();
            if (dayOfWeek >= 2 && dayOfWeek <= 4) { // Tuesday to Thursday
                const bridgeDays = this.calculateBridgeDays(holidayDate, vacationDays, holidays);
                if (bridgeDays >= vacationDays) {
                    suggestions.push({
                        period: `${holidayDate.toDateString()} (Bridge Holiday)`,
                        description: `Bridge holiday with ${vacationDays} vacation days`,
                        workingDays: bridgeDays,
                        efficiency: 100
                    });
                }
            }
        });
        
        // Strategy 3: Optimal working days
        const optimalPeriod = this.findOptimalPeriod(startDate, endDate, vacationDays, holidays);
        if (optimalPeriod) {
            suggestions.push({
                period: optimalPeriod.start.toDateString() + ' - ' + optimalPeriod.end.toDateString(),
                description: `Optimal ${vacationDays}-day vacation period`,
                workingDays: optimalPeriod.workingDays,
                efficiency: optimalPeriod.efficiency
            });
        }
        
        return suggestions.slice(0, 3); // Return top 3 suggestions
    }

    calculateLongWeekendDays(startDate, holidays) {
        let workingDays = 0;
        for (let i = 0; i < 5; i++) {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            const dayOfWeek = d.getDay();
            const dateStr = d.toISOString().split('T')[0];
            
            if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holidays.includes(dateStr)) {
                workingDays++;
            }
        }
        return workingDays;
    }

    calculateBridgeDays(holidayDate, vacationDays, holidays) {
        // Calculate days needed to bridge to weekend
        const dayOfWeek = holidayDate.getDay();
        const daysToWeekend = dayOfWeek === 2 ? 3 : dayOfWeek === 3 ? 2 : dayOfWeek === 4 ? 1 : 0;
        
        if (daysToWeekend <= vacationDays) {
            return daysToWeekend + 2; // Include weekend
        }
        return 0;
    }

    findOptimalPeriod(startDate, endDate, vacationDays, holidays) {
        let bestPeriod = null;
        let bestEfficiency = 0;
        
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const periodEnd = new Date(d);
            periodEnd.setDate(periodEnd.getDate() + vacationDays - 1);
            
            if (periodEnd > endDate) break;
            
            let workingDays = 0;
            for (let checkDate = new Date(d); checkDate <= periodEnd; checkDate.setDate(checkDate.getDate() + 1)) {
                const dayOfWeek = checkDate.getDay();
                const dateStr = checkDate.toISOString().split('T')[0];
                
                if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holidays.includes(dateStr)) {
                    workingDays++;
                }
            }
            
            const efficiency = workingDays / vacationDays * 100;
            if (efficiency > bestEfficiency) {
                bestEfficiency = efficiency;
                bestPeriod = {
                    start: new Date(d),
                    end: periodEnd,
                    workingDays: workingDays,
                    efficiency: efficiency.toFixed(1)
                };
            }
        }
        
        return bestPeriod;
    }

    displayHolidayResults(resultData) {
        const { optimizedDays, totalDays, weekendDays, holidayDays, workingDays, efficiency, remainingDays, suggestions } = resultData;
        
        document.getElementById('optimized-days').textContent = optimizedDays;
        document.getElementById('total-days').textContent = totalDays;
        document.getElementById('weekends').textContent = weekendDays;
        document.getElementById('holidays').textContent = holidayDays;
        document.getElementById('working-days').textContent = workingDays;
        document.getElementById('efficiency').textContent = efficiency + '%';
        document.getElementById('remaining-days').textContent = remainingDays;
        
        // Display suggestions
        const suggestionsHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item">
                <strong>${suggestion.period}</strong>: ${suggestion.description}
                <br><small>Working days: ${suggestion.workingDays}, Efficiency: ${suggestion.efficiency}%</small>
            </div>`
        ).join('');
        
        document.getElementById('vacation-suggestions').innerHTML = suggestionsHTML;
        document.getElementById('holiday-optimizer-result').style.display = 'block';
    }

    // Global function to update unit options based on conversion type
    updateUnitOptions() {
        const conversionType = document.getElementById('conversion-type').value;
        const fromUnitSelect = document.getElementById('from-unit');
        const toUnitSelect = document.getElementById('to-unit');
        
        // Clear existing options
        fromUnitSelect.innerHTML = '';
        toUnitSelect.innerHTML = '';
        
        // Cache unit definitions for better performance
        const unitDefinitions = {
            length: [
                { value: 'meter', text: 'Meter', i18n: 'unit_converter.meter' },
                { value: 'kilometer', text: 'Kilometer', i18n: 'unit_converter.kilometer' },
                { value: 'centimeter', text: 'Centimeter', i18n: 'unit_converter.centimeter' },
                { value: 'millimeter', text: 'Millimeter', i18n: 'unit_converter.millimeter' },
                { value: 'inch', text: 'Inch', i18n: 'unit_converter.inch' },
                { value: 'foot', text: 'Foot', i18n: 'unit_converter.foot' },
                { value: 'yard', text: 'Yard', i18n: 'unit_converter.yard' },
                { value: 'mile', text: 'Mile', i18n: 'unit_converter.mile' },
                { value: 'nautical_mile', text: 'Nautical Mile', i18n: 'unit_converter.nautical_mile' }
            ],
            weight: [
                { value: 'gram', text: 'Gram', i18n: 'unit_converter.gram' },
                { value: 'kilogram', text: 'Kilogram', i18n: 'unit_converter.kilogram' },
                { value: 'pound', text: 'Pound', i18n: 'unit_converter.pound' },
                { value: 'ounce', text: 'Ounce', i18n: 'unit_converter.ounce' },
                { value: 'ton', text: 'Ton', i18n: 'unit_converter.ton' },
                { value: 'stone', text: 'Stone', i18n: 'unit_converter.stone' }
            ],
            area: [
                { value: 'square_meter', text: 'Square Meter', i18n: 'unit_converter.square_meter' },
                { value: 'square_kilometer', text: 'Square Kilometer', i18n: 'unit_converter.square_kilometer' },
                { value: 'square_centimeter', text: 'Square Centimeter', i18n: 'unit_converter.square_centimeter' },
                { value: 'square_inch', text: 'Square Inch', i18n: 'unit_converter.square_inch' },
                { value: 'square_foot', text: 'Square Foot', i18n: 'unit_converter.square_foot' },
                { value: 'square_yard', text: 'Square Yard', i18n: 'unit_converter.square_yard' },
                { value: 'acre', text: 'Acre', i18n: 'unit_converter.acre' },
                { value: 'hectare', text: 'Hectare', i18n: 'unit_converter.hectare' }
            ],
            volume: [
                { value: 'liter', text: 'Liter', i18n: 'unit_converter.liter' },
                { value: 'milliliter', text: 'Milliliter', i18n: 'unit_converter.milliliter' },
                { value: 'cubic_meter', text: 'Cubic Meter', i18n: 'unit_converter.cubic_meter' },
                { value: 'cubic_centimeter', text: 'Cubic Centimeter', i18n: 'unit_converter.cubic_centimeter' },
                { value: 'gallon', text: 'Gallon', i18n: 'unit_converter.gallon' },
                { value: 'quart', text: 'Quart', i18n: 'unit_converter.quart' },
                { value: 'pint', text: 'Pint', i18n: 'unit_converter.pint' },
                { value: 'cup', text: 'Cup', i18n: 'unit_converter.cup' },
                { value: 'fluid_ounce', text: 'Fluid Ounce', i18n: 'unit_converter.fluid_ounce' }
            ],
            time: [
                { value: 'second', text: 'Second', i18n: 'unit_converter.second' },
                { value: 'minute', text: 'Minute', i18n: 'unit_converter.minute' },
                { value: 'hour', text: 'Hour', i18n: 'unit_converter.hour' },
                { value: 'day', text: 'Day', i18n: 'unit_converter.day' },
                { value: 'week', text: 'Week', i18n: 'unit_converter.week' },
                { value: 'month', text: 'Month', i18n: 'unit_converter.month' },
                { value: 'year', text: 'Year', i18n: 'unit_converter.year' }
            ],
            speed: [
                { value: 'mps', text: 'Meters per Second', i18n: 'unit_converter.mps' },
                { value: 'kmh', text: 'Kilometers per Hour', i18n: 'unit_converter.kmh' },
                { value: 'mph', text: 'Miles per Hour', i18n: 'unit_converter.mph' },
                { value: 'knot', text: 'Knot', i18n: 'unit_converter.knot' },
                { value: 'fps', text: 'Feet per Second', i18n: 'unit_converter.fps' }
            ],
            temperature: [
                { value: 'celsius', text: 'Celsius', i18n: 'unit_converter.celsius' },
                { value: 'fahrenheit', text: 'Fahrenheit', i18n: 'unit_converter.fahrenheit' },
                { value: 'kelvin', text: 'Kelvin', i18n: 'unit_converter.kelvin' }
            ]
        };
        
        const units = unitDefinitions[conversionType] || [];
        
        // Add options to both selects with i18n support
        units.forEach(unit => {
            const fromOption = document.createElement('option');
            fromOption.value = unit.value;
            fromOption.setAttribute('data-i18n', unit.i18n);
            fromOption.textContent = window.i18n ? window.i18n.t(unit.i18n) : unit.text;
            fromUnitSelect.appendChild(fromOption);
            
            const toOption = document.createElement('option');
            toOption.value = unit.value;
            toOption.setAttribute('data-i18n', unit.i18n);
            toOption.textContent = window.i18n ? window.i18n.t(unit.i18n) : unit.text;
            toUnitSelect.appendChild(toOption);
        });
    }

    convertTemperature(value, fromUnit, toUnit) {
        // Convert to Celsius first
        let celsius;
        switch (fromUnit) {
            case 'celsius':
                celsius = value;
                break;
            case 'fahrenheit':
                celsius = (value - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = value - 273.15;
                break;
            default:
                celsius = value;
        }
        
        // Convert from Celsius to target unit
        switch (toUnit) {
            case 'celsius':
                return celsius;
            case 'fahrenheit':
                return (celsius * 9/5) + 32;
            case 'kelvin':
                return celsius + 273.15;
            default:
                return celsius;
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
                    const labelEl = filingStatusGroup.querySelector('label');
                    if (labelEl) {
                        labelEl.setAttribute('data-i18n', 'salary.filing_status');
                        labelEl.textContent = window.i18n ? window.i18n.t('salary.filing_status') : 'Filing Status (US)';
                    }
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
                    const msg = window.i18n ? window.i18n.t('alert.tax_config_not_loaded') : 'Tax configuration not loaded. Please refresh the page.';
                    alert(msg);
                    return;
                }

                // Calculate salary using the tax configuration system
                const result = window.taxConfig.calculateSalaryTax(grossSalary, selectedRegion, filingStatus);
                
                if (!result) {
                    const msg = window.i18n ? window.i18n.t('alert.calc_unavailable_region') : 'Unable to calculate for selected region. Please try again.';
                    alert(msg);
                    return;
                }

                // Display results
                document.getElementById('net-salary').textContent = `${result.currency}${result.netSalary.toLocaleString()}`;
                
                // Create tax breakdown
                let breakdownHeader = window.i18n ? window.i18n.t('salary.tax_breakdown') : 'Tax Breakdown:';
                let breakdownHTML = `<h4>${breakdownHeader}</h4>`;
                for (const [key, value] of Object.entries(result.breakdown)) {
                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    breakdownHTML += `<div><strong>${label}:</strong> ${result.currency}${value.toFixed(2)}</div>`;
                }
                const totalTaxLabel = window.i18n ? window.i18n.t('salary.total_tax') : 'Total Tax';
                breakdownHTML += `<div style="border-top: 1px solid #ddd; margin-top: 10px; padding-top: 10px;"><strong>${totalTaxLabel}: ${result.currency}${result.totalTax.toFixed(2)} (${result.effectiveRate.toFixed(2)}%)</strong></div>`;
                
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
            label.setAttribute('data-i18n', 'percentage.percentage');
            label.textContent = window.i18n ? window.i18n.t('percentage.percentage') : 'Percentage (%)';
            input.placeholder = '25';
        } else if (type === 'what-percent') {
            label.setAttribute('data-i18n', 'field.value');
            label.textContent = window.i18n ? window.i18n.t('field.value') : 'Value';
            input.placeholder = '25';
        } else if (type === 'percent-change') {
            label.setAttribute('data-i18n', 'percentage.new_value');
            label.textContent = window.i18n ? window.i18n.t('percentage.new_value') : 'New Value';
            input.placeholder = '125';
        }
    }

    updateUnitOptions() {
        const conversionType = document.getElementById('conversion-type').value;
        const fromUnit = document.getElementById('from-unit');
        const toUnit = document.getElementById('to-unit');

        const units = {
            length: [
                { value: 'm', text: 'Meters', i18n: 'unit.meters' },
                { value: 'ft', text: 'Feet', i18n: 'unit.feet' },
                { value: 'in', text: 'Inches', i18n: 'unit.inches' },
                { value: 'cm', text: 'Centimeters', i18n: 'unit.centimeters' },
                { value: 'km', text: 'Kilometers', i18n: 'unit.kilometers' },
                { value: 'mi', text: 'Miles', i18n: 'unit.miles' }
            ],
            weight: [
                { value: 'kg', text: 'Kilograms', i18n: 'unit.kilograms' },
                { value: 'lb', text: 'Pounds', i18n: 'unit.pounds' },
                { value: 'g', text: 'Grams', i18n: 'unit.grams' },
                { value: 'oz', text: 'Ounces', i18n: 'unit.ounces' },
                { value: 't', text: 'Tonnes', i18n: 'unit.tonnes' }
            ],
            temperature: [
                { value: 'c', text: 'Celsius', i18n: 'unit.celsius' },
                { value: 'f', text: 'Fahrenheit', i18n: 'unit.fahrenheit' },
                { value: 'k', text: 'Kelvin', i18n: 'unit.kelvin' }
            ]
        };

        if (units[conversionType]) {
            fromUnit.innerHTML = '';
            toUnit.innerHTML = '';
            
            units[conversionType].forEach(unit => {
                const fromOption = document.createElement('option');
                fromOption.value = unit.value;
                fromOption.setAttribute('data-i18n', unit.i18n);
                fromOption.textContent = window.i18n ? window.i18n.t(unit.i18n) : unit.text;
                fromUnit.appendChild(fromOption);
                
                const toOption = document.createElement('option');
                toOption.value = unit.value;
                toOption.setAttribute('data-i18n', unit.i18n);
                toOption.textContent = window.i18n ? window.i18n.t(unit.i18n) : unit.text;
                toUnit.appendChild(toOption);
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
                    <label for="loan-region" data-i18n="field.currency">Currency</label>
                    <select id="loan-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="loan-principal" data-i18n="mortgage.loan_amount">Loan Amount</label>
                    <input type="number" id="loan-principal" placeholder="25000" required>
                    <small class="currency-label" data-i18n="placeholder.amount_selected">Amount in selected currency</small>
                </div>
                <div class="form-group">
                    <label for="loan-interest" data-i18n="mortgage.interest_rate">Annual Interest Rate (%)</label>
                    <input type="number" id="loan-interest" placeholder="5.5" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="loan-years" data-i18n="mortgage.loan_term">Loan Term (years)</label>
                    <input type="number" id="loan-years" placeholder="5" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="mortgage.calculate_payment">Calculate Loan Payment</button>
            </form>
            <div id="loan-result" class="calc-result" style="display: none;">
                <div class="result-value" id="loan-payment"></div>
                <div class="result-label" data-i18n="mortgage.monthly_payment">Monthly Payment</div>
                <div class="mt-1">
                    <strong><span data-i18n="mortgage.total_interest">Total Interest</span>: <span id="loan-total-interest"></span></strong><br>
                    <strong><span data-i18n="mortgage.total_amount">Total Amount</span>: <span id="loan-total-amount"></span></strong><br>
                    <strong><span data-i18n="loan.apr">APR</span>: <span id="loan-apr"></span></strong>
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
                    <label for="investment-region" data-i18n="field.currency">Currency</label>
                    <select id="investment-region" required>
                        ${regionOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="initial-investment" data-i18n="investment.initial">Initial Investment</label>
                    <input type="number" id="initial-investment" placeholder="10000" required>
                    <small class="currency-label" data-i18n="placeholder.amount_selected">Amount in selected currency</small>
                </div>
                <div class="form-group">
                    <label for="monthly-contribution" data-i18n="investment.monthly">Monthly Contribution</label>
                    <input type="number" id="monthly-contribution" placeholder="500">
                    <small class="currency-label" data-i18n="placeholder.amount_selected">Amount in selected currency</small>
                </div>
                <div class="form-group">
                    <label for="annual-return" data-i18n="investment.annual_return">Expected Annual Return (%)</label>
                    <input type="number" id="annual-return" placeholder="7" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="investment-years" data-i18n="investment.period">Investment Period (years)</label>
                    <input type="number" id="investment-years" placeholder="10" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="investment.calculate">Calculate Investment Growth</button>
            </form>
            <div id="investment-result" class="calc-result" style="display: none;">
                <div class="result-value" id="final-amount"></div>
                <div class="result-label" data-i18n="investment.final_amount">Final Amount</div>
                <div class="mt-1">
                    <strong><span data-i18n="investment.total_contributions">Total Contributions</span>: <span id="total-contributions"></span></strong><br>
                    <strong><span data-i18n="investment.total_interest">Total Interest Earned</span>: <span id="total-interest-earned"></span></strong><br>
                    <strong><span data-i18n="investment.roi">Return on Investment</span>: <span id="roi-percentage"></span></strong>
                </div>
            </div>
        `;
    }

    getIncomeTaxCalculatorHTML() {
        return `
            <form class="calc-form" id="income-tax-form">
                <div class="form-group">
                    <label for="tax-region" data-i18n="tax.region">Tax Region</label>
                    <select id="tax-region" required>
                        <option value="us" data-i18n="region.us">United States</option>
                        <option value="ca" data-i18n="region.ca">Canada</option>
                        <option value="uk" data-i18n="region.uk">United Kingdom</option>
                        <option value="au" data-i18n="region.au">Australia</option>
                        <option value="de" data-i18n="region.de">Germany</option>
                        <option value="jp" data-i18n="region.jp">Japan</option>
                        <option value="cn" data-i18n="region.cn">China</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="annual-income" data-i18n="tax.annual_income">Annual Income</label>
                    <input type="number" id="annual-income" placeholder="75000" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div id="country-specific-fields">
                    <!-- US specific fields -->
                    <div id="us-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="filing-status" data-i18n="salary.filing_status">Filing Status</label>
                            <select id="filing-status">
                                <option value="single" data-i18n="filing.single">Single</option>
                                <option value="married-joint" data-i18n="filing.married_joint">Married Filing Jointly</option>
                                <option value="married-separate" data-i18n="filing.married_separate">Married Filing Separately</option>
                                <option value="head-household" data-i18n="filing.head_household">Head of Household</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="standard-deduction" data-i18n="tax.standard_deduction">Use Standard Deduction</label>
                            <select id="standard-deduction">
                                <option value="yes" data-i18n="tax.yes">Yes</option>
                                <option value="no" data-i18n="tax.no">No</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Canada specific fields -->
                    <div id="ca-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="province" data-i18n="tax.province">Province</label>
                            <select id="province">
                                <option value="ontario" data-i18n="province.ontario">Ontario</option>
                                <option value="quebec" data-i18n="province.quebec">Quebec</option>
                                <option value="bc" data-i18n="province.bc">British Columbia</option>
                                <option value="alberta" data-i18n="province.alberta">Alberta</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- UK specific fields -->
                    <div id="uk-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="tax-code" data-i18n="tax.tax_code">Tax Code</label>
                            <input type="text" id="tax-code" placeholder="1257L">
                        </div>
                    </div>
                    
                    <!-- Germany specific fields -->
                    <div id="de-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="tax-class" data-i18n="tax.tax_class">Tax Class</label>
                            <select id="tax-class">
                                <option value="1" data-i18n="tax_class.single">Single</option>
                                <option value="2" data-i18n="tax_class.single_parent">Single Parent</option>
                                <option value="3" data-i18n="tax_class.married">Married (higher earner)</option>
                                <option value="4" data-i18n="tax_class.married_equal">Married (equal income)</option>
                                <option value="5" data-i18n="tax_class.married_lower">Married (lower earner)</option>
                                <option value="6" data-i18n="tax_class.second_job">Second Job</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" class="calc-button" data-i18n="tax.calculate">Calculate Income Tax</button>
            </form>
            <div id="income-tax-result" class="calc-result" style="display: none;">
                <div class="result-value" id="total-tax"></div>
                <div class="result-label" data-i18n="tax.total_federal">Total Federal Tax</div>
                <div class="mt-1">
                    <strong><span data-i18n="tax.effective_rate">Effective Tax Rate</span>: <span id="effective-rate"></span></strong><br>
                    <strong><span data-i18n="tax.after_tax_income">After-Tax Income</span>: <span id="after-tax-income"></span></strong><br>
                    <strong><span data-i18n="tax.monthly_take_home">Monthly Take-Home</span>: <span id="monthly-take-home"></span></strong>
                </div>
            </div>
        `;
    }

    setupIncomeTaxCalculator() {
        console.log('Setting up income tax calculator...');
        const form = document.getElementById('income-tax-form');
        if (form) {
            console.log('Income tax form found');
            // Handle country selection change
            const taxRegionSelect = document.getElementById('tax-region');
            if (taxRegionSelect) {
                console.log('Income tax region selector found');
                taxRegionSelect.addEventListener('change', (e) => {
                    console.log('Income tax region changed to:', e.target.value);
                    this.updateTaxFormFields(e.target.value);
                });
                // Initialize with US fields
                console.log('Initializing income tax with US fields');
                setTimeout(() => {
                    this.updateTaxFormFields('us');
                }, 100);
            } else {
                console.log('Income tax region selector NOT found');
            }

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const region = document.getElementById('tax-region').value;
                const income = parseFloat(document.getElementById('annual-income').value);
                
                if (income <= 0) {
                    alert('Please enter a valid income amount');
                    return;
                }
                
                const result = this.calculateIncomeTax(region, income);
                this.displayTaxResults(result, region);
            });
        }
    }

    updateTaxFormFields(country) {
        console.log('Updating income tax fields for country:', country);
        
        // Hide all country-specific fields
        document.querySelectorAll('.country-fields').forEach(field => {
            field.style.display = 'none';
        });
        
        // Show fields for selected country
        const countryFields = document.getElementById(country + '-fields');
        console.log('Country fields element:', countryFields);
        if (countryFields) {
            countryFields.style.display = 'block';
            console.log('Showing income tax fields for:', country);
        } else {
            console.log('No income tax fields found for country:', country);
        }
    }

    calculateIncomeTax(country, income) {
        switch (country) {
            case 'us':
                return this.calculateUSTax(income);
            case 'ca':
                return this.calculateCanadaTax(income);
            case 'uk':
                return this.calculateUKTax(income);
            case 'de':
                return this.calculateGermanyTax(income);
            case 'au':
                return this.calculateAustraliaTax(income);
            case 'jp':
                return this.calculateJapanTax(income);
            case 'cn':
                return this.calculateChinaTax(income);
            default:
                return this.calculateUSTax(income);
        }
    }

    calculateUSTax(income) {
        const filingStatus = document.getElementById('filing-status')?.value || 'single';
        const useStandardDeduction = document.getElementById('standard-deduction')?.value === 'yes';
        
        // 2024 US Tax Brackets (simplified)
        const brackets = {
            'single': [
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
        
        const standardDeduction = filingStatus === 'single' ? 13850 : 27700;
        const taxableIncome = useStandardDeduction ? Math.max(0, income - standardDeduction) : income;
        
        let tax = 0;
        const applicableBrackets = brackets[filingStatus] || brackets['single'];
        
        for (const bracket of applicableBrackets) {
            if (taxableIncome > bracket.min) {
                const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
                tax += taxableInBracket * bracket.rate;
            }
        }
        
        return {
            totalTax: tax,
            effectiveRate: (tax / income) * 100,
            afterTaxIncome: income - tax,
            monthlyTakeHome: (income - tax) / 12,
            currency: '$'
        };
    }

    calculateCanadaTax(income) {
        // Simplified Canada tax calculation
        const federalTax = this.calculateCanadaFederalTax(income);
        const province = document.getElementById('province')?.value || 'ontario';
        const provincialTax = this.calculateCanadaProvincialTax(income, province);
        
        const totalTax = federalTax + provincialTax;
        
        return {
            totalTax: totalTax,
            effectiveRate: (totalTax / income) * 100,
            afterTaxIncome: income - totalTax,
            monthlyTakeHome: (income - totalTax) / 12,
            currency: 'C$'
        };
    }

    calculateCanadaFederalTax(income) {
        // 2024 Canada Federal Tax Brackets
        const brackets = [
            { min: 0, max: 55867, rate: 0.15 },
            { min: 55867, max: 111733, rate: 0.205 },
            { min: 111733, max: 173205, rate: 0.26 },
            { min: 173205, max: 246752, rate: 0.29 },
            { min: 246752, max: Infinity, rate: 0.33 }
        ];
        
        let tax = 0;
        for (const bracket of brackets) {
            if (income > bracket.min) {
                const taxableInBracket = Math.min(income, bracket.max) - bracket.min;
                tax += taxableInBracket * bracket.rate;
            }
        }
        return tax;
    }

    calculateCanadaProvincialTax(income, province) {
        // Simplified provincial tax rates
        const rates = {
            'ontario': 0.0505,
            'quebec': 0.14,
            'bc': 0.0506,
            'alberta': 0.10
        };
        
        const rate = rates[province] || 0.10;
        return income * rate;
    }

    calculateUKTax(income) {
        // UK tax calculation (simplified)
        const personalAllowance = 12570; // 2024-25
        const taxableIncome = Math.max(0, income - personalAllowance);
        
        let tax = 0;
        if (taxableIncome > 0) {
            const basicRate = Math.min(taxableIncome, 37700) * 0.20;
            const higherRate = Math.max(0, Math.min(taxableIncome - 37700, 100000)) * 0.40;
            const additionalRate = Math.max(0, taxableIncome - 125140) * 0.45;
            
            tax = basicRate + higherRate + additionalRate;
        }
        
        return {
            totalTax: tax,
            effectiveRate: (tax / income) * 100,
            afterTaxIncome: income - tax,
            monthlyTakeHome: (income - tax) / 12,
            currency: '£'
        };
    }

    calculateGermanyTax(income) {
        // Germany tax calculation (simplified)
        const taxClass = document.getElementById('tax-class')?.value || '1';
        const tax = income * 0.30; // Simplified 30% rate
        
        return {
            totalTax: tax,
            effectiveRate: 30,
            afterTaxIncome: income - tax,
            monthlyTakeHome: (income - tax) / 12,
            currency: '€'
        };
    }

    calculateAustraliaTax(income) {
        // Australia tax calculation (simplified)
        const tax = income * 0.25; // Simplified 25% rate
        
        return {
            totalTax: tax,
            effectiveRate: 25,
            afterTaxIncome: income - tax,
            monthlyTakeHome: (income - tax) / 12,
            currency: 'A$'
        };
    }

    calculateJapanTax(income) {
        // Japan tax calculation (simplified)
        const tax = income * 0.20; // Simplified 20% rate
        
        return {
            totalTax: tax,
            effectiveRate: 20,
            afterTaxIncome: income - tax,
            monthlyTakeHome: (income - tax) / 12,
            currency: '¥'
        };
    }

    calculateChinaTax(income) {
        // China tax calculation (simplified)
        const tax = income * 0.15; // Simplified 15% rate
        
        return {
            totalTax: tax,
            effectiveRate: 15,
            afterTaxIncome: income - tax,
            monthlyTakeHome: (income - tax) / 12,
            currency: '¥'
        };
    }

    displayTaxResults(result, region) {
        document.getElementById('total-tax').textContent = formatCurrency(result.totalTax, result.currency);
        document.getElementById('effective-rate').textContent = result.effectiveRate.toFixed(2) + '%';
        document.getElementById('after-tax-income').textContent = formatCurrency(result.afterTaxIncome, result.currency);
        document.getElementById('monthly-take-home').textContent = formatCurrency(result.monthlyTakeHome, result.currency);
        document.getElementById('income-tax-result').style.display = 'block';
    }

    setupSalesTaxCalculator() {
        const form = document.getElementById('sales-tax-form');
        if (form) {
            // Handle country selection change
            const taxRegionSelect = document.getElementById('sales-tax-region');
            if (taxRegionSelect) {
                taxRegionSelect.addEventListener('change', (e) => {
                    this.updateSalesTaxFormFields(e.target.value);
                });
                // Initialize with US fields
                this.updateSalesTaxFormFields('us');
            }

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const region = document.getElementById('sales-tax-region').value;
                const amount = parseFloat(document.getElementById('purchase-amount').value);
                const method = document.getElementById('calculation-method').value;
                
                if (amount <= 0) {
                    alert('Please enter a valid amount');
                    return;
                }
                
                const result = this.calculateSalesTax(region, amount, method);
                this.displaySalesTaxResults(result, region);
            });
        }
    }

    updateSalesTaxFormFields(country) {
        // Hide all country-specific fields
        document.querySelectorAll('#sales-country-specific-fields .country-fields').forEach(field => {
            field.style.display = 'none';
        });
        
        // Show fields for selected country
        const countryFields = document.getElementById('sales-' + country + '-fields');
        if (countryFields) {
            countryFields.style.display = 'block';
        }
    }

    calculateSalesTax(country, amount, method) {
        let taxRate = 0;
        let currency = '$';
        
        switch (country) {
            case 'us':
                const state = document.getElementById('state')?.value || 'california';
                taxRate = this.getUSTaxRate(state);
                currency = '$';
                break;
            case 'ca':
                const province = document.getElementById('sales-province')?.value || 'ontario';
                taxRate = this.getCanadaTaxRate(province);
                currency = 'C$';
                break;
            case 'uk':
                taxRate = parseFloat(document.getElementById('vat-rate')?.value || '20');
                currency = '£';
                break;
            case 'de':
                taxRate = parseFloat(document.getElementById('mwst-rate')?.value || '19');
                currency = '€';
                break;
            case 'au':
                taxRate = 10; // GST
                currency = 'A$';
                break;
            case 'jp':
                taxRate = 10; // Consumption tax
                currency = '¥';
                break;
            case 'cn':
                taxRate = 13; // VAT
                currency = '¥';
                break;
        }
        
        let taxAmount, totalAmount, subtotal;
        
        if (method === 'add-tax') {
            taxAmount = amount * (taxRate / 100);
            totalAmount = amount + taxAmount;
            subtotal = amount;
        } else {
            // Reverse calculation
            totalAmount = amount;
            subtotal = amount / (1 + taxRate / 100);
            taxAmount = totalAmount - subtotal;
        }
        
        return {
            taxAmount: taxAmount,
            subtotal: subtotal,
            totalAmount: totalAmount,
            currency: currency
        };
    }

    getUSTaxRate(state) {
        const rates = {
            'california': 7.25,
            'texas': 6.25,
            'florida': 6.0,
            'new-york': 8.0
        };
        return rates[state] || 7.0;
    }

    getCanadaTaxRate(province) {
        const rates = {
            'ontario': 13,
            'quebec': 14.975,
            'bc': 12,
            'alberta': 5
        };
        return rates[province] || 13;
    }

    displaySalesTaxResults(result, region) {
        document.getElementById('tax-amount').textContent = formatCurrency(result.taxAmount, result.currency);
        document.getElementById('subtotal').textContent = formatCurrency(result.subtotal, result.currency);
        document.getElementById('total-with-tax').textContent = formatCurrency(result.totalAmount, result.currency);
        document.getElementById('sales-tax-result').style.display = 'block';
    }

    setupSelfEmploymentTaxCalculator() {
        const form = document.getElementById('self-employment-form');
        if (form) {
            // Handle country selection change
            const taxRegionSelect = document.getElementById('se-tax-region');
            if (taxRegionSelect) {
                taxRegionSelect.addEventListener('change', (e) => {
                    this.updateSelfEmploymentTaxFormFields(e.target.value);
                });
                // Initialize with US fields
                this.updateSelfEmploymentTaxFormFields('us');
            }

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const region = document.getElementById('se-tax-region').value;
                const earnings = parseFloat(document.getElementById('net-earnings').value);
                
                if (earnings <= 0) {
                    alert('Please enter valid earnings');
                    return;
                }
                
                const result = this.calculateSelfEmploymentTax(region, earnings);
                this.displaySelfEmploymentTaxResults(result, region);
            });
        }
    }

    updateSelfEmploymentTaxFormFields(country) {
        // Hide all country-specific fields
        document.querySelectorAll('#se-country-specific-fields .country-fields').forEach(field => {
            field.style.display = 'none';
        });
        
        // Show fields for selected country
        const countryFields = document.getElementById('se-' + country + '-fields');
        if (countryFields) {
            countryFields.style.display = 'block';
        }
    }

    calculateSelfEmploymentTax(country, earnings) {
        let totalTax = 0;
        let currency = '$';
        
        switch (country) {
            case 'us':
                // US Self-Employment Tax: 15.3% (12.4% Social Security + 2.9% Medicare)
                totalTax = earnings * 0.153;
                currency = '$';
                break;
            case 'ca':
                // Canada CPP: 5.95% (2024)
                totalTax = earnings * 0.0595;
                currency = 'C$';
                break;
            case 'uk':
                // UK Class 2: £3.45/week, Class 4: 9% on profits £12,570-£50,270
                totalTax = earnings * 0.09;
                currency = '£';
                break;
            case 'de':
                // Germany: Simplified 30% rate
                totalTax = earnings * 0.30;
                currency = '€';
                break;
            case 'au':
                // Australia: Simplified 25% rate
                totalTax = earnings * 0.25;
                currency = 'A$';
                break;
            case 'jp':
                // Japan: Simplified 20% rate
                totalTax = earnings * 0.20;
                currency = '¥';
                break;
            case 'cn':
                // China: Simplified 15% rate
                totalTax = earnings * 0.15;
                currency = '¥';
                break;
        }
        
        return {
            totalTax: totalTax,
            currency: currency
        };
    }

    displaySelfEmploymentTaxResults(result, region) {
        document.getElementById('se-tax').textContent = formatCurrency(result.totalTax, result.currency);
        document.getElementById('ss-tax').textContent = formatCurrency(result.totalTax * 0.8, result.currency);
        document.getElementById('medicare-tax').textContent = formatCurrency(result.totalTax * 0.2, result.currency);
        document.getElementById('quarterly-payment').textContent = formatCurrency(result.totalTax / 4, result.currency);
        document.getElementById('self-employment-result').style.display = 'block';
    }

    setupPropertyTaxCalculator() {
        console.log('=== setupPropertyTaxCalculator START ===');
        
        // Wait for DOM to be ready, then set up event handlers
        setTimeout(() => {
            console.log('Setting up property tax event handlers...');
            
            const taxRegionSelect = document.getElementById('property-tax-region');
            console.log('Looking for property-tax-region:', taxRegionSelect);
            
            if (taxRegionSelect) {
                console.log('✅ Found property tax region selector');
                
                // Use onchange instead of addEventListener
                taxRegionSelect.onchange = function(e) {
                    console.log('🔄 COUNTRY CHANGED TO:', e.target.value);
                    window.fullCalApp.updatePropertyTaxFormFields(e.target.value);
                };
                
                // Initialize with US fields
                console.log('Initializing with US fields...');
                this.updatePropertyTaxFormFields('us');
                
            } else {
                console.log('❌ Could not find property-tax-region element');
                console.log('Available selects:');
                document.querySelectorAll('select').forEach((select, i) => {
                    console.log(`  ${i}: ${select.id || 'no-id'}`);
                });
            }
        }, 300);
        
        const form = document.getElementById('property-tax-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const region = document.getElementById('property-tax-region').value;
                const homeValue = parseFloat(document.getElementById('home-value').value);
                
                if (homeValue <= 0) {
                    alert('Please enter a valid home value');
                    return;
                }
                
                const result = this.calculatePropertyTax(region, homeValue);
                this.displayPropertyTaxResults(result, region);
            });
        }
    }

    updatePropertyTaxFormFields(country) {
        console.log('Updating property tax fields for country:', country);
        
        // Hide all country-specific fields
        const allFields = document.querySelectorAll('#property-country-specific-fields .country-fields');
        console.log('Found', allFields.length, 'country field groups');
        allFields.forEach((field, index) => {
            console.log(`Hiding field ${index}:`, field.id);
            field.style.display = 'none';
        });
        
        // Show fields for selected country
        const countryFields = document.getElementById('property-' + country + '-fields');
        console.log('Looking for element with ID: property-' + country + '-fields');
        console.log('Country fields element:', countryFields);
        if (countryFields) {
            countryFields.style.display = 'block';
            console.log('Successfully showing fields for:', country);
            
            // Update translations for newly displayed fields
            if (window.i18n) {
                setTimeout(() => {
                    window.i18n.updatePageContent();
                }, 100);
            }
        } else {
            console.log('No fields found for country:', country);
            // Let's see what fields are actually available
            const availableFields = document.querySelectorAll('#property-country-specific-fields [id*="-fields"]');
            console.log('Available field IDs:');
            availableFields.forEach(field => {
                console.log('-', field.id);
            });
        }
    }

    calculatePropertyTax(country, homeValue) {
        console.log('Calculating property tax for country:', country, 'homeValue:', homeValue);
        
        let annualTax = 0;
        let currency = '$';
        let assessedValue = homeValue;
        
        if (isNaN(homeValue) || homeValue <= 0) {
            console.log('Invalid home value:', homeValue);
            return {
                annualTax: 0,
                assessedValue: 0,
                monthlyEscrow: 0,
                effectiveRate: 0,
                currency: '$'
            };
        }
        
        switch (country) {
            case 'us':
                const assessmentRate = parseFloat(document.getElementById('assessment-rate')?.value || '80');
                const millRate = parseFloat(document.getElementById('mill-rate')?.value || '15.5');
                const exemptions = parseFloat(document.getElementById('exemptions')?.value || '0');
                
                assessedValue = homeValue * (assessmentRate / 100);
                annualTax = (assessedValue - exemptions) * (millRate / 1000);
                currency = '$';
                break;
            case 'ca':
                // Canada: Simplified 1% rate
                annualTax = homeValue * 0.01;
                currency = 'C$';
                break;
            case 'uk':
                // UK Council Tax: Simplified calculation
                annualTax = homeValue * 0.005; // 0.5% of value
                currency = '£';
                break;
            case 'au':
                // Australia: Simplified 0.5% rate
                annualTax = homeValue * 0.005;
                currency = 'A$';
                break;
            case 'de':
                // Germany: Simplified 0.3% rate
                annualTax = homeValue * 0.003;
                currency = '€';
                break;
            case 'jp':
                // Japan: Simplified 0.2% rate
                annualTax = homeValue * 0.002;
                currency = '¥';
                break;
            default:
                console.log('Unknown country:', country);
                annualTax = homeValue * 0.01; // Default 1%
                currency = '$';
        }
        
        console.log('Calculated result:', {
            annualTax,
            assessedValue,
            monthlyEscrow: annualTax / 12,
            effectiveRate: (annualTax / homeValue) * 100,
            currency
        });
        
        return {
            annualTax: annualTax,
            assessedValue: assessedValue,
            monthlyEscrow: annualTax / 12,
            effectiveRate: (annualTax / homeValue) * 100,
            currency: currency
        };
    }

    displayPropertyTaxResults(result, region) {
        document.getElementById('annual-property-tax').textContent = formatCurrency(result.annualTax, result.currency);
        document.getElementById('assessed-value').textContent = formatCurrency(result.assessedValue, result.currency);
        document.getElementById('monthly-escrow').textContent = formatCurrency(result.monthlyEscrow, result.currency);
        document.getElementById('effective-tax-rate').textContent = result.effectiveRate.toFixed(3) + '%';
        document.getElementById('property-tax-result').style.display = 'block';
    }

    getSalesTaxCalculatorHTML() {
        return `
            <form class="calc-form" id="sales-tax-form">
                <div class="form-group">
                    <label for="sales-tax-region" data-i18n="tax.region">Tax Region</label>
                    <select id="sales-tax-region" required>
                        <option value="us" data-i18n="region.us">United States</option>
                        <option value="ca" data-i18n="region.ca">Canada</option>
                        <option value="uk" data-i18n="region.uk">United Kingdom</option>
                        <option value="au" data-i18n="region.au">Australia</option>
                        <option value="de" data-i18n="region.de">Germany</option>
                        <option value="jp" data-i18n="region.jp">Japan</option>
                        <option value="cn" data-i18n="region.cn">China</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="purchase-amount" data-i18n="tax.purchase_amount">Purchase Amount</label>
                    <input type="number" id="purchase-amount" placeholder="100" step="0.01" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div id="sales-country-specific-fields">
                    <!-- US specific fields -->
                    <div id="sales-us-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="state" data-i18n="sales.state">State</label>
                            <select id="state">
                                <option value="california" data-i18n="state.california">California</option>
                                <option value="texas" data-i18n="state.texas">Texas</option>
                                <option value="florida" data-i18n="state.florida">Florida</option>
                                <option value="new-york" data-i18n="state.new_york">New York</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Canada specific fields -->
                    <div id="sales-ca-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="sales-province" data-i18n="tax.province">Province</label>
                            <select id="sales-province">
                                <option value="ontario" data-i18n="province.ontario">Ontario</option>
                                <option value="quebec" data-i18n="province.quebec">Quebec</option>
                                <option value="bc" data-i18n="province.bc">British Columbia</option>
                                <option value="alberta" data-i18n="province.alberta">Alberta</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- UK specific fields -->
                    <div id="sales-uk-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="vat-rate" data-i18n="sales.vat_rate">VAT Rate (%)</label>
                            <input type="number" id="vat-rate" placeholder="20" step="0.1">
                        </div>
                    </div>
                    
                    <!-- Germany specific fields -->
                    <div id="sales-de-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="mwst-rate" data-i18n="sales.mwst_rate">MwSt Rate (%)</label>
                            <input type="number" id="mwst-rate" placeholder="19" step="0.1">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="calculation-method" data-i18n="tax.calculation_method">Calculation Method</label>
                    <select id="calculation-method" required>
                        <option value="add-tax" data-i18n="tax.add_tax">Add Tax to Amount</option>
                        <option value="reverse-tax" data-i18n="tax.reverse_tax">Reverse Calculate (Tax Included)</option>
                    </select>
                </div>
                <button type="submit" class="calc-button" data-i18n="tax.calculate_sales">Calculate Sales Tax</button>
            </form>
            <div id="sales-tax-result" class="calc-result" style="display: none;">
                <div class="result-value" id="tax-amount"></div>
                <div class="result-label" data-i18n="tax.sales_tax">Sales Tax</div>
                <div class="mt-1">
                    <strong><span data-i18n="tax.subtotal">Subtotal</span>: <span id="subtotal"></span></strong><br>
                    <strong><span data-i18n="tax.total_with_tax">Total with Tax</span>: <span id="total-with-tax"></span></strong>
                </div>
            </div>
        `;
    }

    getSelfEmploymentTaxCalculatorHTML() {
        return `
            <form class="calc-form" id="self-employment-form">
                <div class="form-group">
                    <label for="se-tax-region" data-i18n="tax.region">Tax Region</label>
                    <select id="se-tax-region" required>
                        <option value="us" data-i18n="region.us">United States</option>
                        <option value="ca" data-i18n="region.ca">Canada</option>
                        <option value="uk" data-i18n="region.uk">United Kingdom</option>
                        <option value="au" data-i18n="region.au">Australia</option>
                        <option value="de" data-i18n="region.de">Germany</option>
                        <option value="jp" data-i18n="region.jp">Japan</option>
                        <option value="cn" data-i18n="region.cn">China</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="net-earnings" data-i18n="tax.net_earnings">Net Self-Employment Earnings</label>
                    <input type="number" id="net-earnings" placeholder="50000" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div id="se-country-specific-fields">
                    <!-- US specific fields -->
                    <div id="se-us-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="se-tax-year" data-i18n="tax.tax_year">Tax Year</label>
                            <select id="se-tax-year">
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Canada specific fields -->
                    <div id="se-ca-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="se-province" data-i18n="tax.province">Province</label>
                            <select id="se-province">
                                <option value="ontario" data-i18n="province.ontario">Ontario</option>
                                <option value="quebec" data-i18n="province.quebec">Quebec</option>
                                <option value="bc" data-i18n="province.bc">British Columbia</option>
                                <option value="alberta" data-i18n="province.alberta">Alberta</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- UK specific fields -->
                    <div id="se-uk-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="ni-category" data-i18n="tax.ni_category">National Insurance Category</label>
                            <select id="ni-category">
                                <option value="class2" data-i18n="ni.class2">Class 2</option>
                                <option value="class4" data-i18n="ni.class4">Class 4</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Germany specific fields -->
                    <div id="se-de-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="business-type" data-i18n="tax.business_type">Business Type</label>
                            <select id="business-type">
                                <option value="freelancer" data-i18n="business.freelancer">Freelancer</option>
                                <option value="sole-trader" data-i18n="business.sole_trader">Sole Trader</option>
                                <option value="gmbh" data-i18n="business.gmbh">GmbH</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" class="calc-button" data-i18n="tax.calculate_se">Calculate Self-Employment Tax</button>
            </form>
            <div id="self-employment-result" class="calc-result" style="display: none;">
                <div class="result-value" id="se-tax"></div>
                <div class="result-label" data-i18n="tax.se_tax">Self-Employment Tax</div>
                <div class="mt-1">
                    <strong><span data-i18n="tax.ss_tax">Social Security Tax</span>: <span id="ss-tax"></span></strong><br>
                    <strong><span data-i18n="tax.medicare_tax">Medicare Tax</span>: <span id="medicare-tax"></span></strong><br>
                    <strong><span data-i18n="tax.quarterly_payment">Quarterly Payment</span>: <span id="quarterly-payment"></span></strong>
                </div>
            </div>
        `;
    }

    getPropertyTaxCalculatorHTML() {
        return `
            <form class="calc-form" id="property-tax-form">
                <div class="form-group">
                    <label for="property-tax-region" data-i18n="tax.region">Tax Region</label>
                    <select id="property-tax-region" required>
                        <option value="us" data-i18n="region.us" selected>United States</option>
                        <option value="ca" data-i18n="region.ca">Canada</option>
                        <option value="uk" data-i18n="region.uk">United Kingdom</option>
                        <option value="au" data-i18n="region.au">Australia</option>
                        <option value="de" data-i18n="region.de">Germany</option>
                        <option value="jp" data-i18n="region.jp">Japan</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="home-value" data-i18n="tax.home_value">Home Value</label>
                    <input type="number" id="home-value" placeholder="350000" required>
                    <small class="currency-label" data-i18n="placeholder.amount_currency">Amount in local currency</small>
                </div>
                <div id="property-country-specific-fields">
                    <!-- US specific fields -->
                    <div id="property-us-fields" class="country-fields" style="display: block;">
                        <div class="form-group">
                            <label for="assessment-rate" data-i18n="tax.assessment_rate">Assessment Rate (%)</label>
                            <input type="number" id="assessment-rate" placeholder="80" step="0.1">
                        </div>
                        <div class="form-group">
                            <label for="mill-rate" data-i18n="tax.mill_rate">Mill Rate (per $1,000)</label>
                            <input type="number" id="mill-rate" placeholder="15.5" step="0.1">
                        </div>
                        <div class="form-group">
                            <label for="exemptions" data-i18n="tax.exemptions">Exemptions ($)</label>
                            <input type="number" id="exemptions" placeholder="0">
                        </div>
                    </div>
                    
                    <!-- Canada specific fields -->
                    <div id="property-ca-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="property-province" data-i18n="tax.province">Province</label>
                            <select id="property-province">
                                <option value="ontario" data-i18n="province.ontario">Ontario</option>
                                <option value="quebec" data-i18n="province.quebec">Quebec</option>
                                <option value="bc" data-i18n="province.bc">British Columbia</option>
                                <option value="alberta" data-i18n="province.alberta">Alberta</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- UK specific fields -->
                    <div id="property-uk-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="council-tax-band" data-i18n="tax.council_tax_band">Council Tax Band</label>
                            <select id="council-tax-band">
                                <option value="a" data-i18n="council_band.a">Band A</option>
                                <option value="b" data-i18n="council_band.b">Band B</option>
                                <option value="c" data-i18n="council_band.c">Band C</option>
                                <option value="d" data-i18n="council_band.d">Band D</option>
                                <option value="e" data-i18n="council_band.e">Band E</option>
                                <option value="f" data-i18n="council_band.f">Band F</option>
                                <option value="g" data-i18n="council_band.g">Band G</option>
                                <option value="h" data-i18n="council_band.h">Band H</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Germany specific fields -->
                    <div id="property-de-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="property-type" data-i18n="tax.property_type">Property Type</label>
                            <select id="property-type">
                                <option value="residential" data-i18n="property.residential">Residential</option>
                                <option value="commercial" data-i18n="property.commercial">Commercial</option>
                                <option value="vacant" data-i18n="property.vacant">Vacant Land</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Australia specific fields -->
                    <div id="property-au-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="property-state" data-i18n="tax.state">State/Territory</label>
                            <select id="property-state">
                                <option value="nsw" data-i18n="state.nsw">New South Wales</option>
                                <option value="vic" data-i18n="state.vic">Victoria</option>
                                <option value="qld" data-i18n="state.qld">Queensland</option>
                                <option value="wa" data-i18n="state.wa">Western Australia</option>
                                <option value="sa" data-i18n="state.sa">South Australia</option>
                                <option value="tas" data-i18n="state.tas">Tasmania</option>
                                <option value="act" data-i18n="state.act">ACT</option>
                                <option value="nt" data-i18n="state.nt">Northern Territory</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="land-value" data-i18n="tax.land_value">Land Value (AUD)</label>
                            <input type="number" id="land-value" placeholder="500000">
                        </div>
                    </div>
                    
                    <!-- Japan specific fields -->
                    <div id="property-jp-fields" class="country-fields" style="display: none;">
                        <div class="form-group">
                            <label for="property-prefecture" data-i18n="tax.prefecture">Prefecture</label>
                            <select id="property-prefecture">
                                <option value="tokyo" data-i18n="prefecture.tokyo">Tokyo</option>
                                <option value="osaka" data-i18n="prefecture.osaka">Osaka</option>
                                <option value="kanagawa" data-i18n="prefecture.kanagawa">Kanagawa</option>
                                <option value="aichi" data-i18n="prefecture.aichi">Aichi</option>
                                <option value="saitama" data-i18n="prefecture.saitama">Saitama</option>
                                <option value="chiba" data-i18n="prefecture.chiba">Chiba</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="building-age" data-i18n="tax.building_age">Building Age (years)</label>
                            <input type="number" id="building-age" placeholder="10" min="0">
                        </div>
                    </div>
                </div>
                <button type="submit" class="calc-button" data-i18n="tax.calculate_property">Calculate Property Tax</button>
            </form>
            <div id="property-tax-result" class="calc-result" style="display: none;">
                <div class="result-value" id="annual-property-tax"></div>
                <div class="result-label" data-i18n="tax.annual_property">Annual Property Tax</div>
                <div class="mt-1">
                    <strong><span data-i18n="tax.assessed_value">Assessed Value</span>: <span id="assessed-value"></span></strong><br>
                    <strong><span data-i18n="tax.monthly_escrow">Monthly Escrow</span>: <span id="monthly-escrow"></span></strong><br>
                    <strong><span data-i18n="tax.effective_tax_rate">Effective Tax Rate</span>: <span id="effective-tax-rate"></span></strong>
                </div>
            </div>
        `;
    }

    getDateCalculatorHTML() {
        return `
            <form class="calc-form" id="date-form">
                <div class="form-group">
                    <label for="calculation-type-date" data-i18n="date.calculation_type">Calculation Type</label>
                    <select id="calculation-type-date" required>
                        <option value="difference" data-i18n="date.difference">Date Difference</option>
                        <option value="add-days" data-i18n="date.add_days">Add/Subtract Days</option>
                        <option value="age" data-i18n="date.calculate_age">Calculate Age</option>
                        <option value="business-days" data-i18n="date.business_days">Business Days</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="start-date" data-i18n="date.start_date">Start Date</label>
                    <input type="date" id="start-date" required>
                </div>
                <div class="form-group" id="end-date-group">
                    <label for="end-date" data-i18n="date.end_date">End Date</label>
                    <input type="date" id="end-date">
                </div>
                <div class="form-group" id="days-group" style="display: none;">
                    <label for="days-to-add" data-i18n="date.days_to_add">Days to Add/Subtract</label>
                    <input type="number" id="days-to-add" placeholder="30">
                </div>
                <button type="submit" class="calc-button" data-i18n="common.calculate">Calculate</button>
            </form>
            <div id="date-result" class="calc-result" style="display: none;">
                <div class="result-value" id="date-answer"></div>
                <div class="result-label" id="date-label" data-i18n="common.result">Result</div>
                <div class="mt-1" id="date-breakdown"></div>
            </div>
        `;
    }

    getAreaCalculatorHTML() {
        return `
            <form class="calc-form" id="area-form">
                <div class="form-group">
                    <label for="shape-type" data-i18n="area.shape">Shape</label>
                    <select id="shape-type" required>
                        <option value="rectangle" data-i18n="area.rectangle">Rectangle</option>
                        <option value="circle" data-i18n="area.circle">Circle</option>
                        <option value="triangle" data-i18n="area.triangle">Triangle</option>
                        <option value="square" data-i18n="area.square">Square</option>
                        <option value="parallelogram" data-i18n="area.parallelogram">Parallelogram</option>
                        <option value="trapezoid" data-i18n="area.trapezoid">Trapezoid</option>
                    </select>
                </div>
                <div id="shape-inputs">
                    <!-- Dynamic inputs based on shape selection -->
                </div>
                <button type="submit" class="calc-button" data-i18n="area.calculate">Calculate Area</button>
            </form>
            <div id="area-result" class="calc-result" style="display: none;">
                <div class="result-value" id="area-value"></div>
                <div class="result-label" data-i18n="area.area">Area</div>
                <div class="mt-1">
                    <strong><span data-i18n="area.perimeter">Perimeter</span>: <span id="perimeter-value"></span></strong>
                </div>
            </div>
        `;
    }

    getWaterCalculatorHTML() {
        return `
            <form class="calc-form" id="water-form">
                <div class="form-group">
                    <label for="water-weight" data-i18n="water.weight_kg">Weight (kg)</label>
                    <input type="number" id="water-weight" placeholder="70" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="activity-level-water" data-i18n="water.activity_level">Activity Level</label>
                    <select id="activity-level-water" required>
                        <option value="sedentary" data-i18n="water_activity.sedentary">Sedentary</option>
                        <option value="light" data-i18n="water_activity.light">Light Activity</option>
                        <option value="moderate" data-i18n="water_activity.moderate">Moderate Activity</option>
                        <option value="active" data-i18n="water_activity.active">Active</option>
                        <option value="very-active" data-i18n="water_activity.very_active">Very Active</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="climate" data-i18n="water.climate">Climate</label>
                    <select id="climate" required>
                        <option value="temperate" data-i18n="climate.temperate">Temperate</option>
                        <option value="hot" data-i18n="climate.hot">Hot</option>
                        <option value="humid" data-i18n="climate.humid">Hot & Humid</option>
                        <option value="cold" data-i18n="climate.cold">Cold</option>
                    </select>
                </div>
                <button type="submit" class="calc-button" data-i18n="water.calculate_intake">Calculate Water Intake</button>
            </form>
            <div id="water-result" class="calc-result" style="display: none;">
                <div class="result-value" id="daily-water"></div>
                <div class="result-label" data-i18n="water.daily_intake">Daily Water Intake</div>
                <div class="mt-1">
                    <strong><span data-i18n="water.glasses_8oz">Glasses (8oz)</span>: <span id="water-glasses"></span></strong><br>
                    <strong><span data-i18n="water.bottles_16oz">Bottles (16oz)</span>: <span id="water-bottles"></span></strong><br>
                    <strong><span data-i18n="water.per_hour">Per Hour</span>: <span id="water-hourly"></span></strong>
                </div>
            </div>
        `;
    }

    getBodyFatCalculatorHTML() {
        return `
            <form class="calc-form" id="body-fat-form">
                <div class="form-group">
                    <label for="bf-gender" data-i18n="field.gender">Gender</label>
                    <select id="bf-gender" required>
                        <option value="male" data-i18n="gender.male">Male</option>
                        <option value="female" data-i18n="gender.female">Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="bf-height" data-i18n="bodyfat.height_cm">Height (cm)</label>
                    <input type="number" id="bf-height" placeholder="175" required>
                </div>
                <div class="form-group">
                    <label for="bf-waist" data-i18n="bodyfat.waist_cm">Waist (cm)</label>
                    <input type="number" id="bf-waist" placeholder="85" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="bf-neck" data-i18n="bodyfat.neck_cm">Neck (cm)</label>
                    <input type="number" id="bf-neck" placeholder="40" step="0.1" required>
                </div>
                <div class="form-group" id="hip-group" style="display: none;">
                    <label for="bf-hip" data-i18n="bodyfat.hip_cm">Hip (cm)</label>
                    <input type="number" id="bf-hip" placeholder="95" step="0.1">
                </div>
                <button type="submit" class="calc-button" data-i18n="bodyfat.calculate">Calculate Body Fat</button>
            </form>
            <div id="body-fat-result" class="calc-result" style="display: none;">
                <div class="result-value" id="body-fat-percentage"></div>
                <div class="result-label" data-i18n="bodyfat.percentage">Body Fat Percentage</div>
                <div class="mt-1">
                    <strong><span data-i18n="bodyfat.category">Category</span>: <span id="bf-category"></span></strong><br>
                    <strong><span data-i18n="bodyfat.fat_mass">Fat Mass</span>: <span id="fat-mass"></span></strong><br>
                    <strong><span data-i18n="bodyfat.lean_mass">Lean Mass</span>: <span id="lean-mass"></span></strong>
                </div>
            </div>
        `;
    }

    getCaloriesBurnedCalculatorHTML() {
        return `
            <form class="calc-form" id="calories-burned-form">
                <div class="form-group">
                    <label for="cb-weight" data-i18n="calories_burned.weight_kg">Weight (kg)</label>
                    <input type="number" id="cb-weight" placeholder="70" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="activity-type" data-i18n="calories_burned.activity">Activity</label>
                    <select id="activity-type" required>
                        <option value="walking-slow" data-i18n="activity_type.walking_slow">Walking (3 mph)</option>
                        <option value="walking-fast" data-i18n="activity_type.walking_fast">Walking (4.5 mph)</option>
                        <option value="jogging" data-i18n="activity_type.jogging">Jogging</option>
                        <option value="running" data-i18n="activity_type.running">Running (8 mph)</option>
                        <option value="cycling-leisurely" data-i18n="activity_type.cycling_leisurely">Cycling (leisurely)</option>
                        <option value="cycling-moderate" data-i18n="activity_type.cycling_moderate">Cycling (moderate)</option>
                        <option value="swimming" data-i18n="activity_type.swimming">Swimming</option>
                        <option value="weightlifting" data-i18n="activity_type.weightlifting">Weight Lifting</option>
                        <option value="yoga" data-i18n="activity_type.yoga">Yoga</option>
                        <option value="dancing" data-i18n="activity_type.dancing">Dancing</option>
                        <option value="hiking" data-i18n="activity_type.hiking">Hiking</option>
                        <option value="basketball" data-i18n="activity_type.basketball">Basketball</option>
                        <option value="tennis" data-i18n="activity_type.tennis">Tennis</option>
                        <option value="soccer" data-i18n="activity_type.soccer">Soccer</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="duration" data-i18n="calories_burned.duration_min">Duration (minutes)</label>
                    <input type="number" id="duration" placeholder="60" required>
                </div>
                <button type="submit" class="calc-button" data-i18n="calories_burned.calculate">Calculate Calories Burned</button>
            </form>
            <div id="calories-burned-result" class="calc-result" style="display: none;">
                <div class="result-value" id="calories-burned-value"></div>
                <div class="result-label" data-i18n="calories_burned.burned">Calories Burned</div>
                <div class="mt-1">
                    <strong><span data-i18n="calories_burned.per_hour">Per Hour</span>: <span id="calories-per-hour"></span></strong><br>
                    <strong><span data-i18n="calories_burned.per_minute">Per Minute</span>: <span id="calories-per-minute"></span></strong>
                </div>
            </div>
        `;
    }

    getRunningPaceCalculatorHTML() {
        return `
            <form class="calc-form" id="running-pace-form">
                <div class="form-group">
                    <label for="pace-calculation" data-i18n="pace.calculate">Calculate</label>
                    <select id="pace-calculation" required>
                        <option value="pace" data-i18n="pace.pace_from_time">Pace from Distance & Time</option>
                        <option value="time" data-i18n="pace.time_from_pace">Time from Distance & Pace</option>
                        <option value="distance" data-i18n="pace.distance_from_pace">Distance from Time & Pace</option>
                    </select>
                </div>
                <div class="form-group" id="distance-group">
                    <label for="run-distance" data-i18n="pace.distance">Distance</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="number" id="run-distance" placeholder="5" step="0.1" required style="flex: 1;">
                        <select id="distance-unit" style="width: 100px;">
                            <option value="km" data-i18n="pace.km">km</option>
                            <option value="miles" data-i18n="pace.miles">miles</option>
                            <option value="m" data-i18n="pace.meters">meters</option>
                        </select>
                    </div>
                </div>
                <div class="form-group" id="time-group">
                    <label for="run-time" data-i18n="pace.time">Time</label>
                    <div style="display: flex; gap: 5px;">
                        <input type="number" id="hours" placeholder="0" min="0" style="width: 60px;">
                        <span>:</span>
                        <input type="number" id="minutes" placeholder="25" min="0" max="59" style="width: 60px;">
                        <span>:</span>
                        <input type="number" id="seconds" placeholder="30" min="0" max="59" style="width: 60px;">
                        <small style="margin-left: 10px; color: #666;" data-i18n="pace.hms">H:M:S</small>
                    </div>
                </div>
                <div class="form-group" id="pace-group" style="display: none;">
                    <label for="target-pace" data-i18n="pace.target_pace">Pace (min/km or min/mile)</label>
                    <div style="display: flex; gap: 5px;">
                        <input type="number" id="pace-minutes" placeholder="5" min="0" style="width: 60px;">
                        <span>:</span>
                        <input type="number" id="pace-seconds" placeholder="30" min="0" max="59" style="width: 60px;">
                        <small style="margin-left: 10px; color: #666;" data-i18n="pace.ms_per_unit">M:S per unit</small>
                    </div>
                </div>
                <button type="submit" class="calc-button" data-i18n="common.calculate">Calculate</button>
            </form>
            <div id="running-pace-result" class="calc-result" style="display: none;">
                <div class="result-value" id="pace-result-value"></div>
                <div class="result-label" id="pace-result-label" data-i18n="common.result">Result</div>
                <div class="mt-1" id="pace-breakdown"></div>
            </div>
        `;
    }

    getOneRepMaxCalculatorHTML() {
        return `
            <form class="calc-form" id="one-rep-max-form">
                <div class="form-group">
                    <label for="weight-lifted" data-i18n="one_rep.weight_lifted">Weight Lifted (kg or lbs)</label>
                    <input type="number" id="weight-lifted" placeholder="80" step="0.5" required>
                </div>
                <div class="form-group">
                    <label for="repetitions" data-i18n="one_rep.repetitions">Repetitions Performed</label>
                    <input type="number" id="repetitions" placeholder="8" min="1" max="30" required>
                </div>
                <div class="form-group">
                    <label for="formula-type" data-i18n="one_rep.formula">Formula</label>
                    <select id="formula-type" required>
                        <option value="epley" data-i18n="one_rep.epley">Epley Formula</option>
                        <option value="brzycki" data-i18n="one_rep.brzycki">Brzycki Formula</option>
                        <option value="lander" data-i18n="one_rep.lander">Lander Formula</option>
                        <option value="oconner" data-i18n="one_rep.oconner">O'Conner Formula</option>
                    </select>
                </div>
                <button type="submit" class="calc-button" data-i18n="one_rep.calculate">Calculate One Rep Max</button>
            </form>
            <div id="one-rep-max-result" class="calc-result" style="display: none;">
                <div class="result-value" id="one-rep-max-value"></div>
                <div class="result-label" data-i18n="one_rep.estimated">Estimated 1RM</div>
                <div class="mt-1">
                    <strong><span data-i18n="one_rep.ninety_percent">90% (1-2 reps)</span>: <span id="ninety-percent"></span></strong><br>
                    <strong><span data-i18n="one_rep.eighty_percent">80% (3-5 reps)</span>: <span id="eighty-percent"></span></strong><br>
                    <strong><span data-i18n="one_rep.seventy_percent">70% (6-8 reps)</span>: <span id="seventy-percent"></span></strong><br>
                    <strong><span data-i18n="one_rep.sixty_percent">60% (9-12 reps)</span>: <span id="sixty-percent"></span></strong>
                </div>
            </div>
        `;
    }

    getTrainingZonesCalculatorHTML() {
        return `
            <form class="calc-form" id="training-zones-form">
                <div class="form-group">
                    <label for="age-tz" data-i18n="training.age_years">Age (years)</label>
                    <input type="number" id="age-tz" placeholder="30" min="15" max="80" required>
                </div>
                <div class="form-group">
                    <label for="resting-hr" data-i18n="training.resting_hr">Resting Heart Rate (optional)</label>
                    <input type="number" id="resting-hr" placeholder="60" min="40" max="100">
                </div>
                <div class="form-group">
                    <label for="max-hr-method" data-i18n="training.max_hr_calculation">Max HR Calculation</label>
                    <select id="max-hr-method" required>
                        <option value="basic" data-i18n="training.basic_formula">Basic (220 - age)</option>
                        <option value="tanaka" data-i18n="training.tanaka_formula">Tanaka Formula</option>
                        <option value="karvonen" data-i18n="training.karvonen_method">Karvonen Method (uses resting HR)</option>
                        <option value="custom" data-i18n="training.custom_max_hr">Custom Max HR</option>
                    </select>
                </div>
                <div class="form-group" id="custom-max-hr" style="display: none;">
                    <label for="custom-max" data-i18n="training.custom_max">Custom Max Heart Rate</label>
                    <input type="number" id="custom-max" placeholder="190" min="150" max="220">
                </div>
                <button type="submit" class="calc-button" data-i18n="training.calculate_zones">Calculate Training Zones</button>
            </form>
            <div id="training-zones-result" class="calc-result" style="display: none;">
                <div class="result-value" id="max-heart-rate"></div>
                <div class="result-label" data-i18n="training.max_heart_rate">Maximum Heart Rate</div>
                <div class="mt-1" id="zones-breakdown">
                    <!-- Training zones will be displayed here -->
                </div>
            </div>
        `;
    }
}

// Global functions for HTML onclick handlers
function openCalculator(type) {
    console.log('Global openCalculator called with type:', type);
    console.log('window.fullCalApp exists:', !!window.fullCalApp);
    if (window.fullCalApp) {
        window.fullCalApp.openCalculator(type);
    } else {
        console.error('window.fullCalApp is not defined!');
    }
}

function closeCalculator() {
    window.fullCalApp.closeCalculator();
}

// Global function to update unit options based on conversion type
window.updateUnitOptions = function() {
    const conversionType = document.getElementById('conversion-type').value;
    const fromUnitSelect = document.getElementById('from-unit');
    const toUnitSelect = document.getElementById('to-unit');
    
    // Clear existing options
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    
    let units = [];
    switch (conversionType) {
        case 'length':
            units = [
                { value: 'meter', text: 'Meter' },
                { value: 'kilometer', text: 'Kilometer' },
                { value: 'centimeter', text: 'Centimeter' },
                { value: 'millimeter', text: 'Millimeter' },
                { value: 'inch', text: 'Inch' },
                { value: 'foot', text: 'Foot' },
                { value: 'yard', text: 'Yard' },
                { value: 'mile', text: 'Mile' },
                { value: 'nautical_mile', text: 'Nautical Mile' }
            ];
            break;
        case 'weight':
            units = [
                { value: 'gram', text: 'Gram' },
                { value: 'kilogram', text: 'Kilogram' },
                { value: 'pound', text: 'Pound' },
                { value: 'ounce', text: 'Ounce' },
                { value: 'ton', text: 'Ton' },
                { value: 'stone', text: 'Stone' }
            ];
            break;
        case 'area':
            units = [
                { value: 'square_meter', text: 'Square Meter' },
                { value: 'square_kilometer', text: 'Square Kilometer' },
                { value: 'square_centimeter', text: 'Square Centimeter' },
                { value: 'square_inch', text: 'Square Inch' },
                { value: 'square_foot', text: 'Square Foot' },
                { value: 'square_yard', text: 'Square Yard' },
                { value: 'acre', text: 'Acre' },
                { value: 'hectare', text: 'Hectare' }
            ];
            break;
        case 'volume':
            units = [
                { value: 'liter', text: 'Liter' },
                { value: 'milliliter', text: 'Milliliter' },
                { value: 'cubic_meter', text: 'Cubic Meter' },
                { value: 'cubic_centimeter', text: 'Cubic Centimeter' },
                { value: 'gallon', text: 'Gallon' },
                { value: 'quart', text: 'Quart' },
                { value: 'pint', text: 'Pint' },
                { value: 'cup', text: 'Cup' },
                { value: 'fluid_ounce', text: 'Fluid Ounce' }
            ];
            break;
        case 'time':
            units = [
                { value: 'second', text: 'Second' },
                { value: 'minute', text: 'Minute' },
                { value: 'hour', text: 'Hour' },
                { value: 'day', text: 'Day' },
                { value: 'week', text: 'Week' },
                { value: 'month', text: 'Month' },
                { value: 'year', text: 'Year' }
            ];
            break;
        case 'speed':
            units = [
                { value: 'mps', text: 'Meters per Second' },
                { value: 'kmh', text: 'Kilometers per Hour' },
                { value: 'mph', text: 'Miles per Hour' },
                { value: 'knot', text: 'Knot' },
                { value: 'fps', text: 'Feet per Second' }
            ];
            break;
        case 'temperature':
            units = [
                { value: 'celsius', text: 'Celsius' },
                { value: 'fahrenheit', text: 'Fahrenheit' },
                { value: 'kelvin', text: 'Kelvin' }
            ];
            break;
    }
    
    // Add options to both selects
    units.forEach(unit => {
        const fromOption = document.createElement('option');
        fromOption.value = unit.value;
        fromOption.textContent = unit.text;
        fromUnitSelect.appendChild(fromOption);
        
        const toOption = document.createElement('option');
        toOption.value = unit.value;
        toOption.textContent = unit.text;
        toUnitSelect.appendChild(toOption);
    });
};

// Initialize the application when DOM is ready (supports late script execution in Next.js)
function initializeFullCalApp() {
    console.log('Initializing FullCalApp');
    try {
        window.fullCalApp = new FullCalApp();
        console.log('FullCalApp initialized successfully:', window.fullCalApp);
    } catch (error) {
        console.error('Error initializing FullCalApp:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFullCalApp);
} else {
    initializeFullCalApp();
}
