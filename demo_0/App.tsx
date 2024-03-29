import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { mediaDevices, RTCView } from 'react-native-webrtc';

const App = () => {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const localStream = await mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setStream(localStream);
      } catch (e) {
        console.error(e);
      }
    };

    getMedia();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {stream && <RTCView streamURL={stream.toURL()} style={{ flex: 1 }} />}
    </View>
  );
};

export default App;
