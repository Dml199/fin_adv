import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { data } from "../../data/data.js";
import "./candle.css";

export default function Candle_plot() {
  let price_obj = data["Time Series (5min)"];
  let price_array = Object.values(price_obj);

  let time = Object.keys(data["Time Series (5min)"]);

  for (let i = 0; i < price_array.length; ++i) {
    price_array[i]["0. Date"] = new Date(time[i]);
  }

  let price_array_2 = [];
  for (let i = 1; i < price_array.length; ++i) {
    price_array_2.push(price_array[i]);
  }

  let price_low = [];
  for (let i = 0; i < price_array.length; ++i) {
    price_low.push(parseFloat(price_array[i]["3. low"]));
  }

  let price_high = [];
  for (let i = 0; i < price_array.length; ++i) {
    price_high.push(parseFloat(price_array[i]["2. high"]));
  }

  const referer = {
    xAxisRef: useRef(null),
    yAxisRef: useRef(null),
    bl_line_ref: useRef(null),
    color_line_ref: useRef(null),
    g_ref: useRef(null),
    line1_ref: useRef(null),
    line2_ref: useRef(null),
  };

  let t_arr = d3
    .timeMinutes(price_array[99]["0. Date"], price_array[0]["0. Date"], 5)
    .reverse();

  const x = d3.scaleBand().domain(t_arr).range([780, 60]);
  const y = d3
    .scaleLog()
    .domain([d3.min(price_low), d3.max(price_high)].reverse())
    .range([30, 400]);

  

  useEffect(() => {
    d3.select(referer.g_ref.current).selectAll("g").remove();
    d3.select(referer.xAxisRef.current).selectAll("g").remove();
    d3.select(referer.yAxisRef.current).selectAll("g").remove();

    d3.select(referer.xAxisRef.current)
      .call(
        d3
          .axisBottom(x)
          .tickValues(
            d3.timeMinutes(
              price_array[99]["0. Date"],
              price_array[0]["0. Date"],
              30
            )
          )
          .tickFormat(d3.timeFormat("%H:%M"))
      )
      .attr("transform", "translate(0,410)")
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("stroke-opacity", 0.1)
          .attr("y2", -400)
      );
    d3.select(referer.yAxisRef.current)
      .call(d3.axisLeft(y))
      .attr("transform", "translate(40,0)")
      .call((g) => {
        g.select(".domain").remove();
      })
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("stroke-opacity", 0.4)
          .attr("x2", 780)
      );

    const g = d3
      .select(referer.g_ref.current)
      .selectAll("g")
      .data(price_array_2)
      .join("g")
      .attr("transform", (d) => `translate(${x(d["0. Date"])},0)`);
    g.append("line")
      .attr("stroke", "rgb(212, 205, 157)")
      .attr("y1", (d) => `${y(d["3. low"])}`)
      .attr("y2", (d) => `${y(d["2. high"])}`)
      .attr("transform", (d) => `translate(${3},0)`)
      .attr("stroke-width", "0.4px");
    g.append("rect")
      .attr("width", "3px")
      .attr("height", (d) => {
        return `${Math.abs(y(d["1. open"]) - y(d["4. close"]))}`;
      })
      .attr("y", (d) => {
        return `${y(
          d["4. close"] > d["1. open"] ? d["4. close"] : d["1. open"]
        )}`;
      })
      .attr("fill", (d) => {
        return d["1. open"] > d["4. close"]
          ? "rgba(79, 55, 9, 1)"
          : "rgba(255, 225, 0, 1)";
      })
      .attr("transform", (d) => `translate(${2},0)`)
      .attr("stroke", "rgb(212, 205, 157)")
      .attr("stroke-width", "0.4px");
  }, []);

  return (
    <div id="candlestick_chart">
      <svg id="svg_plot" viewBox="0 0 800 450">
        <g ref={referer.xAxisRef} id="axis_x"></g>
        <g ref={referer.yAxisRef} id="axis_y"></g>
        <svg ref={referer.g_ref}></svg>
      </svg>
    </div>
  );
}
