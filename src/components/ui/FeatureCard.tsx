"use client";

import {
  Search,
  TrendingUp,
  Hash,
  Wallet,
  AtSign,
  Layers,
  Gauge,
  Route,
  Zap,
  ImagePlay,
  Radio,
  Lock,
  Link,
} from "lucide-react";
import type { Feature } from "@/lib/features";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Search,
  TrendingUp,
  Hash,
  Wallet,
  AtSign,
  Layers,
  Gauge,
  Route,
  Zap,
  ImagePlay,
  Radio,
  Lock,
  Link,
};

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = iconMap[feature.icon];

  return (
    <div className="group relative rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#f97316]/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f97316]/0 to-transparent transition-all duration-300 group-hover:via-[#f97316]/60" />
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#f97316]/10">
        {Icon && <Icon size={20} className="text-[#f97316]" />}
      </div>
      <h3 className="mb-2 text-base font-semibold text-[#f0f0f0]">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-[#888]">{feature.description}</p>
    </div>
  );
}
