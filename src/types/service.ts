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

export interface CaddyRoute {
  from: string;
  target: string;
  port: string;
  note?: string;
}

export interface NetworkNodeStatus {
  name: string;
  type: 'edge' | 'tunnel' | 'home';
  label: string;
  value: string;
  status: 'online' | 'offline' | 'active';
  meta?: string;
}
