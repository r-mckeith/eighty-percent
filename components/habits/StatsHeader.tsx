import React from "react";
import { Row, RowText, StatsText } from "../layout";

export default function StatsHeader() {
  return (
    <Row opacity={0}>
      <RowText text={''}/>
      <StatsText day={'Day'} week={'Week'} style={{ color: 'white' }}/>
    </Row>
  );
}
