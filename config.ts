import { schemaDefinitions } from './cloud/schema.js';

export const config = {
  databaseURI:
    process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb+srv://ALEBITracker:94Bk.FHpX_@erjikcluster.xojylrb.mongodb.net/?retryWrites=true&w=majority&appName=ErjikCluster',
  cloud: () => import('./cloud/main.js'),
  appId: process.env.APP_ID || 'biathlonApp',
  masterKey: process.env.MASTER_KEY || 'Alebi2025', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'https://parse-server-example-f148.onrender.com/parse', // Don't forget to change to https if needed
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
