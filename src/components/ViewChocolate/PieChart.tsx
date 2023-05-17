import React from 'react'
import { Chart } from 'react-google-charts'
import { Nutrition } from '../../types/chocolate.ts'
import { flattenObject } from '../../utils/flatten-object.ts'

const options = {
  title: "Nutrition Values",
};

interface PieChartProps {
  nutrition: Nutrition
}

export const PieChart: React.FunctionComponent<PieChartProps> = (props) => {
  const plottingData = [['nutrition', 'value'],...Object.entries(flattenObject(props.nutrition))]
  return (
    <Chart
      chartType="PieChart"
      data={plottingData}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
