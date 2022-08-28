type TooltipPosition =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left'

interface IWrapperStyles {
  borderRadius?: string
  boxShadow?: string
  marginTop?: string
  marginBottom?: string
  marginLeft?: string
  marginRight?: string
  left?: string
  right?: string
  top?: string
  bottom?: string
  zIndex?: number
}

declare interface TooltipProps {
  children: React.ReactNode
  tooltip: React.ReactNode
  width: string
  closable?: boolean
  position?: TooltipPosition
  clickOnly?: boolean
  className?: string
  zIndex?: number
  styles?: IWrapperStyles
}

declare type TooltipContentProps = Omit<TooltipProps, 'tooltip'> & {
  visible: boolean
  onClose: () => void
}

declare type StyledTooltipProps = Required<
  Pick<TooltipContentProps, 'position' | 'visible' | 'width'>
> &
Pick<TooltipProps, 'styles'>
