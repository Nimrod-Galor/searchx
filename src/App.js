import {useEffect, useState} from 'react';
import './App.css';
import Logo from './components/Logo'
import UserInput from './components/UserInput';
import Results from './components/Results';
import Autocomplete from './components/Autocomplete';
import Data from './data/MOCK_DATA.json';

function App() {
  const [userHistory, setUserHistory] = useState([]);
  const [uinput, setUinput] = useState('');
  const [autoSuggestion, setAutoSuggestion] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchDuration, setSearchDuration] = useState(0);

  const handleInputChange = (e) => {
      setUinput(e.target.value);
  };

  const dataFilter = (term, max) => {
    let start = new Date().getTime();

    let tmpSug = Data.filter(function(item){
      if ((max === -1 || this.count < max) && item.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())){
        this.count++;
        return true;
      }
      return false;
    }, {count: 0});

    let end = new Date().getTime();
    let time = end - start;
    setSearchDuration(time);

    return tmpSug;
  }

  const updateUserHistory = (term) =>{
    if(userHistory.indexOf(term) === -1){
      // update user history
      setUserHistory(prevHistory => [...prevHistory, term]);
      // update local storage
      let lsHGistory = window.localStorage.getItem('searchHistory');

      if(lsHGistory === null || lsHGistory === ''){
        lsHGistory = [];
      }else{
        lsHGistory = JSON.parse(lsHGistory);
      }

      lsHGistory.push(term);
      window.localStorage.setItem('searchHistory', JSON.stringify(lsHGistory));
    }
  };

  const suggestionSelected = (term) => {
    let tmpSearchRes = dataFilter(term, -1);
    setSearchResults(tmpSearchRes);

    updateUserHistory(term);
  }

  const handleSearch = () => {
    let tmpSearchRes = dataFilter(uinput, -1);
    setSearchResults(tmpSearchRes);
    
    updateUserHistory(uinput)
  };

  
  

  useEffect(() => {
    // set autoSuggestion
    let tmpSug = [];
    if(uinput !== ''){
      tmpSug = dataFilter(uinput, 10);

      // set if history item
      tmpSug.forEach(element => {

        if(userHistory.indexOf(element.title) === -1){
          element.history = false;
        }else{
          element.history = true;
        }
      });
    }
    

    setAutoSuggestion(tmpSug);
  }, [uinput]);

  useEffect(() => {
    // init user history
    let lsHGistory = window.localStorage.getItem('searchHistory');
    if(lsHGistory !== null && lsHGistory !== ''){
      setUserHistory(JSON.parse(lsHGistory));
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className='row'>
        <div className='col-12'>
          <Logo />
        </div>
      </div>
      <div className='row'>
        <div className='col-6 offset-3'>
          <UserInput uinput={uinput} handleInputChange={handleInputChange} setShowSuggestions={setShowSuggestions} handleSearch={handleSearch} />
          {showSuggestions ? <Autocomplete autoSuggestion={autoSuggestion} suggestionSelected={suggestionSelected} /> : <></>}
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <Results searchResults={searchResults} searchDuration={searchDuration} />
        </div>
      </div>
    </div>
  );
}

export default App;
