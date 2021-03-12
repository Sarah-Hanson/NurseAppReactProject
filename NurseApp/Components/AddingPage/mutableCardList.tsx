import {ScrollView, View} from 'react-native';
import React from 'react';

export const MutableCardList = ({
  items,
  addComponent,
}: {
  items: any;
  addComponent: any;
}) => {
  return (
    <View style={{height: '95%', width: '90%', padding: '5%'}}>
      {addComponent}
      <ScrollView>{items}</ScrollView>
    </View>
  );
}
