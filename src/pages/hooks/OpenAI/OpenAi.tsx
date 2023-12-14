import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";
import { useRecipeInfo } from "../../../RecipeInfoContext";

interface Message {
  role: string;
  content: any;
  id: number;
}

const OpenAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const APIKey = "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";
  const model = "gpt-3.5-turbo-0301";

  const sendMessageToChatGPT = async (message: any) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model,
          messages: [
            { role: "system", content: "You" },
            { role: "user", content: message },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${APIKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data.choices[0].message.content;
      return reply;
    } catch (error) {
      console.error("ChatGPT API request error:", error);
      return null;
    }
  };

  const handleSend = useCallback(async (userMessage: any) => {
    // ユーザのメッセージを追加
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userMessage, id: prevMessages.length },
    ]);

    // ChatGPTにメッセージを送信して応答を受け取る
    const reply = await sendMessageToChatGPT(userMessage);

    if (reply) {
      // ChatGPTの応答を追加
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: reply, id: prevMessages.length + 1 },
      ]);
    }
  }, []);

  const { recipeInfo } = useRecipeInfo();

  // useEffect(() => {
  //   if (recipeInfo) {
  //     handleSend(recipeInfo);
  //   }
  // }, [recipeInfo, handleSend]);

  //他のコンポーネントからの命令文を受け取る
  useEffect(() => {
  // 他のコンポーネントからの命令文
  const commandFromOtherComponent = `${recipeInfo}の条件でレシピを考えてください`;
  // 受け取った命令文を処理
  handleSend(commandFromOtherComponent);
  }, [handleSend]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <Text>
              {item.role === "user" ? "You:" : "Assistant:"} {item.content}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default OpenAI;
