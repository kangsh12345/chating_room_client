import styled from '@emotion/styled/macro';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import {
  fetchChatRoomList,
  makeChatRoom,
  MakeChatRoomRequest,
} from '../apis/roomApi';
import { fetchMyProfile, fetchUserList } from '../apis/userApi';
import BottomNavigation from '../components/BottomNavigation';
import FriendList from '../components/FriendList';
import Friend from '../components/FriendList/Friend';
import Profile from '../components/Profile';
import TopNavigation from '../components/TopNavigation';
import { IProfile, IRoom, IUser } from '../types';

const Base = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 17px;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Summary = styled.small`
  margin: 4px 0;
  padding: 24px 0 0 0;
  font-size: 12px;
`;

export default function Friends() {
  const navigate = useNavigate();

  const { data: profileData } = useQuery<AxiosResponse<IProfile>, AxiosError>(
    'fetchMyProfile',
    fetchMyProfile,
  );

  const { data: userData } = useQuery<
    AxiosResponse<{ count: number; rows: IUser[] }>,
    AxiosError
  >('fetchUserList', fetchUserList);

  const { data: chatRoomListData } = useQuery<
    AxiosResponse<IRoom[]>,
    AxiosError
  >('fetchChatList', fetchChatRoomList);

  const mutation = useMutation('makeChatRoom', (request: MakeChatRoomRequest) =>
    makeChatRoom(request),
  );

  const handleChatRoomCreate = (opponentId: string) => {
    const chatRoom = chatRoomListData?.data.find(
      chatRoom => chatRoom.opponentId === opponentId,
    );

    if (chatRoom) {
      navigate(`/rooms/${chatRoom.id}`);
    } else {
      mutation.mutate(
        {
          opponentId,
        },
        {
          onSuccess: data => {
            navigate(`/room/${data.data.id}`);
          },
        },
      );
    }
  };

  return (
    <Base>
      <Container>
        <TopNavigation title="친구" />

        {profileData && <Profile username={profileData.data.username} />}
        {userData && (
          <>
            <Summary>친구: {userData.data.count}</Summary>
            <FriendList>
              {userData.data.rows.map(row => (
                <Friend
                  key={row.id}
                  username={row.username}
                  thumbnailImage={row.thumbnailImageUrl}
                  onClick={() => handleChatRoomCreate(row.id)}
                />
              ))}
            </FriendList>
          </>
        )}

        <BottomNavigation />
      </Container>
    </Base>
  );
}
