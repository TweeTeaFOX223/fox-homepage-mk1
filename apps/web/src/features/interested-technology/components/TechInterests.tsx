"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { techConfig } from "../config/tech-config";

const TechInterests = () => {
  const getProficiencyColor = (proficiency: number): string => {
    if (proficiency >= 70) return "bg-green-500";
    if (proficiency >= 40) return "bg-yellow-500";
    if (proficiency >= 10) return "bg-red-500";
    return "bg-black";
  };

  const getProficiencyLabel = (proficiency: number): string => {
    if (proficiency >= 60) return "実務で1回以上使用";
    if (proficiency >= 40) return "開発で多数使用";
    if (proficiency >= 25) return "開発で1回以上使用";
    if (proficiency >= 10) return "少し試した程度";
    return "概要を知ってる";
  };

  return (
    <div className="w-full space-y-4 p-4">
      <h2 className="text-2xl font-black mb-6 flex items-center justify-center bg-gradient-to-r from-slate-600 via-gray-600 to-emerald-600 bg-clip-text text-transparent">
        興味がある「技術・ツール等」
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {techConfig.map((category, index) => {
          const CategoryIcon = category.icon;

          return (
            <Card
              key={index}
              className={`${category.style.color} transition-colors border-2 ${category.style.borderColor}`}
            >
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2 mb-2">
                  <CategoryIcon className="w-6 h-6 flex-shrink-0" />
                  <CardTitle className="text-lg leading-tight">
                    {category.title}
                  </CardTitle>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="h-px bg-black" />
              </CardHeader>
              <CardContent className="mt-4">
                <ul className="space-y-4">
                  {category.items.map((item, itemIndex) => {
                    const TechIcon = item.icon || Zap;
                    return (
                      <li key={itemIndex} className="flex flex-col space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <TechIcon className="w-4 h-4 flex-shrink-0 mt-1" />
                            <span className="font-medium leading-tight break-words">
                              {item.name}
                            </span>
                          </div>
                          <span
                            className={`flex-shrink-0 text-xs px-2 py-1 rounded-full text-white whitespace-nowrap ${getProficiencyColor(
                              item.proficiency
                            )}`}
                          >
                            {getProficiencyLabel(item.proficiency)}
                          </span>
                        </div>
                        {item.description && (
                          <div className="flex items-start gap-4">
                            <div className="ml-6 text-sm text-gray-600 break-words flex-1">
                              {item.description}
                            </div>
                            <div className="flex-shrink-0 w-20">
                              <div className="h-1 bg-gray-200 rounded">
                                <div
                                  className="h-1 bg-gray-600 rounded"
                                  style={{ width: `${item.proficiency}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TechInterests;
