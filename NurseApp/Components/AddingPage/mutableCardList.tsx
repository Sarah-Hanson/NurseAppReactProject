import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import {ICardItem} from '../Common/common';
import {CardItem} from './cardItem';

export const MutableCardList = ({initialList}: {initialList: any[]}) => {
  const [list, setList] = useState<ICardItem[]>(initialList);

  const rmItem = (index: number) => setList(list.slice(index, 1));
  const addItem = (item: ICardItem) => setList(list.concat(item));

  return (
    <ScrollView>
      {list.map((item, index) => (
        <CardItem
          key={item.name + index}
          item={item}
          onPress={() => rmItem(index)}
        />
      ))}
    </ScrollView>
  );
};
