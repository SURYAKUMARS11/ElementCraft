import { useState, useEffect } from 'react';
import { TEMPLATES } from './templates';
import type { TemplateDefinition, TemplateCustomization, RenderMode } from './types/template';
import { Header } from './components/Header';
import type { ActiveNavTab } from './components/Header';
import { LandingShowcase } from './components/LandingShowcase';
import { TemplateGalleryView } from './components/TemplateGalleryView';
import { DocsView } from './components/DocsView';
import { StudioWorkspace } from './components/StudioWorkspace';
import { CodeExporterModal } from './components/CodeExporterModal';
import './styles/studio.css';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('landing');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateDefinition>(TEMPLATES[0]);
  const [customization, setCustomization] = useState<TemplateCustomization>(
    TEMPLATES[0].defaultCustomization
  );
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

  const activeRenderMode: RenderMode = selectedTemplate.recommendedMode;

  return (
    <div className="studio-app">
      {/* 1. STANDALONE FULL-SCREEN STUDIO WORKSPACE PAGE */}
      {activeTab === 'studio' ? (
        <StudioWorkspace
          onBackToHome={() => setActiveTab('landing')}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleSelectTemplate}
          customization={customization}
          onCustomizationChange={setCustomization}
          onResetCustomization={handleResetCustomization}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenExporter={() => setExporterOpen(true)}
        />
      ) : (
        /* 2. LANDING SHOWCASE & WEBSITE PAGES WITH LANDING HEADER */
        <>
          <Header
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onOpenExporter={() => setExporterOpen(true)}
          />

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
        </>
      )}

      {/* Code Export Center Drawer */}
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
