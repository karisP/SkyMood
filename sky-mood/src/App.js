import './App.css';
import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Current from './components/Current';
import FiveDay from './components/FiveDay';

function App() {
  const myKey = '';
  const [input, setInput] = React.useState("");
  const [location, setLocation] = React.useState('Detroit');
  const [currentError, setCurrentError] = React.useState(null);
  const [currentIsLoaded, setCurrentIsLoaded] = React.useState(false);
  const [currentData, setCurrentData] = React.useState();
  const [forecastError, setForecastError] = React.useState(null);
  const [forecastIsLoaded, setForecastIsLoaded] = React.useState(false);
  const [forecastData, setForecastData] = React.useState();
  const [moodScheme, setMoodScheme] = React.useState('#D3AB8B');

  const onFetchCurrent = (input) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&APPID=${myKey}`)
      .then(res => res.json())
      //success
      .then(
        (result) => {
          //handle http error
          if(result.cod === "404"){
            setCurrentIsLoaded(true);
            setCurrentError(result.message);
          } else {
            setCurrentIsLoaded(true);
            setCurrentData(result);
            moodSchemeByTemp(result.main.temp);
          }
        },
        //error
        (error) => {
          setCurrentIsLoaded(true);
          setCurrentError(error);
        }
      );
  }

  const onFetchForecast = (input) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${input}&units=imperial&APPID=${myKey}`)
      .then(res => res.json())
      //success
      .then(
        (result) => {
          //handle http error
          if(result.cod === "404"){
            setForecastIsLoaded(true);
            setForecastError(result.message);
          } else{
            setForecastIsLoaded(true);
            setForecastData(result);
          }
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

  console.log("currentData", currentData);
  console.log("forecastData", forecastData);

  const onChangeInput = (e) => {
    setInput(e.currentTarget.value.trim());
  }

  const onClickSearch = () => {
    if(input !== ''){
      setLocation(input);
      onFetchCurrent(input);
      onFetchForecast(input);
    }
  }

  const moodSchemeByTemp = (temp) => {
      if(temp <= 68){
          setMoodScheme("#000");
      } else if(temp >= 68 && temp < 70){
          setMoodScheme("red");
      } else if (temp >= 70 && temp < 73) {
          setMoodScheme("gold");
      } else if (temp >= 73 && temp < 76) {
          setMoodScheme("yellow");
      } else if (temp >= 76 && temp < 78) {
          setMoodScheme("lightgreen");
      } else if (temp >= 78 && temp < 81) {
          setMoodScheme("green");
      } else if (temp >= 81 && temp < 83) {
          setMoodScheme("darkgreen");
      } else if (temp >= 83 && temp < 85) {
          setMoodScheme("lightblue");
      } else if (temp >= 85 && temp < 88) {
          setMoodScheme("blue");
      } else if (temp >= 88 && temp < 90) {
          setMoodScheme("darkblue");
      } else if (temp >= 90 && temp < 92) {
          setMoodScheme("violet");
      } else if (92 <= temp) {
          setMoodScheme("purple");
      }
  }

  // if(currentData !== undefined && !currentError && currentIsLoaded){
  //   moodSchemeByTemp(currentData.main.temp);
  // }

  console.log(input);

  return (
    <div className="App">
      <div className="header">
        <span>Sky Mood</span>
        <div className="search">
          <input value={input} onChange={(e) => onChangeInput(e)} placeholder="Search a US city..." />
          <button onClick={onClickSearch} disabled={input === ""}>Search</button>
        </div>
        <div>{location}</div>
      </div>
      <div className="main">
        <div className="navbar">
          <NavLink exact to="/" activeStyle={{'backgroundColor': `${moodScheme}`}} >Current</NavLink>
          <NavLink exact to="/fiveday" activeStyle={{'backgroundColor': `${moodScheme}`}}>Five Day</NavLink>
        </div>
        <Switch>
          <Route exact path='/' render={() => <Current data={currentData} loading={currentIsLoaded} error={currentError} moodScheme={moodScheme} />} />
          <Route exact path='/fiveday' render={() => <FiveDay data={forecastData} loading={forecastIsLoaded} error={forecastError} />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
