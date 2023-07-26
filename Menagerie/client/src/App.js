import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header";
import { onLoginStatusChange, me } from "./modules/authManager";
import { Spinner } from "reactstrap";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null)
  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      me().then(setUserProfile);
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);
  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }


  return (
    <div className="App bg-light-subtle">
      <Router>
        <Header isLoggedIn={isLoggedIn} userProfile={userProfile} setSelectedPet={setSelectedPet} />
        <ApplicationViews isLoggedIn={isLoggedIn} userProfile={userProfile} setSelectedPet={setSelectedPet} selectedPet={selectedPet} />
      </Router>
    </div>
  );
}

export default App;
