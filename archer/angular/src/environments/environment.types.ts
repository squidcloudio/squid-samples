import { EnvironmentId, SquidDeveloperId, SupportedSquidRegion } from '@squidcloud/client';

export interface EnvironmentType {
  squidRegion: SupportedSquidRegion;
  squidAppId: string;
  environmentId: EnvironmentId;
  squidDeveloperId?: SquidDeveloperId;
  auth0Domain: string;
  auth0ClientId: string;
}
