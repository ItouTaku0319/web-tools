"use client";

import { useState, useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { toolsConfig } from "@/lib/tools-config";

const tool = toolsConfig.find((t) => t.slug === "qr-code-generator")!;

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const svgRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(() => {
    const svgElement = svgRef.current?.querySelector("svg");
    if (!svgElement) return;

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const a = document.createElement("a");
      a.download = "qrcode.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);
  }, [size]);

  return (
    <ToolLayout
      tool={tool}
      howToUse={
        <>
          <p>URLやテキストを入力するとQRコードが自動生成されます。</p>
          <p>色やサイズを変更でき、「PNGダウンロード」ボタンで画像として保存できます。</p>
        </>
      }
      faq={[
        {
          question: "QRコードに日本語テキストを入れられますか？",
          answer: "はい、日本語テキストも問題なくQRコードに含めることができます。",
        },
        {
          question: "生成したQRコードは商用利用できますか？",
          answer: "はい、生成したQRコードは自由にご利用いただけます。制限はありません。",
        },
      ]}
    >
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="URLやテキストを入力してください..."
          className="w-full h-24 p-4 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap gap-4 items-end">
          <label className="text-sm">
            <span className="block text-gray-600 mb-1">サイズ</span>
            <select
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1.5"
            >
              <option value={128}>128px</option>
              <option value={256}>256px</option>
              <option value={512}>512px</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="block text-gray-600 mb-1">前景色</span>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="h-9 w-14 border border-gray-300 rounded cursor-pointer"
            />
          </label>
          <label className="text-sm">
            <span className="block text-gray-600 mb-1">背景色</span>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-9 w-14 border border-gray-300 rounded cursor-pointer"
            />
          </label>
        </div>

        {text && (
          <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <div ref={svgRef}>
              <QRCodeSVG
                value={text}
                size={size}
                level="M"
                fgColor={fgColor}
                bgColor={bgColor}
              />
            </div>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              PNGダウンロード
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
