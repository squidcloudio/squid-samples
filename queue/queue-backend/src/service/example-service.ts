import { SquidService, secureTopic } from '@squidcloud/backend';

export class ExampleService extends SquidService {
  /*
    It's important to secure access to your queue topics.
    By default, topics are inaccessible on the client.
    This function allows both read and write access to the 'test_topic' topic on the client.

    For more information on securing your queues, see the documentation:
    https://docs.squid.cloud/development-tools/backend/security-rules/secure-queue
  */
  @secureTopic('test_topic', 'all')
  allowTopicAccess(): boolean {
    return true;
  }
}
