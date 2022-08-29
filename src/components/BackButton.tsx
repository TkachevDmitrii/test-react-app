import { palette, Icon } from '@my/ui-kit'
import styled from 'styled-components'

interface IProps {
  text: string
  onClick: () => void
}

const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 80px;
  cursor: pointer;
  margin-bottom: 16px;
  :hover > div {
    background-color: ${palette.LIGHT_BLUE_6};
    border-color: transparent;
    fill: ${palette.LIGHT_BLUE_7};
  }
  :hover > p {
    color: ${palette.HOVERED_BLUE_3};
  }
  :hover {
    > div, svg, path {
      fill: ${palette.LIGHT_BLUE_7};
    }
  }
`
const ButtonContanier = styled.div`
  background-color: ${palette.WHITE};
  height: 32px;
  width: 32px;
  border: 1px solid ${palette.WHITE_SMOKE};
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`
const IconWrapper = styled.div`
  transform: rotate(180deg);
  width: 7px;
  height: 11px;
  margin-top: 13px;
  margin-right: 2px;
`
const BackButtonText = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  color: ${palette.GRAY_DARK};
`

export const BackButton = ({ text, onClick }: IProps) => (
  <Container onClick={onClick}>
    <ButtonContanier>
      <IconWrapper>
        <Icon color={palette.DARK} type='chevron' />
      </IconWrapper>
    </ButtonContanier>
    <BackButtonText>{text}</BackButtonText>
  </Container>
)
