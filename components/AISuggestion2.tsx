"use client";

import { useEffect, useState } from "react";

const AISuggestion2 = ({ term }: { term: string }) => {
  const [suggestion, setSuggestion] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const generateAIAssistantReply = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch("/api/suggestions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ term }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        setSuggestion(data.reply);
        setError("");
      } catch (error: any) {
        console.error(error);
        setError("Failed to fetch AI suggestion.");
        setSuggestion("");
      } finally {
        setLoading(false); // End loading
      }
    };

    if (term) {
      generateAIAssistantReply();
    }
  }, [term]);

  return (
    <div className="space-y-2">
      {term && (
        <>
          <p className="text-lg font-semibold">Term: {term}</p>
          {loading ? (
            <div className="flex space-x-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-[index * 200ms]"
                ></div>
              ))}
            </div>
          ) : (
            <p className="text-md">Answer: {suggestion || error}</p>
          )}
        </>
      )}
    </div>
  );
};

export default AISuggestion2;
