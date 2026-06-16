import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const certDir = join(__dirname, "../public/certificates");

// pdfjs-dist in legacy node mode
const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

const files = readdirSync(certDir)
  .filter((f) => f.endsWith(".pdf"))
  .sort();

for (const file of files) {
  try {
    const data = new Uint8Array(readFileSync(join(certDir, file)));
    const pdf = await pdfjsLib.getDocument({ data }).promise;
    const page = await pdf.getPage(1);
    const content = await page.getTextContent();
    // grab meaningful text tokens (skip very short ones like single chars)
    const text = content.items
      .map((i) => i.str.trim())
      .filter((s) => s.length > 2)
      .join(" ")
      .substring(0, 250);
    console.log(`\n[${file}]\n  ${text}`);
  } catch (e) {
    console.log(`\n[${file}]\n  ERROR: ${e.message}`);
  }
}
