import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export interface ICardItem {
  name: string;
  acuity?: number;
  room?: string;
  id: string;
}

export const Row = (props: {children: React.ReactNode; style?: any}) => {
  return <View style={[sh.row, props.style]}>{props.children}</View>;
};
export const Column = (props: {children: React.ReactNode; style?: any}) => {
  return <View style={[sh.column, props.style]}>{props.children}</View>;
};
export const Card = (props: {children: React.ReactNode}) => {
  return <View style={sh.card}>{props.children}</View>;
};
export const Title = ({text, style}: {text: string; style?: any}) => {
  return <Text style={[sh.text, sh.title, style]}>{text}</Text>;
};
export const TextBig = ({text, style}: {text: string; style?: any}) => {
  return <Text style={[sh.text, sh.big, style]}>{text}</Text>;
};
export const TextSmall = ({text, style}: {text: string; style?: any}) => {
  return <Text style={[sh.text, sh.small, style]}>{text}</Text>;
};
export const TextAdd = ({text}: {text: string}) => {
  return <Text style={[sh.text, sh.big, sh.add]}>{text}</Text>;
};
export const TextDel = ({text}: {text: string}) => {
  return <Text style={[sh.text, sh.big, sh.del]}>{text}</Text>;
};
export const Spacer = () => <View style={{flexGrow: 1}} />;

export const HorizontalRule = () => <View style={sh.horizontalRule} />;

export const Box = ({
  isSet,
  onPress,
}: {
  isSet: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{
        height: 15,
        width: 15,
        borderColor: colors.white,
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: isSet ? colors.white : colors.black,
        marginHorizontal: '5%',
      }}
      onPress={() => onPress()}
    />
  );
};

export enum colors {
  darker = '#696969',
  orange = '#FF9900',
  red = '#CC0000',
  green = '#3b9900',
  plum = '#5e0099',
  white = '#ffffff',
  rust = '#992e00',
  blue = '#120099',
  black = '#000000',
}

const sh = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  card: {
    borderRadius: 15,
    borderWidth: 5,

    marginVertical: '2%',
    paddingVertical: '2%',

    flexDirection: 'column',
    alignItems: 'center',

    backgroundColor: colors.black,
  },
  title: {
    marginHorizontal: '2%',
    marginVertical: '4%',
    fontSize: 30,
    alignSelf: 'center',
    textAlign: 'center',
  },
  big: {
    marginHorizontal: '2%',
    fontSize: 24,
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
    color: colors.white,
  },
  horizontalRule: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: colors.white,
    width: '90%',
    height: 5,
    alignSelf: 'center',
    marginTop: '2%',
  },
});
