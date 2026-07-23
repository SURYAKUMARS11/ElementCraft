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
  config: TemplateCustomization;
  mode?: RenderMode;
}

export const OrderReceiptDoc: React.FC<Props> = ({ config, mode = 'document' }) => {
  const Container = mode === 'email' ? Body : Document;
  const isDark = config.darkMode;
  const bgColor = isDark ? '#0f172a' : '#f1f5f9';
  const cardBg = isDark ? '#1e293b' : '#ffffff';
  const textColor = isDark ? '#f8fafc' : config.textColor || '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const primaryColor = config.primaryColor || '#059669';

  return (
    <Container backgroundColor={bgColor} contentWidth="680px" mode={mode}>
      {/* Printable Invoice Header Card */}
      <Row padding="24px 0 0 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="16px 16px 0 0"
          padding="32px 40px 20px 40px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#334155' : '#e2e8f0',
          }}
        >
          <Row layout={ColumnLayouts.TwoEqual}>
            <Column>
              <Heading level="h2" color={primaryColor} fontSize="26px" fontWeight="bold">
                {config.brandName || 'Acme Corp'}
              </Heading>
              <Paragraph color={textMuted} fontSize="13px" lineHeight="1.4">
                100 Innovation Way, Suite 400<br />
                San Francisco, CA 94105<br />
                support@{config.brandName.toLowerCase().replace(/\s+/g, '')}.com
              </Paragraph>
            </Column>
            <Column>
              <Heading level="h3" color={textColor} fontSize="22px" fontWeight="bold" textAlign="right">
                INVOICE / RECEIPT
              </Heading>
              <Paragraph color={primaryColor} fontSize="14px" fontWeight="bold" textAlign="right">
                #{config.invoiceNumber || 'INV-2026-9842'}
              </Paragraph>
              <Paragraph color={textMuted} fontSize="12px" textAlign="right">
                Date: {config.invoiceDate || 'July 23, 2026'}
              </Paragraph>
              <Paragraph color="#10b981" fontSize="12px" fontWeight="bold" textAlign="right">
                STATUS: PAID
              </Paragraph>
            </Column>
          </Row>

          <Divider
            border={{
              borderTopWidth: '1px',
              borderTopColor: isDark ? '#334155' : '#e2e8f0',
              borderTopStyle: 'solid',
            }}
            containerPadding="20px 0"
          />

          {/* Billed To / Shipping Address */}
          <Row layout={ColumnLayouts.TwoEqual}>
            <Column>
              <Heading level="h4" color={textMuted} fontSize="12px" letterSpacing="1px">
                BILLED TO:
              </Heading>
              <Heading level="h4" color={textColor} fontSize="15px" fontWeight="bold">
                {config.recipientName || 'Alex Mercer'}
              </Heading>
              <Paragraph color={textMuted} fontSize="13px" lineHeight="1.4">
                {config.companyName || 'Apex Technologies LLC'}<br />
                {config.recipientEmail || 'alex.mercer@apex.io'}
              </Paragraph>
            </Column>
            <Column>
              <Heading level="h4" color={textMuted} fontSize="12px" letterSpacing="1px">
                PAYMENT METHOD:
              </Heading>
              <Paragraph color={textColor} fontSize="14px" fontWeight="bold">
                Visa ending in •••• 4242
              </Paragraph>
              <Paragraph color={textMuted} fontSize="12px">
                Transaction ID: tx_89104812903
              </Paragraph>
            </Column>
          </Row>
        </Column>
      </Row>

      {/* Itemized Table Card */}
      <Row padding="0">
        <Column
          backgroundColor={cardBg}
          padding="0 40px 24px 40px"
        >
          <Table
            headers={['Item Description', 'Qty', 'Unit Price', 'Total']}
            data={[
              ['Elements Pro License (Annual)', '1', '$149.00', '$149.00'],
              ['Custom React Component Pack', '2', '$49.00', '$98.00'],
              ['Priority Support Add-on', '1', '$29.00', '$29.00'],
            ]}
            padding="12px 16px"
            border={{
              borderTopWidth: '1px',
              borderTopColor: isDark ? '#334155' : '#e2e8f0',
              borderBottomWidth: '1px',
              borderBottomColor: isDark ? '#334155' : '#e2e8f0',
            }}
          />

          <Divider
            border={{
              borderTopWidth: '1px',
              borderTopColor: isDark ? '#334155' : '#e2e8f0',
              borderTopStyle: 'solid',
            }}
            containerPadding="16px 0"
          />

          {/* Subtotals & Total */}
          <Row layout={ColumnLayouts.TwoEqual}>
            <Column>
              <Paragraph color={textMuted} fontSize="13px" lineHeight="1.5">
                <strong>Notes:</strong> Thank you for your business! This official invoice is generated via @unlayer/react-elements for audit compliance.
              </Paragraph>
            </Column>
            <Column>
              <Paragraph color={textMuted} fontSize="13px" textAlign="right">
                Subtotal: $276.00
              </Paragraph>
              <Paragraph color={textMuted} fontSize="13px" textAlign="right">
                Tax (8.25%): $22.77
              </Paragraph>
              <Heading level="h3" color={primaryColor} fontSize="20px" fontWeight="bold" textAlign="right">
                Total Paid: {config.totalAmount || '$298.77'}
              </Heading>
            </Column>
          </Row>
        </Column>
      </Row>

      {/* Document Footer */}
      {config.showFooter && (
        <Row padding="0 0 32px 0">
          <Column
            backgroundColor={isDark ? '#0f172a' : '#e2e8f0'}
            borderRadius="0 0 16px 16px"
            padding="16px 40px"
          >
            <Paragraph color={textMuted} fontSize="12px" textAlign="center">
              Page 1 of 1 • Official Receipt for {config.brandName} • Generated with Unlayer Elements
            </Paragraph>
          </Column>
        </Row>
      )}
    </Container>
  );
};

export const getOrderReceiptJsx = (config: TemplateCustomization): string => {
  return `import { Document, Row, Column, Heading, Paragraph, Table, ColumnLayouts } from '@unlayer/react-elements';

export const InvoiceDocument = () => (
  <Document backgroundColor="#f1f5f9" contentWidth="680px">
    <Row padding="24px 0">
      <Column backgroundColor="#ffffff" borderRadius="16px" padding="32px 40px">
        <Heading level="h2" color="${config.primaryColor}">${config.brandName}</Heading>
        <Heading level="h3">INVOICE #${config.invoiceNumber || 'INV-2026-9842'}</Heading>
        <Table
          headers={["Item Description", "Qty", "Unit Price", "Total"]}
          data={[
            ["Elements Pro License", "1", "$149.00", "$149.00"],
            ["Custom React Components", "2", "$49.00", "$98.00"]
          ]}
        />
        <Heading level="h3" color="${config.primaryColor}">Total Paid: ${config.totalAmount || '$298.77'}</Heading>
      </Column>
    </Row>
  </Document>
);`;
};
