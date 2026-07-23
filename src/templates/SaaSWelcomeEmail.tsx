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
  config: TemplateCustomization;
  mode?: RenderMode;
}

export const SaaSWelcomeEmail: React.FC<Props> = ({ config, mode = 'email' }) => {
  const Container = mode === 'document' ? Body : Email;
  const isDark = config.darkMode;
  const bgColor = isDark ? '#0f172a' : config.backgroundColor || '#f8fafc';
  const cardBg = isDark ? '#1e293b' : '#ffffff';
  const textColor = isDark ? '#f8fafc' : config.textColor || '#1e293b';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const primaryColor = config.primaryColor || '#6366f1';

  return (
    <Container backgroundColor={bgColor} contentWidth="600px" mode={mode}>
      {/* Header Row */}
      <Row padding="24px 0 16px 0">
        <Column>
          {config.logoUrl && (
            <Image
              src={config.logoUrl}
              alt={config.brandName}
              width="140px"
            />
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
            🚀 WELCOME TO {config.brandName.toUpperCase()}
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
            Welcome aboard, {config.recipientName || 'Developer'}!
          </Heading>

          {/* Intro Text */}
          <Paragraph
            color={textMuted}
            fontSize="16px"
            lineHeight="1.6"
            textAlign="center"
          >
            We&apos;re thrilled to have you join <strong>{config.companyName || config.brandName}</strong>.
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
      {config.showCTA && (
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
      {config.showFooter && (
        <Row padding="24px 0">
          <Column>
            {config.showSocials && (
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
              © 2026 {config.companyName || config.brandName}. All rights reserved.<br />
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

export const getSaaSWelcomeJsx = (config: TemplateCustomization): string => {
  return `import { Email, Row, Column, Heading, Paragraph, Button, Image, Divider, Social, ColumnLayouts } from '@unlayer/react-elements';

export const WelcomeEmail = () => (
  <Email backgroundColor="${config.backgroundColor || '#f8fafc'}" contentWidth="600px">
    <Row padding="24px 0">
      <Column>
        <Image src="${config.logoUrl}" alt="${config.brandName}" width="140px" />
      </Column>
    </Row>
    <Row>
      <Column backgroundColor="#ffffff" borderRadius="16px" padding="40px 32px">
        <Heading level="h1" color="${config.textColor}">Welcome aboard, ${config.recipientName}!</Heading>
        <Paragraph color="#64748b">We're thrilled to have you join ${config.brandName}. Your workspace is ready.</Paragraph>
        <Button href="https://unlayer.com" backgroundColor="${config.primaryColor}" color="#ffffff" borderRadius="8px" padding="14px 28px">
          Launch Dashboard →
        </Button>
      </Column>
    </Row>
  </Email>
);`;
};
