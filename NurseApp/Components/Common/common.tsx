import {StyleSheet, View} from 'react-native';
import React from 'react';

export const Row = (props: {children: React.ReactNode}) => {
  return <View style={sh.row}>{props.children}</View>;
};
export const Card = (props: {children: React.ReactNode}) => {
  return <View style={sh.card}>{props.children}</View>;
};
export const TextBig = (props: {children: React.ReactNode}) => {
  return <View style={[sh.text, sh.card]}>{props.children}</View>;
};
export const TextSmall = (props: {children: React.ReactNode}) => {
  return <View style={[sh.text, sh.card]}>{props.children}</View>;
};
export const Spacer = () => <View style={{flexGrow: 3}} />;

export const colors = {
  darker: '#696969',
  orange: '#FF9900',
  red: '#CC0000',
  green: '#66CC00',
};

const sh = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderWidth: 20,
    borderColor: colors.darker,

    flexDirection: 'column',
    alignItems: 'center',
  },
  big: {
    fontSize: 20,
    alignSelf: 'center',
  },
  small: {
    fontSize: 15,
    alignSelf: 'center',
  },
  text: {
    paddingHorizontal: '3%',
  },
});
