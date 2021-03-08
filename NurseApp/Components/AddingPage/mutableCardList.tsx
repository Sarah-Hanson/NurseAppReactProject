import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {ICardItem} from '../Common/common';
import {CardItem} from './cardItem';
import {AddItem} from './addItem';

export const MutableCardList = ({initialList}: {initialList: any[]}) => {
  const [list, setList] = useState<ICardItem[]>(initialList);

  const rmItem = (index: number) => {
    console.warn('rm' + index);
    list.splice(index);
    setList(list);
  };
  const addItem = (item: ICardItem) => setList(list.concat(item));

  return (
    <View style={{width: '90%', padding: '5%'}}>
      <ScrollView>
        {list.map((item, index) => (
          <CardItem key={item.id} item={item} onRm={() => rmItem(index)} />
        ))}
      </ScrollView>
      <AddItem isPatient={!!list[0].room} onPress={() => addItem} />
    </View>
  );
};
