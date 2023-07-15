import { SupportedSquidRegion, EnvironmentId } from '@squidcloud/common';

export interface EnvironmentType {
  squidRegion: SupportedSquidRegion;
  environmentId: EnvironmentId;
  squidDeveloperId: string;
  squidAppId: string;
  auth0Domain: string;
  auth0ClientId: string;
}
