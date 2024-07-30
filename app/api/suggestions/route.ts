import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { term } = await request.json();

  try {
    const apiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a knowledgable assistant that provides quality information.",
            },
            {
              role: "user",
              content: term, // Use the `term` variable for dynamic queries
            },
          ],
        }),
      }
    );

    const responseData = await apiResponse.json();
    console.log("API Response:", responseData); // Log the entire response to inspect the structure

    // Assuming the structure has `choices` array
    if (responseData.choices && responseData.choices.length > 0) {
      // Log the `message` object to see its structure
      console.log("Message Object:", responseData.choices[0].message.content);

      // Example path, adjust based on actual structure you find
      const replyText = responseData.choices[0].message.content; // Placeholder path, adjust after inspecting the log
      console.log("Reply:", replyText);

      return NextResponse.json({ reply: replyText });
    } else {
      console.error(
        "No choices in response or unexpected structure:",
        responseData
      );
      return NextResponse.json(
        { error: "No reply available from the API" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error:", error.message); // Enhanced error logging
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
