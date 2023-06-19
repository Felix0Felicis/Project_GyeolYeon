import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const bgImage = require('./bg3.png');

export default function RecordsScreen() {
  const [startTime, setStartTime] = useState(null);
  const cigarettePrice = 225;
  const cigaretteInterval = 60 * 60 * 1000; // 60 minutes in milliseconds
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const calculateTimeWasted = () => {
    if (startTime) {
      const currentTime = new Date();
      const timeDiff = currentTime - startTime;
      const cigaretteCount = Math.floor(timeDiff / cigaretteInterval);
      const totalMinutes = cigaretteCount * 3; // Calculate total minutes wasted
      const hours = Math.floor(totalMinutes / 60); // Calculate hours
      const minutes = totalMinutes % 60; // Calculate remaining minutes
      const timeWastedInMinutes = hours * 60 + minutes; // Calculate total time wasted in minutes
      return timeWastedInMinutes;
    }
    return 0;
  };

  const calculateTimeWastedFormatted = () => {
    const timeWastedInMinutes = calculateTimeWasted();
    const hours = Math.floor(timeWastedInMinutes / 60); // Calculate hours
    const minutes = timeWastedInMinutes % 60; // Calculate remaining minutes
    return `${hours}시간 ${minutes}분`;
  };

  const calculateMoneyWasted = () => {
    if (startTime) {
      const currentTime = new Date();
      const timeDiff = currentTime - startTime;
      const cigaretteCount = Math.floor(timeDiff / cigaretteInterval);
      const moneyWasted = cigaretteCount * cigarettePrice;
      return moneyWasted;
    }
    return 0;
  };

  const calculateMoneyWastedFormatted = () => {
    const moneyWasted = calculateMoneyWasted();
    return `${moneyWasted.toLocaleString()}원`;
  };

  const getRandomInformation = () => {
    const timeWastedInMinutes = calculateTimeWasted();
    const moneyWasted = calculateMoneyWasted();

    const informationList = [
      {
        label: '만들 수 있는 3분 카레의 개수',
        value: Math.floor(timeWastedInMinutes / 3),
        unit: '개',
      },
      {
        label: '연애 가능 횟수',
        value: 0,
        unit: '회',
      },
      {
        label: '읽을 수 있었던 책의 개수',
        value: Math.floor(timeWastedInMinutes / 251),
        unit: '권',
      },
      {
        label: '주택청약으로 넣었으면...',
        value: Math.floor(moneyWasted / 100000),
        unit: '회',
      },
      {
        label: '2023년 최저임금으로',
        value: Math.floor(timeWastedInMinutes /60 * 9620),
        unit: '원',
      },
      {
        label: '꿀잠 잘 수 있던 날',
        value: Math.floor(timeWastedInMinutes / 480),
        unit: '일',
      },
      {
        label: '아반떼',
        value: Math.floor(moneyWasted / 19600000),
        unit: '대',
      },
    ];

    const selectedInformation = [];
    while (selectedInformation.length < 4) {
      const randomIndex = Math.floor(Math.random() * informationList.length);
      const randomInfo = informationList[randomIndex];
      if (!selectedInformation.includes(randomInfo)) {
        selectedInformation.push(randomInfo);
      }
    }

    return selectedInformation;
  };

  const handleDateChange = (event, selectedDate) => {
    setStartTime(selectedDate);
    setShowDatePicker(false);
    setShowAdditionalInfo(true);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  useEffect(() => {
    showDatePickerModal();
  }, []);

  return (
    <ImageBackground source={bgImage} style={styles.container}>
      <StatusBar style={styles.statusBar} />
      <Text style={styles.subtitle}>담배에 낭비한</Text>
      <Text style={styles.title}>인생</Text>
      <Text style={[styles.label, { fontWeight: 'bold' }]}>흡연을 시작한 일자</Text>
      <Button title="일자 선택" onPress={showDatePickerModal} />
      {showDatePicker && (
        <DateTimePicker
          value={startTime || new Date()} // Set the initial value to startTime or the current date
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.text}>현재까지 흡연으로 낭비한 시간: {calculateTimeWastedFormatted()}</Text>
      <Text style={[styles.text, { marginTop: 10 }]}>현재까지 흡연으로 낭비한 돈: {calculateMoneyWastedFormatted()}</Text>

      {showAdditionalInfo && (
        <>
          <Text style={[styles.label, { marginTop: 30, marginBottom: 30, fontWeight: 'bold' }]}>금연을 했더라면,,,</Text>
          {getRandomInformation().map((info, index) => (
            <Text key={index} style={[styles.text, { marginTop: 5 }]}>
              {`${info.label}: `}
              <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>{Math.floor(info.value).toLocaleString()}{info.unit}</Text>
            </Text>
          ))}
        </>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 100,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 30,
  },
  label: {
    color: 'white',
    fontSize: 30,
    marginBottom: 0,
  },
  text: {
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
  },
  statusBar: {
    backgroundColor: 'black',
    color: 'white',
  },
});
