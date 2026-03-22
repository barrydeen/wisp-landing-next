import Image from "next/image";
import { clsx } from "clsx";
import { Smartphone } from "lucide-react";

interface PhoneMockupProps {
  src?: string;
  alt?: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PhoneMockup({ src, alt, label, className, children }: PhoneMockupProps) {
  return (
    <div
      className={clsx(
        "relative mx-auto w-[260px] shrink-0",
        className
      )}
    >
      {/* Phone frame */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-[3px] border-[#333] bg-[#111] shadow-[0_0_60px_rgba(0,0,0,0.5)]">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-6 w-[40%] -translate-x-1/2 rounded-b-2xl bg-[#111]" />

        {/* Screen area */}
        <div className="aspect-[9/19.5] w-full overflow-hidden rounded-[2.25rem] bg-[#0a0a0a]">
          {src ? (
            <Image
              src={src}
              alt={alt || label || "App screenshot"}
              fill
              className="object-cover"
            />
          ) : children ? (
            children
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
              <Smartphone size={32} className="text-[#333]" />
              {label && (
                <span className="text-center text-xs font-medium text-[#555]">
                  {label}
                </span>
              )}
              <div className="rounded-lg border border-dashed border-[#252525] px-4 py-2">
                <span className="text-[10px] text-[#444]">Screenshot placeholder</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
