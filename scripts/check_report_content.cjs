const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../vitalcore.db');
const db = new Database(dbPath, { verbose: console.log });

try {
    const stmt = db.prepare(`SELECT name, sql FROM sqlite_schema WHERE type='table' AND name='health_reports'`);
    const tableInfo = stmt.get();

    console.log('\n--- Database Schema Audit ---');
    if (tableInfo) {
        console.log(`Table found: ${tableInfo.name}`);
        console.log(`Schema: ${tableInfo.sql}`);
    } else {
        console.error('Table [health_reports] NOT FOUND in database!');
    }

    const reportStmt = db.prepare(`SELECT * FROM health_reports`);
    const reports = reportStmt.all();

    console.log('\n--- Health Report Content Audit ---');

    // Manual table print to avoid console.table issues and check fields safely
    reports.forEach(r => {
        console.log(`ID: ${r.id}, Title: ${r.title.substring(0, 20)}...`);
        console.log(`  - KO Length: ${r.content ? r.content.length : 0}`);
        console.log(`  - EN Length: ${r.content_en ? r.content_en.length : 0}`);
        console.log(`  - ZH Length: ${r.content_zh ? r.content_zh.length : 0}`);
        console.log(`  - JA Length: ${r.content_ja ? r.content_ja.length : 0}`);
    });

    const emptyReports = reports.filter(r => !r.content || r.content.length === 0);
    if (emptyReports.length > 0) {
        console.log('\n[WARNING] The following reports have EMPTY Korean content:');
        emptyReports.forEach(r => console.log(`- ID ${r.id}: ${r.title}`));
    } else {
        console.log('\n[OK] All reports have Korean content.');
    }

} catch (error) {
    console.error('Error querying database:', error);
} finally {
    db.close();
}
