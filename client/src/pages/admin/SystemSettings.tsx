import React, { useState } from 'react';
import { 
  Settings, Shield, Database, Bell, 
  Server, 
  Save, RefreshCw, AlertTriangle, 
  Upload, Download
} from 'lucide-react';

interface SystemConfig {
  general: {
    instituteName: string;
    instituteCode: string;
    academicYear: string;
    timezone: string;
    language: string;
    dateFormat: string;
  };
  security: {
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      expiryDays: number;
    };
    sessionTimeout: number;
    maxLoginAttempts: number;
    twoFactorAuth: boolean;
  };
  notifications: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    pushEnabled: boolean;
    defaultSender: string;
    smtpServer: string;
    smtpPort: number;
  };
  database: {
    backupFrequency: string;
    retentionPeriod: number;
    compressionEnabled: boolean;
    encryptionEnabled: boolean;
  };
  system: {
    maintenanceMode: boolean;
    debugMode: boolean;
    logLevel: string;
    maxFileSize: number;
    allowedFileTypes: string[];
  };
}

const SystemSettings: React.FC = () => {
  const [config, setConfig] = useState<SystemConfig>({
    general: {
      instituteName: 'CAMPUSFLOW University',
      instituteCode: 'CFU2024',
      academicYear: '2024-25',
      timezone: 'Asia/Kolkata',
      language: 'English',
      dateFormat: 'DD/MM/YYYY'
    },
    security: {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expiryDays: 90
      },
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      twoFactorAuth: false
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: false,
      pushEnabled: true,
      defaultSender: 'noreply@campusflow.edu',
      smtpServer: 'smtp.gmail.com',
      smtpPort: 587
    },
    database: {
      backupFrequency: 'daily',
      retentionPeriod: 30,
      compressionEnabled: true,
      encryptionEnabled: true
    },
    system: {
      maintenanceMode: false,
      debugMode: false,
      logLevel: 'info',
      maxFileSize: 10,
      allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png', 'xlsx']
    }
  });

  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications' | 'database' | 'system'>('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const updateConfig = (section: keyof SystemConfig, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const updateNestedConfig = (section: keyof SystemConfig, nestedField: string, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedField]: {
          ...(prev[section] as any)[nestedField],
          [field]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
    setHasChanges(false);
    alert('Settings saved successfully!');
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset logic would go here
      setHasChanges(true);
    }
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'campusflow-settings.json';
    link.click();
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedConfig = JSON.parse(e.target?.result as string);
          setConfig(importedConfig);
          setHasChanges(true);
          alert('Settings imported successfully!');
        } catch (error) {
          alert('Invalid settings file!');
        }
      };
      reader.readAsText(file);
    }
  };

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        activeTab === id
          ? 'bg-primary-50 text-primary-700 border border-primary-200'
          : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-xl border border-secondary-200 p-6">
      <h3 className="text-lg font-semibold text-secondary-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  const FormField = ({ label, children, description }: { label: string; children: React.ReactNode; description?: string }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-secondary-700">{label}</label>
      {children}
      {description && <p className="text-xs text-secondary-500">{description}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-secondary-900">System Settings</h1>
          <p className="text-secondary-600 mt-1">Configure system parameters and policies</p>
        </div>
        <div className="flex space-x-3">
          <input
            type="file"
            accept=".json"
            onChange={importSettings}
            className="hidden"
            id="import-settings"
          />
          <label htmlFor="import-settings" className="btn-secondary flex items-center cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </label>
          <button onClick={exportSettings} className="btn-secondary flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button onClick={resetToDefaults} className="btn-secondary flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </button>
          <button 
            onClick={saveSettings}
            disabled={!hasChanges || saving}
            className="btn-primary flex items-center disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Changes Alert */}
      {hasChanges && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-orange-800 font-medium">Unsaved Changes</p>
            <p className="text-orange-700 text-sm">You have unsaved changes. Don't forget to save your settings.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-secondary-200 p-4 space-y-2">
            <TabButton id="general" label="General" icon={Settings} />
            <TabButton id="security" label="Security" icon={Shield} />
            <TabButton id="notifications" label="Notifications" icon={Bell} />
            <TabButton id="database" label="Database" icon={Database} />
            <TabButton id="system" label="System" icon={Server} />
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <FormSection title="Institute Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Institute Name">
                    <input
                      type="text"
                      value={config.general.instituteName}
                      onChange={(e) => updateConfig('general', 'instituteName', e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </FormField>
                  <FormField label="Institute Code">
                    <input
                      type="text"
                      value={config.general.instituteCode}
                      onChange={(e) => updateConfig('general', 'instituteCode', e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </FormField>
                  <FormField label="Academic Year">
                    <input
                      type="text"
                      value={config.general.academicYear}
                      onChange={(e) => updateConfig('general', 'academicYear', e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </FormField>
                  <FormField label="Timezone">
                    <select
                      value={config.general.timezone}
                      onChange={(e) => updateConfig('general', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                    </select>
                  </FormField>
                </div>
              </FormSection>

              <FormSection title="Localization">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Language">
                    <select
                      value={config.general.language}
                      onChange={(e) => updateConfig('general', 'language', e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Spanish">Spanish</option>
                    </select>
                  </FormField>
                  <FormField label="Date Format">
                    <select
                      value={config.general.dateFormat}
                      onChange={(e) => updateConfig('general', 'dateFormat', e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </FormField>
                </div>
              </FormSection>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <FormSection title="Password Policy">
                <div className="space-y-4">
                  <FormField label="Minimum Length">
                    <input
                      type="number"
                      min="6"
                      max="20"
                      value={config.security.passwordPolicy.minLength}
                      onChange={(e) => updateNestedConfig('security', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </FormField>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={config.security.passwordPolicy.requireUppercase}
                          onChange={(e) => updateNestedConfig('security', 'passwordPolicy', 'requireUppercase', e.target.checked)}
                          className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-secondary-700">Require uppercase letters</span>
                      </label>
                    </FormField>
                    <FormField label="">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={config.security.passwordPolicy.requireNumbers}
                          onChange={(e) => updateNestedConfig('security', 'passwordPolicy', 'requireNumbers', e.target.checked)}
                          className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-secondary-700">Require numbers</span>
                      </label>
                    </FormField>
                    <FormField label="">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={config.security.passwordPolicy.requireSpecialChars}
                          onChange={(e) => updateNestedConfig('security', 'passwordPolicy', 'requireSpecialChars', e.target.checked)}
                          className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-secondary-700">Require special characters</span>
                      </label>
                    </FormField>
                    <FormField label="Password Expiry (days)">
                      <input
                        type="number"
                        min="30"
                        max="365"
                        value={config.security.passwordPolicy.expiryDays}
                        onChange={(e) => updateNestedConfig('security', 'passwordPolicy', 'expiryDays', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                    </FormField>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Session & Authentication">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Session Timeout (minutes)">
                    <input
                      type="number"
                      min="5"
                      max="120"
                      value={config.security.sessionTimeout}
                      onChange={(e) => updateConfig('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </FormField>
                  <FormField label="Max Login Attempts">
                    <input
                      type="number"
                      min="3"
                      max="10"
                      value={config.security.maxLoginAttempts}
                      onChange={(e) => updateConfig('security', 'maxLoginAttempts', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </FormField>
                </div>
                
                <FormField label="">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={config.security.twoFactorAuth}
                      onChange={(e) => updateConfig('security', 'twoFactorAuth', e.target.checked)}
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-secondary-700">Enable Two-Factor Authentication</span>
                  </label>
                </FormField>
              </FormSection>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <FormSection title="Notification Channels">
                <div className="space-y-4">
                  <FormField label="">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={config.notifications.emailEnabled}
                        onChange={(e) => updateConfig('notifications', 'emailEnabled', e.target.checked)}
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-secondary-700">Enable Email Notifications</span>
                    </label>
                  </FormField>
                  <FormField label="">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={config.notifications.smsEnabled}
                        onChange={(e) => updateConfig('notifications', 'smsEnabled', e.target.checked)}
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-secondary-700">Enable SMS Notifications</span>
                    </label>
                  </FormField>
                  <FormField label="">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={config.notifications.pushEnabled}
                        onChange={(e) => updateConfig('notifications', 'pushEnabled', e.target.checked)}
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-secondary-700">Enable Push Notifications</span>
                    </label>
                  </FormField>
                </div>
              </FormSection>

              <FormSection title="Email Configuration">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Default Sender Email">
                    <input
                      type="email"
                      value={config.notifications.defaultSender}
                      onChange={(e) => updateConfig('notifications', 'defaultSender', e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </FormField>
                  <FormField label="SMTP Server">
                    <input
                      type="text"
                      value={config.notifications.smtpServer}
                      onChange={(e) => updateConfig('notifications', 'smtpServer', e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </FormField>
                  <FormField label="SMTP Port">
                    <input
                      type="number"
                      value={config.notifications.smtpPort}
                      onChange={(e) => updateConfig('notifications', 'smtpPort', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </FormField>
                </div>
              </FormSection>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <FormSection title="Backup Configuration">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Backup Frequency">
                    <select
                      value={config.database.backupFrequency}
                      onChange={(e) => updateConfig('database', 'backupFrequency', e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </FormField>
                  <FormField label="Retention Period (days)">
                    <input
                      type="number"
                      min="7"
                      max="365"
                      value={config.database.retentionPeriod}
                      onChange={(e) => updateConfig('database', 'retentionPeriod', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </FormField>
                </div>
                
                <div className="space-y-4">
                  <FormField label="">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={config.database.compressionEnabled}
                        onChange={(e) => updateConfig('database', 'compressionEnabled', e.target.checked)}
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-secondary-700">Enable Backup Compression</span>
                    </label>
                  </FormField>
                  <FormField label="">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={config.database.encryptionEnabled}
                        onChange={(e) => updateConfig('database', 'encryptionEnabled', e.target.checked)}
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-secondary-700">Enable Backup Encryption</span>
                    </label>
                  </FormField>
                </div>
              </FormSection>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <FormSection title="System Mode">
                <div className="space-y-4">
                  <FormField label="">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={config.system.maintenanceMode}
                        onChange={(e) => updateConfig('system', 'maintenanceMode', e.target.checked)}
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-secondary-700">Maintenance Mode</span>
                    </label>
                  </FormField>
                  <FormField label="">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={config.system.debugMode}
                        onChange={(e) => updateConfig('system', 'debugMode', e.target.checked)}
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-secondary-700">Debug Mode</span>
                    </label>
                  </FormField>
                </div>
              </FormSection>

              <FormSection title="File Upload Settings">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Max File Size (MB)">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={config.system.maxFileSize}
                      onChange={(e) => updateConfig('system', 'maxFileSize', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </FormField>
                  <FormField label="Log Level">
                    <select
                      value={config.system.logLevel}
                      onChange={(e) => updateConfig('system', 'logLevel', e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    >
                      <option value="error">Error</option>
                      <option value="warn">Warning</option>
                      <option value="info">Info</option>
                      <option value="debug">Debug</option>
                    </select>
                  </FormField>
                </div>
                
                <FormField label="Allowed File Types" description="Comma-separated list of file extensions">
                  <input
                    type="text"
                    value={config.system.allowedFileTypes.join(', ')}
                    onChange={(e) => updateConfig('system', 'allowedFileTypes', e.target.value.split(', ').map(s => s.trim()))}
                    className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="pdf, doc, docx, jpg, png"
                  />
                </FormField>
              </FormSection>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;