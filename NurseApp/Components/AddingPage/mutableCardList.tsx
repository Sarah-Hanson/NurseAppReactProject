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
    <View style={{width: '90%', padding: '5%'}}>
      {addComponent}
      <ScrollView>{items}</ScrollView>
    </View>
  );
};
