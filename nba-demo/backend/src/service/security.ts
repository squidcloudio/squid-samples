import {
  secureCollection,
  secureDatabase,
  SquidService,
} from "@squidcloud/backend";

export class SecurityService extends SquidService {
  @secureDatabase("all", "built_in_db")
  allowAllAccessToBuiltInDb(): boolean {
    // Uncomment to support
    // return this.isAuthenticated();
    return true;
  }

  @secureCollection("players", "read", "nba-bigquery")
  allowBigQueryRead(): boolean {
    return true;
  }
}
