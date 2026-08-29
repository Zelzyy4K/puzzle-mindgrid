import React from 'react';
import { Settings, Bell, Palette, Clock, Shield, Info, RefreshCw } from 'lucide-react';
import { loadData, updateSettings } from '../utils/storage';

export default function SettingsScreen() {
  const [data, setData] = React.useState(loadData());

  const handleToggle = (key) => {
    const newSettings = {
      ...data.settings,
      [key]: !data.settings[key],
    };
    updateSettings(newSettings);
    setData({ ...data, settings: newSettings });
  };

  const handleThemeChange = (theme) => {
    const newSettings = {
      ...data.settings,
      theme,
    };
    updateSettings(newSettings);
    setData({ ...data, settings: newSettings });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings size={24} className="text-accent" />
          <h1 className="text-3xl font-bold text-primary">SETTINGS</h1>
        </div>
        <p className="text-secondary">Customize your puzzle experience</p>
      </div>

      <div className="space-y-8">
        {/* Preferences */}
        <section className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-primary mb-4">PREFERENCES</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-primary">Sound Effects</div>
                <p className="text-sm text-secondary">Enable puzzle sounds</p>
              </div>
              <button
                onClick={() => handleToggle('sound')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  data.settings.sound ? 'bg-accent' : 'bg-elevated'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-background transform transition-transform ${
                    data.settings.sound ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-primary">Reduced Motion</div>
                <p className="text-sm text-secondary">Minimize animations</p>
              </div>
              <button
                onClick={() => handleToggle('reducedMotion')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  data.settings.reducedMotion ? 'bg-accent' : 'bg-elevated'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-background transform transition-transform ${
                    data.settings.reducedMotion ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-primary">Timer Visible</div>
                <p className="text-sm text-secondary">Show timer during puzzles</p>
              </div>
              <button
                onClick={() => handleToggle('timerVisible')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  data.settings.timerVisible ? 'bg-accent' : 'bg-elevated'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-background transform transition-transform ${
                    data.settings.timerVisible ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Theme Selection */}
        <section className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette size={20} className="text-accent" />
            <h2 className="text-lg font-bold text-primary">THEME</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['dark', 'light', 'system'].map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                className={`p-4 rounded-lg border transition-all ${
                  data.settings.theme === theme
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent'
                }`}
              >
                <div className="text-center">
                  <div className={`text-sm font-medium mb-1 capitalize ${
                    data.settings.theme === theme ? 'text-accent' : 'text-primary'
                  }`}>
                    {theme}
                  </div>
                  <div className="text-xs text-secondary">Prefer {theme} mode</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Account */}
        <section className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={20} className="text-primary" />
            <h2 className="text-lg font-bold text-primary">ACCOUNT</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-primary">Reset Progress</div>
                <p className="text-sm text-secondary">Start fresh (cannot be undone)</p>
              </div>
              <button className="px-4 py-2 text-sm text-error border border-error/20 rounded hover:bg-error/10 transition-colors">
                Reset
              </button>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-sm text-secondary">
                Data stored locally on your device
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Info size={20} className="text-secondary" />
            <h2 className="text-lg font-bold text-primary">ABOUT</h2>
          </div>
          <div className="space-y-3">
            <div className="text-secondary">
              <span className="font-medium text-primary">MINDGRID</span> is a collection of logic puzzles designed to challenge your thinking.
            </div>
            <div className="text-sm text-secondary">
              Version 1.0.0 • Puzzle platform
            </div>
            <div className="pt-4 border-t border-border text-xs text-secondary">
              Created with precision for those who think differently.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
