import { PropsWithChildren } from 'react';
import styled from '@emotion/styled/macro';

const Base = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 0 48px 0;
  width: 100%;
  > li + li {
    margin-top: 25px;
  }
`;

export interface MessageType {
  senderId: string;
  content: string;
  timestamp: string;
}

export default function MessageList({ children }: PropsWithChildren<{}>) {
  return <Base>{children}</Base>;
}
