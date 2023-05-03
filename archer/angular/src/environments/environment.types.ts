import { SupportedSquidRegion } from '@squidcloud/common';

export interface EnvironmentType {
  squidRegion: SupportedSquidRegion;
  squidAppId: string;
  auth0Domain: string;
  auth0ClientId: string;
}
