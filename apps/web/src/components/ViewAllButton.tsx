"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ViewAllButtonProps {
  href: string;
  label?: string;
}

export default function ViewAllButton({
  href,
  label = "全て見る"
}: ViewAllButtonProps) {
  return (
    <div className="flex justify-center mt-8">
      <Button
        variant="outline"
        size="lg"
        asChild
        className="group relative overflow-hidden border-2 border-foreground/20 hover:border-foreground/40 transition-all duration-300 hover:shadow-lg"
      >
        <Link href={href} className="flex items-center gap-2">
          <span className="relative z-10 font-medium">{label}</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </Link>
      </Button>
    </div>
  );
}
