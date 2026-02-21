import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "パスワード生成 - 安全なランダムパスワード生成ツール",
  description:
    "暗号学的に安全なランダムパスワードを生成するオンラインツール。長さや文字種をカスタマイズ可能。サーバー送信なし。無料・登録不要。",
  openGraph: {
    title: "パスワード生成ツール",
    description: "安全なランダムパスワードを即座に生成",
    url: `${SITE_URL}/tools/password-generator`,
  },
  alternates: { canonical: `${SITE_URL}/tools/password-generator` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
