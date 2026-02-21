import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "QRコード生成 - 無料オンラインQRコード作成ツール",
  description:
    "URLやテキストからQRコードを無料で生成。色やサイズをカスタマイズでき、PNG画像としてダウンロード可能。登録不要。",
  openGraph: {
    title: "QRコード生成ツール",
    description: "URLやテキストからQRコードを無料で生成",
    url: `${SITE_URL}/tools/qr-code-generator`,
  },
  alternates: { canonical: `${SITE_URL}/tools/qr-code-generator` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
