export type ServiceCategory = 'all' | 'media' | 'utility' | 'game';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'media' | 'utility' | 'game';
  icon: string;
  tag: string;
  uptimeKumaMonitorId?: number | string;
  copyText?: string;
  isQuickAction?: boolean;
  featured?: boolean;
}

export interface NetworkNodeStatus {
  name: string;
  type: 'edge' | 'tunnel' | 'home';
  label: string;
  value: string;
  status: 'online' | 'offline' | 'active';
  meta?: string;
}
