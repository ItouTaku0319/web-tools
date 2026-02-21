import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "マークダウンプレビュー - Markdownリアルタイムプレビューツール",
  description:
    "Markdownテキストをリアルタイムでプレビュー表示するオンラインツール。GitHub Flavored Markdown (GFM) 対応。無料・登録不要。",
  openGraph: {
    title: "マークダウンプレビュー",
    description: "Markdownをリアルタイムでプレビュー表示",
    url: `${SITE_URL}/tools/markdown-preview`,
  },
  alternates: { canonical: `${SITE_URL}/tools/markdown-preview` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
