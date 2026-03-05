/**
 * Common types used throughout the application
 */

export interface IFormData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  description: string;
}

export interface IFormErrors {
  [key: string]: string;
}

export interface IFormState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export interface ITeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface IPortfolioItem {
  id: number;
  title: string;
  description: string;
  before?: string;
  after?: string;
  rooms?: IPortfolioRoom[];
}

export interface IPortfolioRoom {
  name: string;
  before: string;
  after: string;
}

export interface IPartner {
  id: number;
  name: string;
  logo: string;
}

export interface IHowItWorksStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface IExpressFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ISocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface INavLink {
  label: string;
  href: string;
}
