import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "文字数カウンター - テキストの文字数をリアルタイムでカウント",
  description:
    "テキストの文字数・単語数・行数・バイト数をリアルタイムでカウントするオンラインツール。コピー＆ペーストするだけで即カウント。無料・登録不要。",
  openGraph: {
    title: "文字数カウンター",
    description: "テキストの文字数・単語数・行数をリアルタイムでカウント",
    url: `${SITE_URL}/tools/character-counter`,
  },
  alternates: { canonical: `${SITE_URL}/tools/character-counter` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
