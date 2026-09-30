const fs = require('fs');
const path = require('path');
const i18nPath = path.join(__dirname, '../brands/corvina/i18n');

// copy i18n all files inside i18nPath to dist
const files = fs.readdirSync(i18nPath);
files.forEach(file => {
    const filePath = path.join(i18nPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
        const buildFilePath = path.join(__dirname, '../../dist', file);
        fs.copyFileSync(filePath, buildFilePath);
    }
});