import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Icon, palette } from '@my/ui-kit'
import { IMenuItem } from '../Navbar'

type Props = Omit<IMenuItem, 'permission'> & {
  active: boolean
  expanded: boolean
  onCloseMenu: () => void
}

const Wrapper = styled(NavLink)<{ $active: boolean, expanded?: boolean }>`
  padding: 12px 0;
  border-radius: 0 7px 7px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-top: 6px;
  justify-content: start;
  align-items: start;
  background: ${({ $active, expanded }) => expanded && $active && palette.LIGHT_GRAY_4};

  &:hover {
    background: ${palette.LIGHT_BLUE_3};
  }

  @media screen and (max-width: 632px) {
    padding: 0;
    margin-top: 30px;
    background: none;
    border: none;
    flex-direction: row;
    justify-content: flex-start;

    &:hover {
      background: none;
    }
  }
`
const Row = styled.div`
  display: flex;
`
const IconWrapper = styled.div<{ changeColor?: boolean; active: boolean }>`
  background: ${({ active }) =>
    active ? palette.LIGHT_BLUE : palette.WHITE_SMOKE};
  border-radius: 100%;
  display: flex;
  width: 36px;
  height: 36px;
  margin-left: 15px;

  @media screen and (max-width: 632px) {
    background: transparent;
    margin-left: 10px;
  }
`
const Title = styled.div<{ active?: boolean }>`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  padding-top: 3px;
  margin-left: 18px;
  align-self: center;
  color: ${({ active }) => active ? palette.LIGHT_BLUE_2 : palette.GRAY_DARK_3};
  width: 100px;
  user-select: none;

  @media screen and (max-width: 632px) {
    font-size: 14px;
    font-weight: 500;
    color: ${({ active }) => (active ? palette.BLUE : palette.DARK)};
    text-align: left;
    padding-left: 7px;
  }
`

const getIconColor = (isMobile: boolean, active: boolean): string => {
  if (isMobile) return palette.LIGHT_BLUE_2

  return active ? palette.LIGHT_BLUE_2 : palette.GRAY_DARK_3
}

export const MenuItem: React.FC<Props> = ({
  active,
  path,
  name,
  iconType,
  expanded,
  onCloseMenu,
}) => {
  const [hovered, setHovered] = useState<boolean>(false)

  const changeColor = !hovered && !active

  return (
    <Wrapper
      $active={active}
      expanded={expanded}
      to={path}
      onClick={onCloseMenu}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Row>
        <IconWrapper active={active} changeColor={changeColor}>
          <Icon
            color={getIconColor(false, active)}
            height={20}
            type={iconType}
            width={36}
          />
        </IconWrapper>
        <Title active={active}>
          {name}
        </Title>
      </Row>
    </Wrapper>
  )
}
