import React from "react";

import styled from "styled-components";

const Wraper = styled.div`
  direction: "rtl";
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home(props) {
  return <Wraper>Index Page</Wraper>;
}
