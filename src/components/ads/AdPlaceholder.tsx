"use client";

export function AdPlaceholder({
  height = "250px",
  label = "広告",
}: {
  height?: string;
  label?: string;
}) {
  return (
    <div
      style={{ height }}
      className="w-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 rounded-lg text-sm"
    >
      {label}
    </div>
  );
}
