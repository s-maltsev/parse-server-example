import { schemaDefinitions } from './cloud/schema.js';

export const config = {
  databaseURI:
    process.env.DATABASE_URI || process.env.MONGODB_URI,
  cloud: () => import('./cloud/main.js'),
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY, //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL, // Don't forget to change to https if needed
  allowOrigin: process.env.FRONTEND_URL || '*',
  liveQuery: {
    classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  },
  schema: {
    definitions: schemaDefinitions,
    lockSchemas: false,
    strict: false,
    recreateModifiedFields: false,
    deleteExtraFields: false,
  },
};
