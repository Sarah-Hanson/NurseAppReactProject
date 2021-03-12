import {StyleSheet, View, Text} from 'react-native';
import React from 'react';

export interface ICardItem {
  name: string;
  acuity?: number;
  room?: string;
  id: string;
}

export const Row = (props: {children: React.ReactNode}) => {
  return <View style={sh.row}>{props.children}</View>;
};
export const Card = (props: {children: React.ReactNode}) => {
  return <View style={sh.card}>{props.children}</View>;
};
export const TextBig = ({text}: {text: string}) => {
  return <Text style={[sh.text, sh.big]}>{text}</Text>;
};
export const TextSmall = ({text}: {text: string}) => {
  return <Text style={[sh.text, sh.small]}>{text}</Text>;
};
export const TextAdd = ({text}: {text: string}) => {
  return <Text style={[sh.text, sh.big, sh.add]}>{text}</Text>;
};
export const TextDel = ({text}: {text: string}) => {
  return <Text style={[sh.text, sh.big, sh.del]}>{text}</Text>;
};
export const Spacer = () => <View style={{flexGrow: 1}} />;

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
    alignItems: 'stretch',
  },
  card: {
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderWidth: 5,
    borderColor: colors.darker,

    marginVertical: '2%',
    paddingVertical: '2%',

    flexDirection: 'column',
    alignItems: 'center',
  },
  big: {
    marginHorizontal: '2%',
    fontSize: 20,
    alignSelf: 'center',
  },
  small: {
    fontSize: 15,
    alignSelf: 'center',
  },
  add: {
    color: colors.green,
  },
  del: {
    color: colors.red,
  },
  text: {
    marginHorizontal: '2%',
    marginVertical: '1%',
  },
});
