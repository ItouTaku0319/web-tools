"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CopyButton } from "@/components/tools/CopyButton";
import { toolsConfig } from "@/lib/tools-config";

const tool = toolsConfig.find((t) => t.slug === "base64")!;

function encodeBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  return btoa(binary);
}

function decodeBase64(str: string): string {
  const binary = atob(str);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    try {
      setOutput(encodeBase64(input));
      setError("");
    } catch {
      setError("エンコードに失敗しました。");
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeBase64(input));
      setError("");
    } catch {
      setError("無効なBase64文字列です。");
    }
  };

  return (
    <ToolLayout
      tool={tool}
      howToUse={
        <>
          <p>テキストを入力し、「エンコード」でBase64に変換、「デコード」でBase64から元のテキストに戻します。</p>
          <p>日本語テキストにも対応しています（UTF-8として処理されます）。</p>
        </>
      }
      faq={[
        {
          question: "Base64とは何ですか？",
          answer: "Base64はバイナリデータをASCII文字列に変換するエンコード方式です。メールの添付ファイルやWebでのデータ転送に広く使われています。",
        },
        {
          question: "日本語もエンコードできますか？",
          answer: "はい、日本語テキストもUTF-8としてエンコード・デコードできます。",
        },
      ]}
    >
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="テキストまたはBase64文字列を入力..."
          className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-y font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
