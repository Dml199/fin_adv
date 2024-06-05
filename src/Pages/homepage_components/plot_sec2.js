import Candle_plot from "../../page_components/charts/candlestick.js";
import "./homepage_styles/section_1.css";
import "./homepage_styles/sec_2.css";
import {f_} from "../../data/new_fundam.js"
import {data} from "../../data/stocks_by_mar_cap.js"
import {useEffect} from "react"

export default function Plot_homepage() {
  return (
    <div>
      <div id="sec_2">
        <div id="sec_2_container">
          <div id="candle_plot">
            <Candle_plot />
          </div>

          <div id="info_list">
            <div id="stock_info_table">
              <div tabIndex="1">Fundamentals</div> <div tabIndex="1">News</div>
            </div>
            <Symbol_table_info/>
          </div>
        </div>
      </div>
    </div>
  );
}

function Symbol_table_info( props) {
    const data_arr=[];

 function extractData(symbol="FDX"){
    
    f_.forEach(elem =>{if(elem["Ticker"]==symbol) data_arr.push(elem)})
 }  extractData()
 console.clear()
    console.log(data_arr)
    
    useEffect(()=>{extractData(props.symbol)})
  return (
    <div>
      <table id = "table_fundam">
        <tr>
        <th>Description</th>
          <th>Q1</th>
          <th>Q2</th>
          <th>Q3</th>
        </tr>
         {data_arr.map((elem)=>{return (<tr><td>{elem["Description"]}</td><td>{elem["Values"][0]}</td><td>{elem["Values"][1]}</td><td>{elem["Values"][2]}</td></tr>) })}
      </table>
    </div>
  );
}

function News_symbol() {
  return <div></div>;
}
