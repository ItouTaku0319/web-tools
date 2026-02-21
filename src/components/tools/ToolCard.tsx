import Link from "next/link";
import type { ToolConfig } from "@/lib/tools-config";

export function ToolCard({
  tool,
  compact = false,
}: {
  tool: ToolConfig;
  compact?: boolean;
}) {
  const Icon = tool.icon;

  if (compact) {
    return (
      <Link
        href={tool.path}
        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors text-sm"
      >
        <Icon size={16} className="text-blue-600 shrink-0" />
        <span>{tool.nameJa}</span>
      </Link>
    );
  }

  return (
    <Link
      href={tool.path}
      className="group block rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
          <Icon size={24} />
        </div>
        <h3 className="font-semibold text-gray-900">{tool.nameJa}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">
        {tool.descriptionJa}
      </p>
    </Link>
  );
}
