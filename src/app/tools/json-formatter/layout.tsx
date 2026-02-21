import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "JSON整形ツール - オンラインでJSONを見やすくフォーマット",
  description:
    "JSONデータを見やすく整形・フォーマットするオンラインツール。構文エラー検出、インデント設定、圧縮機能付き。無料・登録不要。",
  openGraph: {
    title: "JSON整形ツール",
    description: "JSONデータを見やすく整形・フォーマット",
    url: `${SITE_URL}/tools/json-formatter`,
  },
  alternates: { canonical: `${SITE_URL}/tools/json-formatter` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
