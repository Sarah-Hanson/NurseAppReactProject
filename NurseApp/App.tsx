import React from 'react';
import {Tabs} from './Components/AddingPage/Tabs';
import {MutableCardList} from './Components/AddingPage/mutableCardList';

const App = () => {
  const items = ['Item', 'Item', 'Item', 'Item'];
  return (
    <Tabs
      tabs={[
        {name: 'Nurses', tabComponent: <MutableCardList initialList={items} />},
        {
          name: 'Patients',
          tabComponent: <MutableCardList initialList={items} />,
        },
      ]}
    />
  );
};

export default App;
