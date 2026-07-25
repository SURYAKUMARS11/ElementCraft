import React from 'react';
import {
  Email,
  Body,
  Row,
  Column,
  Heading,
  Paragraph,
  Button,
  Image,
  Divider,
  Social,
  ColumnLayouts,
} from '@unlayer/react-elements';
import type { TemplateCustomization, RenderMode } from '../types/template';

interface Props {
  customization: TemplateCustomization;
  mode?: RenderMode;
}

export const SaaSWelcomeEmail: React.FC<Props> = ({ customization, mode = 'email' }) => {
  const Container = mode === 'document' ? Body : Email;
  const isDark = Boolean(customization.darkMode);
  
  // Custom color overrides with dark/light fallbacks
  const bgColor = customization.backgroundColor || (isDark ? '#0f172a' : '#f8fafc');
  const cardBg = isDark ? '#1e293b' : '#ffffff';
  const textColor = customization.textColor || (isDark ? '#f8fafc' : '#1e293b');
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const primaryColor = customization.primaryColor || '#6366f1';

  const brandName = customization.brandName ?? 'Antigravity SaaS';
  const recipientName = customization.recipientName ?? 'Alex Mercer';
  const companyName = customization.companyName ?? 'Antigravity Cloud Inc';

  return (
    <Container backgroundColor={bgColor} contentWidth="600px" mode={mode}>
      {/* Header Row */}
      <Row padding="24px 0 16px 0">
        <Column>
          {customization.logoUrl ? (
            <Image
              src={customization.logoUrl}
              alt={brandName}
              width="140px"
            />
          ) : (
            <Heading level="h2" color={primaryColor} fontSize="24px" fontWeight="bold">
              ⚡ {brandName}
            </Heading>
          )}
        </Column>
      </Row>

      {/* Main Hero Card */}
      <Row padding="0">
        <Column
          backgroundColor={cardBg}
          borderRadius="16px"
          padding="40px 32px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#334155' : '#e2e8f0',
            borderBottomWidth: '1px',
            borderBottomColor: isDark ? '#334155' : '#e2e8f0',
          }}
        >
          {/* Badge */}
          <Heading
            level="h4"
            color={primaryColor}
            fontSize="14px"
            fontWeight="bold"
            textAlign="center"
            letterSpacing="1px"
          >
            🚀 WELCOME TO {brandName.toUpperCase()}
          </Heading>

          {/* Main Title */}
          <Heading
            level="h1"
            color={textColor}
            fontSize="30px"
            fontWeight="bold"
            textAlign="center"
            lineHeight="1.2"
            containerPadding="16px 0 12px 0"
          >
            Welcome aboard, {recipientName}!
          </Heading>

          {/* Intro Text */}
          <Paragraph
            color={textMuted}
            fontSize="16px"
            lineHeight="1.6"
            textAlign="center"
          >
            We&apos;re thrilled to have you join <strong>{companyName}</strong>.
            Your workspace is ready, fully configured, and optimized for speed. Let&apos;s turn your ideas into reality.
          </Paragraph>

          {/* Divider */}
          <Divider
            border={{
              borderTopWidth: '1px',
              borderTopColor: isDark ? '#334155' : '#f1f5f9',
              borderTopStyle: 'solid',
            }}
            containerPadding="24px 0"
          />

          {/* Features Grid Header */}
          <Heading
            level="h3"
            color={textColor}
            fontSize="20px"
            fontWeight="bold"
            textAlign="center"
          >
            What you can build with us:
          </Heading>
        </Column>
      </Row>

      {/* 3-Column Feature Cards */}
      <Row layout={ColumnLayouts.ThreeEqual} padding="16px 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="12px"
          padding="20px 16px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#334155' : '#e2e8f0',
          }}
        >
          <Heading level="h4" color={primaryColor} fontSize="24px" textAlign="center">
            ⚡
          </Heading>
          <Heading level="h4" color={textColor} fontSize="16px" fontWeight="bold" textAlign="center">
            Instant Setup
          </Heading>
          <Paragraph color={textMuted} fontSize="13px" textAlign="center" lineHeight="1.5">
            Deploy full-stack applications with pre-configured elements in seconds.
          </Paragraph>
        </Column>

        <Column
          backgroundColor={cardBg}
          borderRadius="12px"
          padding="20px 16px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#334155' : '#e2e8f0',
          }}
        >
          <Heading level="h4" color={primaryColor} fontSize="24px" textAlign="center">
            🎨
          </Heading>
          <Heading level="h4" color={textColor} fontSize="16px" fontWeight="bold" textAlign="center">
            Clean JSX APIs
          </Heading>
          <Paragraph color={textMuted} fontSize="13px" textAlign="center" lineHeight="1.5">
            Write modular React code that compiles into email-safe HTML &amp; PDF specs.
          </Paragraph>
        </Column>

        <Column
          backgroundColor={cardBg}
          borderRadius="12px"
          padding="20px 16px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#334155' : '#e2e8f0',
          }}
        >
          <Heading level="h4" color={primaryColor} fontSize="24px" textAlign="center">
            📊
          </Heading>
          <Heading level="h4" color={textColor} fontSize="16px" fontWeight="bold" textAlign="center">
            Real-Time Sync
          </Heading>
          <Paragraph color={textMuted} fontSize="13px" textAlign="center" lineHeight="1.5">
            Seamlessly import or export JSON schema with Unlayer visual editors.
          </Paragraph>
        </Column>
      </Row>

      {/* CTA Button Block */}
      {customization.showCTA && (
        <Row padding="16px 0">
          <Column
            backgroundColor={cardBg}
            borderRadius="16px"
            padding="32px 24px"
          >
            <Heading level="h3" color={textColor} fontSize="22px" fontWeight="bold" textAlign="center">
              Ready to launch your first template?
            </Heading>
            <Paragraph color={textMuted} fontSize="15px" textAlign="center" containerPadding="8px 0 20px 0">
              Access your dashboard to customize themes, manage assets, and trigger webhooks.
            </Paragraph>
            <Button
              href="https://unlayer.com"
              backgroundColor={primaryColor}
              color="#ffffff"
              fontSize="16px"
              fontWeight="bold"
              borderRadius="8px"
              padding="14px 28px"
            >
              Launch Dashboard →
            </Button>
          </Column>
        </Row>
      )}

      {/* Footer Section */}
      {customization.showFooter && (
        <Row padding="24px 0">
          <Column>
            {customization.showSocials && (
              <Social
                iconType="circle"
                iconSize={28}
                spacing={12}
                icons={[
                  { name: 'Twitter', url: 'https://twitter.com/unlayerapp' },
                  { name: 'LinkedIn', url: 'https://linkedin.com/company/unlayer' },
                  { name: 'GitHub', url: 'https://github.com/unlayer' },
                ]}
              />
            )}
            <Paragraph color={textMuted} fontSize="12px" textAlign="center" containerPadding="16px 0 0 0">
              © 2026 {companyName}. All rights reserved.<br />
              Sent with ❤️ using @unlayer/react-elements.<br />
              <a href="#unsubscribe" style={{ color: textMuted, textDecoration: 'underline' }}>
                Unsubscribe
              </a>{' '}
              •{' '}
              <a href="#preferences" style={{ color: textMuted, textDecoration: 'underline' }}>
                Email Preferences
              </a>
            </Paragraph>
          </Column>
        </Row>
      )}
    </Container>
  );
};

export const getSaaSWelcomeJsx = (c: TemplateCustomization): string => {
  const isDark = Boolean(c.darkMode);
  const bgColor = c.backgroundColor || (isDark ? '#0f172a' : '#f8fafc');
  const cardBg = isDark ? '#1e293b' : '#ffffff';
  const textColor = c.textColor || (isDark ? '#f8fafc' : '#1e293b');
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const primaryColor = c.primaryColor || '#6366f1';

  return `import React from 'react';
import { Email, Row, Column, Heading, Paragraph, Button, Divider, Social, ColumnLayouts } from '@unlayer/react-elements';

export const SaaSWelcomeEmail = () => (
  <Email backgroundColor="${bgColor}" contentWidth="600px">
    <Row padding="24px 0 16px 0">
      <Column>
        <Heading level="h2" color="${primaryColor}" fontSize="24px" fontWeight="bold">
          ⚡ ${c.brandName || 'Antigravity SaaS'}
        </Heading>
      </Column>
    </Row>
    <Row>
      <Column backgroundColor="${cardBg}" borderRadius="16px" padding="40px 32px">
        <Heading level="h4" color="${primaryColor}" fontSize="14px" fontWeight="bold" textAlign="center">
          🚀 WELCOME TO ${(c.brandName || 'ANTIGRAVITY').toUpperCase()}
        </Heading>
        <Heading level="h1" color="${textColor}" fontSize="30px" fontWeight="bold" textAlign="center">
          Welcome aboard, ${c.recipientName || 'Developer'}!
        </Heading>
        <Paragraph color="${textMuted}" fontSize="16px" textAlign="center">
          We're thrilled to have you join <strong>${c.companyName || 'Antigravity Cloud Inc'}</strong>.
        </Paragraph>
        <Divider containerPadding="24px 0" />
      </Column>
    </Row>
    <Row layout={ColumnLayouts.ThreeEqual} padding="16px 0">
      <Column backgroundColor="${cardBg}" borderRadius="12px" padding="20px 16px">
        <Heading level="h4" color="${primaryColor}" textAlign="center">⚡</Heading>
        <Heading level="h4" color="${textColor}" fontSize="16px" fontWeight="bold" textAlign="center">Instant Setup</Heading>
      </Column>
      <Column backgroundColor="${cardBg}" borderRadius="12px" padding="20px 16px">
        <Heading level="h4" color="${primaryColor}" textAlign="center">🎨</Heading>
        <Heading level="h4" color="${textColor}" fontSize="16px" fontWeight="bold" textAlign="center">Clean JSX APIs</Heading>
      </Column>
      <Column backgroundColor="${cardBg}" borderRadius="12px" padding="20px 16px">
        <Heading level="h4" color="${primaryColor}" textAlign="center">📊</Heading>
        <Heading level="h4" color="${textColor}" fontSize="16px" fontWeight="bold" textAlign="center">Real-Time Sync</Heading>
      </Column>
    </Row>
    ${c.showCTA ? `<Row padding="16px 0">
      <Column backgroundColor="${cardBg}" borderRadius="16px" padding="32px 24px">
        <Button href="https://unlayer.com" backgroundColor="${primaryColor}" color="#ffffff" borderRadius="8px" padding="14px 28px">
          Launch Dashboard →
        </Button>
      </Column>
    </Row>` : ''}
  </Email>
);`;
};
