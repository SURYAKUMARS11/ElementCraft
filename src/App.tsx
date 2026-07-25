import { useState, useEffect } from 'react';
import { TEMPLATES } from './templates';
import type { TemplateDefinition, TemplateCustomization, RenderMode, DeviceFrame } from './types/template';
import { Header } from './components/Header';
import type { ActiveNavTab } from './components/Header';
import { LandingShowcase } from './components/LandingShowcase';
import { TemplateGalleryView } from './components/TemplateGalleryView';
import { DocsView } from './components/DocsView';
import { TemplateSelector } from './components/TemplateSelector';
import { CustomizerSidebar } from './components/CustomizerSidebar';
import { PreviewStage } from './components/PreviewStage';
import type { StageViewMode } from './components/PreviewStage';
import { CodeExporterModal } from './components/CodeExporterModal';
import './styles/studio.css';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('landing');
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

  const handleLaunchStudioWithTemplate = (templateId?: string) => {
    if (templateId) {
      const found = TEMPLATES.find((t) => t.id === templateId);
      if (found) {
        setSelectedTemplate(found);
        setCustomization(found.defaultCustomization);
      }
    }
    setActiveTab('studio');
  };

  const handleResetCustomization = () => {
    setCustomization(selectedTemplate.defaultCustomization);
  };

  const activeRenderMode: RenderMode = stageMode === 'compare' ? 'email' : stageMode;

  return (
    <div className="studio-app">
      {/* Top Header Navbar */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenExporter={() => setExporterOpen(true)}
      />

      {/* Main Content Area based on Active Tab */}
      {activeTab === 'landing' && (
        <LandingShowcase
          onLaunchStudio={handleLaunchStudioWithTemplate}
          onOpenExporter={() => setExporterOpen(true)}
        />
      )}

      {activeTab === 'gallery' && (
        <TemplateGalleryView onSelectAndLaunch={handleLaunchStudioWithTemplate} />
      )}

      {activeTab === 'docs' && <DocsView />}

      {activeTab === 'studio' && (
        <>
          {/* Preset & Category Compact Bar */}
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
          />

          {/* Studio Workspace Area */}
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
        </>
      )}

      {/* Export Center Modal */}
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
