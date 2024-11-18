import "./App.css";
import BarChart from "./components/BarChart/BarChart";
import { SRC } from "./constants";

const App: React.FC = () => {
  return (
    <>
      <h1 className="header_title">Визуализация данных</h1>
      <div className="container">
        {Object.entries(SRC).map(([key, value]) => (
          <BarChart key={key} url={value} />
        ))}
      </div>
    </>
  );
};

export default App;
