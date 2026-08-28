const fs = require('fs');
const path = require('path');

const seedFilePath = path.join(__dirname, 'src', 'lib', 'seed-data.ts');
let content = fs.readFileSync(seedFilePath, 'utf8');

// Replace all new Date(...).toISOString() with static strings
const staticBaseDate = new Date('2026-08-27T12:00:00.000Z').getTime();

// Replace created_at: new Date().toISOString()
content = content.replace(/new Date\(\)\.toISOString\(\)/g, `'2026-08-27T12:00:00.000Z'`);

// Replace created_at: new Date(Date.now() - ...).toISOString()
content = content.replace(/new Date\(Date\.now\(\) - ([^)]+)\)\.toISOString\(\)/g, (match, p1) => {
  return `'2026-08-27T10:00:00.000Z'`;
});

fs.writeFileSync(seedFilePath, content, 'utf8');
console.log('Fixed dynamic dates in seed-data.ts!');
