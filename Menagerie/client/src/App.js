import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} userProfile={userProfile} />
        <ApplicationViews isLoggedIn={isLoggedIn} />
      </Router>
    </div>
  );
}

export default App;
