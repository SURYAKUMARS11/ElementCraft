import React, { useState } from 'react';
import { TEMPLATES } from '../templates';
import type { TemplateDefinition } from '../types/template';
import { Sparkles, Mail, Printer, ArrowRight, Search, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  onSelectAndLaunch: (templateId: string) => void;
}

export const TemplateGalleryView: React.FC<Props> = ({ onSelectAndLaunch }) => {
  const [filter, setFilter] = useState<'all' | 'email' | 'document'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = TEMPLATES.filter((t) => {
    const matchesCategory = filter === 'all' || t.category === filter;
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="gallery-view-container">
      {/* Gallery Header */}
      <div className="gallery-header-block">
        <div className="gallery-badge">
          <Sparkles size={16} className="text-purple" />
          <span>ORIGINAL TEMPLATE LIBRARY</span>
        </div>
        <h1>Template Gallery Suite</h1>
        <p>Explore 5 production-ready email and document templates built natively with <code>@unlayer/react-elements</code>.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="gallery-toolbar-row">
        <div className="filter-pill-group">
          <button
            className={`gallery-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Templates ({TEMPLATES.length})
          </button>
          <button
            className={`gallery-filter-btn ${filter === 'email' ? 'active' : ''}`}
            onClick={() => setFilter('email')}
          >
            <Mail size={14} /> Emails (3)
          </button>
          <button
            className={`gallery-filter-btn ${filter === 'document' ? 'active' : ''}`}
            onClick={() => setFilter('document')}
          >
            <Printer size={14} /> Documents (2)
          </button>
        </div>

        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Template Grid */}
      <div className="gallery-grid-layout">
        {filteredTemplates.map((t: TemplateDefinition) => (
          <div key={t.id} className="gallery-card-item">
            <div className="gallery-card-header">
              <span className={`cat-pill ${t.category}`}>
                {t.category === 'email' ? <Mail size={12} /> : <Printer size={12} />}
                {t.category.toUpperCase()}
              </span>
              <span className="badge-pill-small">{t.badge}</span>
            </div>

            <h3 className="gallery-card-title">{t.name}</h3>
            <p className="gallery-card-desc">{t.description}</p>

            <div className="gallery-card-specs">
              <div className="spec-tag">
                <CheckCircle2 size={13} className="text-emerald" />
                <span>{t.recommendedMode.toUpperCase()} RENDERER</span>
              </div>
              <div className="spec-tag">
                <ShieldCheck size={13} className="text-indigo" />
                <span>TYPE-SAFE JSX</span>
              </div>
            </div>

            <div className="gallery-card-actions">
              <button
                className="btn-launch-gallery"
                onClick={() => onSelectAndLaunch(t.id)}
              >
                <span>Customize in Studio</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
