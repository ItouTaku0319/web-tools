import {
  Type,
  Braces,
  Binary,
  QrCode,
  Palette,
  Link,
  FileText,
  KeyRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ToolConfig {
  id: string;
  slug: string;
  path: string;
  nameJa: string;
  descriptionJa: string;
  icon: LucideIcon;
  category: "text" | "developer" | "converter" | "generator";
}

export const toolsConfig: ToolConfig[] = [
  {
    id: "character-counter",
    slug: "character-counter",
    path: "/tools/character-counter",
    nameJa: "文字数カウンター",
    descriptionJa:
      "テキストの文字数・単語数・行数をリアルタイムでカウントします。",
    icon: Type,
    category: "text",
  },
  {
    id: "json-formatter",
    slug: "json-formatter",
    path: "/tools/json-formatter",
    nameJa: "JSON整形ツール",
    descriptionJa:
      "JSONデータを見やすくフォーマット・整形します。構文エラーも検出できます。",
    icon: Braces,
    category: "developer",
  },
  {
    id: "base64",
    slug: "base64",
    path: "/tools/base64",
    nameJa: "Base64 エンコード/デコード",
    descriptionJa:
      "テキストをBase64にエンコード、またはBase64からデコードします。日本語対応。",
    icon: Binary,
    category: "converter",
  },
  {
    id: "qr-code-generator",
    slug: "qr-code-generator",
    path: "/tools/qr-code-generator",
    nameJa: "QRコード生成",
    descriptionJa:
      "URLやテキストからQRコードを生成します。PNG画像としてダウンロードも可能。",
    icon: QrCode,
    category: "generator",
  },
  {
    id: "color-converter",
    slug: "color-converter",
    path: "/tools/color-converter",
    nameJa: "カラーコード変換",
    descriptionJa:
      "HEX・RGB・HSLのカラーコードを相互変換します。カラープレビュー付き。",
    icon: Palette,
    category: "converter",
  },
  {
    id: "url-encoder",
    slug: "url-encoder",
    path: "/tools/url-encoder",
    nameJa: "URLエンコード/デコード",
    descriptionJa:
      "URLの特殊文字をエンコード・デコードします。日本語URLの変換に便利。",
    icon: Link,
    category: "converter",
  },
  {
    id: "markdown-preview",
    slug: "markdown-preview",
    path: "/tools/markdown-preview",
    nameJa: "マークダウンプレビュー",
    descriptionJa:
      "Markdownテキストをリアルタイムでプレビュー表示します。GFM対応。",
    icon: FileText,
    category: "text",
  },
  {
    id: "password-generator",
    slug: "password-generator",
    path: "/tools/password-generator",
    nameJa: "パスワード生成",
    descriptionJa:
      "安全なランダムパスワードを生成します。長さや文字種を自由にカスタマイズ可能。",
    icon: KeyRound,
    category: "generator",
  },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return toolsConfig.find((t) => t.slug === slug);
}

export function getRelatedTools(currentSlug: string, limit = 4): ToolConfig[] {
  const current = getToolBySlug(currentSlug);
  if (!current) return toolsConfig.slice(0, limit);
  return toolsConfig
    .filter((t) => t.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === current.category && b.category !== current.category)
        return -1;
      if (b.category === current.category && a.category !== current.category)
        return 1;
      return 0;
    })
    .slice(0, limit);
}
