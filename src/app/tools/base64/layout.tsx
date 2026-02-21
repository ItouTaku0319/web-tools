import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Base64 エンコード/デコード - 日本語対応オンライン変換ツール",
  description:
    "テキストをBase64にエンコード、またはBase64から元のテキストにデコードするオンラインツール。日本語（UTF-8）に完全対応。無料・登録不要。",
  openGraph: {
    title: "Base64 エンコード/デコード",
    description: "テキストとBase64を相互変換。日本語対応",
    url: `${SITE_URL}/tools/base64`,
  },
  alternates: { canonical: `${SITE_URL}/tools/base64` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
