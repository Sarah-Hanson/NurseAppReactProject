import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import {ICardItem} from '../Common/common';
import {CardItem} from './cardItem';
import set = Reflect.set;

export const MutableCardList = () => {
  const [list, setList] = useState<ICardItem[]>([]);

  const rmItem = (index: number) => setList(list.slice(index, 1));
  const addItem = (item: ICardItem) => setList(list.concat(item));

  return (
    <ScrollView>
      {list.map((item, index) => (
        <CardItem item={item} />
      ))}
    </ScrollView>
  );
};
