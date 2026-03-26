import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, RefreshCw, Upload, Check } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { THEME_PRESETS } from '../store/themePresets';
import clsx from 'clsx';

const Settings = () => {
  const { brokerName, setBrokerName, setLogoUrl, toggleTheme, themeMode, colors, setThemeColors } = useThemeStore();
  const [localName, setLocalName] = useState(brokerName);
  
  const handleColorChange = (presetKey: string) => {
    const newColors = THEME_PRESETS[presetKey];
    if (newColors) {
      setThemeColors(newColors);
    }
  };

  const handleSave = () => {
    setBrokerName(localName);
    alert('Configurações salvas com sucesso!');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações White-Label</h1>
          <p className="text-gray-500 dark:text-gray-400">Personalize a identidade da plataforma</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <SettingsIcon className="text-brand-500" size={24} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Geral</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome da Corretora</label>
              <input 
                type="text" 
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-colors text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Logo</label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300 w-full sm:w-auto">
                  <Upload size={18} />
                  <span>Upload Logo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>
                <span className="text-xs text-gray-500 dark:text-gray-400">Recomendado: PNG transparente</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Appearance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <RefreshCw className="text-brand-500" size={24} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Aparência</h3>
          </div>

          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Modo Escuro</span>
                <button 
                  onClick={toggleTheme}
                  className={clsx(
                    "w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500",
                    themeMode === 'dark' ? "bg-brand-600" : "bg-gray-300"
                  )}
                >
                  <div className={clsx(
                    "w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out",
                    themeMode === 'dark' ? "translate-x-6" : "translate-x-0"
                  )} />
                </button>
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tema da Marca</label>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                   {Object.entries(THEME_PRESETS).map(([key, preset]) => {
                      // Using the '500' shade for the preview circle
                      const colorValue = preset.brand[500]; // e.g., '14 165 233'
                      // Convert to CSS readable RGB if it's space separated
                      const bgStyle = `rgb(${colorValue})`; 
                      
                      const isSelected = colors.brand[500] === preset.brand[500];

                      return (
                        <button
                          key={key}
                          onClick={() => handleColorChange(key)}
                          className={clsx(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
                            isSelected ? "ring-2 ring-gray-900 dark:ring-white scale-110" : ""
                          )}
                          style={{ backgroundColor: bgStyle }}
                          title={key.charAt(0).toUpperCase() + key.slice(1)}
                        >
                          {isSelected && <Check size={16} className="text-white drop-shadow-md" />}
                        </button>
                      );
                   })}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                   Selecione uma das paletas de cores pré-definidas para alterar a identidade visual de toda a aplicação instantaneamente.
                </p>
             </div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto"
        >
          <Save size={20} />
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default Settings;
