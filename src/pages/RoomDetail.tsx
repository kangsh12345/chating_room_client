import { useEffect, useRef, useState } from 'react';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled/macro';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import { fetchChatMessageList, sendChatMessage } from '../apis/chatApi';
import { fetchChatRoomDetail } from '../apis/roomApi';
import { fetchMyProfile } from '../apis/userApi';
import InputChat from '../components/ChatRoomDetail/InputChat';
import MessageList from '../components/ChatRoomDetail/MessageList';
import ReceiveMessage from '../components/ChatRoomDetail/ReceiveMessage';
import SentMessage from '../components/ChatRoomDetail/SentMessage';
import TopNavigation from '../components/ChatRoomDetail/TopNavigation';
import { IChat, IProfile, IRoom } from '../types';

const Base = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
  align-items: center;
  padding: 0 24px;
`;

const globalStyle = css`
  body {
    background-color: #abc1d1;
  }
`;

export default function RoomDetail() {
  const scrollBottomRef = useRef<HTMLLIElement>(null);

  const { roomId } = useParams<string>();

  const { data: profileData } = useQuery<AxiosResponse<IProfile>, AxiosError>(
    'fetchMyProfile',
    fetchMyProfile,
  );
  const { data: chatRoomDetailData } = useQuery<
    AxiosResponse<IRoom>,
    AxiosError
  >(['fetchChatRoomDetail', roomId], () =>
    fetchChatRoomDetail(roomId as string),
  );
  const { data: chatListData } = useQuery<AxiosResponse<IChat[]>, AxiosError>(
    ['fetchChatMessageList', roomId],
    () => fetchChatMessageList(roomId as string),
  );

  const [messages, setMessages] = useState<IChat[]>(chatListData?.data || []);

  useEffect(() => {
    const socket = io('http://localhost:8000', { path: '/socket.io' });

    socket.emit('join', roomId);

    socket.on('chat', (newMessage: IChat) => {
      setMessages(prev => [...prev, newMessage]);
    });
  }, []);

  const mutation = useMutation('sendChatMessage', (content: string) =>
    sendChatMessage(roomId as string, content),
  );

  const handleSend = (content: string) => {
    if (content.length) {
      mutation.mutate(content);
    }
  };

  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Base>
      <Global styles={globalStyle} />
      {chatRoomDetailData && (
        <TopNavigation title={chatRoomDetailData.data.user.username} />
      )}
      <Container>
        <MessageList>
          {messages.map(message =>
            message.senderId === profileData?.data.userId ? (
              <SentMessage
                senderId={message.senderId}
                content={message.content}
                timestamp={message.createdAt}
              />
            ) : (
              <ReceiveMessage
                receiver={message.user?.username}
                senderId={message.senderId}
                content={message.content}
                timestamp={message.createdAt}
              />
            ),
          )}
          <li ref={scrollBottomRef} />
        </MessageList>
      </Container>
      <InputChat onClick={handleSend} />
    </Base>
  );
}
