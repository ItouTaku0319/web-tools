import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "カラーコード変換 - HEX・RGB・HSL相互変換ツール",
  description:
    "HEX・RGB・HSLのカラーコードを相互変換するオンラインツール。カラープレビュー付きで直感的に操作できます。無料・登録不要。",
  openGraph: {
    title: "カラーコード変換ツール",
    description: "HEX・RGB・HSLカラーコードを相互変換",
    url: `${SITE_URL}/tools/color-converter`,
  },
  alternates: { canonical: `${SITE_URL}/tools/color-converter` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
