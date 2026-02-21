"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { toolsConfig } from "@/lib/tools-config";

const tool = toolsConfig.find((t) => t.slug === "character-counter")!;

function countBytes(str: string): number {
  return new TextEncoder().encode(str).length;
}

export default function CharacterCounterPage() {
  const [text, setText] = useState("");

  const charCount = text.length;
  const charCountNoSpace = text.replace(/\s/g, "").length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split("\n").length : 0;
  const byteCount = countBytes(text);

  const stats = [
    { label: "文字数", value: charCount },
    { label: "文字数(空白除く)", value: charCountNoSpace },
    { label: "単語数", value: wordCount },
    { label: "行数", value: lineCount },
    { label: "バイト数(UTF-8)", value: byteCount },
  ];

  return (
    <ToolLayout
      tool={tool}
      howToUse={
        <>
          <p>テキストエリアに文字を入力またはペーストすると、リアルタイムで文字数・単語数・行数・バイト数がカウントされます。</p>
          <p>空白を含む文字数と含まない文字数の両方を表示するので、レポートやSNSの文字数制限の確認に便利です。</p>
        </>
      }
      faq={[
        {
          question: "全角と半角は同じ1文字としてカウントされますか？",
          answer: "はい、文字数は全角・半角に関わらず1文字としてカウントします。バイト数はUTF-8基準で表示されるため、日本語は1文字3バイトとなります。",
        },
        {
          question: "改行は文字数に含まれますか？",
          answer: "はい、改行も1文字としてカウントされます。空白を除いた文字数も別途表示しています。",
        },
      ]}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ここにテキストを入力またはペーストしてください..."
        className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200"
          >
            <div className="text-2xl font-bold text-blue-600">
              {s.value.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
