import { toolsConfig } from "@/lib/tools-config";
import { ToolCard } from "@/components/tools/ToolCard";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { AdPlaceholder } from "@/components/ads/AdPlaceholder";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} - オンラインツール一覧`,
    itemListElement: toolsConfig.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.nameJa,
      url: `${SITE_URL}${tool.path}`,
    })),
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      <section className="text-center py-8">
        <h1 className="text-3xl font-bold mb-3">
          便利なオンラインツールを無料で
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          文字数カウント、JSON整形、QRコード生成など、日常的に使えるWebツールを集めました。登録不要・無料でご利用いただけます。
        </p>
      </section>

      <div className="my-4">
        <AdPlaceholder height="90px" />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {toolsConfig.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </section>

      <div className="my-4">
        <AdPlaceholder height="250px" />
      </div>
    </>
  );
}
