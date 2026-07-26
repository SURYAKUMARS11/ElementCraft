import React from 'react';
import {
  Document,
  Body,
  Row,
  Column,
  Heading,
  Paragraph,
  Divider,
  Table,
  ColumnLayouts,
} from '@unlayer/react-elements';
import type { TemplateCustomization, RenderMode } from '../types/template';

interface Props {
  customization: TemplateCustomization;
  mode?: RenderMode;
}

export const OrderReceiptDoc: React.FC<Props> = ({ customization, mode = 'document' }) => {
  const Container = mode === 'email' ? Body : Document;
  const isDark = Boolean(customization.darkMode);
  
  const defaultLightBg = '#f1f5f9';
  const defaultDarkBg = '#0f172a';
  const defaultLightText = '#0f172a';
  const defaultDarkText = '#f8fafc';

  const bgColor = isDark
    ? (customization.backgroundColor && customization.backgroundColor !== defaultLightBg ? customization.backgroundColor : defaultDarkBg)
    : (customization.backgroundColor || defaultLightBg);

  const cardBg = isDark ? '#1e293b' : '#ffffff';

  const textColor = isDark
    ? (customization.textColor && customization.textColor !== defaultLightText ? customization.textColor : defaultDarkText)
    : (customization.textColor || defaultLightText);

  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const primaryColor = customization.primaryColor || '#059669';
  const accentColor = customization.accentColor || '#10b981';

  const brandName = customization.brandName ?? 'Apex Logistics Enterprise';
  const recipientName = customization.recipientName ?? 'Sarah Jenkins';
  const companyName = customization.companyName ?? 'Global Freight LLC';
  const invoiceNumber = customization.invoiceNumber ?? 'INV-2026-9842';
  const totalAmount = customization.totalAmount ?? '$2,450.00';

  return (
    <Container backgroundColor={bgColor} contentWidth="680px" mode={mode}>
      {/* Printable Invoice Header Card */}
      <Row padding="24px 0 0 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="20px 20px 0 0"
          padding="36px 40px 24px 40px"
          border={{
            borderTopWidth: '3px',
            borderTopColor: primaryColor,
          }}
        >
          <Row layout={ColumnLayouts.TwoEqual}>
            <Column>
              <Heading level="h2" color={primaryColor} fontSize="24px" fontWeight="bold">
                🏢 {brandName}
              </Heading>
              <Paragraph color={textMuted} fontSize="13px" lineHeight="1.4">
                100 Logistics Parkway, Suite 800<br />
                San Francisco, CA 94105<br />
                billing@{brandName.toLowerCase().replace(/\s+/g, '')}.com
              </Paragraph>
            </Column>
            <Column>
              <Paragraph color={accentColor} fontSize="11px" fontWeight="bold" letterSpacing="1px" textAlign="right">
                🟢 STATUS: PAID IN FULL
              </Paragraph>
              <Heading level="h3" color={textColor} fontSize="20px" fontWeight="bold" textAlign="right" containerPadding="4px 0">
                OFFICIAL INVOICE &amp; RECEIPT
              </Heading>
              <Paragraph color={primaryColor} fontSize="14px" fontWeight="bold" textAlign="right">
                INVOICE REF #{invoiceNumber}
              </Paragraph>
              <Paragraph color={textMuted} fontSize="12px" textAlign="right">
                Issue Date: July 26, 2026
              </Paragraph>
            </Column>
          </Row>

          <Divider
            border={{
              borderTopWidth: '1px',
              borderTopColor: isDark ? '#334155' : '#e2e8f0',
            }}
            containerPadding="20px 0"
          />

          {/* Billed To / Shipped To Grid */}
          <Row layout={ColumnLayouts.TwoEqual}>
            <Column backgroundColor={isDark ? '#0f172a' : '#f8fafc'} borderRadius="12px" padding="16px">
              <Paragraph color={primaryColor} fontSize="11px" fontWeight="bold" letterSpacing="1px">
                👤 RECIPIENT / BILLED TO:
              </Paragraph>
              <Paragraph color={textColor} fontSize="14px" fontWeight="bold">
                {recipientName}
              </Paragraph>
              <Paragraph color={textMuted} fontSize="13px" lineHeight="1.4">
                {companyName}<br />
                742 Evergreen Terrace<br />
                Springfield, OR 97477
              </Paragraph>
            </Column>

            <Column backgroundColor={isDark ? '#0f172a' : '#f8fafc'} borderRadius="12px" padding="16px">
              <Paragraph color={primaryColor} fontSize="11px" fontWeight="bold" letterSpacing="1px">
                💳 PAYMENT SUMMARY:
              </Paragraph>
              <Paragraph color={textColor} fontSize="14px" fontWeight="bold">
                Payment Method: Corporate Visa •••• 4242
              </Paragraph>
              <Paragraph color={textMuted} fontSize="13px" lineHeight="1.4">
                PO Reference: PO-993182<br />
                Total Paid: <strong style={{ color: primaryColor }}>{totalAmount}</strong>
              </Paragraph>
            </Column>
          </Row>
        </Column>
      </Row>

      {/* Itemized Invoice Table Card */}
      <Row padding="0">
        <Column
          backgroundColor={cardBg}
          borderRadius="0 0 20px 20px"
          padding="12px 40px 36px 40px"
        >
          <Table
            headers={['ITEM DESCRIPTION', 'QTY', 'UNIT PRICE', 'TOTAL']}
            data={[
              ['ElementCraft Enterprise Unlimited License', '1', '$1,999.00', '$1,999.00'],
              ['Dedicated Multi-Region Render CDN Setup', '1', '$451.00', '$451.00'],
            ]}
          />

          <Divider
            border={{
              borderTopWidth: '1px',
              borderTopColor: isDark ? '#334155' : '#e2e8f0',
            }}
            containerPadding="20px 0"
          />

          {/* Subtotal and Total Summary */}
          <Row layout={ColumnLayouts.TwoEqual}>
            <Column>
              <Paragraph color={textMuted} fontSize="12px" lineHeight="1.5">
                Thank you for choosing <strong>{brandName}</strong>.<br />
                For billing inquiries, contact support@{brandName.toLowerCase().replace(/\s+/g, '')}.com
              </Paragraph>
            </Column>
            <Column>
              <Paragraph color={textColor} fontSize="20px" fontWeight="bold" textAlign="right">
                TOTAL: <span style={{ color: primaryColor }}>{totalAmount}</span>
              </Paragraph>
            </Column>
          </Row>
        </Column>
      </Row>

      {/* Footer Legal */}
      {customization.showFooter && (
        <Row padding="24px 0">
          <Column>
            <Paragraph color={textMuted} fontSize="12px" textAlign="center">
              © 2026 {companyName}. Official Invoice &amp; Receipt Document.<br />
              Generated with @unlayer/react-elements Document &amp; Email Engine.
            </Paragraph>
          </Column>
        </Row>
      )}
    </Container>
  );
};

export const getOrderReceiptJsx = (c: TemplateCustomization): string => {
  const isDark = Boolean(c.darkMode);
  const bgColor = isDark ? '#0f172a' : '#f1f5f9';
  const cardBg = isDark ? '#1e293b' : '#ffffff';
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const primaryColor = c.primaryColor || '#059669';

  return `import React from 'react';
import { Document, Row, Column, Heading, Paragraph, Table } from '@unlayer/react-elements';

export const EnterpriseReceipt = () => (
  <Document backgroundColor="${bgColor}" contentWidth="680px">
    <Row padding="24px 0 0 0">
      <Column backgroundColor="${cardBg}" borderRadius="20px 20px 0 0" padding="36px 40px 24px 40px">
        <Heading level="h2" color="${primaryColor}">🏢 ${c.brandName || 'Apex Logistics'}</Heading>
        <Paragraph color="${textColor}">TOTAL: ${c.totalAmount || '$2,450.00'}</Paragraph>
      </Column>
    </Row>
  </Document>
);`;
};
