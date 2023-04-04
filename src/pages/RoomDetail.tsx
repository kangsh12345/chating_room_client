import { css, Global } from '@emotion/react';
import styled from '@emotion/styled/macro';

const Base = styled.div``;

const Container = styled.div``;

const globalStyle = css`
  body {
    background-color: #abc1d1;
  }
`;

export default function RoomDetail() {
  return (
    <Base>
      <Global styles={globalStyle} />
      <Container>{/* <MessageList /> */}</Container>
      {/* <InputChat /> */}
    </Base>
  );
}
