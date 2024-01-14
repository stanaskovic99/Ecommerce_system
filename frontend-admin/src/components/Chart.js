import React from "react";
import { Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Chart = (props) => {
  return (
    <Card className={`m-${props.marginX}`}>
      <div className="m-3 me-5">
        <h3 className="fs-5 mb-4">{props.title}</h3>
        <ResponsiveContainer className="me-3 ps-0" width="100%" aspect={4 / 1}>
          <BarChart data={props.data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey={props.x} stroke="#260d7f" />
            <YAxis
              dataKey={props.y}
              stroke="#260d7f"
              type="number"
              allowDecimals={false}
            />
            <Tooltip />
            <Bar type="monotone" dataKey={props.y} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default Chart;
