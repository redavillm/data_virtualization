import "./App.css";
import BarChart from "./components/BarChart";
import { SRC } from "./constants";

const App: React.FC = () => {
  return (
    <>
      <h1>Data visualization</h1>
      <div className="flex">
        {Object.entries(SRC).map(([key, value]) => (
          <BarChart key={key} url={value} />
        ))}
      </div>
    </>
  );
};

export default App;
