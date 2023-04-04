import { useTheme } from '@emotion/react';
import styled from '@emotion/styled/macro';

import { MessageType } from './MessageList';

const Base = styled.li`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  width: 100%;
`;

const SpeechBubble = styled.span<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 15px 0 15px 15px;
  margin-right: 0;
  margin-left: 5px;
  padding: 13px;
  font-size: 18px;
`;

const SentAt = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

interface Props extends MessageType {}

export default function SentMessage({ content, timestamp }: Props) {
  const theme = useTheme();

  return (
    <Base>
      <SpeechBubble backgroundColor={theme.colors.primary}>
        {content}
      </SpeechBubble>
      <SentAt>{timestamp}</SentAt>
    </Base>
  );
}
