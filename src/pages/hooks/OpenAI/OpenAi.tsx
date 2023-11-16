import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const ChatGPTExample = () => {
  // State変数の宣言
  const [inputText, setInputText] = useState(''); // ユーザーの入力テキスト
  const [response, setResponse] = useState(''); // ChatGPTの応答

  // ChatGPT APIのエンドポイントとAPIキー
  const chatGPTAPIEndpoint = 'https://api.openai.com/v1/completions'; // ChatGPT APIのエンドポイントを設定
  const apiKey = 'sk-2OUrXJMLO7T3ou3k8Sh8T3BlbkFJRprptumWV87dFupsZyqSXYNVA5WuX9jQbnRg'; // ChatGPT APIのキーを設定

  // ChatGPT APIにリクエストを送信する関数
  const handleChatGPTRequest = async () => {
    try {
      // ChatGPT APIへのHTTP POSTリクエスト
      const apiResponse = await fetch(chatGPTAPIEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        // ChatGPT APIに送信するデータ
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: inputText,
            },
          ],
        }),
      });

      // APIレスポンスのJSONデータを取得
      const data = await apiResponse.json();
      // ChatGPTの応答を取得し、表示用のステート変数にセット
      const assistantResponse = data.choices[0]?.message?.content || 'No response';
      setResponse(assistantResponse);
    } catch (error) {
      // エラーハンドリング: コンソールにエラーメッセージを表示
      console.error('Error fetching ChatGPT API:', error);
    }
  };

  // コンポーネントのレンダリング
  return (
    <View>
      {/* ユーザーの入力テキストを受け付けるTextInput */}
      <Text>Input:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={(text) => setInputText(text)}
        value={inputText}
      />
      {/* ChatGPTに質問をするためのButton */}
      <Button
        title="Ask ChatGPT"
        onPress={handleChatGPTRequest}
      />
      {/* ChatGPTの応答を表示するText */}
      <Text>Response:</Text>
      <Text>{response}</Text>
    </View>
  );
};

// コンポーネントをエクスポート
export default ChatGPTExample;
