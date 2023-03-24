import styled from '@emotion/styled/macro';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiSearchAlt2 } from 'react-icons/bi';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { RiChatNewLine } from 'react-icons/ri';

const Base = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 12px;
  right: 12px;
  height: 36px;
  box-sizing: border-box;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0;
  padding: 0;
`;

const ActionItemContainer = styled.div``;

const ActionItem = styled.span`
  font-size: 20px;
  padding: 0 12px;
`;

interface Props {
  title: string;
}

export default function TopNavigation({ title }: Props) {
  return (
    <Base>
      <Title>{title}</Title>
      <ActionItemContainer>
        <ActionItem>
          <BiSearchAlt2 />
        </ActionItem>
        <ActionItem>
          <RiChatNewLine />
        </ActionItem>
        <ActionItem>
          <HiOutlineMusicNote />
        </ActionItem>
        <ActionItem>
          <AiOutlineSetting />
        </ActionItem>
      </ActionItemContainer>
    </Base>
  );
}
