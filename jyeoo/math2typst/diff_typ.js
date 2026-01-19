const fs = require('fs');
const path = require('path');
const { createTwoFilesPatch } = require('diff');
// require('colors'); // Optional


const input1 = process.argv[2] || path.join(__dirname, 'typst');
const input2 = process.argv[3] || path.join(__dirname, '../typst');

if (!fs.existsSync(input1) || !fs.existsSync(input2)) {
    console.error(`One or both inputs do not exist:\n  ${input1}\n  ${input2}`);
    process.exit(1);
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.typ')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });

    return arrayOfFiles;
}

function normalize(content) {
    let lines = content.split('\n');
    lines = lines.filter(line => {
        const trimmed = line.trim();
        // Ignore link comments
        if (trimmed.startsWith('// http') || trimmed.startsWith('//http')) return false;
        return true;
    });

    lines = lines.map(line => {
        // Remove image definitions #image(...) or image(...) depending on context
        // Try to be more inclusive with regex: #?image\(.*?\)
        let processed = line.replace(/#?image\(.*?\)/g, '');
        return processed.trimRight();
    });

    // We can join them back. 
    // To ignore simple empty lines changes, we might want to filter empty lines.
    // The previous logic filtered empty lines. Let's keep that for semantic comparison.
    lines = lines.filter(l => l.trim().length > 0);

    return lines.join('\n') + '\n';
}

function compareFiles(f1, f2) {
    const c1 = fs.readFileSync(f1, 'utf8');
    const c2 = fs.readFileSync(f2, 'utf8');
    const n1 = normalize(c1);
    const n2 = normalize(c2);

    if (n1 === n2) {
        console.log(`[MATCH] ${path.basename(f1)} matches ${path.basename(f2)}`);
    } else {
        console.log(`[DIFF]  ${path.basename(f1)} differs from ${path.basename(f2)}`);

        // Generate a unified diff
        const patch = createTwoFilesPatch(
            path.basename(f1),
            path.basename(f2),
            n1,
            n2,
            'Normalized Content',
            'Normalized Content'
        );

        console.log(patch);
    }
}

const stat1 = fs.statSync(input1);
const stat2 = fs.statSync(input2);

if (stat1.isDirectory() && stat2.isDirectory()) {
    // Collect files
    const files1 = getAllFiles(input1);
    const files2 = getAllFiles(input2);

    // Map entries by filename
    const map1 = new Map();
    files1.forEach(f => map1.set(path.basename(f), f));

    files2.forEach(f => {
        const base = path.basename(f);
        if (map1.has(base)) {
            compareFiles(map1.get(base), f);
            map1.delete(base);
        } else {
            console.log(`[MISSING] ${base} found in input2 but not input1`);
        }
    });

    // Remaining in map1
    for (const [base, f] of map1) {
        console.log(`[MISSING] ${base} found in input1 but not input2`);
    }

} else if (stat1.isFile() && stat2.isFile()) {
    compareFiles(input1, input2);
} else {
    console.error("Mixed directory/file arguments not supported via this simple script logic (unless 1-to-1 mapping logic added).");
}
