import styled from '@emotion/styled/macro';

const Base = styled.div``;

export interface MessageType {
  senderId: string;
  content: string;
  timestamp: string;
}

interface Props {}

export default function MessageList({}: Props) {
  return <Base></Base>;
}
