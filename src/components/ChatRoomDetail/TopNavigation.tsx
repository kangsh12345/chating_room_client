import styled from '@emotion/styled/macro';
import { BiArrowBack, BiSearchAlt2 } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const Base = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 36px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0;
  padding: 0;
`;

const ActionItemContainer = styled.div``;

const ActionItem = styled.span`
  font-size: 20px;
  padding: 0 8px;
`;

interface Props {
  title: string;
}

export default function TopNavigation({ title }: Props) {
  const navigate = useNavigate();

  return (
    <Base>
      <ActionItem onClick={() => navigate('rooms', { replace: true })}>
        <BiArrowBack />
      </ActionItem>
      <Title>{title}</Title>
      <ActionItemContainer>
        <ActionItem>
          <BiSearchAlt2 />
        </ActionItem>
        <ActionItem>
          <GiHamburgerMenu />
        </ActionItem>
      </ActionItemContainer>
    </Base>
  );
}
