//import { withRouter } from "react-router";
import { useState } from "react";
import sortUp from "../images/up.svg";
import sortDown from "../images/down.svg";
import UpGreen from "../images/up-green.svg";
import DownRed from "../images/down-red.svg";

const HomeTable = ({ data, setData }) => {
  const [sort, setSort] = useState(false);

  const sortRank = () => {
    sort
      ? setData(
          data.sort((a, b) =>
            +a.rank > +b.rank ? 1 : +b.rank > +a.rank ? -1 : 0
          )
        )
      : setData(
          data.sort((a, b) =>
            +a.rank < +b.rank ? 1 : +b.rank < +a.rank ? -1 : 0
          )
        );

    setSort(!sort);
  };

  return (
    <div>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col" className="pointer" onClick={sortRank}>
              <div>
                #{" "}
                <img
                  src={sort ? sortDown : sortUp}
                  alt="sort"
                  width="30"
                  height="30"
                />{" "}
              </div>
            </th>
            <th scope="col">Name</th>
            <th scope="col">24H Change</th>
            <th scope="col">Price</th>
            <th scope="col">Market cap</th>
            <th scope="col">Volume 24H</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr
                className="pointer"
                key={item.rank}
                id={item.id}
                onClick={(ev) => {
                  document.location.pathname = `/${ev.currentTarget.getAttribute(
                    "id"
                  )}`;
                }}
              >
                <th scope="row">{item.rank}</th>
                <td>
                  <img
                    src={
                      item.symbol.toLowerCase() !== "time" &&
                      item.symbol.toLowerCase() !== "kst" &&
                      item.symbol.toLowerCase() !== "xym" &&
                      item.symbol.toLowerCase() !== "xec"
                        ? `https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`
                        : "http://cdn.shopify.com/s/files/1/2090/9995/products/none_icon_421316e0-a20d-4101-9518-2e1838072752_grande.png?v=1527503331"
                    }
                    alt={item.symbol}
                    width="25"
                    height="25"
                    className="icon"
                  />
                  <b>{item.name}</b>
                  <span className="light"> • {item.symbol}</span>
                </td>
                <td
                  className={
                    item.changePercent24Hr[0] === "-" ? "red" : "green"
                  }
                >
                  <img
                    src={
                      item.changePercent24Hr[0] === "-"
                        ? `${DownRed}`
                        : `${UpGreen}`
                    }
                    alt=""
                    width="16"
                    height="16"
                    className="icon"
                  />
                  {(+item.changePercent24Hr.replace("-", "")).toFixed(2)}%
                </td>
                <td>
                  <b>${(+item.priceUsd).toFixed(2)}</b>
                </td>
                <td>${(+item.marketCapUsd).toFixed(2)}</td>
                <td>${(+item.volumeUsd24Hr).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HomeTable;
