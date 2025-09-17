// FullCal Function Test Script
// This script tests all calculators to ensure they are working properly

class FullCalTester {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            details: []
        };
    }

    async runAllTests() {
        console.log('🧪 Starting FullCal comprehensive tests...');
        
        // Wait for DOM and all scripts to load
        if (document.readyState !== 'complete') {
            await new Promise(resolve => {
                window.addEventListener('load', resolve);
            });
        }

        // Test each category
        await this.testFinanceCalculators();
        await this.testTaxCalculators();
        await this.testUtilityCalculators();
        await this.testHealthCalculators();
        await this.testSportsCalculators();
        await this.testAutoUpdateSystem();

        this.generateReport();
    }

    async testFinanceCalculators() {
        console.log('💰 Testing Finance Calculators...');
        
        const tests = [
            { name: 'Salary Calculator', type: 'salary' },
            { name: 'Mortgage Calculator', type: 'mortgage' },
            { name: 'Loan Calculator', type: 'loan' },
            { name: 'Investment Calculator', type: 'investment' }
        ];

        for (const test of tests) {
            await this.testCalculator(test.name, test.type);
        }
    }

    async testTaxCalculators() {
        console.log('📊 Testing Tax Calculators...');
        
        const tests = [
            { name: 'Income Tax Calculator', type: 'income-tax' },
            { name: 'Sales Tax Calculator', type: 'sales-tax' },
            { name: 'Self-Employment Tax Calculator', type: 'self-employment' },
            { name: 'Property Tax Calculator', type: 'property-tax' }
        ];

        for (const test of tests) {
            await this.testCalculator(test.name, test.type);
        }
    }

    async testUtilityCalculators() {
        console.log('🔧 Testing Utility Calculators...');
        
        const tests = [
            { name: 'Date Calculator', type: 'date' },
            { name: 'Unit Converter', type: 'unit-converter' },
            { name: 'Percentage Calculator', type: 'percentage' },
            { name: 'Area Calculator', type: 'area' }
        ];

        for (const test of tests) {
            await this.testCalculator(test.name, test.type);
        }
    }

    async testHealthCalculators() {
        console.log('❤️ Testing Health Calculators...');
        
        const tests = [
            { name: 'BMI Calculator', type: 'bmi' },
            { name: 'Calorie Calculator', type: 'calories' },
            { name: 'Water Intake Calculator', type: 'water' },
            { name: 'Body Fat Calculator', type: 'body-fat' }
        ];

        for (const test of tests) {
            await this.testCalculator(test.name, test.type);
        }
    }

    async testSportsCalculators() {
        console.log('🏃 Testing Sports Calculators...');
        
        const tests = [
            { name: 'Calories Burned Calculator', type: 'calories-burned' },
            { name: 'Running Pace Calculator', type: 'running-pace' },
            { name: 'One Rep Max Calculator', type: 'one-rep-max' },
            { name: 'Training Zones Calculator', type: 'training-zones' }
        ];

        for (const test of tests) {
            await this.testCalculator(test.name, test.type);
        }
    }

    async testCalculator(name, type) {
        try {
            // Test if calculator can be opened
            if (!window.fullCalApp) {
                throw new Error('FullCal app not initialized');
            }

            // Test HTML generation
            const html = window.fullCalApp.getCalculatorContent(type);
            if (!html || html.includes('Coming Soon')) {
                throw new Error('HTML not implemented or showing coming soon');
            }

            // Test if calculator opens without error
            window.fullCalApp.openCalculator(type);
            
            // Wait a bit for modal to open
            await this.wait(100);
            
            const modal = document.getElementById('calculator-modal');
            if (!modal || modal.style.display !== 'block') {
                throw new Error('Modal did not open');
            }

            // Check if form exists
            const forms = modal.querySelectorAll('form');
            if (forms.length === 0) {
                throw new Error('No form found in calculator');
            }

            // Close modal
            window.fullCalApp.closeCalculator();

            this.logPass(name);
        } catch (error) {
            this.logFail(name, error.message);
        }
    }

    async testAutoUpdateSystem() {
        console.log('🔄 Testing Auto-Update System...');
        
        try {
            // Test tax config exists
            if (!window.taxConfig) {
                throw new Error('Tax configuration not loaded');
            }

            // Test auto updater exists
            if (!window.autoTaxUpdater) {
                throw new Error('Auto tax updater not initialized');
            }

            // Test status function
            const status = window.autoTaxUpdater.getUpdateStatus();
            if (!status || !status.regions || status.regions.length === 0) {
                throw new Error('Invalid update status');
            }

            // Test regions are configured
            const regions = window.taxConfig.getAvailableRegions();
            if (!regions || regions.length === 0) {
                throw new Error('No tax regions configured');
            }

            this.logPass('Auto-Update System');
        } catch (error) {
            this.logFail('Auto-Update System', error.message);
        }
    }

    logPass(name) {
        this.results.passed++;
        this.results.details.push({ name, status: 'PASS', error: null });
        console.log(`✅ ${name}: PASS`);
    }

    logFail(name, error) {
        this.results.failed++;
        this.results.details.push({ name, status: 'FAIL', error });
        console.log(`❌ ${name}: FAIL - ${error}`);
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    generateReport() {
        const total = this.results.passed + this.results.failed;
        const passRate = ((this.results.passed / total) * 100).toFixed(1);

        console.log('\n📋 FullCal Test Report');
        console.log('='.repeat(50));
        console.log(`Total Tests: ${total}`);
        console.log(`Passed: ${this.results.passed} ✅`);
        console.log(`Failed: ${this.results.failed} ❌`);
        console.log(`Pass Rate: ${passRate}%`);
        console.log('='.repeat(50));

        if (this.results.failed > 0) {
            console.log('\n❌ Failed Tests:');
            this.results.details
                .filter(r => r.status === 'FAIL')
                .forEach(r => {
                    console.log(`  • ${r.name}: ${r.error}`);
                });
        }

        // Create visual report
        this.createVisualReport();

        return {
            passed: this.results.passed,
            failed: this.results.failed,
            total,
            passRate: parseFloat(passRate),
            details: this.results.details
        };
    }

    createVisualReport() {
        // Create a visual test report in the page
        const reportDiv = document.createElement('div');
        reportDiv.id = 'fullcal-test-report';
        reportDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border: 2px solid #ff6b35;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                z-index: 10000;
                max-width: 500px;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #ff6b35;">🧪 FullCal Test Report</h2>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                        background: #e74c3c;
                        color: white;
                        border: none;
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                        cursor: pointer;
                        font-size: 16px;
                    ">×</button>
                </div>
                
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="
                        display: inline-block;
                        background: ${this.results.failed === 0 ? '#27ae60' : '#e74c3c'};
                        color: white;
                        padding: 10px 20px;
                        border-radius: 25px;
                        font-size: 18px;
                        font-weight: bold;
                    ">
                        ${this.results.passed}/${this.results.passed + this.results.failed} Tests Passed
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    ${this.results.details.map(r => `
                        <div style="
                            display: flex;
                            justify-content: space-between;
                            padding: 8px 12px;
                            margin: 4px 0;
                            background: ${r.status === 'PASS' ? '#d5f4e6' : '#ffeaa7'};
                            border-radius: 6px;
                            font-size: 14px;
                        ">
                            <span>${r.name}</span>
                            <span style="font-weight: bold; color: ${r.status === 'PASS' ? '#27ae60' : '#e74c3c'};">
                                ${r.status === 'PASS' ? '✅' : '❌'}
                            </span>
                        </div>
                    `).join('')}
                </div>
                
                ${this.results.failed > 0 ? `
                    <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 15px;">
                        <h4 style="margin-top: 0; color: #856404;">Issues Found:</h4>
                        <ul style="margin: 0; padding-left: 20px; font-size: 13px;">
                            ${this.results.details
                                .filter(r => r.status === 'FAIL')
                                .map(r => `<li>${r.name}: ${r.error}</li>`)
                                .join('')}
                        </ul>
                    </div>
                ` : `
                    <div style="background: #d4edda; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center;">
                        <h4 style="margin: 0; color: #155724;">🎉 All tests passed! FullCal is working perfectly!</h4>
                    </div>
                `}
            </div>
        `;
        
        document.body.appendChild(reportDiv);
    }
}

// Global function to run tests
function runFullCalTests() {
    const tester = new FullCalTester();
    return tester.runAllTests();
}

// Auto-run tests if in debug mode
if (window.location.search.includes('test=true')) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runFullCalTests, 2000); // Wait 2 seconds for everything to load
    });
}

// Expose tester globally
window.FullCalTester = FullCalTester;
window.runFullCalTests = runFullCalTests;