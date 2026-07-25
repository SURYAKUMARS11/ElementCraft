import React from 'react';
import { TEMPLATES } from '../templates';
import type { TemplateDefinition } from '../types/template';
import { Mail, FileText, ChevronDown } from 'lucide-react';

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
    <div className="compact-template-bar">
      <div className="compact-bar-left">
        <span className="bar-label">SELECT TEMPLATE:</span>
        <div className="preset-pill-group">
          {filteredTemplates.map((t) => {
            const isSelected = selectedTemplate.id === t.id;
            return (
              <button
                key={t.id}
                className={`compact-tpl-pill ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectTemplate(t)}
              >
                {t.category === 'email' ? <Mail size={12} /> : <FileText size={12} />}
                <span>{t.name}</span>
                <span className="pill-badge">{t.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="compact-bar-right">
        <div className="dropdown-filter-wrap">
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="all">All Categories ({TEMPLATES.length})</option>
            <option value="email">Emails Only (3)</option>
            <option value="document">Documents Only (2)</option>
          </select>
          <ChevronDown size={14} className="select-arrow" />
        </div>
      </div>
    </div>
  );
};
