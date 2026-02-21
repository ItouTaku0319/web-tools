import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: `${SITE_NAME}のプライバシーポリシーについて。`,
};

export default function PrivacyPage() {
  return (
    <article className="max-w-2xl mx-auto py-8 prose prose-gray">
      <h1>プライバシーポリシー</h1>
      <p>
        本プライバシーポリシーは、{SITE_NAME}（以下「当サイト」）における個人情報の取り扱いについて定めるものです。
      </p>

      <h2>データの処理について</h2>
      <p>
        当サイトで提供するすべてのツールは、お客様のブラウザ内でデータを処理します。
        入力されたテキストやデータがサーバーに送信されることはありません。
      </p>

      <h2>Cookie（クッキー）について</h2>
      <p>
        当サイトでは、以下の目的でCookieを使用する場合があります。
      </p>
      <ul>
        <li>サイトの利用状況の分析（アクセス解析）</li>
        <li>広告配信の最適化</li>
      </ul>

      <h2>広告について</h2>
      <p>
        当サイトでは、Google AdSenseなどの第三者配信の広告サービスを利用する場合があります。
        これらの広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
      </p>
      <p>
        Google AdSenseに関する詳細は、
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Googleの広告に関するポリシー
        </a>
        をご確認ください。
      </p>

      <h2>アクセス解析について</h2>
      <p>
        当サイトでは、サイトの利用状況を把握するためにアクセス解析ツールを使用する場合があります。
        これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。
      </p>

      <h2>プライバシーポリシーの変更</h2>
      <p>
        当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
        変更があった場合は、当ページにて通知します。
      </p>

      <p className="text-sm text-gray-500">最終更新日: 2026年2月21日</p>
    </article>
  );
}
