import Link from "next/link";
import { iconMap } from "@/lib/docs";
import { getDocsStructure } from "@/lib/docs.server";

export default function EndpointsPage() {
  const { endpoints } = getDocsStructure();

  return (
    <div className="flex flex-1 flex-col p-6">
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-[#7931F4]">
            API Endpoints
          </h1>
          <p className="text-muted-foreground mb-8">
            Explore our comprehensive suite of financial data APIs
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {endpoints.map((endpoint) => {
              const Icon = iconMap[endpoint.icon] || iconMap.FileText;
              return (
                <Link
                  key={endpoint.url}
                  href={endpoint.url}
                  className="group flex items-start gap-4 p-4 border rounded-lg hover:border-[#7931F4]/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#7931F4]/10 text-[#7931F4]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold group-hover:text-[#7931F4] transition-colors">
                      {endpoint.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {endpoint.description || `Documentation for ${endpoint.title}`}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
