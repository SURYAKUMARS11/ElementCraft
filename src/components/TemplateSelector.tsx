import React from 'react';
import { TEMPLATES } from '../templates';
import type { TemplateDefinition } from '../types/template';
import { Mail, FileText, Sparkles, LayoutGrid } from 'lucide-react';

interface Props {
  selectedTemplate: TemplateDefinition;
  onSelectTemplate: (template: TemplateDefinition) => void;
}

export const TemplateSelector: React.FC<Props> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  const [filter, setFilter] = React.useState<'all' | 'email' | 'document'>('all');

  const filteredTemplates = TEMPLATES.filter(
    (t) => filter === 'all' || t.category === filter
  );

  return (
    <div className="template-bar">
      <div className="category-filter-tabs">
        <div className="filter-left">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <Sparkles size={14} /> All Presets ({TEMPLATES.length})
          </button>

          <button
            className={`filter-btn ${filter === 'email' ? 'active' : ''}`}
            onClick={() => setFilter('email')}
          >
            <Mail size={14} /> Emails (3)
          </button>

          <button
            className={`filter-btn ${filter === 'document' ? 'active' : ''}`}
            onClick={() => setFilter('document')}
          >
            <FileText size={14} /> Documents (2)
          </button>
        </div>

        <div className="renderer-info-pill">
          <LayoutGrid size={14} /> Select a template to edit &amp; render in real-time
        </div>
      </div>

      <div className="template-card-grid">
        {filteredTemplates.map((t) => {
          const isSelected = selectedTemplate.id === t.id;
          return (
            <button
              key={t.id}
              className={`tpl-card ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectTemplate(t)}
            >
              <div className="tpl-card-top">
                <span className={`cat-pill ${t.category}`}>
                  {t.category === 'email' ? <Mail size={11} /> : <FileText size={11} />}
                  {t.category.toUpperCase()}
                </span>
                <span className="tpl-badge">{t.badge}</span>
              </div>
              <h3 className="tpl-title">{t.name}</h3>
              <p className="tpl-desc">{t.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
