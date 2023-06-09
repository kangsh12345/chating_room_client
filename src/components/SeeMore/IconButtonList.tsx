import styled from '@emotion/styled/macro';
import { FiCalendar, FiGift, FiMail, FiScissors } from 'react-icons/fi';

const Base = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  margin-top: 36px;
`;

const IconButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 24px;
`;

const Label = styled.div`
  margin-top: 4px;
`;

export default function IconButtonList() {
  return (
    <Base>
      <IconButton>
        <Icon>
          <FiMail />
        </Icon>
        <Label>메일</Label>
      </IconButton>

      <IconButton>
        <Icon>
          <FiCalendar />
        </Icon>
        <Label>캘린더</Label>
      </IconButton>

      <IconButton>
        <Icon>
          <FiScissors />
        </Icon>
        <Label>헤어샵</Label>
      </IconButton>

      <IconButton>
        <Icon>
          <FiGift />
        </Icon>
        <Label>선물</Label>
      </IconButton>
    </Base>
  );
}
