"use client";

import { useEffect, useState, useCallback } from "react";
import { getSettings, saveSettings, resetSettings, SystemSettings } from "../../../../services/settingsService";
import SettingsHeader from "../../../../components/dashboard/settings/SettingsHeader";
import SettingsSidebar from "../../../../components/dashboard/settings/SettingsSidebar";
import GeneralSettings from "../../../../components/dashboard/settings/GeneralSettings";
import MarketplaceSettings from "../../../../components/dashboard/settings/MarketplaceSettings";
import WhatsappSettings from "../../../../components/dashboard/settings/WhatsappSettings";
import AppearanceSettings from "../../../../components/dashboard/settings/AppearanceSettings";
import SecuritySettings from "../../../../components/dashboard/settings/SecuritySettings";
import PremiumConfirmModal from "../../../../components/common/PremiumConfirmModal";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [original, setOriginal] = useState<SystemSettings | null>(null);
  const [activeSection, setActiveSection] = useState("general");
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  useEffect(() => {
    const loaded = getSettings();
    setSettings(loaded);
    setOriginal(loaded);
  }, []);

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(original);

  const handleChange = (key: keyof SystemSettings, value: any) => {
    setSettings((prev) => prev ? { ...prev, [key]: value } : prev);
  };

  const handleSave = () => {
    if (!settings) return;
    saveSettings(settings);
    setOriginal({ ...settings });
    setSavedMessage("Pengaturan berhasil disimpan!");
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const handleReset = () => {
    setIsResetConfirmOpen(true);
  };

  const confirmReset = () => {
    const defaults = resetSettings();
    setSettings(defaults);
    setOriginal(defaults);
    setSavedMessage("Pengaturan berhasil direset ke default!");
    setIsResetConfirmOpen(false);
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const handleExport = () => {
    if (!settings) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `reuse_settings_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    setSavedMessage("Konfigurasi berhasil diexport!");
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const imported = JSON.parse(evt.target?.result as string) as SystemSettings;
          setSettings(imported);
          saveSettings(imported);
          setOriginal(imported);
          setSavedMessage("File konfigurasi berhasil diimport!");
          setTimeout(() => setSavedMessage(null), 3000);
        } catch {
          alert("File JSON tidak valid.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-3xl border border-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#145A3B] mx-auto" />
          <p className="text-gray-500 mt-4 font-semibold text-sm">Memuat pengaturan sistem...</p>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "general":     return <GeneralSettings settings={settings} onChange={handleChange} />;
      case "marketplace": return <MarketplaceSettings settings={settings} onChange={handleChange} />;
      case "whatsapp":    return <WhatsappSettings settings={settings} onChange={handleChange} />;
      case "appearance":  return <AppearanceSettings settings={settings} onChange={handleChange} />;
      case "security":    return <SecuritySettings settings={settings} onChange={handleChange} />;
      default:            return <GeneralSettings settings={settings} onChange={handleChange} />;
    }
  };

  return (
    <div className="space-y-6">
      <SettingsHeader
        hasChanges={hasChanges}
        onSave={handleSave}
        onReset={handleReset}
        onExport={handleExport}
        onImport={handleImport}
        savedMessage={savedMessage}
      />

      <div className="flex gap-8 items-start">
        <SettingsSidebar active={activeSection} onChange={setActiveSection} hasChanges={hasChanges} />
        <div className="flex-1 min-w-0">{renderSection()}</div>
      </div>

      <PremiumConfirmModal
        isOpen={isResetConfirmOpen}
        title="Reset Pengaturan?"
        message="Apakah Anda yakin ingin meriset semua konfigurasi sistem ke nilai default pabrik?"
        confirmText="Ya, Reset"
        onConfirm={confirmReset}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}
