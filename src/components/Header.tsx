import React, { useState } from 'react';
import { Sparkles, ExternalLink, FileCode2, Code, Sun, Moon, Home, Sliders, LayoutGrid, BookOpen, Menu, X } from 'lucide-react';

export type ActiveNavTab = 'landing' | 'studio' | 'gallery' | 'docs';

interface Props {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenExporter: () => void;
}

export const Header: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  theme,
  onToggleTheme,
  onOpenExporter,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: ActiveNavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="studio-header">
      <div className="header-brand" onClick={() => handleNavClick('landing')} style={{ cursor: 'pointer' }}>
        <div className="brand-icon-wrapper">
          <Sparkles size={22} />
        </div>
        <div>
          <h1 className="brand-title">
            ElementCraft <span className="brand-tag">Studio</span>
          </h1>
          <p className="brand-subtitle">
            Powered by <strong>@unlayer/react-elements</strong>
          </p>
        </div>
      </div>

      {/* Mobile Menu Hamburger Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Mobile Menu"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Navigation Tabs */}
      <nav className={`header-nav-center ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <button
          className={`nav-link ${activeTab === 'landing' ? 'active' : ''}`}
          onClick={() => handleNavClick('landing')}
        >
          <Home size={15} /> Home Showcase
        </button>

        <button
          className={`nav-link ${activeTab === 'studio' ? 'active' : ''}`}
          onClick={() => handleNavClick('studio')}
        >
          <Sliders size={15} /> Live Studio Builder
        </button>

        <button
          className={`nav-link ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => handleNavClick('gallery')}
        >
          <LayoutGrid size={15} /> Template Suite
        </button>

        <button
          className={`nav-link ${activeTab === 'docs' ? 'active' : ''}`}
          onClick={() => handleNavClick('docs')}
        >
          <BookOpen size={15} /> Specs &amp; Docs
        </button>
      </nav>

      {/* Action Controls */}
      <div className={`header-actions ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <button className="theme-toggle-btn" onClick={onToggleTheme} title="Toggle Light/Dark Studio">
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <button
          className="btn-export-trigger"
          onClick={() => {
            onOpenExporter();
            setMobileMenuOpen(false);
          }}
        >
          <FileCode2 size={16} />
          <span>Export Center</span>
        </button>

        <a
          href="https://github.com/unlayer/elements"
          target="_blank"
          rel="noreferrer"
          className="btn-icon-link"
          title="Unlayer Elements Repository"
        >
          <Code size={16} />
        </a>

        <a
          href="https://docs.unlayer.com"
          target="_blank"
          rel="noreferrer"
          className="btn-icon-link"
          title="Unlayer Documentation"
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </header>
  );
};
