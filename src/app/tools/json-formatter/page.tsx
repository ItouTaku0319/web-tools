"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CopyButton } from "@/components/tools/CopyButton";
import { toolsConfig } from "@/lib/tools-config";

const tool = toolsConfig.find((t) => t.slug === "json-formatter")!;

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "無効なJSONです");
      setOutput("");
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "無効なJSONです");
      setOutput("");
    }
  };

  return (
    <ToolLayout
      tool={tool}
      howToUse={
        <>
          <p>左のテキストエリアにJSONデータを貼り付けて「整形」ボタンをクリックすると、インデント付きの見やすいJSONに変換されます。</p>
          <p>「圧縮」ボタンで不要な空白を除去したコンパクトなJSONに変換することもできます。</p>
        </>
      }
      faq={[
        {
          question: "どのようなJSONフォーマットに対応していますか？",
          answer: "標準的なJSON形式（RFC 8259）に対応しています。オブジェクト、配列、文字列、数値、真偽値、nullを含むすべてのJSON型をサポートしています。",
        },
        {
          question: "構文エラーがある場合はどうなりますか？",
          answer: "JSONの構文エラーがある場合、エラーメッセージが表示されます。エラー内容を参考に修正してください。",
        },
      ]}
    >
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"} のようなJSONを入力してください...'
          className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-y font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleFormat}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            整形
          </button>
          <button
            onClick={handleMinify}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            圧縮
          </button>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            インデント:
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value={2}>2スペース</option>
              <option value={4}>4スペース</option>
            </select>
          </label>
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
            <pre className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg overflow-x-auto font-mono text-sm whitespace-pre">
              {output}
            </pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
