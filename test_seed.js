try {
  const seed = require('./src/lib/seed-data.ts');
  console.log('INITIAL_VAULTS:', seed.INITIAL_VAULTS ? seed.INITIAL_VAULTS.length : 'NULL');
  console.log('INITIAL_MEDIA:', seed.INITIAL_MEDIA ? seed.INITIAL_MEDIA.length : 'NULL');
  console.log('INITIAL_FOLDERS:', seed.INITIAL_FOLDERS ? seed.INITIAL_FOLDERS.length : 'NULL');
  console.log('INITIAL_ANALYTICS:', seed.INITIAL_ANALYTICS ? seed.INITIAL_ANALYTICS.length : 'NULL');
} catch (e) {
  console.error('SEED DATA ERROR:', e);
}
