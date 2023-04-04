import styled from '@emotion/styled/macro';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { fetchChatRoomList } from '../apis/roomApi';
import BottomNavigation from '../components/BottomNavigation';
import ChatRoomList from '../components/ChatRoomList';
import ChatRoom from '../components/ChatRoomList/ChatRoom';
import TopNavigation from '../components/TopNavigation';
import { IRoom } from '../types';

const Base = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 12px;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function RoomList() {
  const { data: chatRoomListData } = useQuery<
    AxiosResponse<IRoom[]>,
    AxiosError
  >('fetchChatRoomList', fetchChatRoomList);

  return (
    <Base>
      <Container>
        <TopNavigation title="채팅" />
        {chatRoomListData && (
          <ChatRoomList>
            {chatRoomListData.data.map(chatRoom => (
              <ChatRoom
                key={chatRoom.id}
                id={chatRoom.id}
                username={chatRoom.user.username}
              />
            ))}
          </ChatRoomList>
        )}

        <BottomNavigation />
      </Container>
    </Base>
  );
}
