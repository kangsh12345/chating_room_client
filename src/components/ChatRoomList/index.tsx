import { PropsWithChildren } from 'react';
import styled from '@emotion/styled/macro';

const Base = styled.ul`
  list-style: none;
  margin: 0;
  padding: 36px 0 64px 0;
`;

export default function ChatRoomList({ children }: PropsWithChildren<{}>) {
  return <Base>{children}</Base>;
}
