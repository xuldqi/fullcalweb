// Calculator-specific functionality and algorithms
class CalculatorEngine {
    constructor() {
        this.init();
    }

    init() {
        // Initialize any calculator-specific setup
        console.log('CalculatorEngine initialized');
    }

    // Financial Calculations
    calculateCompoundInterest(principal, rate, time, compound = 12) {
        return principal * Math.pow((1 + rate / compound), compound * time);
    }

    calculateSimpleInterest(principal, rate, time) {
        return principal * (1 + rate * time);
    }

    calculateLoanPayment(principal, rate, periods) {
        if (rate === 0) return principal / periods;
        return principal * (rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1);
    }

    calculateAPR(loanAmount, monthlyPayment, numberOfPayments) {
        // Simplified APR calculation
        const totalInterest = (monthlyPayment * numberOfPayments) - loanAmount;
        return (totalInterest / loanAmount / numberOfPayments) * 12 * 100;
    }

    // Health Calculations
    calculateBMI(weight, height) {
        // weight in kg, height in meters
        return weight / (height * height);
    }

    calculateBMR(weight, height, age, gender) {
        // Harris-Benedict Formula
        if (gender === 'male') {
            return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
    }

    calculateBodyFat(gender, waist, neck, height, hip = 0) {
        // US Navy Method
        if (gender === 'male') {
            return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
            return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        }
    }

    calculateWaterIntake(weight, activityLevel = 'moderate') {
        const baseIntake = weight * 35; // ml per kg
        const multipliers = {
            low: 1.0,
            moderate: 1.2,
            high: 1.4,
            athlete: 1.6
        };
        return baseIntake * (multipliers[activityLevel] || 1.2);
    }

    // Sports Calculations
    calculateCaloriesBurned(activity, weight, duration) {
        // MET values for common activities
        const metValues = {
            'walking': 3.8,
            'jogging': 7.0,
            'running': 9.8,
            'cycling': 7.5,
            'swimming': 8.0,
            'weightlifting': 6.0,
            'yoga': 2.5,
            'dancing': 4.8,
            'hiking': 6.0,
            'basketball': 8.0,
            'tennis': 7.3,
            'soccer': 10.0
        };

        const met = metValues[activity] || 5.0;
        return met * weight * duration / 60; // calories per hour
    }

    calculateRunningPace(distance, time) {
        // distance in km, time in minutes
        return time / distance; // minutes per km
    }

    calculateOneRepMax(weight, reps) {
        // Epley formula
        if (reps === 1) return weight;
        return weight * (1 + reps / 30);
    }

    calculateTrainingZones(maxHeartRate) {
        return {
            recovery: {
                min: Math.round(maxHeartRate * 0.5),
                max: Math.round(maxHeartRate * 0.6)
            },
            aerobic: {
                min: Math.round(maxHeartRate * 0.6),
                max: Math.round(maxHeartRate * 0.7)
            },
            anaerobic: {
                min: Math.round(maxHeartRate * 0.7),
                max: Math.round(maxHeartRate * 0.8)
            },
            lactate: {
                min: Math.round(maxHeartRate * 0.8),
                max: Math.round(maxHeartRate * 0.9)
            },
            neuromuscular: {
                min: Math.round(maxHeartRate * 0.9),
                max: maxHeartRate
            }
        };
    }

    // Utility Calculations
    calculatePercentage(value, total) {
        return (value / total) * 100;
    }

    calculatePercentageIncrease(original, newValue) {
        return ((newValue - original) / original) * 100;
    }

    calculateTip(billAmount, tipPercentage, numberOfPeople = 1) {
        const tipAmount = billAmount * (tipPercentage / 100);
        const totalAmount = billAmount + tipAmount;
        return {
            tipAmount: tipAmount,
            totalAmount: totalAmount,
            perPerson: totalAmount / numberOfPeople,
            tipPerPerson: tipAmount / numberOfPeople
        };
    }

    // Geometric Calculations
    calculateCircleArea(radius) {
        return Math.PI * radius * radius;
    }

    calculateRectangleArea(length, width) {
        return length * width;
    }

    calculateTriangleArea(base, height) {
        return 0.5 * base * height;
    }

    calculateSphereVolume(radius) {
        return (4/3) * Math.PI * radius * radius * radius;
    }

    calculateCylinderVolume(radius, height) {
        return Math.PI * radius * radius * height;
    }

    // Date Calculations
    calculateDateDifference(date1, date2) {
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return {
            days: diffDays,
            weeks: Math.floor(diffDays / 7),
            months: Math.floor(diffDays / 30.44), // Average month length
            years: Math.floor(diffDays / 365.25)  // Account for leap years
        };
    }

    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    // Unit Conversions
    convertLength(value, fromUnit, toUnit) {
        const meters = this.convertToMeters(value, fromUnit);
        return this.convertFromMeters(meters, toUnit);
    }

    convertToMeters(value, unit) {
        const conversions = {
            'm': 1,
            'cm': 0.01,
            'mm': 0.001,
            'km': 1000,
            'in': 0.0254,
            'ft': 0.3048,
            'yd': 0.9144,
            'mi': 1609.34
        };
        return value * conversions[unit];
    }

    convertFromMeters(value, unit) {
        const conversions = {
            'm': 1,
            'cm': 100,
            'mm': 1000,
            'km': 0.001,
            'in': 39.3701,
            'ft': 3.28084,
            'yd': 1.09361,
            'mi': 0.000621371
        };
        return value * conversions[unit];
    }

    convertWeight(value, fromUnit, toUnit) {
        const kg = this.convertToKilograms(value, fromUnit);
        return this.convertFromKilograms(kg, toUnit);
    }

    convertToKilograms(value, unit) {
        const conversions = {
            'kg': 1,
            'g': 0.001,
            'lb': 0.453592,
            'oz': 0.0283495,
            't': 1000,
            'st': 6.35029 // stone
        };
        return value * conversions[unit];
    }

    convertFromKilograms(value, unit) {
        const conversions = {
            'kg': 1,
            'g': 1000,
            'lb': 2.20462,
            'oz': 35.274,
            't': 0.001,
            'st': 0.157473
        };
        return value * conversions[unit];
    }

    convertTemperature(value, fromUnit, toUnit) {
        if (fromUnit === toUnit) return value;

        // Convert to Celsius first
        let celsius = value;
        switch (fromUnit) {
            case 'f':
                celsius = (value - 32) * 5/9;
                break;
            case 'k':
                celsius = value - 273.15;
                break;
            case 'r': // Rankine
                celsius = (value - 491.67) * 5/9;
                break;
        }

        // Convert from Celsius to target
        switch (toUnit) {
            case 'f':
                return celsius * 9/5 + 32;
            case 'k':
                return celsius + 273.15;
            case 'r':
                return (celsius + 273.15) * 9/5;
            default:
                return celsius;
        }
    }

    // Tax Calculations
    calculateIncomeTax(income, taxBrackets) {
        let tax = 0;
        let remainingIncome = income;

        for (const bracket of taxBrackets) {
            if (remainingIncome <= 0) break;
            
            const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
            tax += taxableInBracket * bracket.rate;
            remainingIncome -= taxableInBracket;
        }

        return tax;
    }

    calculateSalesTax(amount, taxRate) {
        return amount * (taxRate / 100);
    }

    calculatePropertyTax(assessedValue, millageRate) {
        return (assessedValue / 1000) * millageRate;
    }

    // Validation helpers
    validateNumber(value, min = -Infinity, max = Infinity) {
        const num = parseFloat(value);
        return !isNaN(num) && num >= min && num <= max;
    }

    validateDate(dateString) {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    }

    // Formatting helpers
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    formatPercentage(value, decimals = 2) {
        return (value * 100).toFixed(decimals) + '%';
    }

    formatNumber(value, decimals = 2) {
        return parseFloat(value).toFixed(decimals);
    }
}

// Initialize calculator engine
window.calculatorEngine = new CalculatorEngine();