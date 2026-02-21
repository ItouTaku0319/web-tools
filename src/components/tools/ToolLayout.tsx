"use client";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { AdPlaceholder } from "@/components/ads/AdPlaceholder";
import { ToolCard } from "./ToolCard";
import type { ToolConfig } from "@/lib/tools-config";
import { getRelatedTools } from "@/lib/tools-config";

interface ToolLayoutProps {
  tool: ToolConfig;
  children: React.ReactNode;
  howToUse?: React.ReactNode;
  faq?: { question: string; answer: string }[];
}

export function ToolLayout({ tool, children, howToUse, faq }: ToolLayoutProps) {
  const relatedTools = getRelatedTools(tool.slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "ホーム", href: "/" },
          { label: tool.nameJa },
        ]}
      />

      <div className="my-4">
        <AdPlaceholder height="90px" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <main>
          <h1 className="text-2xl font-bold mb-2">{tool.nameJa}</h1>
          <p className="text-gray-600 mb-6">{tool.descriptionJa}</p>

          {children}

          <div className="my-8">
            <AdPlaceholder height="250px" />
          </div>

          {howToUse && (
            <section className="my-8">
              <h2 className="text-xl font-bold mb-3">使い方</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                {howToUse}
              </div>
            </section>
          )}

          {faq && faq.length > 0 && (
            <section className="my-8">
              <h2 className="text-xl font-bold mb-4">よくある質問</h2>
              <div className="space-y-3">
                {faq.map((item, i) => (
                  <details
                    key={i}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <summary className="font-medium cursor-pointer">
                      {item.question}
                    </summary>
                    <p className="mt-2 text-gray-600">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="hidden lg:block space-y-6">
          <AdPlaceholder height="250px" />
          <div>
            <h3 className="font-bold mb-3 text-sm">関連ツール</h3>
            <div className="space-y-1">
              {relatedTools.map((t) => (
                <ToolCard key={t.id} tool={t} compact />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
