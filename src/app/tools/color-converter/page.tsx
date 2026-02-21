"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CopyButton } from "@/components/tools/CopyButton";
import { toolsConfig } from "@/lib/tools-config";

const tool = toolsConfig.find((t) => t.slug === "color-converter")!;

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return null;
  return { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorConverterPage() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });

  const updateFromHex = (value: string) => {
    setHex(value);
    const result = hexToRgb(value);
    if (result) {
      setRgb(result);
      setHsl(rgbToHsl(result.r, result.g, result.b));
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  };

  const hexStr = hex.toUpperCase();
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <ToolLayout
      tool={tool}
      howToUse={
        <>
          <p>HEXカラーコード、RGB値のいずれかを変更すると、他の形式に自動変換されます。</p>
          <p>カラーピッカーから直感的に色を選択することもできます。</p>
        </>
      }
      faq={[
        {
          question: "HEXとRGBの違いは何ですか？",
          answer: "HEXは16進数で色を表現し（例: #FF0000）、RGBは赤・緑・青の値（0〜255）で色を表現します。どちらもWeb開発でよく使われます。",
        },
        {
          question: "HSLとは何ですか？",
          answer: "HSLは色相(Hue)・彩度(Saturation)・明度(Lightness)で色を表す方式です。直感的に色を調整しやすいのが特徴です。",
        },
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Color preview */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-32 h-32 rounded-xl border-2 border-gray-200 shadow-inner"
              style={{ backgroundColor: hex }}
            />
            <input
              type="color"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-32 h-10 cursor-pointer border border-gray-300 rounded"
            />
          </div>

          {/* Inputs */}
          <div className="flex-1 space-y-4">
            {/* HEX */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">HEX</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <CopyButton text={hexStr} />
              </div>
            </div>

            {/* RGB */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RGB</label>
              <div className="flex gap-2">
                {(["r", "g", "b"] as const).map((ch) => (
                  <input
                    key={ch}
                    type="number"
                    min={0}
                    max={255}
                    value={rgb[ch]}
                    onChange={(e) => {
                      const val = Math.max(0, Math.min(255, Number(e.target.value)));
                      updateFromRgb(
                        ch === "r" ? val : rgb.r,
                        ch === "g" ? val : rgb.g,
                        ch === "b" ? val : rgb.b
                      );
                    }}
                    className="w-20 p-2 border border-gray-300 rounded-lg font-mono text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={ch.toUpperCase()}
                  />
                ))}
                <CopyButton text={rgbStr} />
              </div>
            </div>

            {/* HSL (display only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">HSL</label>
              <div className="flex gap-2 items-center">
                <span className="p-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm flex-1">
                  {hslStr}
                </span>
                <CopyButton text={hslStr} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
