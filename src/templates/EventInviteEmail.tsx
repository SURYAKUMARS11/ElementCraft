import React from 'react';
import {
  Email,
  Body,
  Row,
  Column,
  Heading,
  Paragraph,
  Button,
  Social,
  ColumnLayouts,
} from '@unlayer/react-elements';
import type { TemplateCustomization, RenderMode } from '../types/template';

interface Props {
  customization: TemplateCustomization;
  mode?: RenderMode;
}

export const EventInviteEmail: React.FC<Props> = ({ customization, mode = 'email' }) => {
  const Container = mode === 'document' ? Body : Email;
  const isDark = Boolean(customization.darkMode);

  const bgColor = customization.backgroundColor ?? (isDark ? '#090514' : '#faf5ff');
  const cardBg = isDark ? '#140c2a' : '#ffffff';
  const textColor = customization.textColor ?? (isDark ? '#f3e8ff' : '#1e1b4b');
  const textMuted = isDark ? '#a855f7' : '#6b21a8';
  const primaryColor = customization.primaryColor || '#8b5cf6';

  const brandName = customization.brandName ?? 'Elements Summit';
  const recipientName = customization.recipientName ?? 'Alex Mercer';
  const eventName = customization.eventName ?? 'Global Developers Conference 2026';

  return (
    <Container backgroundColor={bgColor} contentWidth="600px" mode={mode}>
      {/* Event Banner Card */}
      <Row padding="24px 0 0 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="20px"
          padding="40px 32px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#3b0764' : '#e9d5ff',
            borderBottomWidth: '1px',
            borderBottomColor: isDark ? '#3b0764' : '#e9d5ff',
          }}
        >
          {/* VIP Badge */}
          <Paragraph
            color={primaryColor}
            fontSize="12px"
            fontWeight="bold"
            letterSpacing="2px"
            textAlign="center"
          >
            ✦ YOU ARE INVITED • EXCLUSIVE VIP ACCESS ✦
          </Paragraph>

          {/* Event Title */}
          <Heading
            level="h1"
            color={textColor}
            fontSize="32px"
            fontWeight="bold"
            textAlign="center"
            lineHeight="1.2"
            containerPadding="16px 0 12px 0"
          >
            {eventName}
          </Heading>

          {/* Personal Greeting */}
          <Paragraph
            color={textColor}
            fontSize="16px"
            textAlign="center"
            lineHeight="1.6"
          >
            Dear <strong>{recipientName}</strong>, you have been selected to join leading engineering leaders and template architects at <strong>{brandName}</strong>.
          </Paragraph>

          {/* Key Event Details Grid */}
          <Row layout={ColumnLayouts.TwoEqual} padding="24px 0">
            <Column backgroundColor={isDark ? '#2e1065' : '#f3e8ff'} borderRadius="12px" padding="16px">
              <Paragraph color={primaryColor} fontSize="11px" fontWeight="bold" letterSpacing="1px">
                DATE &amp; TIME
              </Paragraph>
              <Paragraph color={textColor} fontSize="14px" fontWeight="bold">
                September 14-16, 2026
              </Paragraph>
              <Paragraph color={textMuted} fontSize="12px">
                09:00 AM PST Daily
              </Paragraph>
            </Column>

            <Column backgroundColor={isDark ? '#2e1065' : '#f3e8ff'} borderRadius="12px" padding="16px">
              <Paragraph color={primaryColor} fontSize="11px" fontWeight="bold" letterSpacing="1px">
                LOCATION / VENUE
              </Paragraph>
              <Paragraph color={textColor} fontSize="14px" fontWeight="bold">
                Moscone Center West
              </Paragraph>
              <Paragraph color={textMuted} fontSize="12px">
                San Francisco, CA &amp; Virtual
              </Paragraph>
            </Column>
          </Row>

          {/* Ticket Pass Container */}
          <Row padding="0 0 20px 0">
            <Column
              backgroundColor={isDark ? '#2e1065' : '#f3e8ff'}
              borderRadius="12px"
              padding="20px"
            >
              <Paragraph color={primaryColor} fontSize="12px" fontWeight="bold" letterSpacing="1px" textAlign="center">
                PASS CODE: VIP-884-X9
              </Paragraph>
              <Heading level="h3" color={textColor} fontSize="18px" fontWeight="bold" textAlign="center">
                All-Access Keynote &amp; Builder Workshops Pass
              </Heading>
            </Column>
          </Row>

          {/* RSVP Button */}
          {customization.showCTA && (
            <Button
              href="https://unlayer.com"
              backgroundColor={primaryColor}
              color="#ffffff"
              borderRadius="10px"
              padding="16px 36px"
              fontSize="16px"
              fontWeight="bold"
            >
              Confirm VIP Ticket RSVP →
            </Button>
          )}
        </Column>
      </Row>

      {/* Footer */}
      {customization.showFooter && (
        <Row padding="24px 0">
          <Column>
            {customization.showSocials && (
              <Social
                iconType="circle"
                iconSize={26}
                spacing={10}
                icons={[
                  { name: 'Twitter', url: 'https://twitter.com' },
                  { name: 'LinkedIn', url: 'https://linkedin.com' },
                ]}
              />
            )}
            <Paragraph color={textMuted} fontSize="12px" textAlign="center">
              Hosted by <strong>{brandName}</strong>. Powered by @unlayer/react-elements.
            </Paragraph>
          </Column>
        </Row>
      )}
    </Container>
  );
};

export const getEventInviteJsx = (config: TemplateCustomization): string => {
  return `import { Email, Row, Column, Heading, Paragraph, Button } from '@unlayer/react-elements';

export const EventInvite = () => (
  <Email backgroundColor="${config.backgroundColor || '#faf5ff'}" contentWidth="600px">
    <Row padding="32px">
      <Column backgroundColor="#ffffff" borderRadius="20px">
        <Heading level="h1">${config.eventName || 'Summit 2026'}</Heading>
        <Paragraph>Dear ${config.recipientName || 'Guest'}, you are invited!</Paragraph>
        <Button backgroundColor="${config.primaryColor}">Confirm RSVP</Button>
      </Column>
    </Row>
  </Email>
);`;
};
