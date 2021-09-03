import React from "react"
import {LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Legend} from "recharts"

type GraphData = {
  x: string;
  y: number;
};

type Memory = {
  data: GraphData[];
}[];

type GraphProps = {
  memory: Memory;
};

  const EbbinghausForgettingGraph: React.FC<GraphProps> = ({ memory }) => {
    // const data: any = [
    //   {
    //     "name": "0",
    //     "memory": 100,
    //   },
    //   {
    //     "name": "20min",
    //     "memory": 58,
    //   },
    // ]
    const state = {
      memory: memory,
    }

    return(
      <LineChart
        width={450}
        height={400}
        data={state.memory}
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

  export default EbbinghausForgettingGraph;