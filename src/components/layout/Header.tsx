import Link from "next/link";
import { Wrench } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <Wrench size={24} className="text-blue-600" />
          {SITE_NAME}
        </Link>
        <nav className="hidden sm:flex items-center gap-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">ツール一覧</Link>
          <Link href="/about" className="hover:text-blue-600">サイトについて</Link>
        </nav>
      </div>
    </header>
  );
}
