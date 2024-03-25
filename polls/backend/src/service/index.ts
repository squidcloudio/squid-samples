import { secureDatabase, SquidService } from '@squidcloud/backend';
import { MutationContext } from '@squidcloud/common';

export class SecurityRules extends SquidService {
  /**
   * Grants full read access to the built-in database.
   * For more information, see {@link https://docs.squid.cloud/docs/development-tools/backend//security-rules/secure-data-access}.
   *
   * @returns {boolean} Always returns true to allow access.
   */
  @secureDatabase('read', 'built_in_db')
  allowReadAccessToBuiltInDb(): boolean {
    return true;
  }

  /**
   * Grants full write access to the built-in database.
   *
   * In "real life", this function would need to (at least) look at context.before and context.after and compare the
   * user ID with the current logged-in user. For this demo, we allow all writes.
   *
   * @returns {boolean} Always returns true to allow access.
   */
  @secureDatabase('write', 'built_in_db')
  allowWriteAccessToBuiltInDb(_context: MutationContext): boolean {
    return true;
  }
}
