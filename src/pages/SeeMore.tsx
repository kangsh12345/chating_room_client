import styled from '@emotion/styled/macro';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { fetchMyProfile } from '../apis/userApi';
import BottomNavigation from '../components/BottomNavigation';
import IconButtonList from '../components/SeeMore/IconButtonList';
import UserInfo from '../components/SeeMore/UserInfo';
import TopNavigation from '../components/TopNavigation';
import { IProfile } from '../types';

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

export default function SeeMore() {
  const { data: profileData } = useQuery<AxiosResponse<IProfile>, AxiosError>(
    'fetchMyProfile',
    fetchMyProfile,
  );

  return (
    <Base>
      <Container>
        <TopNavigation title="더보기" />
        {profileData && (
          <UserInfo
            username={profileData?.data.username}
            telNo="+8210 9999 9999"
          />
        )}
        <IconButtonList />
        <BottomNavigation />
      </Container>
    </Base>
  );
}
