import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-12">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}</p>
          <nav className="flex gap-4">
            <Link href="/about" className="hover:text-blue-600">サイトについて</Link>
            <Link href="/privacy" className="hover:text-blue-600">プライバシーポリシー</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
