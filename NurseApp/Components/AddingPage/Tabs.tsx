import React, {useState} from 'react';
import {Row, TextBig, Spacer} from '../Common/common';
import {TouchableOpacity} from 'react-native';

interface ITab {
  name: string;
  tabComponent: any;
}

export const Tabs = ({tabs}: {tabs: ITab[]}) => {
  const [active, setActive] = useState(0);

  function renderActiveComponent() {
    return tabs[active].tabComponent;
  }

  return (
    <>
      <Row>
        {tabs.map((tab, index) => (
          <Tab
            key={'tab' + index}
            name={tab.name}
            onPress={() => setActive(index)}
          />
        ))}
      </Row>
      {renderActiveComponent()}
    </>
  );
};

export const Tab = ({name, onPress}: {name: string; onPress(): void}) => (
  <TouchableOpacity onPress={onPress}>
    <TextBig>{name}</TextBig>
  </TouchableOpacity>
);
