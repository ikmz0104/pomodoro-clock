import React from "react"
import {LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Legend} from "recharts"

type GraphData = {
  name: string;
  memory: number;
};

type Memories = {
  memory: GraphData[];
}[];

type GraphProps = {
  memories: Memories;
};

  const EbbinghausForgettingGraph: React.FC<GraphProps> = ({ memories }) => {

    return(
      <LineChart
        width={450}
        height={400}
        data={memories[0].memory}
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