import { useState, useEffect } from 'react';
import { TEMPLATES } from './templates';
import type { TemplateDefinition, TemplateCustomization, RenderMode, DeviceFrame } from './types/template';
import { Header } from './components/Header';
import { TemplateSelector } from './components/TemplateSelector';
import { CustomizerSidebar } from './components/CustomizerSidebar';
import { PreviewStage } from './components/PreviewStage';
import type { StageViewMode } from './components/PreviewStage';
import { CodeExporterModal } from './components/CodeExporterModal';
import './styles/studio.css';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateDefinition>(TEMPLATES[0]);
  const [customization, setCustomization] = useState<TemplateCustomization>(
    TEMPLATES[0].defaultCustomization
  );
  const [stageMode, setStageMode] = useState<StageViewMode>('compare');
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrame>('desktop');
  const [exporterOpen, setExporterOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectTemplate = (template: TemplateDefinition) => {
    setSelectedTemplate(template);
    setCustomization(template.defaultCustomization);
  };

  const handleResetCustomization = () => {
    setCustomization(selectedTemplate.defaultCustomization);
  };

  const activeRenderMode: RenderMode = stageMode === 'compare' ? 'email' : stageMode;

  return (
    <div className="studio-app">
      {/* Top Header */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenExporter={() => setExporterOpen(true)}
      />

      {/* Preset & Category Toolbar */}
      <TemplateSelector
        selectedTemplate={selectedTemplate}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Workspace Area */}
      <div className="studio-workspace-area">
        {/* Left Form Editor */}
        <CustomizerSidebar
          customization={customization}
          onChange={setCustomization}
          onReset={handleResetCustomization}
        />

        {/* Right Preview Stage */}
        <PreviewStage
          template={selectedTemplate}
          customization={customization}
          stageMode={stageMode}
          onStageModeChange={setStageMode}
          deviceFrame={deviceFrame}
          onDeviceFrameChange={setDeviceFrame}
        />
      </div>

      {/* Export Drawer */}
      <CodeExporterModal
        isOpen={exporterOpen}
        onClose={() => setExporterOpen(false)}
        template={selectedTemplate}
        customization={customization}
        renderMode={activeRenderMode}
      />
    </div>
  );
}

export default App;
