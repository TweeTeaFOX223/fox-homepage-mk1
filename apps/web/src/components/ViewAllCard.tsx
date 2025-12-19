"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ViewAllCardProps {
  href: string;
  title: string;
  totalCount: number;
  stats: { label: string; count: number }[];
}

export default function ViewAllCard({
  href,
  title,
  totalCount,
  stats
}: ViewAllCardProps) {
  return (
    <Link href={href} className="block h-full">
      <Card className="group flex flex-col h-full p-2 bg-gradient-to-br from-foreground/5 to-transparent border-2 border-foreground/20 rounded-lg shadow-sm hover:shadow-xl hover:border-foreground/40 transition-all duration-300 overflow-hidden cursor-pointer">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg flex items-center justify-between">
            <span className="font-bold">{title}</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow space-y-3">
          <div className="text-xl font-bold text-primary">
            全部で {totalCount} 個あります
          </div>

          <div className="space-y-2">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2 rounded-md bg-background/50 border border-foreground/10"
              >
                <span className="text-sm font-medium">{stat.label}</span>
                <span className="text-sm font-bold text-primary">{stat.count} 個</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
