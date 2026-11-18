export type ServiceCategory = 'all' | 'media' | 'utility' | 'game';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  url: string;
  subdomain: string;
  category: 'media' | 'utility' | 'game';
  icon: string;
  tag: string;
  specs?: string[];
  uptimeKumaMonitorId?: number | string;
  uptimeKumaKeywords?: string[];
  copyText?: string;
  isQuickAction?: boolean;
  featured?: boolean;
  isUpcoming?: boolean;
}

export interface ServiceRoute {
  from: string;
  target: string;
  note?: string;
}

// Alias for compatibility
export type CaddyRoute = ServiceRoute;
