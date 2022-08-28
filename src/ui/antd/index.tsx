import {
  List as AntDList,
  Dropdown as AntDDropdown,
  Menu as AntDMenu, MenuItemProps as AntDMenuItemPros,
  Tag as AntDTag, TagProps as AntDTagProps,
  Button as AntDButton,  ButtonProps as AntDButtonProps, 
  Spin as AntDSpin, Skeleton as AntDSkeleton,
  Tabs as AntDTabs, Modal as AntDModal,
  Tooltip as AntDTooltip,
} from 'antd'
import { MouseEvent } from 'react'
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons'
import { palette } from '@my/ui-kit'
import { TooltipPlacement } from 'antd/lib/tooltip'
import { _history } from 'App/history'

type LinkProps = {
  title: string
  to: string
  params?: object
  openFile?: boolean
  isUploadStyle?: boolean
}

type LoaderProps = {
  size?: 'S' | 'M' | 'L'
  isList?: boolean
}

interface ITooltipProps extends Omit<TooltipProps, 'tooltip' | 'width'>  {
  title: string | JSX.Element
  placement?: TooltipPlacement
  color?: string
}

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const LoaderContainer = styled(LoaderWrapper)`
  margin-top: ${window.innerHeight / 2 - 68}px;
`
const LinkButton = styled(AntDButton)<{isUploadStyle?: boolean}>`
  color:  ${palette.BLUE};
  font-weight: 600;
  padding: 0;
  height: auto;
  word-break: break-word;
  text-align: left;
  white-space: normal;
  ${({isUploadStyle}) => isUploadStyle && `
    margin: 0;
    margin-left: 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5715 !important;
  `}
`
const TooltipText = styled.p`
  color: ${palette.DARK};
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`

export const List = AntDList
export const ListItem = AntDList.Item
export const ListItemMeta = AntDList.Item.Meta

export const Modal = AntDModal

export const Link = ({ title, to, params, openFile, isUploadStyle }: LinkProps) => {
  function clickHandler (e: MouseEvent) { 
    e.preventDefault()
    _history.push(to, params)
  }

  return (
    <LinkButton
      type='link'
      href={openFile ? to : undefined}
      target='_blank'
      onClick={openFile ? undefined : clickHandler}
      isUploadStyle={isUploadStyle}
    >
      <p>{title}</p>
    </LinkButton>
  )
}

export const Loader = ({ size = 'M', isList = false }: LoaderProps) => {
  let fontSize = 24

  switch (size) {
    case 'S':
      fontSize = 24
      break
    case 'M':
      fontSize = 36
      break
    case 'L':
      fontSize = 54
      break
    default:
      break
  }
  if (isList) {
    return (
      <div style={{ height: `${window.innerHeight - 100}px` }}>
        <LoaderContainer>
          <LoadingOutlined style={{ fontSize }} spin />
          <p>Загрузка...</p>
        </LoaderContainer>
      </div>
    )
  }

  return (
    <LoaderWrapper>
      <AntDSpin indicator={<LoadingOutlined style={{ fontSize }} spin />} tip='Загрузка...' />
    </LoaderWrapper>
  )
}

export const Dropdown = AntDDropdown
Dropdown.defaultProps = {
  ...Dropdown.defaultProps,
  placement: 'bottomRight',
  trigger: ['click'],
}

export const Menu = AntDMenu
export const Skeleton = AntDSkeleton
export const Tabs = AntDTabs

interface MenuItemProps extends Omit<AntDMenuItemPros, 'children'> {
  text: string
}

export function MenuItem({ text, ...props }: MenuItemProps) {
  return (
    <AntDMenu.Item {...props}>
      {text}
    </AntDMenu.Item>
  )
}

interface TagProps extends Omit<AntDTagProps, 'children'> {
  text: string
}

export function Tag({ text, ...props }: TagProps) {
  return (
    <AntDTag {...props}>
      {text}
    </AntDTag>
  )
}

export type IconButtonProps = Omit<AntDButtonProps, 'children' | 'shape'>

export function IconButton({
  // @ts-expect-error
  children,
  ...props
}: IconButtonProps) {
  return (
    <AntDButton {...props} shape='circle' />
  )
}

export const Tooltip = ({ 
  title, 
  placement = 'bottom', 
  color = palette.LIGHT_GRAY,
  ...props
}: ITooltipProps) => (
  <AntDTooltip 
    title={typeof title === 'string' ? <TooltipText>{title}</TooltipText> : title}
    placement={placement}
    color={color}
    {...props}
  />
)
