import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import CountDisplay from "./CountDisplay";
import * as counter from "../../redux/counter";

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 480px;
  margin: 0 auto;
  padding: 16px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex: 1 0 0;
`;

const Button = styled.button`
  flex: 1 0 0;
  margin: 4px;
  padding: 8px 16px;
  background: whitesmoke;
  border: 1px solid slategray;
  outline: none;
  font-size: 15px;
`;

export function Counter({ onIncrementClick, onDecrementClick, onResetClick, onRandomizeClick }) {
  return (
    <div>
      <CountDisplay />
      <ButtonContainer>
        <ButtonGroup>
          <Button data-testid="increment" onClick={onIncrementClick}>
            Increment
          </Button>
          <Button data-testid="decrement" onClick={onDecrementClick}>
            Decrement
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button data-testid="reset" onClick={onResetClick}>
            Reset
          </Button>
          <Button data-testid="randomize" onClick={onRandomizeClick}>
            Randomize
          </Button>
        </ButtonGroup>
      </ButtonContainer>
    </div>
  );
}

Counter.propTypes = {
  onIncrementClick: PropTypes.func.isRequired,
  onDecrementClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
  onRandomizeClick: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  onIncrementClick: () => counter.incrementCount(),
  onDecrementClick: () => counter.decrementCount(),
  onResetClick: () => counter.setCount(0),
  onRandomizeClick: () => counter.fetchRandomCount()
};

const ConnectedCounter = connect(undefined, mapDispatchToProps)(Counter);
export default ConnectedCounter;
