import axios from 'axios';
import {Alert, TouchableOpacity, View} from 'react-native';
import {colors, TextBig} from './common';
import React from 'react';

const submitList = () => {
  //     axios
  //         .post('/schedule', {
  //             nurses: nurseList,
  //             patients: patientList,
  //             preferences: preferenceList,
  //         })
  //         .then((res) => {
  //             Alert.alert('Server called, and working on the problem');
  //             console.warn(res.data);
  //         })
  //         .catch((e) => console.log('Error: ' + e.message + ' res ' + e.data));
};
//
const getList = () => {
  //     axios.get('/schedule').then((res) => {
  //         let results = res.data;
  //         if (results?.status !== 'pending') {
  //             changeResults(results);
  //         } else {
  //             Alert.alert('Pending Please try again later');
  //         }
  //     });
};

export const Footer = () => (
  <View
    style={{
      flexDirection: 'row',
      height: '10%',
      width: '100%',
      justifyContent: 'space-between',
    }}>
    <TouchableOpacity
      style={{
        height: 30,
        backgroundColor: colors.green,
        borderRadius: 15,
        justifyContent: 'center',
        marginLeft: '10%',
      }}
      onPress={() => submitList()}>
      <TextBig text={'Calculate!'} />
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        height: 30,
        backgroundColor: colors.green,
        borderRadius: 15,
        justifyContent: 'center',
        marginRight: '10%',
      }}
      onPress={() => getList()}>
      <TextBig text={'Get Results!'} />
    </TouchableOpacity>
  </View>
);
