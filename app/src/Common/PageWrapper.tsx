import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {colors, HorizontalRule, Row, Spacer, TextBig} from './common';
import {Footer} from './Footer';
import {useStateValue} from '../StateProvider';
import {Actions, Pages} from './Enums';

export const PageWrapper = (props) => {
  // @ts-ignore
  const [{page}, dispatch] = useStateValue();

  const showFooter = (): boolean =>
    page !== Pages.results && page !== Pages.error;

  return (
    <View
      style={{
        backgroundColor: colors.plum,
        width: '100%',
        height: '100%',
        marginTop: '4%',
      }}>
      <NavBar />
      <HorizontalRule />
      <View
        style={{
          height: '80%',
          width: '80%',
          alignSelf: 'center',
        }}>
        {props.children}
      </View>
      <Spacer />
      {showFooter() && <Footer />}
    </View>
  );
};

const NavBar = () => {
  // @ts-ignore
  const [{page}, dispatch] = useStateValue();
  const pages = [Pages.nurses, Pages.rooms, Pages.teams, Pages.settings].filter(
    (e) => e !== page,
  );

  if (page !== Pages.results) {
    return <Row>{pages.map((p) => NavButton(p))}</Row>;
  } else {
    return (
      <TouchableOpacity
        onPress={() =>
          dispatch({type: Actions.changePage, payload: Pages.nurses})
        }>
        <TextBig text={'Go Back'} />
      </TouchableOpacity>
    );
  }
};

const NavButton = (page: string) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();

  return (
    <TouchableOpacity
      key={page}
      onPress={() => dispatch({type: Actions.changePage, payload: page})}
      style={{width: '25%'}}>
      <TextBig text={page} />
    </TouchableOpacity>
  );
};
