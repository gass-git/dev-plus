import './global/App.css';
import ScrollDisplay from './components/scrollDisplay/index';

function App() {
  return (
    <div className="main-wrapper">
      <div className="border-img">
        <div className="inner-container">
          <ScrollDisplay />
        </div>
      </div>
    </div>
  );
}

export default App;
