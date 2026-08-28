const fs = require('fs');
const path = require('path');

const publicMediaDir = path.join(__dirname, 'public', 'media');

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      if (file !== 'README.md' && !file.startsWith('.')) {
        results.push({
          fullPath,
          relativePath: path.relative(path.join(__dirname, 'public'), fullPath).replace(/\\/g, '/'),
          fileName: file,
          size: stat.size
        });
      }
    }
  });
  return results;
}

const allFiles = getFilesRecursively(publicMediaDir);

const mediaItems = [];

allFiles.forEach((f, idx) => {
  const ext = path.extname(f.fileName).toLowerCase();
  let mediaType = 'document';
  let mimeType = 'application/octet-stream';
  let folderId = 'folder-my-docs';

  if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext)) {
    mediaType = 'image';
    mimeType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
    folderId = 'folder-my-photos';
  } else if (['.mp4', '.mov', '.webm', '.mkv'].includes(ext)) {
    mediaType = 'video';
    mimeType = 'video/mp4';
    folderId = 'folder-my-videos';
  } else if (['.mp3', '.wav', '.flac', '.m4a', '.ogg', '.aac'].includes(ext)) {
    mediaType = 'audio';
    mimeType = 'audio/mp3';
    folderId = 'folder-my-audio';
  } else if (['.pdf', '.txt', '.doc', '.docx'].includes(ext)) {
    mediaType = 'document';
    mimeType = ext === '.pdf' ? 'application/pdf' : 'text/plain';
    folderId = 'folder-my-docs';
  }

  const cleanTitle = f.fileName.replace(/\.[^/.]+$/, '').replace(/[_]+/g, ' ');
  const webUrl = '/' + f.relativePath;

  mediaItems.push({
    id: `media-user-${idx + 1}`,
    vault_id: 'my-private-vault',
    folder_id: folderId,
    name: cleanTitle,
    original_name: f.fileName,
    url: webUrl,
    thumbnail_url: mediaType === 'image' ? webUrl : undefined,
    media_type: mediaType,
    mime_type: mimeType,
    size: f.size,
    tags: [mediaType, folderId.replace('folder-my-', '')],
    created_at: new Date(Date.now() - idx * 1000 * 60).toISOString(),
  });
});

console.log(`Found ${mediaItems.length} media items!`);
fs.writeFileSync(path.join(__dirname, 'scratch_media.json'), JSON.stringify(mediaItems, null, 2));
