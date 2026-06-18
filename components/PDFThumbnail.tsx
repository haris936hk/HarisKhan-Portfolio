"use client";

import { useEffect, useRef, useState } from "react";

const PDFThumbnail = ({ url }: { url: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const pdf = await pdfjsLib.getDocument({ url }).promise;
        if (cancelled) return;

        const page = await pdf.getPage(1);
        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const containerWidth = canvas.parentElement?.offsetWidth ?? 288;
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        await page.render({ canvasContext: ctx, canvas, viewport }).promise;
        if (!cancelled) setLoading(false);
      } catch (e) {
        console.error("PDFThumbnail render error:", e);
        if (!cancelled) setError(true);
      }
    };

    render();
    return () => { cancelled = true; };
  }, [url]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xs" style={{ color: "#BEC1DD" }}>
        Preview unavailable
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 animate-pulse rounded-lg bg-white/[0.05]" />
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain rounded-lg"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.3s" }}
      />
    </div>
  );
};

export default PDFThumbnail;
