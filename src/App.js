import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeTable from "./components/HomeTable";
import Details from "./components/Details";
import NotFound from "./components/NotFound";

import "./bootstrap.css";
import "./App.css";
import Header from "./components/Header";
import Loading from "./components/Loading";

function App() {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    // const options = {
    //   method: "GET",
    //   redirect: "follow",
    //   "Accept-Encoding ": "gzip",
    //   headers: {
    //     Authorization: "Bearer 0b652136-fc3d-4ffd-9c9c-6e3c5188f5ba",
    //   },
    // };

    setIsLoading(true);
    fetch("https://api.coincap.io/v2/assets")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/">
              <HomeTable data={data} setData={setData} />
            </Route>
            {data.map((item) => (
              <Route key={item.id} exact path={`/${item.id}`}>
                <Details data={data} />
              </Route>
            ))}
            {loading ? <Loading /> : <Route component={NotFound} />}
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
