import React from 'react';
import { TEMPLATES } from '../templates';
import type { TemplateDefinition } from '../types/template';
import { Mail, FileText, Sparkles } from 'lucide-react';

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
    <div className="template-selector-container">
      <div className="selector-tabs">
        <button
          className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          <Sparkles size={14} /> All Templates ({TEMPLATES.length})
        </button>
        <button
          className={`tab-btn ${filter === 'email' ? 'active' : ''}`}
          onClick={() => setFilter('email')}
        >
          <Mail size={14} /> Emails (3)
        </button>
        <button
          className={`tab-btn ${filter === 'document' ? 'active' : ''}`}
          onClick={() => setFilter('document')}
        >
          <FileText size={14} /> Documents (2)
        </button>
      </div>

      <div className="template-grid">
        {filteredTemplates.map((t) => {
          const isSelected = selectedTemplate.id === t.id;
          return (
            <div
              key={t.id}
              className={`template-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectTemplate(t)}
            >
              <div className="card-header">
                <span className={`category-tag tag-${t.category}`}>
                  {t.category === 'email' ? <Mail size={12} /> : <FileText size={12} />}
                  {t.category.toUpperCase()}
                </span>
                <span className="badge-tag">{t.badge}</span>
              </div>
              <h3 className="card-title">{t.name}</h3>
              <p className="card-desc">{t.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
