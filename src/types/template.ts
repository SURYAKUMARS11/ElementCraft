export type RenderMode = 'email' | 'web' | 'document';
export type DeviceFrame = 'desktop' | 'mobile';

export interface TemplateCustomization {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  brandName: string;
  logoUrl: string;
  recipientName: string;
  recipientEmail: string;
  companyName: string;
  
  // Dynamic fields
  invoiceNumber?: string;
  invoiceDate?: string;
  totalAmount?: string;
  issueNumber?: string;
  eventName?: string;
  eventDate?: string;
  
  // Customization options
  showCTA: boolean;
  showSocials: boolean;
  showFooter: boolean;
  darkMode: boolean;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: 'email' | 'document';
  description: string;
  badge: string;
  recommendedMode: RenderMode;
  defaultCustomization: TemplateCustomization;
  component: React.ComponentType<{ customization: TemplateCustomization; mode?: RenderMode }>;
  getRawJsx: (customization: TemplateCustomization) => string;
}
