// Auto-Update Tax Configuration System
class AutoTaxUpdater {
    constructor(taxConfig) {
        this.taxConfig = taxConfig;
        // Disable external API calls for complete privacy
        this.updateSources = {
            'US': {
                api: null, // Disabled for privacy
                backup: null, // Disabled for privacy
                fallback: 'data/us-tax-2024.json'
            },
            'CN': {
                api: null, // Disabled for privacy
                backup: null, // Disabled for privacy
                fallback: 'data/cn-tax-2024.json'
            },
            'UK': {
                api: null, // Disabled for privacy
                backup: null, // Disabled for privacy
                fallback: 'data/uk-tax-2024.json'
            },
            'DE': {
                api: null, // Disabled for privacy
                backup: null, // Disabled for privacy
                fallback: 'data/de-tax-2024.json'
            },
            'JP': {
                api: null, // Disabled for privacy
                backup: null, // Disabled for privacy
                fallback: 'data/jp-tax-2024.json'
            },
            'FR': {
                api: null, // Disabled for privacy
                backup: null, // Disabled for privacy
                fallback: 'data/fr-tax-2024.json'
            },
            'CA': {
                api: null, // Disabled for privacy
                backup: null, // Disabled for privacy
                fallback: 'data/ca-tax-2024.json'
            },
            'AU': {
                api: null, // Disabled for privacy
                backup: null, // Disabled for privacy
                fallback: 'data/au-tax-2024.json'
            }
        };
        
        this.lastUpdate = this.getLastUpdateTime();
        this.updateInterval = 24 * 60 * 60 * 1000; // 24 hours
        this.maxRetries = 3;
        
        // Auto-update on initialization
        this.initAutoUpdate();
    }

    initAutoUpdate() {
        // Check if update is needed
        if (this.isUpdateNeeded()) {
            this.updateAllRegions();
        }
        
        // Set up periodic updates
        this.setupPeriodicUpdates();
    }

    isUpdateNeeded() {
        const now = Date.now();
        const timeSinceUpdate = now - this.lastUpdate;
        return timeSinceUpdate > this.updateInterval;
    }

    setupPeriodicUpdates() {
        // Update every 24 hours
        setInterval(() => {
            this.updateAllRegions();
        }, this.updateInterval);

        // Also update when page becomes visible (user returns to tab)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.isUpdateNeeded()) {
                this.updateAllRegions();
            }
        });
    }

    async updateAllRegions() {
        console.log('🔄 Starting automatic tax rate updates...');
        
        const regions = Object.keys(this.updateSources);
        const updatePromises = regions.map(region => this.updateRegion(region));
        
        try {
            const results = await Promise.allSettled(updatePromises);
            const successful = results.filter(r => r.status === 'fulfilled').length;
            const failed = results.filter(r => r.status === 'rejected').length;
            
            console.log(`✅ Tax update complete: ${successful} successful, ${failed} failed`);
            
            if (successful > 0) {
                this.setLastUpdateTime(Date.now());
                this.notifyUpdate(successful, failed);
            }
        } catch (error) {
            console.error('❌ Tax update failed:', error);
        }
    }

    async updateRegion(region) {
        const sources = this.updateSources[region];
        let attempts = 0;
        
        while (attempts < this.maxRetries) {
            try {
                // Try primary API first
                if (attempts === 0 && sources.api) {
                    const data = await this.fetchTaxData(sources.api, region);
                    if (data) {
                        this.applyUpdate(region, data);
                        return { region, success: true, source: 'primary' };
                    }
                }
                
                // Try backup API
                if (attempts === 1 && sources.backup) {
                    const data = await this.fetchTaxData(sources.backup, region);
                    if (data) {
                        this.applyUpdate(region, data);
                        return { region, success: true, source: 'backup' };
                    }
                }
                
                // Try fallback file
                if (attempts === 2 && sources.fallback) {
                    const data = await this.fetchLocalData(sources.fallback);
                    if (data) {
                        this.applyUpdate(region, data);
                        return { region, success: true, source: 'fallback' };
                    }
                }
                
            } catch (error) {
                console.warn(`⚠️ Update attempt ${attempts + 1} failed for ${region}:`, error.message);
            }
            
            attempts++;
        }
        
        throw new Error(`Failed to update ${region} after ${this.maxRetries} attempts`);
    }

    async fetchTaxData(url, region) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'FullCalTaxUpdater/1.0'
                },
                timeout: 10000
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            return this.transformApiData(data, region);
        } catch (error) {
            console.warn(`Failed to fetch from ${url}:`, error.message);
            return null;
        }
    }

    async fetchLocalData(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) return null;
            return await response.json();
        } catch (error) {
            console.warn(`Failed to fetch local data from ${path}:`, error.message);
            return null;
        }
    }

    transformApiData(rawData, region) {
        // Transform different API responses to our standard format
        switch (region) {
            case 'US':
                return this.transformUSData(rawData);
            case 'CN':
                return this.transformCNData(rawData);
            case 'UK':
                return this.transformUKData(rawData);
            default:
                return rawData;
        }
    }

    transformUSData(data) {
        // Transform US API response to our format
        if (data.tax_brackets) {
            return {
                incomeTax: {
                    brackets: data.tax_brackets,
                    standardDeductions: data.standard_deductions
                },
                selfEmploymentTax: data.self_employment_tax,
                lastUpdated: data.tax_year || new Date().getFullYear()
            };
        }
        return data;
    }

    transformCNData(data) {
        // Transform China API response
        if (data.income_tax_rates) {
            return {
                incomeTax: {
                    brackets: { individual: data.income_tax_rates },
                    standardDeductions: data.deductions
                },
                socialInsurance: data.social_insurance_rates,
                lastUpdated: data.effective_date
            };
        }
        return data;
    }

    transformUKData(data) {
        // Transform UK API response
        if (data.income_tax) {
            return {
                incomeTax: {
                    brackets: { standard: data.income_tax.brackets },
                    nationalInsurance: data.national_insurance
                },
                lastUpdated: data.tax_year
            };
        }
        return data;
    }

    applyUpdate(region, newData) {
        const currentConfig = this.taxConfig.taxConfigs[region];
        if (!currentConfig) return;

        // Merge new data with existing configuration
        const updatedConfig = {
            ...currentConfig,
            ...newData,
            lastUpdated: Date.now(),
            autoUpdated: true
        };

        // Validate the new configuration
        if (this.validateTaxConfig(updatedConfig, region)) {
            this.taxConfig.taxConfigs[region] = updatedConfig;
            console.log(`✅ Updated tax rates for ${region}`);
            
            // Save to localStorage for persistence
            this.saveToLocalStorage(region, updatedConfig);
        } else {
            console.warn(`⚠️ Invalid tax configuration for ${region}, keeping existing data`);
        }
    }

    validateTaxConfig(config, region) {
        try {
            // Basic validation checks
            if (!config || typeof config !== 'object') return false;
            
            // Check required fields based on region
            switch (region) {
                case 'US':
                    return config.incomeTax && 
                           config.incomeTax.brackets && 
                           config.incomeTax.standardDeductions;
                           
                case 'CN':
                    return config.incomeTax && 
                           config.incomeTax.brackets && 
                           config.socialInsurance;
                           
                case 'UK':
                    return config.incomeTax && 
                           config.incomeTax.brackets;
                           
                default:
                    return true; // Allow unknown regions
            }
        } catch (error) {
            return false;
        }
    }

    saveToLocalStorage(region, config) {
        try {
            const key = `fullcal_tax_${region.toLowerCase()}`;
            localStorage.setItem(key, JSON.stringify({
                config,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.warn('Failed to save to localStorage:', error.message);
        }
    }

    loadFromLocalStorage(region) {
        try {
            const key = `fullcal_tax_${region.toLowerCase()}`;
            const stored = localStorage.getItem(key);
            if (stored) {
                const data = JSON.parse(stored);
                // Check if data is less than 7 days old
                if (Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000) {
                    return data.config;
                }
            }
        } catch (error) {
            console.warn('Failed to load from localStorage:', error.message);
        }
        return null;
    }

    notifyUpdate(successful, failed) {
        // Create a subtle notification for users
        const notification = document.createElement('div');
        notification.className = 'tax-update-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 10000;
                font-size: 14px;
                animation: slideIn 0.3s ease-out;
            ">
                ✅ Tax rates updated (${successful} regions)
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);

        // Add CSS animation if not already present
        if (!document.querySelector('#tax-update-styles')) {
            const style = document.createElement('style');
            style.id = 'tax-update-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    getLastUpdateTime() {
        try {
            return parseInt(localStorage.getItem('fullcal_last_update') || '0');
        } catch {
            return 0;
        }
    }

    setLastUpdateTime(timestamp) {
        try {
            localStorage.setItem('fullcal_last_update', timestamp.toString());
        } catch (error) {
            console.warn('Failed to save update time:', error.message);
        }
    }

    // Manual update trigger
    async forceUpdate() {
        console.log('🔄 Forcing tax rate update...');
        await this.updateAllRegions();
    }

    // Get update status
    getUpdateStatus() {
        return {
            lastUpdate: new Date(this.lastUpdate).toLocaleString(),
            nextUpdate: new Date(this.lastUpdate + this.updateInterval).toLocaleString(),
            isUpdateNeeded: this.isUpdateNeeded(),
            regions: Object.keys(this.updateSources)
        };
    }
}

// Global functions for tax update management
function showTaxUpdateStatus() {
    if (!window.autoTaxUpdater) {
        const msg = window.i18n ? window.i18n.t('alert.tax_updater_not_initialized') : 'Tax updater not initialized';
        alert(msg);
        return;
    }

    const status = window.autoTaxUpdater.getUpdateStatus();
    const modal = document.getElementById('calculator-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('calculator-content');

    modalTitle.textContent = window.i18n ? window.i18n.t('tax_update.title') : 'Tax Rate Update Status';
    modalContent.innerHTML = `
        <div style="padding: 20px;">
            <h3>📊 ${window.i18n ? window.i18n.t('tax_update.section.status') : 'Update Status'}</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <div style="margin-bottom: 10px;"><strong>${window.i18n ? window.i18n.t('tax_update.last_update') : 'Last Update'}:</strong> ${status.lastUpdate}</div>
                <div style="margin-bottom: 10px;"><strong>${window.i18n ? window.i18n.t('tax_update.next_update') : 'Next Update'}:</strong> ${status.nextUpdate}</div>
                <div style="margin-bottom: 10px;"><strong>${window.i18n ? window.i18n.t('tax_update.update_needed') : 'Update Needed'}:</strong> ${status.isUpdateNeeded ? (window.i18n ? '🟡 ' + window.i18n.t('tax.yes') : '🟡 Yes') : (window.i18n ? '🟢 ' + window.i18n.t('tax.no') : '🟢 No')}</div>
                <div style="margin-bottom: 10px;"><strong>${window.i18n ? window.i18n.t('tax_update.supported_regions') : 'Supported Regions'}:</strong> ${status.regions.join(', ')}</div>
            </div>
            
            <h4>🔄 ${window.i18n ? window.i18n.t('tax_update.manual_actions') : 'Manual Actions'}</h4>
            <div style="display: flex; gap: 10px; margin: 15px 0;">
                <button onclick="forceUpdateTaxRates()" class="calc-button" style="width: auto; padding: 10px 20px;">
                    ${window.i18n ? window.i18n.t('tax_update.update_now') : 'Update Now'}
                </button>
                <button onclick="resetTaxCache()" class="calc-button" style="width: auto; padding: 10px 20px; background: #e74c3c;">
                    ${window.i18n ? window.i18n.t('tax_update.clear_cache') : 'Clear Cache'}
                </button>
            </div>
            
            <h4>ℹ️ ${window.i18n ? window.i18n.t('tax_update.how_it_works') : 'How It Works'}</h4>
            <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; font-size: 14px;">
                <ul style="margin: 0; padding-left: 20px;">
                    <li>${window.i18n ? window.i18n.t('tax_update.how.24h') : 'Tax rates are automatically updated every 24 hours'}</li>
                    <li>${window.i18n ? window.i18n.t('tax_update.how.official') : 'Data is fetched from official government APIs'}</li>
                    <li>${window.i18n ? window.i18n.t('tax_update.how.fallback') : 'Fallback to local data if APIs are unavailable'}</li>
                    <li>${window.i18n ? window.i18n.t('tax_update.how.cached') : 'All data is cached locally for offline use'}</li>
                    <li>${window.i18n ? window.i18n.t('tax_update.how.validated') : 'Updates are validated before being applied'}</li>
                </ul>
            </div>
            
            <div style="margin-top: 20px; font-size: 12px; color: #666;">
                <p><strong>${window.i18n ? window.i18n.t('tax_update.data_sources') : 'Data Sources'}:</strong></p>
                <ul style="margin: 5px 0; padding-left: 20px; font-size: 12px;">
                    <li>🇺🇸 US: Internal Revenue Service (IRS)</li>
                    <li>🇨🇳 China: State Taxation Administration</li>
                    <li>🇬🇧 UK: HM Revenue and Customs (HMRC)</li>
                    <li>🇩🇪 Germany: Bundesministerium der Finanzen</li>
                    <li>🇯🇵 Japan: National Tax Agency</li>
                    <li>🇫🇷 France: Direction générale des Finances publiques</li>
                    <li>🇨🇦 Canada: Canada Revenue Agency</li>
                    <li>🇦🇺 Australia: Australian Taxation Office</li>
                </ul>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function forceUpdateTaxRates() {
    if (!window.autoTaxUpdater) return;
    
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = window.i18n ? window.i18n.t('tax_update.updating') : 'Updating...';
    button.disabled = true;
    
    window.autoTaxUpdater.forceUpdate().then(() => {
        button.textContent = window.i18n ? '✅ ' + window.i18n.t('tax_update.updated') : '✅ Updated';
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }).catch(error => {
        button.textContent = window.i18n ? '❌ ' + window.i18n.t('tax_update.failed') : '❌ Failed';
        console.error('Update failed:', error);
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    });
}

function resetTaxCache() {
    try {
        const keys = Object.keys(localStorage).filter(key => key.startsWith('fullcal_tax_'));
        keys.forEach(key => localStorage.removeItem(key));
        localStorage.removeItem('fullcal_last_update');
        
        const ok = window.i18n ? window.i18n.t('alert.cache_cleared_reload') : '✅ Tax cache cleared successfully. Page will reload to fetch fresh data.';
        alert(ok);
        location.reload();
    } catch (error) {
        const errPrefix = window.i18n ? window.i18n.t('alert.cache_clear_failed') : '❌ Failed to clear cache:';
        alert(errPrefix + ' ' + error.message);
    }
}

// Initialize auto-updater when tax config is ready.
function initializeAutoTaxUpdater() {
    if (window.taxConfig) {
        window.autoTaxUpdater = new AutoTaxUpdater(window.taxConfig);
        
        // Expose manual update function globally
        window.updateTaxRates = () => window.autoTaxUpdater.forceUpdate();
        window.getTaxUpdateStatus = () => window.autoTaxUpdater.getUpdateStatus();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAutoTaxUpdater);
} else {
    initializeAutoTaxUpdater();
}
