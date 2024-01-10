import {
  AppId,
  EnvironmentId,
  SquidOptions,
  SupportedSquidRegion,
} from '@squidcloud/client';

export function getSquidOptions(): SquidOptions {
  return {
    appId: process.env.SQUID_APP_ID as AppId,
    region: process.env.SQUID_REGION as SupportedSquidRegion,
    environmentId: process.env.SQUID_ENVIRONMENT_ID as EnvironmentId,
    squidDeveloperId: process.env.SQUID_DEVELOPER_ID,
  };
}
