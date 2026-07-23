import { useState } from 'react';
import { TEMPLATES } from './templates';
import type { TemplateDefinition, TemplateCustomization, RenderMode, DeviceFrame } from './types/template';
import { Header } from './components/Header';
import { TemplateSelector } from './components/TemplateSelector';
import { CustomizerSidebar } from './components/CustomizerSidebar';
import { PreviewStage } from './components/PreviewStage';
import { CodeExporterModal } from './components/CodeExporterModal';
import './styles/studio.css';

export function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateDefinition>(TEMPLATES[0]);
  const [customization, setCustomization] = useState<TemplateCustomization>(
    TEMPLATES[0].defaultCustomization
  );
  const [renderMode, setRenderMode] = useState<RenderMode>(TEMPLATES[0].recommendedMode);
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrame>('desktop');
  const [exporterOpen, setExporterOpen] = useState<boolean>(false);

  const handleSelectTemplate = (template: TemplateDefinition) => {
    setSelectedTemplate(template);
    setCustomization(template.defaultCustomization);
    setRenderMode(template.recommendedMode);
  };

  const handleResetCustomization = () => {
    setCustomization(selectedTemplate.defaultCustomization);
  };

  return (
    <div className="studio-app">
      {/* Top Navigation */}
      <Header onOpenExporter={() => setExporterOpen(true)} />

      {/* Preset & Category Selector */}
      <TemplateSelector
        selectedTemplate={selectedTemplate}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Main Workspace */}
      <div className="studio-workspace">
        {/* Customization Sidebar */}
        <CustomizerSidebar
          customization={customization}
          onChange={setCustomization}
          onReset={handleResetCustomization}
        />

        {/* Viewport Stage */}
        <PreviewStage
          template={selectedTemplate}
          customization={customization}
          renderMode={renderMode}
          onRenderModeChange={setRenderMode}
          deviceFrame={deviceFrame}
          onDeviceFrameChange={setDeviceFrame}
        />
      </div>

      {/* Code Export Modal */}
      <CodeExporterModal
        isOpen={exporterOpen}
        onClose={() => setExporterOpen(false)}
        template={selectedTemplate}
        customization={customization}
        renderMode={renderMode}
      />
    </div>
  );
}

export default App;
