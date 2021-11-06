import { useEffect, useState } from "react";
import UpGreen from "../images/up-green.svg";
import DownRed from "../images/down-red.svg";
import DetailsExchanges from "./DetailsExchanges";

const Details = ({ data }) => {
  const [detailsData, setDetailsData] = useState([]);
  const [marketsData, setMarketsData] = useState([]);

  document.title = document.location.pathname.replace("/", "").toUpperCase();
 
  useEffect(() => {
    fetch(`https://api.coincap.io/v2/assets${document.location.pathname}`)
      .then((res) => res.json())
      .then((res) => {
        setDetailsData(res.data);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.coincap.io/v2/assets${document.location.pathname}/markets`
    )
      .then((res) => res.json())
      .then((res) => {
        setMarketsData(res.data);
      });
  }, []);

  return (
    <div className="padding10">
      {document.location.pathname.replace("/", "") === detailsData.id ? (
        <div>
          <div className="row">
            <div className="col padding20">
              {detailsData.name} Price ({detailsData.symbol})
              <span className="rank">#{detailsData.rank}</span>
            </div>
            <div className="col padding10">
              <span className="label-light">Market Cap</span>
              <br />${(+detailsData.marketCapUsd).toFixed(2)}
            </div>
            <div className="col padding10">
              <span className="label-light">Available Supply</span>
              <br />
              {(+detailsData.supply).toFixed(2)}
            </div>
            <div className="col-4 borderLeft padding10">
              <span className="padding-left20 label-light">Website</span>
              <span className="padding-left20">
                <a href={detailsData.explorer} target="_blank" rel="noreferrer">
                  {" "}
                  <button className="btn btn-light">
                    {detailsData.explorer}
                  </button>
                </a>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col padding20">
              <span className="detailPriceUsd">
                ${(+detailsData.priceUsd).toFixed(2)}
                <span className="details-changepercent">
                  <span
                    className={
                      data[detailsData.rank - 1].changePercent24Hr[0] === "-"
                        ? "red"
                        : "green"
                    }
                  >
                    <img
                      src={
                        data[detailsData.rank - 1].changePercent24Hr[0] === "-"
                          ? `${DownRed}`
                          : `${UpGreen}`
                      }
                      alt=""
                      width="16"
                      height="16"
                      className="icon"
                    />
                    {(+data[detailsData.rank - 1].changePercent24Hr.replace(
                      "-",
                      ""
                    )).toFixed(2)}
                    %
                  </span>
                </span>
              </span>
            </div>
            <div className="col padding10">
              <span className="label-light">Volume 24h</span>
              <br />${(+detailsData.volumeUsd24Hr).toFixed(2)}
            </div>
            <div className="col padding10">
              <span className="label-light">Total Supply</span>
              <br />
              {(+detailsData.maxSupply).toFixed(2)}
            </div>
            <div className="col-4 borderLeft"></div>
          </div>
        </div>
      ) : null}
      <DetailsExchanges
        marketsData={marketsData}
        setMarketsData={setMarketsData}
      />
    </div>
  );
};

export default Details;
