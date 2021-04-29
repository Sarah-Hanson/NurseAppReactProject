import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Card, Row, Spacer, TextBig, colors} from '../common';
import {nanoid} from 'nanoid';
import {Nurse} from '../../../shared/types';

export const ResultsPage = ({
  list,
  changeResults,
}: {
  list: Nurse[];
  changeResults(i: any): any;
}) => {
  const getAcuity = (nurse: Nurse) => {
    return nurse.patients.length > 0
      ? nurse.patients
          .map((patient) => patient.acuity)
          .reduce((sum, curr) => sum + curr)
      : 0;
  };

  console.warn(list);
  return (
    <>
      <Text style={{fontSize: 30}}>Results</Text>
      <View
        style={{
          width: '95%',
          borderBottomWidth: 2,
          borderBottomColor: colors.orange,
          marginBottom: '2%',
        }}
      />
      <TouchableOpacity
        style={{
          height: '5%',
          width: '80%',
          backgroundColor: colors.darker,
          borderRadius: 15,
          justifyContent: 'center',
        }}
        onPress={() => changeResults([])}>
        <TextBig text={'Go Back'} />
      </TouchableOpacity>
      <View style={{height: '85%', width: '90%', padding: '5%'}}>
        <ScrollView>
          {list.map((nurse) => (
            <Card key={nanoid()}>
              <Row>
                <TextBig text={nurse.name} />
                <Spacer />
                <TextBig text={'Total Acuity: ' + getAcuity(nurse)} />
              </Row>
              <View
                style={{
                  width: '95%',
                  borderBottomWidth: 2,
                  borderBottomColor: colors.orange,
                }}
              />
              {nurse?.patients?.length > 0 &&
                nurse.patients.map((patient) => (
                  <Row key={nanoid()}>
                    <TextBig text={patient.id} />
                    <Spacer />
                    <TextBig text={'Acuity: ' + patient.acuity} />
                    <Spacer />
                    <TextBig
                      text={patient.room ? patient.room.name : 'undefined'}
                    />
                  </Row>
                ))}
            </Card>
          ))}
        </ScrollView>
      </View>
    </>
  );
};
