import { SupportedSquidRegion, EnvironmentId, SquidDeveloperId } from '@squidcloud/common';

export interface EnvironmentType {
  squidRegion: SupportedSquidRegion;
  squidAppId: string;
  environmentId: EnvironmentId;
  squidDeveloperId?: SquidDeveloperId;
  auth0Domain: string;
  auth0ClientId: string;
}
