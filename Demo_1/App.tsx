import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, Button } from 'react-native';
import io from 'socket.io-client';

const App = () => {
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = io('http://3.6.152.181:3000');
    socket.on('chat message', (msg: string) => {
      setChatMessages(prevMsgs => [...prevMsgs, msg]);
    });

    // Return a cleanup function that disconnects the socket
    return () => {
      socket.disconnect();
    };
  }, []); // Dependency array remains empty if you only want this to run once on component mount

  const submitChatMessage = () => {
    const socket = io('http://3.6.152.181:3000');
    socket.emit('chat message', chatMessage);
    setChatMessage('');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {chatMessages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
        ))}
      </ScrollView>
      <TextInput
        value={chatMessage}
        onSubmitEditing={submitChatMessage}
        onChangeText={text => setChatMessage(text)}
      />
      <Button onPress={submitChatMessage} title="Send" />
    </SafeAreaView>
  );
};

export default App;
