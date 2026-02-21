import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "URLエンコード/デコード - 日本語URL変換ツール",
  description:
    "URLの特殊文字をパーセントエンコーディングに変換、またはデコードするオンラインツール。日本語URLの変換に便利。無料・登録不要。",
  openGraph: {
    title: "URLエンコード/デコード",
    description: "URLの特殊文字をエンコード・デコード",
    url: `${SITE_URL}/tools/url-encoder`,
  },
  alternates: { canonical: `${SITE_URL}/tools/url-encoder` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
