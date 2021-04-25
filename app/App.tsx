import 'react-native-get-random-values';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {AddingPage} from './Components/AddingPage/addingPage';
import {ResultsPage} from './Components/ResultsPage/resultsPage';
import {generatePatients, nurses, preferences} from './testData';

const App = () => {
  const [results, changeResults] = useState([]);
  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      {results.length === 0 ? (
        <AddingPage
          nurses={nurses}
          patients={generatePatients(14, 1)}
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