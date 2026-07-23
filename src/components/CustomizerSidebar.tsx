import React from 'react';
import type { TemplateCustomization } from '../types/template';
import { Palette, User, Sliders, Moon, Sun, RotateCcw, Layout } from 'lucide-react';

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
    <aside className="editor-sidebar">
      <div className="sidebar-title-bar">
        <h2>
          <Sliders size={18} /> Template Workspace Editor
        </h2>
        <button className="reset-link" onClick={onReset} title="Reset default parameters">
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="sidebar-body">
        {/* Color & Aesthetic Theme Section */}
        <div className="editor-section">
          <h3 className="editor-section-title">
            <Palette size={15} /> Color Palette &amp; Theme
          </h3>

          <div className="input-field">
            <label className="input-label">Template Dark Frame</label>
            <button
              className={`toggle-btn ${customization.darkMode ? 'active' : ''}`}
              onClick={() => update('darkMode', !customization.darkMode)}
            >
              {customization.darkMode ? <Moon size={14} /> : <Sun size={14} />}
              {customization.darkMode ? 'Dark Frame Enabled' : 'Light Frame Enabled'}
            </button>
          </div>

          <div className="input-field">
            <label className="input-label">Primary Brand Color</label>
            <div className="color-input-flex">
              <input
                type="color"
                value={customization.primaryColor}
                onChange={(e) => update('primaryColor', e.target.value)}
                className="color-swatch"
              />
              <input
                type="text"
                value={customization.primaryColor}
                onChange={(e) => update('primaryColor', e.target.value)}
                className="form-control color-hex"
              />
            </div>
          </div>

          <div className="input-field">
            <label className="input-label">Background Color</label>
            <div className="color-input-flex">
              <input
                type="color"
                value={customization.backgroundColor || '#ffffff'}
                onChange={(e) => update('backgroundColor', e.target.value)}
                className="color-swatch"
              />
              <input
                type="text"
                value={customization.backgroundColor}
                onChange={(e) => update('backgroundColor', e.target.value)}
                className="form-control color-hex"
              />
            </div>
          </div>

          <div className="input-field">
            <label className="input-label">Text Color</label>
            <div className="color-input-flex">
              <input
                type="color"
                value={customization.textColor || '#1e293b'}
                onChange={(e) => update('textColor', e.target.value)}
                className="color-swatch"
              />
              <input
                type="text"
                value={customization.textColor}
                onChange={(e) => update('textColor', e.target.value)}
                className="form-control color-hex"
              />
            </div>
          </div>
        </div>

        {/* Content & Dynamic Data Fields */}
        <div className="editor-section">
          <h3 className="editor-section-title">
            <User size={15} /> Content &amp; Data Fields
          </h3>

          <div className="input-field">
            <label className="input-label">Brand / Organization Name</label>
            <input
              type="text"
              value={customization.brandName}
              onChange={(e) => update('brandName', e.target.value)}
              className="form-control"
              placeholder="e.g. Antigravity Cloud"
            />
          </div>

          <div className="input-field">
            <label className="input-label">Recipient / Student Name</label>
            <input
              type="text"
              value={customization.recipientName}
              onChange={(e) => update('recipientName', e.target.value)}
              className="form-control"
              placeholder="e.g. Ibrahim Sunkanmi"
            />
          </div>

          <div className="input-field">
            <label className="input-label">Company / Department</label>
            <input
              type="text"
              value={customization.companyName}
              onChange={(e) => update('companyName', e.target.value)}
              className="form-control"
              placeholder="e.g. Full-Stack Engineering"
            />
          </div>

          {customization.invoiceNumber !== undefined && (
            <div className="input-field">
              <label className="input-label">Invoice Number</label>
              <input
                type="text"
                value={customization.invoiceNumber}
                onChange={(e) => update('invoiceNumber', e.target.value)}
                className="form-control"
              />
            </div>
          )}

          {customization.totalAmount !== undefined && (
            <div className="input-field">
              <label className="input-label">Total Amount</label>
              <input
                type="text"
                value={customization.totalAmount}
                onChange={(e) => update('totalAmount', e.target.value)}
                className="form-control"
              />
            </div>
          )}

          {customization.eventName !== undefined && (
            <div className="input-field">
              <label className="input-label">Event / Conference Name</label>
              <input
                type="text"
                value={customization.eventName}
                onChange={(e) => update('eventName', e.target.value)}
                className="form-control"
              />
            </div>
          )}
        </div>

        {/* Layout Block Switches */}
        <div className="editor-section">
          <h3 className="editor-section-title">
            <Layout size={15} /> Visible Layout Components
          </h3>

          <div className="switch-control">
            <label htmlFor="chk-cta">Call-to-Action Button</label>
            <input
              type="checkbox"
              id="chk-cta"
              checked={customization.showCTA}
              onChange={(e) => update('showCTA', e.target.checked)}
            />
          </div>

          <div className="switch-control">
            <label htmlFor="chk-socials">Social Media Badges</label>
            <input
              type="checkbox"
              id="chk-socials"
              checked={customization.showSocials}
              onChange={(e) => update('showSocials', e.target.checked)}
            />
          </div>

          <div className="switch-control">
            <label htmlFor="chk-footer">Footer Legal Bar</label>
            <input
              type="checkbox"
              id="chk-footer"
              checked={customization.showFooter}
              onChange={(e) => update('showFooter', e.target.checked)}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
