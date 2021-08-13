import React from "react"
import {LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Legend} from "recharts"

export default class EbbinghausForgettingGraph extends React.Component {
  render() {
    const data: any = [
      {
        "name": "0",
        "memory": 100,
      },
      {
        "name": "20min",
        "memory": 58,
      },
      {
        "name": "1h",
        "memory": 44,
      },
      {
        "name": "9h",
        "memory": 35,
      },
      {
        "name": "24h",
        "memory": 34,
      },
      {
        "name": "2days",
        "memory": 27,
      },
      {
        "name": "6days",
        "memory": 25,
      },
      {
        "name": "31days",
        "memory": 21,
      },
    ]
    return(
      <LineChart
        width={450}
        height={400}
        data={data}
        margin={{ top: 5, bottom: 5 }}
      >
        <CartesianGrid stroke="#CCCCCC" strokeDasharray="3" />
        <XAxis dataKey="name" stroke="#808080" />
        <YAxis stroke="#808080" tickCount={6} unit="%"  />
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
        <Line type="monotone" dataKey="memory" stroke="#007FFF" unit={"%"} />
      </LineChart>
    )
  }
}