import { useTheme } from '@emotion/react';
import styled from '@emotion/styled/macro';

import { MessageType } from './MessageList';

const Base = styled.div`
  display: flex;
  width: 100%;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Content = styled.div``;

const Username = styled.span`
  opacity: 0.8;
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 5px;
`;

const SpeechBubble = styled.span<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 0 15px 15px 15px;
  margin-right: 5px;
  padding: 13px;
  font-size: 18px;
`;

const ReceivedAt = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

interface Props extends MessageType {
  receiver: string;
  receiverThumbnailImage?: string;
}
export default function ReceiveMessage({
  receiver,
  receiverThumbnailImage,
  content,
  timestamp,
}: Props) {
  const theme = useTheme();

  return (
    <Base>
      <Image src={receiverThumbnailImage || '/placeholder.png'} />
      <Content>
        <Username>{receiver}</Username>
        <Info>
          <SpeechBubble backgroundColor={theme.colors.white}>
            {content}
          </SpeechBubble>
          <ReceivedAt>{timestamp}</ReceivedAt>
        </Info>
      </Content>
    </Base>
  );
}
