"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface EndpointTesterProps {
  method: string;
  endpoint: string;
  code: string;
}

export function EndpointTester({ method, endpoint, code }: EndpointTesterProps) {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const canTest = method.toUpperCase() === "GET" && !endpoint.includes("{") && !endpoint.includes(":");

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setIsOpen(true);

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch endpoint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4">
      <div className="rounded-lg overflow-hidden bg-[#282c34]">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#21252b] border-b border-gray-700/50">
          <span className="text-xs text-gray-500 font-mono uppercase tracking-wide">http</span>
          {canTest && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleTest}
              disabled={loading}
              className="h-6 px-3 text-xs bg-[#7931F4] hover:bg-[#6825d9] text-white border-0 font-medium"
            >
              {loading ? (
                <span className="flex items-center gap-1.5">
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Testing...
                </span>
              ) : (
                "Test it"
              )}
            </Button>
          )}
        </div>
        {/* Code content */}
        <div className="p-4">
          <code className="text-sm font-mono">
            <span className="text-[#61afef] font-semibold">{method}</span>
            <span className="text-gray-100"> {endpoint}</span>
          </code>
        </div>
      </div>

      {/* Response panel */}
      {isOpen && (
        <div className="mt-2 rounded-lg overflow-hidden border border-gray-700/50 bg-[#1e2127]">
          <div className="flex items-center justify-between px-4 py-2 bg-[#21252b] border-b border-gray-700/50">
            <span className="text-xs text-gray-500 font-mono uppercase tracking-wide">Response</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-300 text-xs font-medium transition-colors"
            >
              ✕ Close
            </button>
          </div>
          <div className="max-h-80 overflow-auto">
            {loading && (
              <div className="p-4 text-gray-400 text-sm">Loading...</div>
            )}
            {error && (
              <div className="p-4 text-red-400 text-sm">Error: {error}</div>
            )}
            {response && (
              <SyntaxHighlighter
                style={oneDark}
                language="json"
                PreTag="div"
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  fontSize: "0.8125rem",
                  background: "transparent",
                }}
              >
                {response}
              </SyntaxHighlighter>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
