import axios from 'axios';
import {Alert, TouchableOpacity, View} from 'react-native';
import {colors, TextBig, TextSmall} from './common';
import React from 'react';
import {useStateValue} from '../StateProvider';
import {Actions, Pages} from './Enums';
import {
  FENurse,
  FEPreference,
  IBed,
  IPatient,
  Nurse,
  PreferencePayload,
  ServerPayload,
  Team,
  TeamPayload,
} from '../../../shared/types';

export const Footer = () => {
  // @ts-ignore
  const [{teams, preferences, rooms, nurses}, dispatch] = useStateValue();

  const generateServerPayload = (): ServerPayload => {
    const convertToNurse = ({name}: FENurse): Nurse => new Nurse(name, []);
    const formatBedAndRoom = (bed: IBed) => {
      const room = rooms.find((e) => e.beds.includes(bed));
      return room.name.match(/\d+$/)[0] + ' - ' + bed.name.split(' ')[1];
    };
    const convertBedToPayload = (bed: IBed): IPatient => ({
      id: formatBedAndRoom(bed),
      acuity: bed.acuity,
      room: rooms.find((e) => e.beds.includes(bed)).name,
    });
    const findNurse = (id: string): Nurse => {
      const FENurse = nurses.find((e) => e.id === id);
      let nurse;
      teamsPayload.forEach((team) => {
        const found = team.nurses.find((nurse) => nurse.name === FENurse.name);
        if (found) {
          nurse = found;
        }
      });
      return nurse;
    };
    const findBed = (id: string): IBed => {
      let bed;
      rooms.forEach((room) => {
        const found = room.beds.find((bed) => bed.id === id);
        if (found) {
          bed = found;
        }
      });
      return bed;
    };
    const convertToPreference = (
      preference: FEPreference,
    ): PreferencePayload => ({
      nurse: findNurse(preference.nurseId),
      bed: formatBedAndRoom(findBed(preference.bedId)),
      weight: preference.weight,
    });

    const teamsPayload: TeamPayload[] = teams.map(
      ({name, nurses, beds}): Team => ({
        name,
        nurses: nurses.map((e) => convertToNurse(e)),
        beds: beds.map((e) => convertBedToPayload(e)),
      }),
    );

    console.warn({
      teams: teamsPayload,
      preferences: preferences.map((preference) =>
        convertToPreference(preference),
      ),
    });

    return {
      teams: teamsPayload,
      preferences: preferences.map((preference) =>
        convertToPreference(preference),
      ),
    };
  };

  const submitList = (route = '/schedule') => {
    axios
      .post(route, generateServerPayload())
      .then((res) => {
        Alert.alert('Server called, and working on the problem');
        console.warn(res.data);
      })
      .catch((e) => console.log('Error: ' + e.message + ' res ' + e.data));
  };

  const getList = () => {
    axios
      .get('/schedule')
      .then((res) => {
        let results = res.data;
        if (results?.status !== 'pending') {
          dispatch({
            type: Actions.setResults,
            payload: results,
          });
          dispatch({type: Actions.changePage, payload: Pages.results});
        } else {
          Alert.alert('Pending Please try again later');
        }
      })
      .catch((e) => console.log('Error: ' + e.message + ' res ' + e.data));
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        height: '10%',
        width: '100%',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        style={{
          height: 30,
          backgroundColor: colors.green,
          borderRadius: 15,
          justifyContent: 'center',
          marginLeft: '10%',
        }}
        onPress={() => submitList()}>
        <TextSmall text={'Calculate!'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 30,
          backgroundColor: colors.green,
          borderRadius: 15,
          justifyContent: 'center',
        }}
        onPress={() => submitList('/echo')}>
        <TextSmall text={'Echo!'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 30,
          backgroundColor: colors.green,
          borderRadius: 15,
          justifyContent: 'center',
          marginRight: '10%',
        }}
        onPress={() => getList()}>
        <TextSmall text={'Get Results!'} />
      </TouchableOpacity>
    </View>
  );
};
