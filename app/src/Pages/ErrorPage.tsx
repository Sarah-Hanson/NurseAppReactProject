import React, {useEffect} from 'react';
import {PageWrapper} from '../Common/PageWrapper';
import {TextBig} from '../Common/common';
import {View} from 'react-native';
import {useStateValue} from '../StateProvider';
import {Actions, Pages} from '../Common/Enums';

export const ErrorPage = () => {
  // @ts-ignore
  const [{page}, dispatch] = useStateValue();

  useEffect(() => {
    if (page !== Pages.error) {
      dispatch({type: Actions.changePage, payload: Pages.error});
    }
  }, [page]);

  return (
    <PageWrapper>
      <View
        style={{
          height: '80%',
          width: '100%',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <TextBig text={'Oops'} />
        <TextBig text={"You've encountered a nav error"} />
      </View>
    </PageWrapper>
  );
};
