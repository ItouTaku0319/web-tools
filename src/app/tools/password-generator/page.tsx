"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CopyButton } from "@/components/tools/CopyButton";
import { toolsConfig } from "@/lib/tools-config";

const tool = toolsConfig.find((t) => t.slug === "password-generator")!;

const CHARSETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(
  length: number,
  options: { lowercase: boolean; uppercase: boolean; numbers: boolean; symbols: boolean }
): string {
  let chars = "";
  if (options.lowercase) chars += CHARSETS.lowercase;
  if (options.uppercase) chars += CHARSETS.uppercase;
  if (options.numbers) chars += CHARSETS.numbers;
  if (options.symbols) chars += CHARSETS.symbols;
  if (!chars) return "";

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (v) => chars[v % chars.length]).join("");
}

function getStrength(password: string): { label: string; color: string; width: string } {
  if (!password) return { label: "", color: "bg-gray-200", width: "w-0" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "弱い", color: "bg-red-500", width: "w-1/4" };
  if (score <= 3) return { label: "普通", color: "bg-yellow-500", width: "w-1/2" };
  if (score <= 4) return { label: "強い", color: "bg-blue-500", width: "w-3/4" };
  return { label: "非常に強い", color: "bg-green-500", width: "w-full" };
}

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: false,
  });
  const [passwords, setPasswords] = useState<string[]>([]);

  const handleGenerate = useCallback(() => {
    const results = Array.from({ length: 5 }, () =>
      generatePassword(length, options)
    );
    setPasswords(results);
  }, [length, options]);

  const strength = passwords[0] ? getStrength(passwords[0]) : getStrength("");

  return (
    <ToolLayout
      tool={tool}
      howToUse={
        <>
          <p>パスワードの長さと含める文字の種類を選択して「生成」ボタンをクリックすると、安全なランダムパスワードが5つ生成されます。</p>
          <p>暗号学的に安全な乱数生成器（crypto.getRandomValues）を使用しています。</p>
        </>
      }
      faq={[
        {
          question: "生成されたパスワードは安全ですか？",
          answer: "はい、ブラウザの暗号学的に安全な乱数生成器を使用しています。パスワードはサーバーに送信されず、すべてブラウザ内で処理されます。",
        },
        {
          question: "推奨されるパスワードの長さは？",
          answer: "最低でも12文字以上を推奨します。大文字・小文字・数字・記号を組み合わせるとより安全です。",
        },
      ]}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 items-end">
          <label className="text-sm">
            <span className="block text-gray-600 mb-1">長さ: {length}文字</span>
            <input
              type="range"
              min={4}
              max={128}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-48"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          {(
            [
              ["lowercase", "小文字 (a-z)"],
              ["uppercase", "大文字 (A-Z)"],
              ["numbers", "数字 (0-9)"],
              ["symbols", "記号 (!@#$...)"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={options[key]}
                onChange={(e) =>
                  setOptions((prev) => ({ ...prev, [key]: e.target.checked }))
                }
                className="rounded"
              />
              {label}
            </label>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          生成
        </button>

        {passwords.length > 0 && (
          <div className="space-y-3">
            {/* Strength indicator */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} ${strength.width} transition-all rounded-full`}
                />
              </div>
              <span className="text-sm text-gray-600">{strength.label}</span>
            </div>

            {passwords.map((pw, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <code className="flex-1 font-mono text-sm break-all">{pw}</code>
                <CopyButton text={pw} />
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
