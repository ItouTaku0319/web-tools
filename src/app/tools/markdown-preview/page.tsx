"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { toolsConfig } from "@/lib/tools-config";

const tool = toolsConfig.find((t) => t.slug === "markdown-preview")!;

const SAMPLE = `# 見出し1
## 見出し2

**太字** と *イタリック* のテスト

- リスト項目1
- リスト項目2
  - ネストされたリスト

1. 番号付きリスト
2. 2番目の項目

> 引用文のサンプル

\`インラインコード\` と

\`\`\`javascript
const hello = "Hello World";
console.log(hello);
\`\`\`

[リンクのサンプル](https://example.com)

| 列1 | 列2 | 列3 |
|------|------|------|
| A    | B    | C    |
`;

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(SAMPLE);

  return (
    <ToolLayout
      tool={tool}
      howToUse={
        <>
          <p>左側のエディタにMarkdownテキストを入力すると、右側にリアルタイムでプレビューが表示されます。</p>
          <p>GitHub Flavored Markdown (GFM) に対応しており、テーブルやタスクリストも表示できます。</p>
        </>
      }
      faq={[
        {
          question: "GFMとは何ですか？",
          answer: "GitHub Flavored Markdownの略で、標準のMarkdownにテーブル、取り消し線、タスクリストなどの拡張機能を追加したものです。",
        },
        {
          question: "画像は表示できますか？",
          answer: "はい、Markdownの画像構文（![alt](url)）で外部画像を表示できます。",
        },
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">Markdown入力</div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-y font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Markdownを入力..."
          />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">プレビュー</div>
          <div className="w-full h-96 p-4 border border-gray-200 rounded-lg overflow-y-auto bg-white prose prose-sm prose-gray max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
