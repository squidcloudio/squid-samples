import { SquidProject } from '@squidcloud/backend';

export * from './service';

class ExportedSquidProject extends SquidProject {}

export default new ExportedSquidProject();
