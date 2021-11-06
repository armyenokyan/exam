import sortUp from "../images/up.svg";
import sortDown from "../images/down.svg";
import { useState } from "react";

const DetailsExchanges = ({ marketsData, setMarketsData }) => {
  const [sort, setSort] = useState(false);

  const sortExchangeId = () => {
    sort
      ? setMarketsData(
          marketsData.sort((a, b) =>
            +a.exchangeId > +b.exchangeId
              ? 1
              : +b.exchangeId > +a.exchangeId
              ? -1
              : 0
          )
        )
      : setMarketsData(
          marketsData.sort((a, b) =>
            +a.exchangeId < +b.exchangeId
              ? 1
              : +b.exchangeId < +a.exchangeId
              ? -1
              : 0
          )
        );

    setSort(!sort);
  };
  return (
    <div className="padding20">
      <table className="table ">
        <thead>
          <tr>
            <th scope="col" className="pointer" onClick={sortExchangeId}>
              <div>
                EXCHANGE
                <img
                  src={sort ? sortDown : sortUp}
                  alt="sort"
                  width="30"
                  height="30"
                />{" "}
              </div>
            </th>

            <th scope="col">PAIR</th>
            <th scope="col">VOLUME (24H)</th>
            <th scope="col">VOLUME (%)</th>
            <th scope="col">PRICE</th>
          </tr>
        </thead>
        <tbody>
          {marketsData.map((item) => {
            return (
              <tr key={Math.random()}>
                <th scope="row">{item.exchangeId}</th>
                <td className="light">
                  <b>
                    {item.baseSymbol}/{item.quoteSymbol}
                  </b>
                </td>
                <td>
                  <b>${(+item.volumeUsd24Hr).toFixed(2)}</b>
                </td>
                <td>{(+item.volumePercent).toFixed(2)}%</td>

                <td>${(+item.priceUsd).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsExchanges;
