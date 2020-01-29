import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { colors } from "../common";
import { getCount } from "../../redux/counter";

const Count = styled.div`
  margin: 0;
  color: ${props => props.color};
  font-size: 8em;
  text-align: center;
`;

export function CountDisplay({ count }) {
  let color = colors.red;
  if (count >= 0 && count < 1000) {
    color = count < 100 ? colors.green : colors.yellow;
  }
  return (
    <Count data-testid="count" color={color}>
      {count}
    </Count>
  );
}

CountDisplay.propTypes = {
  count: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return { count: getCount(state) };
}

const ConnectedCountDisplay = connect(mapStateToProps)(CountDisplay);
export default ConnectedCountDisplay;
