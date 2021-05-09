import {PageWrapper} from '../Common/PageWrapper';
import {useStateValue} from '../StateProvider';
import React from 'react';
import {Box, colors, Row, Spacer, TextSmall} from '../Common/common';
import {Actions} from '../Common/Enums';
import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';
import {FENurse, IBed, Team} from '../../../shared/types';

export const TeamsPage = () => {
  // @ts-ignore
  const [{nurses, nights}, dispatch] = useStateValue();

  return (
    <PageWrapper>
      <Row>
        <TextSmall text={`Nurses: ${nurses.length}`} />
        <TextSmall text={`Patients: ${0}`} />
        <TextSmall text={`Nights?`} />
        <Box
          isSet={nights}
          onPress={() =>
            dispatch({
              type: Actions.toggleNights,
              payload: undefined,
            })
          }
        />
      </Row>
      <View style={{height: '5%'}} />
      <ScrollView>
        <RoomColumns />
        <NurseColumns />
      </ScrollView>
    </PageWrapper>
  );
};

const RoomColumns = () => {
  // @ts-ignore
  const [{teams}, dispatch] = useStateValue();

  return (
    <>
      <Row>
        {teams.map((e: Team) => (
          <Column key={e.name + 'Beds'}>
            <TextSmall text={e.name} />
            {e.beds.map((e: IBed) => {
              return <ClickableBedCard key={e.id} bed={e} />;
            })}
            <Spacer />
          </Column>
        ))}
      </Row>
    </>
  );
};

const NurseColumns = () => {
  // @ts-ignore
  const [{teams}, dispatch] = useStateValue();
  return (
    <>
      <Row>
        {teams.map((e: Team) => (
          <Column key={e.name + 'Nurses'}>
            <TextSmall text={e.name} />
            {e.nurses.map((e: FENurse) => {
              return <ClickableNurseCard key={e.id} nurse={e} />;
            })}
            <Spacer />
          </Column>
        ))}
      </Row>
    </>
  );
};

const Column = (props: {children: React.ReactNode; style?: any}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      {props.children}
    </View>
  );
};

const ClickableBedCard = ({bed}: {bed: IBed}) => {
  // @ts-ignore
  const [{teams, rooms, nights}, dispatch] = useStateValue();

  const getTeams = () => {
    return teams.filter(
      (e) => !e.beds.includes(bed) || (nights && e.name !== 'TeamC'),
    );
  };

  const makeButtons = () => {
    const buttons: any[] = [];
    getTeams().forEach((e) => {
      buttons.push({text: e.name, onPress: () => switchTeam(e)});
    });
    return buttons;
  };

  const switchTeam = (team: Team) => {
    dispatch({
      type: Actions.switchTeamBed,
      payload: {team, bed},
    });
  };

  const formatBedAndRoom = (bed: IBed) => {
    const room = rooms.find((e) => e.beds.includes(bed));
    return room.name.match(/\d+$/)[0] + ' - ' + bed.name.split(' ')[1];
  };
  return (
    <TouchableOpacity
      style={{
        borderRadius: 20,
        backgroundColor: colors.black,
        height: 30,
        width: 50,
        margin: 5,
      }}
      onPress={() => Alert.alert('Move To', '', makeButtons())}>
      <TextSmall text={formatBedAndRoom(bed)} />
    </TouchableOpacity>
  );
};

const ClickableNurseCard = ({nurse}: {nurse: FENurse}) => {
  // @ts-ignore
  const [{teams, rooms, nights}, dispatch] = useStateValue();

  const getTeams = () => {
    return teams.filter(
      (e) => !e.nurses.includes(nurse) || (nights && e.name !== 'TeamC'),
    );
  };

  const makeButtons = () => {
    const buttons: any[] = [];
    getTeams().forEach((e) => {
      buttons.push({text: e.name, onPress: () => switchTeam(e)});
    });
    return buttons;
  };

  const switchTeam = (team: Team) => {
    dispatch({
      type: Actions.switchTeamNurse,
      payload: {team, nurse},
    });
  };

  return (
    <TouchableOpacity
      style={{
        borderRadius: 20,
        backgroundColor: colors.black,
        height: 30,
        width: 50,
        margin: 5,
      }}
      onPress={() => Alert.alert('Move To', '', makeButtons())}>
      <TextSmall text={nurse.name} />
    </TouchableOpacity>
  );
};
