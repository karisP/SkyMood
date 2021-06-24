import logo from './logo.svg';
import './App.css';
import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Current from './components/Current';
import FiveDay from './components/FiveDay';

function App() {
  const myKey = '';
  const [input, setInput] = React.useState();
  const [location, setLocation] = React.useState('Detroit');
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [data, setData] = React.useState();

  const onFetchCurrent = (input) => {
    //   fetch(`api.openweathermap.org/data/2.5/weather?q=${string}&appid=${myKey}`)
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //         setIsLoaded(true);
    //         setData(result);
    //       },
    //       // Note: it's important to handle errors here
    //       // instead of a catch() block so that we don't swallow
    //       // exceptions from actual bugs in components.
    //       (error) => {
    //         setIsLoaded(true);
    //         setError(error);
    //       }
    //       )
  }

  // React.useEffect(() => {
  //    onFetchCurrent(location);  
  //     }, []);
  //     console.log(data);

  const onChangeInput = (e) => {
    setInput(e.currentTarget.value);
  }

  const onClickSearch = () => {
    setLocation(input);
    onFetchCurrent(input);
  }


  return (
    <div className="App">
      <div className="header">
        <span>Sky Mood</span>
        <div className="search">
          <input value={input} onChange={(e) => onChangeInput(e)} placeholder="Search city or zipcode..." />
          <button onClick={onClickSearch}>Search</button>
        </div>
      </div>
      <div className="navbar">
        <NavLink exact to="/" activeClassName="">Current</NavLink>
        <NavLink exact to="/fiveday" activeClassName="">Five Day</NavLink>
      </div>
      <Switch>
        <Route exact path='/' render={() => <Current data={data} />} />
        <Route exact path='/fiveday' render={() => <FiveDay location={location} />} />
      </Switch>
    </div>
  );
}

export default App;
