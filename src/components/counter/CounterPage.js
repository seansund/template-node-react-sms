import React from "react";
import { Page, Title, NavLink, Icon } from "../common";
import { backState } from "../common/BackLink";
import ErrorDisplay from "./ErrorDisplay";
import Counter from "./Counter";
import aboutIcon from "../images/about.svg";

export default function CounterPage() {
  return (
    <Page data-testid="counter-page">
      <ErrorDisplay />
      <Title>
        React Counter
        <NavLink to={{ pathname: "/about", state: backState() }}>
          <Icon src={aboutIcon} title="About" alt="About" />
        </NavLink>
      </Title>
      <Counter />
    </Page>
  );
}
