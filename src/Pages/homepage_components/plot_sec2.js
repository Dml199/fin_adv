import Candle_plot from "../../page_components/charts/candlestick.js";
import "./homepage_styles/section_1.css";
import "./homepage_styles/sec_2.css";
import { f_ } from "../../data/new_fundam.js";
import { mar_cap } from "../../data/stocks_by_mar_cap.js";
import { news } from "../../data/News.js";
import { useState } from "react";

export default function Plot_homepage() {
  const [state, setState] = useState(0);

  return (
    <div>
      <div id="sec_2">
        <img src="frank.jpg" id="sec_2_img"></img>

        <div id="sec_2_container">
          <div className="sep_2">Stock market summary </div>
          <div id="candle_plot" className="col-8">
            <Candle_plot />
          </div>
          <div className="sep"></div>

          <div id="info_list" className="col-3">
            <div id="stock_info_table">
              <div
                tabIndex="1"
                onClick={() => {
                  setState(1);
                }}
              >
                Fundamentals
              </div>{" "}
              <div
                onClick={() => {
                  setState(0);
                }}
                tabIndex="1"
              >
                News
              </div>
            </div>
            {state ? (
              <div id="res_table">
                {" "}
                <Symbol_table_info symbol="FDX" className="col-3" />
              </div>
            ) : (
              <div id="news">
                <News_symbol />
              </div>
            )}
          </div>
          <div className="sep_2"></div>
          <Stock_table />
        </div>
      </div>
    </div>
  );
}

function Symbol_table_info({ symbol }) {
  const data_arr = [];

  function extractData(symbol = "AAPL") {
    f_.forEach((elem) => {
      if (elem["Ticker"] == symbol) data_arr.push(elem);
    });
  }
  extractData(symbol);

  return (
    <div>
      <table id="table_fundam">
        <tr>
          <th>Description</th>
          <th>Q1</th>
          <th>Q2</th>
          <th>Q3</th>
        </tr>
        {data_arr.map((elem) => {
          return (
            <tr className="row" tabIndex="1">
              <td className="data">{elem["Description"]}</td>
              <td className="data">{elem["Values"][0]}</td>
              <td className="data">{elem["Values"][1]}</td>
              <td className="data">{elem["Values"][2]}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

function News_symbol({ symbol }) {
  return (
    <div id="news">
      {news.map((elem) => {
        return (
          <div className="news_section">
            <div className="art">
              <div className="time_head"></div>
              <div className="time">{elem["time"]}</div>
            </div>
            <div className="heading"> {elem["heading"]}</div>
            <div>
              <hr className="divider"></hr>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Stock_table() {
  return (
    <div id="stock_table">
      <table className="_table">
        <tr className="table_header">
          <th>Name:</th>
          <th>Symbol:</th>
          <th>Market capitalization:</th>
          <th>Stock price:</th>
          <th>Country:</th>
        </tr>
        {mar_cap.map((elem, index) => {
          if (index < 100) {
            return (
              <tr className="row" tabIndex="1">
                <td className="padding_5">{elem["Name"]}</td>
                <td className="padding_5 data">{elem["Symbol"]}</td>
                <td className="padding_5 data">{elem[" marketcap "]}</td>
                <td className="padding_5 data">{elem["price (USD)"]}</td>
                <td className="padding_5 data">{elem["country"]}</td>
              </tr>
            );
          }
        })}
      </table>
    </div>
  );
}
