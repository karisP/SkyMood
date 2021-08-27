import './App.css';
import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Current from './components/Current';
import FiveDay from './components/FiveDay';

function App() {
  const myKey = '';
  const [input, setInput] = React.useState();
  const [location, setLocation] = React.useState('Detroit');
  const [currentError, setCurrentError] = React.useState(null);
  const [currentIsLoaded, setCurrentIsLoaded] = React.useState(false);
  const [currentData, setCurrentData] = React.useState();
  const [forecastError, setForecastError] = React.useState(null);
  const [forecastIsLoaded, setForecastIsLoaded] = React.useState(false);
  const [forecastData, setForecastData] = React.useState();
  const [moodScheme, setMoodScheme] = React.useState("slategrey");

  //fetch the current weather endpoint
  const onFetchCurrent = (input) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input},${input},${input}&zip=${input}&units=imperial&APPID=${myKey}`)
      .then(res => res.json())
      //success
      .then(
        (result) => {
          setCurrentIsLoaded(true);
          setCurrentData(result);
          onChangeMoodScheme();
        },
        //error
        (error) => {
          setCurrentIsLoaded(true);
          setCurrentError(error);
        }
      );
  }
  console.log(currentData);

  //fetch the forecast weather input
  const onFetchForecast = (input) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${input}&units=imperial&APPID=${myKey}`)
      .then(res => res.json())
      //success
      .then(
        (result) => {
          setForecastIsLoaded(true);
          setForecastData(result);
        },
        //error
        (error) => {
          setForecastIsLoaded(true);
          setForecastError(error);
        }
      );
  }

  React.useEffect(() => {
    onFetchCurrent(location);
    onFetchForecast(location);
  }, [location]);


  const onChangeInput = (e) => {
    setInput(e.currentTarget.value);
  }

  const onClickSearch = () => {
    setLocation(input);
    onFetchCurrent(input);
    onFetchForecast(input);
  }

  const onChangeMoodScheme = () => {
    if(currentData){
      if(currentData.main.temp <= 66){
        setMoodScheme("one");
      } else if(currentData.main.temp > 66){
        setMoodScheme("red");
        if(currentData.main.temp > 68){
          setMoodScheme("gold");
        }
        if(currentData.main.temp > 70){
          setMoodScheme("yellow");
        }
        if(currentData.main.temp > 73){
          setMoodScheme("lightgreen");
        } 
        if(currentData.main.temp > 76){
          setMoodScheme("green");
        }
      }
      // } else if(currentData.main.temp > 78){
      //   setMoodScheme("darkgreen");
      // } else if(currentData.main.temp > 81){
      //   setMoodScheme("lightblue");
      // } else if(currentData.main.temp > 83){
      //   setMoodScheme("blue");
      // } else if(currentData.main.temp > 85){
      //   setMoodScheme("darkblue");
      // } else if(currentData.main.temp > 88){
      //   setMoodScheme("violet");
      // } else if(currentData.main.temp > 90){
      //   setMoodScheme("purple");
      // }
    }
  }



  return (
    <div className="App">
      <div className="header">
        <span>Sky Mood</span>
        <div className="search">
          <input value={input} onChange={(e) => onChangeInput(e)} placeholder="Search a US city..." />
          <button onClick={onClickSearch}>Search</button>
        </div>
      </div>
      <div className="navbar">
        <NavLink exact to="/" className={`color ${moodScheme}`} activeStyle={{backgroundColor: moodScheme}}>Current</NavLink>
        <NavLink exact to="/fiveday" activeStyle={{backgroundColor: moodScheme}}>Five Day</NavLink>
      </div>
      <Switch>
        <Route exact path='/' render={() => <Current data={currentData} loading={currentIsLoaded} error={currentError} moodScheme={moodScheme}/>} />
        <Route exact path='/fiveday' render={() => <FiveDay data={forecastData} loading={forecastIsLoaded} error={forecastError} />} />
      </Switch>
    </div>
  );
}

export default App;
