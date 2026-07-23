import React from 'react';
import { Sparkles, ExternalLink, Award, FileCode2, Code, Sun, Moon } from 'lucide-react';

interface Props {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenExporter: () => void;
}

export const Header: React.FC<Props> = ({ theme, onToggleTheme, onOpenExporter }) => {
  return (
    <header className="studio-header">
      <div className="header-brand">
        <div className="brand-icon-wrapper">
          <Sparkles size={22} />
        </div>
        <div>
          <h1 className="brand-title">
            ElementCraft <span className="brand-tag">Studio 2.0</span>
          </h1>
          <p className="brand-subtitle">
            Powered by <strong>@unlayer/react-elements</strong>
          </p>
        </div>
      </div>

      <div className="header-center">
        <Award size={16} className="trophy-gold" />
        <span>Build with Elements Challenge</span>
        <span className="deadline-pill">July 31, 2026</span>
      </div>

      <div className="header-actions">
        <button className="theme-toggle-btn" onClick={onToggleTheme}>
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Studio'}</span>
        </button>

        <button className="btn-export-trigger" onClick={onOpenExporter}>
          <FileCode2 size={18} />
          <span>Export Center</span>
        </button>

        <a
          href="https://github.com/unlayer/elements"
          target="_blank"
          rel="noreferrer"
          className="btn-icon-link"
          title="Unlayer Elements Repository"
        >
          <Code size={18} />
        </a>

        <a
          href="https://docs.unlayer.com"
          target="_blank"
          rel="noreferrer"
          className="btn-icon-link"
          title="Unlayer Documentation"
        >
          <ExternalLink size={18} />
        </a>
      </div>
    </header>
  );
};
