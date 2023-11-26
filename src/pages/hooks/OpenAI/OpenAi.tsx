import React, { useState, useCallback } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import { StyleSheet, View } from 'react-native';

import axios from 'axios';

const OpenAI = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const sendMessageToChatGPT = async (message) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', 
      {
        model: "gpt-3.5-turbo-0301", // 使用するモデル
        messages: [{ role: 'system', content: 'You' }, { role: 'user', content: message }],
      }, {
        headers: {
          'Authorization': `Bearer ${'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'}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );
      // ChatGPTからの応答を取得
      const reply = response.data.choices[0].message.content;
      return reply;
    } catch (error) {
      console.error('ChatGPT API request error:', error);
      return null;
    }
  };

  const handleSend = useCallback(async (newMessages = []) => {
    const userMessage = newMessages[0];
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    // ChatGPTにメッセージを送信して応答を受け取る
    const reply = await sendMessageToChatGPT(userMessage.text);

    if (reply) {
      const botMessage = {
        _id: Math.random().toString(),
        text: reply,
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatGPT' },
        avatar: 'https://placeimg.com/140/140/any',
      };

      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    }
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: 1 }}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
});

export default OpenAI;