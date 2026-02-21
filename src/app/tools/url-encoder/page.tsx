"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CopyButton } from "@/components/tools/CopyButton";
import { toolsConfig } from "@/lib/tools-config";

const tool = toolsConfig.find((t) => t.slug === "url-encoder")!;

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
      setError("");
    } catch {
      setError("エンコードに失敗しました。");
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setError("");
    } catch {
      setError("無効なURLエンコード文字列です。");
    }
  };

  return (
    <ToolLayout
      tool={tool}
      howToUse={
        <>
          <p>テキストやURLを入力し、「エンコード」で特殊文字をパーセントエンコーディングに変換します。</p>
          <p>「デコード」でエンコード済みの文字列を元のテキストに戻します。日本語のURLをデコードしたいときに便利です。</p>
        </>
      }
      faq={[
        {
          question: "URLエンコードとは何ですか？",
          answer: "URLで使用できない文字（日本語、スペース、記号など）を%XX形式に変換する処理です。例えば「東京」は「%E6%9D%B1%E4%BA%AC」になります。",
        },
        {
          question: "encodeURIとencodeURIComponentの違いは？",
          answer: "このツールはencodeURIComponentを使用しています。URLの一部（パラメータ値など）をエンコードする場合に適しています。",
        },
      ]}
    >
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="テキストまたはエンコード済みURLを入力..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-y font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-3">
          <button
            onClick={handleEncode}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            エンコード
          </button>
          <button
            onClick={handleDecode}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            デコード
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">結果:</span>
              <CopyButton text={output} />
            </div>
            <pre className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg overflow-x-auto font-mono text-sm whitespace-pre-wrap break-all">
              {output}
            </pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
