import React from 'react';
import type { TemplateCustomization } from '../types/template';
import { Palette, User, Settings, Moon, Sun, RotateCcw } from 'lucide-react';

interface Props {
  customization: TemplateCustomization;
  onChange: (updated: TemplateCustomization) => void;
  onReset: () => void;
}

export const CustomizerSidebar: React.FC<Props> = ({
  customization,
  onChange,
  onReset,
}) => {
  const update = (key: keyof TemplateCustomization, value: any) => {
    onChange({ ...customization, [key]: value });
  };

  return (
    <aside className="customizer-sidebar">
      <div className="sidebar-header">
        <h2>
          <Settings size={18} /> Customize Template
        </h2>
        <button className="btn-reset" onClick={onReset} title="Reset to default props">
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="sidebar-scroll">
        {/* Theme & Palette Section */}
        <div className="control-group">
          <h3 className="group-title">
            <Palette size={15} /> Design Theme
          </h3>
          
          <div className="form-row">
            <label className="form-label">Dark Mode Frame</label>
            <button
              className={`toggle-btn ${customization.darkMode ? 'active' : ''}`}
              onClick={() => update('darkMode', !customization.darkMode)}
            >
              {customization.darkMode ? <Moon size={14} /> : <Sun size={14} />}
              {customization.darkMode ? 'Dark Theme' : 'Light Theme'}
            </button>
          </div>

          <div className="form-row">
            <label className="form-label">Primary Color</label>
            <div className="color-picker-row">
              <input
                type="color"
                value={customization.primaryColor}
                onChange={(e) => update('primaryColor', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={customization.primaryColor}
                onChange={(e) => update('primaryColor', e.target.value)}
                className="text-input color-text"
              />
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">Background Color</label>
            <div className="color-picker-row">
              <input
                type="color"
                value={customization.backgroundColor || '#ffffff'}
                onChange={(e) => update('backgroundColor', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={customization.backgroundColor}
                onChange={(e) => update('backgroundColor', e.target.value)}
                className="text-input color-text"
              />
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">Text Color</label>
            <div className="color-picker-row">
              <input
                type="color"
                value={customization.textColor || '#1e293b'}
                onChange={(e) => update('textColor', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={customization.textColor}
                onChange={(e) => update('textColor', e.target.value)}
                className="text-input color-text"
              />
            </div>
          </div>
        </div>

        {/* Brand & Recipient Metadata */}
        <div className="control-group">
          <h3 className="group-title">
            <User size={15} /> Content &amp; Metadata
          </h3>

          <div className="form-row">
            <label className="form-label">Brand Name</label>
            <input
              type="text"
              value={customization.brandName}
              onChange={(e) => update('brandName', e.target.value)}
              className="text-input"
              placeholder="e.g. Acme Corp"
            />
          </div>

          <div className="form-row">
            <label className="form-label">Recipient Name</label>
            <input
              type="text"
              value={customization.recipientName}
              onChange={(e) => update('recipientName', e.target.value)}
              className="text-input"
              placeholder="e.g. Alex Mercer"
            />
          </div>

          <div className="form-row">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              value={customization.companyName}
              onChange={(e) => update('companyName', e.target.value)}
              className="text-input"
              placeholder="e.g. Apex Tech LLC"
            />
          </div>

          {customization.invoiceNumber !== undefined && (
            <div className="form-row">
              <label className="form-label">Invoice Number</label>
              <input
                type="text"
                value={customization.invoiceNumber}
                onChange={(e) => update('invoiceNumber', e.target.value)}
                className="text-input"
              />
            </div>
          )}

          {customization.totalAmount !== undefined && (
            <div className="form-row">
              <label className="form-label">Total Amount</label>
              <input
                type="text"
                value={customization.totalAmount}
                onChange={(e) => update('totalAmount', e.target.value)}
                className="text-input"
              />
            </div>
          )}

          {customization.eventName !== undefined && (
            <div className="form-row">
              <label className="form-label">Event Name</label>
              <input
                type="text"
                value={customization.eventName}
                onChange={(e) => update('eventName', e.target.value)}
                className="text-input"
              />
            </div>
          )}
        </div>

        {/* Section Toggles */}
        <div className="control-group">
          <h3 className="group-title">Layout Blocks</h3>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="chk-cta"
              checked={customization.showCTA}
              onChange={(e) => update('showCTA', e.target.checked)}
            />
            <label htmlFor="chk-cta">Show Call-to-Action Button</label>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="chk-socials"
              checked={customization.showSocials}
              onChange={(e) => update('showSocials', e.target.checked)}
            />
            <label htmlFor="chk-socials">Show Social Icons</label>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="chk-footer"
              checked={customization.showFooter}
              onChange={(e) => update('showFooter', e.target.checked)}
            />
            <label htmlFor="chk-footer">Show Footer Bar</label>
          </div>
        </div>
      </div>
    </aside>
  );
};
