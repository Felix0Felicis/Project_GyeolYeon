import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Vibration, ImageBackground } from 'react-native';

import bgImage from './bg.png';

export default function TimerScreen() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timer, setTimer] = useState('00:00:00');
  const [showMessage, setShowMessage] = useState(false);
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [records, setRecords] = useState([]);

  useEffect(() => {
    let interval = null;

    if (startTime && !endTime) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const duration = Math.floor((currentTime - startTime) / 1000);
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;

        setTimer(
          `${hours < 10 ? '0' + hours : hours}:${
            minutes < 10 ? '0' + minutes : minutes
          }:${seconds < 10 ? '0' + seconds : seconds}`
        );
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  useEffect(() => {
    if (showMessage) {
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnimation, {
          toValue: 0,
          duration: 1000,
          delay: 2000,
          useNativeDriver: true,
        }).start(() => {
          setShowMessage(false);
        });
      });
    }
  }, [showMessage, fadeAnimation]);

  const handleStart = () => {
    if (!startTime) {
      const currentTime = Date.now();
      setStartTime(currentTime);
      setEndTime(null);
      setTimer('00:00:00');
    }
  };

  const handleEnd = () => {
    if (startTime && !endTime) {
      const currentTime = Date.now();
      const duration = Math.floor((currentTime - startTime) / 1000);
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = duration % 60;

      const record = {
        hours,
        minutes,
        seconds,
      };

      const updatedRecords = [...records, record].sort((a, b) => {
        const durationA = a.hours * 3600 + a.minutes * 60 + a.seconds;
        const durationB = b.hours * 3600 + b.minutes * 60 + b.seconds;
        return durationB - durationA;
      });

      setRecords(updatedRecords.slice(0, 3));

      setEndTime(currentTime);
      setStartTime(null);
      setTimer('00:00:00');
      setShowMessage(true);
      Vibration.vibrate();
    }
  };

  return (
    <ImageBackground source={bgImage} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>절연</Text>
        <Text style={styles.subtitle}>담배와 인연을 끊자</Text>
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{timer}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleStart}
          disabled={startTime && !endTime}
        >
          <Text style={styles.buttonText}>금연 시작</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleEnd}
          disabled={!startTime || endTime}
        >
          <Text style={styles.buttonText}>금연 종료</Text>
        </TouchableOpacity>
      </View>
      {showMessage && (
        <Animated.View style={[styles.messageContainer, { opacity: fadeAnimation }]}>
          <Text style={styles.messageText}>무능한놈</Text>
        </Animated.View>
      )}
      <View style={styles.recordContainer}>
        <Text style={styles.recordTitle}>금연 최고 기록</Text>
        {records.map((record, index) => (
          <Text key={index} style={styles.recordText}>
            {`${index + 1}. ${record.hours < 10 ? '0' + record.hours : record.hours}:${
              record.minutes < 10 ? '0' + record.minutes : record.minutes
            }:${record.seconds < 10 ? '0' + record.seconds : record.seconds}`}
          </Text>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 130,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    color:'#d63624',
  },
  subtitle: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'light',
  },
  timerContainer: {
    marginBottom: 10,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#d63624',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  messageContainer: {
    position: 'absolute',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#d63624',
    borderRadius: 20,
  },
  messageText: {
    fontSize: 50,
    color: '#FFF',
    fontWeight: 'bold',
  },
  recordContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  recordTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recordText: {
    fontSize: 40,
    color: 'white',
    marginBottom: 5,
    fontWeight: 'light',
  },
});
