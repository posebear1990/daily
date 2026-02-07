const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const matter = require('gray-matter');
const pinyinPkg = require("pinyin");
const pinyin = pinyinPkg.default || pinyinPkg;

const SOURCE_DIR = '/Users/posebear1990/workspace/豆瓣文章备份';
const DEST_DIR = '/Users/posebear1990/workspace/daily/src/pages/post';

// Helper to convert Chinese to Pinyin slug
function generateSlug(text) {
  return pinyin(text, {
    style: pinyin.STYLE_NORMAL,
    heteronym: false
  }).flat().join('-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
}

// Ensure dest dir exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

const files = fs.readdirSync(SOURCE_DIR);

files.forEach(file => {
  if (path.extname(file) !== '.zip') return;

  const zipPath = path.join(SOURCE_DIR, file);
  console.log(`Processing: ${file}`);

  try {
    const zip = new AdmZip(zipPath);
    const zipEntries = zip.getEntries();
    
    // Find the markdown file
    const mdEntry = zipEntries.find(entry => entry.entryName.endsWith('.md') && !entry.entryName.includes('readme.md'));
    
    if (!mdEntry) {
      console.log(`  No markdown file found in ${file}, skipping.`);
      return;
    }

    // --- Metadata Processing ---
    // 1. Title from ZIP Filename (most reliable)
    const zipBaseName = path.basename(file, '.zip');
    const cleanTitle = zipBaseName.replace(/\(\d+\)$/, '').trim();
    let title = cleanTitle;

    // 2. Date
    let date = new Date().toISOString();
    const dateMatch = file.match(/(\d{4})[-\u4e00-\u9fa5]?(\d{1,2})?/);
    if (dateMatch) {
       const year = dateMatch[1];
       const month = dateMatch[2] || '01';
       date = `${year}-${month.padStart(2,'0')}-01T12:00:00.000Z`;
    } else {
        const stats = fs.statSync(zipPath);
        date = stats.birthtime.toISOString();
    }

    // 3. Slug
    const slug = generateSlug(title);
    
    // 4. Tags
    const tags = ['douban', 'life'];

    // --- Content Processing ---
    // User confirmed files are UTF-8. 
    // We read raw buffer and convert to string, stripping BOM if present.
    const rawBuffer = mdEntry.getData();
    let content = rawBuffer.toString('utf8');
    
    // Remove BOM (Zero Width No-Break Space) if present
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }

    const parsed = matter(content);
    let { data, content: mdContent } = parsed;

    // Construct new Frontmatter
    const newFrontmatter = {
        title: title,
        date: date,
        path: `/${slug}/`,
        tags: tags,
        ...data 
    };

    // --- Image Processing ---
    const postDir = path.join(DEST_DIR, slug);
    if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir);
    }

    const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
    let newMdContent = mdContent;

    newMdContent = newMdContent.replace(imageRegex, (match, alt, imgPath) => {
        const cleanPath = imgPath.replace(/^\.\//, '').replace(/^\//, '');
        // Fuzzy match for image in zip
        const imgEntry = zipEntries.find(e => e.entryName.endsWith(cleanPath) || e.entryName.endsWith(path.basename(cleanPath)));

        if (imgEntry) {
            const imgFileName = path.basename(imgEntry.entryName);
            zip.extractEntryTo(imgEntry, postDir, false, true);
            return `![${alt}](${imgFileName})`;
        } else {
            // console.log(`  Warning: Image not found in zip: ${imgPath}`);
            return match;
        }
    });

    const finalContent = matter.stringify(newMdContent, newFrontmatter);
    fs.writeFileSync(path.join(postDir, 'index.md'), finalContent);
    
    console.log(`  Saved to: ${slug}/index.md`);

  } catch (err) {
    console.error(`  Error processing ${file}:`, err);
  }
});
