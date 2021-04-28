import 'react-native-get-random-values';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {AddingPage} from './Components/AddingPage/addingPage';
import {ResultsPage} from './Components/ResultsPage/resultsPage';
import {generatePatients, nurses, preferences} from './testData';
import axios from 'axios';

const App = () => {
  const [results, changeResults] = useState([]);
  axios.defaults.baseURL = 'http://sarah-nurse-app.herokuapp.com';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      {results?.length === 0 ? (
        <AddingPage
          nurses={nurses}
          patients={generatePatients(13, 1)}
          preferences={preferences}
          changeResults={changeResults}
        />
      ) : (
        <ResultsPage list={results} changeResults={changeResults} />
      )}
    </SafeAreaView>
  );
};

export default App;
