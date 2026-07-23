import React from 'react';
import { Sparkles, ExternalLink, Award, FileCode2, Code } from 'lucide-react';

interface Props {
  onOpenExporter: () => void;
}

export const Header: React.FC<Props> = ({ onOpenExporter }) => {
  return (
    <header className="studio-header">
      <div className="header-brand">
        <div className="brand-icon">
          <Sparkles className="icon-glow" size={22} />
        </div>
        <div className="brand-text">
          <h1>
            ElementCraft <span className="badge-pill">Studio</span>
          </h1>
          <p className="brand-subtitle">
            Powered by <strong>@unlayer/react-elements</strong>
          </p>
        </div>
      </div>

      <div className="challenge-banner">
        <Award size={16} className="trophy-icon" />
        <span>Build with Elements Challenge Submission</span>
        <span className="deadline-badge">July 31, 2026</span>
      </div>

      <div className="header-actions">
        <button className="btn-export-main" onClick={onOpenExporter}>
          <FileCode2 size={18} />
          <span>Export HTML &amp; Code</span>
        </button>

        <a
          href="https://github.com/unlayer/elements"
          target="_blank"
          rel="noreferrer"
          className="btn-icon-link"
          title="Unlayer Elements GitHub Repository"
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
