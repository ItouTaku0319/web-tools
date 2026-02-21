import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "サイトについて",
  description: `${SITE_NAME}は、日常的に使える便利なオンラインツールを無料で提供するWebサービスです。`,
};

export default function AboutPage() {
  return (
    <article className="max-w-2xl mx-auto py-8 prose prose-gray">
      <h1>サイトについて</h1>

      <p>
        {SITE_NAME}は、日常的に使える便利なオンラインツールを無料で提供するWebサービスです。
        文字数カウント、JSON整形、Base64変換、QRコード生成など、開発者や一般ユーザーの方が日々の作業で必要とするツールを揃えています。
      </p>

      <h2>特徴</h2>
      <ul>
        <li>
          <strong>完全無料</strong> -
          すべてのツールを無料でご利用いただけます。会員登録も不要です。
        </li>
        <li>
          <strong>プライバシー重視</strong> -
          入力されたデータはすべてブラウザ内で処理されます。サーバーへのデータ送信は一切行いません。
        </li>
        <li>
          <strong>高速・シンプル</strong> -
          余計な機能を省き、必要なツールをすぐに使えるシンプルな設計です。
        </li>
      </ul>

      <h2>運営について</h2>
      <p>
        本サイトは個人で運営しています。
        ツールの改善リクエストやバグ報告がございましたら、お気軽にご連絡ください。
      </p>

      <h2>免責事項</h2>
      <p>
        本サイトのツールは「現状のまま」提供されており、正確性や完全性を保証するものではありません。
        ツールの使用により生じたいかなる損害についても、運営者は責任を負いません。
        重要なデータの処理には、必ず結果をご確認の上ご利用ください。
      </p>
    </article>
  );
}
