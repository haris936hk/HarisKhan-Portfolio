import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const certDir = join(dirname(fileURLToPath(import.meta.url)), "../public/certificates");
const previewDir = join(certDir, "previews");

async function generate() {
  const files = (await readdir(certDir)).filter((file) => file.endsWith(".pdf")).sort();
  if (files.length === 0) throw new Error(`${certDir}: no source PDFs found`);
  await mkdir(previewDir, { recursive: true });

  for (const file of files) {
    let loadingTask;
    try {
      const data = new Uint8Array(await readFile(join(certDir, file)));
      loadingTask = getDocument({ data });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const original = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: 576 / original.width });
      const canvas = createCanvas(576, Math.ceil(viewport.height));
      await page.render({ canvasContext: canvas.getContext("2d"), viewport, background: "white" }).promise;
      const preview = await canvas.encode("webp", 80);
      await writeFile(join(previewDir, `${file.slice(0, -4)}.webp`), preview);
      console.log(`${file}: ${canvas.width}×${canvas.height}, ${preview.length} bytes`);
    } catch (error) {
      throw new Error(`${file}: ${error.message}`, { cause: error });
    } finally {
      if (loadingTask) {
        try {
          await loadingTask.destroy();
        } catch (error) {
          throw new Error(`${file}: resource cleanup failed: ${error.message}`, { cause: error });
        }
      }
    }
  }
}

generate().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
