import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Vibration, ImageBackground } from 'react-native';
import bgImage from './bg2.png';

const App = () => {
  const [timer, setTimer] = useState(180);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('');
  const [messageOpacity] = useState(new Animated.Value(0));
  const [showResetButton, setShowResetButton] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (timer === 60 || timer === 120 || timer === 0) {
      Vibration.vibrate();
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(180);
    setMessage('');
    messageOpacity.setValue(0);
    setShowResetButton(false);
    setShowCongratulations(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const showMessage = (text) => {
    setMessage(text);
    Animated.timing(messageOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        hideMessage();
      }, 5000);
    });
  };

  const hideMessage = () => {
    Animated.timing(messageOpacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setMessage('');
    });
  };

  useEffect(() => {
    if (timer === 179) {
      showMessage('지금부터 명상을 시작합니다.\n 깊게 심호흡 합시다.');
    } else if (timer === 120) {
      showMessage('지금부터 눈을 감아봅니다.\n 머리에 생각을 비웁니다.');
    } else if (timer === 60) {
      showMessage('남은 1분 깊게 심호흡을 합시다.');
    } else if (timer === 120 || timer === 60) {
      hideMessage();
    }
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      setIsRunning(false);
      setTimer(180);
      setMessage('');
      messageOpacity.setValue(0);
      setShowCongratulations(true);
      setTimeout(() => {
        setShowCongratulations(false);
      }, 5000);
    }
    toggleResetButton();
  }, [timer]);

  const toggleResetButton = () => {
    if (timer < 180) {
      setShowResetButton(true);
    } else {
      setShowResetButton(false);
    }
  };

  return (
    <ImageBackground source={bgImage} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>INNER PEACE</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.statusText}>{isRunning ? '명상중' : '멈춤'}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleStartStop}
        onLongPress={handleReset}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>{isRunning ? 'STOP' : 'START'}</Text>
      </TouchableOpacity>
      <View style={styles.timerContainer}>
        <View style={styles.redBox}>
          {message !== '' && (
            <Animated.Text style={[styles.messageText, { opacity: messageOpacity }]}>
              {message}
            </Animated.Text>
          )}
        </View>
      </View>
      <Text style={styles.timerText}>{formatTime(timer)}</Text>
      {showResetButton && (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          activeOpacity={0.7}
        >
          <Text style={styles.resetButtonText}>RESET</Text>
        </TouchableOpacity>
      )}
      {showCongratulations && (
        <View style={styles.congratulationsContainer}>
          <Text style={styles.congratulationsText}>명상이 모두 끝났습니다</Text>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    position: 'absolute',
    top: 150,
    width: '100%',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 80,
    marginBottom: 40,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 30,
    color: 'white',
    fontWeight:'bold',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  redBox: {
    width: 200,
    height: 60,
    backgroundColor: '#393939',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  messageText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  timerText: {
    fontSize: 80,
    fontWeight: 'bold',
    marginTop: 15,
    color: 'white',
  },
  button: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#393939',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  resetButton: {
    position: 'absolute',
    top: 680,
    right: 60,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#393939',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  congratulationsContainer: {
    marginTop: 20,
    backgroundColor: '#393939',
    padding: 10,
    borderRadius: 10,
  },
  congratulationsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
