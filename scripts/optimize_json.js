const fs = require('fs');
const path = require('path');

const REPORT_FILE = path.join(__dirname, '../report_final.json');
const PUBLIC_DIR = path.join(__dirname, '../public/img/reports');

// Ensure output directory exists (redundant check, safe)
if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

function optimizeReports() {
    if (!fs.existsSync(REPORT_FILE)) {
        console.error('Report file not found:', REPORT_FILE);
        return;
    }

    let rawData = fs.readFileSync(REPORT_FILE);
    let reports = JSON.parse(rawData);
    let changed = false;

    reports.forEach((report, index) => {
        const imageUrl = report.image_url;

        if (imageUrl && imageUrl.startsWith('data:image')) {
            console.log(`Processing report ${report.id || index}...`);

            // 1. Parse Base64 string
            // Format: "data:image/png;base64,iVBORw0KGgo..."
            const matches = imageUrl.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);

            if (matches && matches.length === 3) {
                const extension = matches[1];
                const base64Data = matches[2];
                const filename = `report_${report.id || index}.${extension}`;
                const filePath = path.join(PUBLIC_DIR, filename);
                const publicPath = `/img/reports/${filename}`;

                // 2. Write file
                fs.writeFileSync(filePath, base64Data, 'base64');
                console.log(`  -> Saved image to ${filePath}`);

                // 3. Update JSON
                report.image_url = publicPath;
                changed = true;
            } else {
                console.warn(`  -> Could not parse Base64 for report ${report.id}`);
            }
        }
    });

    if (changed) {
        fs.writeFileSync(REPORT_FILE, JSON.stringify(reports, null, 2));
        console.log('Successfully updated report_final.json');
    } else {
        console.log('No Base64 images found to optimize.');
    }
}

optimizeReports();
