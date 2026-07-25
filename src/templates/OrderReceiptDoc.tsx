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
  
  const bgColor = customization.backgroundColor ?? (isDark ? '#0f172a' : '#f1f5f9');
  const cardBg = isDark ? '#1e293b' : '#ffffff';
  const textColor = customization.textColor ?? (isDark ? '#f8fafc' : '#0f172a');
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const primaryColor = customization.primaryColor || '#059669';

  const brandName = customization.brandName ?? 'Acme Corp';
  const recipientName = customization.recipientName ?? 'Alex Mercer';
  const companyName = customization.companyName ?? 'Apex Technologies LLC';
  const invoiceNumber = customization.invoiceNumber ?? 'INV-2026-8842';
  const totalAmount = customization.totalAmount ?? '$2,450.00';

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
                {brandName}
              </Heading>
              <Paragraph color={textMuted} fontSize="13px" lineHeight="1.4">
                100 Innovation Way, Suite 400<br />
                San Francisco, CA 94105<br />
                support@{brandName.toLowerCase().replace(/\s+/g, '')}.com
              </Paragraph>
            </Column>
            <Column>
              <Heading level="h3" color={textColor} fontSize="22px" fontWeight="bold" textAlign="right">
                INVOICE / RECEIPT
              </Heading>
              <Paragraph color={primaryColor} fontSize="14px" fontWeight="bold" textAlign="right">
                #{invoiceNumber}
              </Paragraph>
              <Paragraph color={textMuted} fontSize="12px" textAlign="right">
                Date: July 25, 2026<br />
                Payment Method: Visa ending in •••• 4242
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
            <Column>
              <Paragraph color={textMuted} fontSize="11px" fontWeight="bold" letterSpacing="1px">
                BILLED TO:
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
            <Column>
              <Paragraph color={textMuted} fontSize="11px" fontWeight="bold" letterSpacing="1px">
                ORDER SUMMARY:
              </Paragraph>
              <Paragraph color={textColor} fontSize="14px" fontWeight="bold">
                Status: PAID IN FULL
              </Paragraph>
              <Paragraph color={textMuted} fontSize="13px" lineHeight="1.4">
                Po Number: PO-993182<br />
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
          borderRadius="0 0 16px 16px"
          padding="0 40px 32px 40px"
        >
          <Table
            headers={['ITEM DESCRIPTION', 'QTY', 'PRICE', 'TOTAL']}
            data={[
              ['ElementCraft Pro License (Enterprise Unlimited)', '1', '$1,999.00', '$1,999.00'],
              ['Dedicated Email Deliverability Setup & Support', '1', '$451.00', '$451.00'],
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
                If you have questions, contact billing@{brandName.toLowerCase().replace(/\s+/g, '')}.com
              </Paragraph>
            </Column>
            <Column>
              <Paragraph color={textColor} fontSize="18px" fontWeight="bold" textAlign="right">
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
              © 2026 {companyName}. Official Invoice Document.<br />
              Generated with @unlayer/react-elements Document Engine.
            </Paragraph>
          </Column>
        </Row>
      )}
    </Container>
  );
};

export const getOrderReceiptJsx = (config: TemplateCustomization): string => {
  return `import { Document, Row, Column, Heading, Paragraph, Table } from '@unlayer/react-elements';

export const ReceiptDoc = () => (
  <Document backgroundColor="${config.backgroundColor || '#f1f5f9'}" contentWidth="680px">
    <Row padding="32px">
      <Column backgroundColor="#ffffff" borderRadius="16px">
        <Heading level="h2" color="${config.primaryColor}">${config.brandName || 'Brand'}</Heading>
        <Paragraph color="#64748b">Invoice #${config.invoiceNumber || 'INV-2026'}</Paragraph>
        <Table headers={['Item', 'Total']} data={[['Pro License', '${config.totalAmount || '$2,450.00'}']]} />
      </Column>
    </Row>
  </Document>
);`;
};
