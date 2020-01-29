import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import { colors } from "../common";
import { getError } from "../../redux/counter";

const slidedown = keyframes`
  from {
    transform: translateY(-32px);
  }
  to {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 4px 8px;
  background: ${colors.red};
  color: white;
  text-align: center;
  animation: ${slidedown} 0.5s ease;
`;

export function ErrorDisplay({ error }) {
  return !!error && <Container>{error.toString()}</Container>;
}

ErrorDisplay.propTypes = {
  error: PropTypes.object
};

function mapStateToProps(state) {
  return { error: getError(state) };
}

const ConnectedErrorDisplay = connect(mapStateToProps)(ErrorDisplay);
export default ConnectedErrorDisplay;
