import React from "react";
import { serviceLinks } from "../config/sns-services";

export default function ServiceLinks() {
  return (
    <>
      <div className="font-medium mb-3">各サービスのリンク</div>

      <div className="flex flex-wrap gap-3">
        {serviceLinks.map((service, index) => (
          <a
            key={index}
            href={service.link}
            className="flex flex-col items-center p-2 border rounded-md hover:bg-gray-100 transition-colors w-16 h-16"
            title={service.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="mb-1">{service.icon}</div>
            <div className="text-xs text-center truncate w-full">
              {service.name}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
