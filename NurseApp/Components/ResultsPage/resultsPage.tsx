import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {getNurseAcuity, INurse} from '../assignator';
import {Card, Row, Spacer, TextBig, colors} from '../common';
import {nanoid} from 'nanoid';

export const ResultsPage = ({
  list,
  changeResults,
}: {
  list: INurse[];
  changeResults(i: any): any;
}) => {
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
          {list.map((result) => (
            <Card key={nanoid()}>
              <Row>
                <TextBig text={result.name} />
                <Spacer />
                <TextBig text={'Total Acuity: ' + getNurseAcuity(result)} />
              </Row>
              <View
                style={{
                  width: '95%',
                  borderBottomWidth: 2,
                  borderBottomColor: colors.orange,
                }}
              />
              {result.patients.length > 0 &&
                result.patients.map((patient) => (
                  <Row key={nanoid()}>
                    <TextBig text={patient.name} />
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
