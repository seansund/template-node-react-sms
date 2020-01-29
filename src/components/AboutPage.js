import React from "react";
import styled from "styled-components";
import { Page, Title, NavLink, Icon } from "./common";
import BackLink from "./common/BackLink";
import backIcon from "./images/back.svg";

const Subtitle = styled.p`
  margin: 24px 0;
  color: dimgray;
  font-size: 1.125em;
  text-align: center;
`;

const Text = styled.p`
  margin: 16px 0;
  line-height: 150%;
`;

export default function AboutPage() {
  return (
    <Page data-testid="about-page">
      <Title>
        React Counter
        <NavLink as={BackLink} to="/">
          <Icon src={backIcon} title="Back" alt="Back" />
        </NavLink>
      </Title>
      <Subtitle>A starter for React projects at the IBM Cloud Garage.</Subtitle>
      <Text>
        This starter helps IBM Cloud Garage developers get started quickly on React projects with
        React Router, Redux, Redux-Saga, and styled components. It provides a recommended project
        layout, demonstrates how to hook things up, and includes some helpful utilities for
        navigation and fetching data.
      </Text>
    </Page>
  );
}
