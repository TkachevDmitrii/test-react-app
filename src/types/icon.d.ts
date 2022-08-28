declare type IconType =
  | 'success'
  | 'home'
  | 'personnel'
  | 'question'
  | 'coins'
  | 'shield'
  | 'person'
  | 'lens'
  | 'menu'
  | 'cross'
  | 'arrow'
  | 'hint'
  | 'filter'
  | 'vacancies'
  | 'calendar'
  | 'hdd'
  | 'chevron'
  | 'trash'
  | 'plus'
  | 'pencil'
  | 'back'
  | 'avatar'
  | 'triangle'
  | 'people'
  | 'location'
  | 'aim'
  | 'camera'
  | 'phone'
  | 'mail'
  | 'download'
  | 'star'
  | 'metro'
  | 'marker'
  | 'briefcase'
  | 'buildings'
  | 'curve'
  | 'legalPerson'
  | 'notification'
  | 'verticalDots'
  | 'error'
  | 'caretDown'
  | 'upload'
  | 'wait'
  | 'restore'
  | 'clip'
  | 'negative'
  | 'fileSearch'
  | 'assignment'
  | 'copy'
  | 'logout'
  | 'check'
  | 'lock'
  | 'off'
  | 'roundedCross'
  | 'pickLeft'
  | 'messageIsRead'
  | 'warning'
  | 'contentCopy'
  | 'documents'
  | 'support'
  | 'staff'
  | 'customers'
  | 'sendMessage'
  | 'ballot'
  | 'personPin'

declare interface IconProps {
  type: IconType
  color?: string
  height?: number
  width?: number
  interactive?: boolean
  hoveredColor?: string
  isTransparent?: boolean
  onClick?: () => void
}

declare type ShapeItem = {
  d: string
  fill?: string
  stroke?: string
  strokeWidth?: string
  strokeLinecap?: string
  background?: string
  cx?: string
  cy?: string
  r?: string
}

declare type Shape = Array<ShapeItem>

declare interface IconSignature {
  fill: string
  height: number
  viewBox: string
  width: number
  xmlns: string
  shape: Shape
}

declare type IconShape = Pick<IconProps, 'color' | 'height' | 'width'>

declare type WrapperProps = Pick<IconProps, 'interactive'>
