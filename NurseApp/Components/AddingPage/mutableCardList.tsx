import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {ICardItem} from '../Common/common';
import {CardItem} from './cardItem';
import {AddItem} from './addItem';

export const MutableCardList = ({initialList}: {initialList: any[]}) => {
  const [list, setList] = useState<ICardItem[]>(initialList);

  const rmItem = (index: number) => {
    list.splice(index, 1);
    const newList = [...list]; //force re-render since just mutating doesn't get picked up
    setList(newList);
  };
  const addItem = (item: ICardItem) => {
    setList(list.concat(item));
  };

  return (
    <View style={{width: '90%', padding: '5%'}}>
      <ScrollView>
        {list.map((item, index) => (
          <CardItem key={item.id} item={item} index={index} onPress={rmItem} />
        ))}
      </ScrollView>
      <AddItem isPatient={list.length > 0} onPress={addItem} />
    </View>
  );
};
