import { Tag, Tooltip } from 'ui'

interface ITag {
  textDate: string
  text: string
  color: string
}
export const TooltipTag = ({ textDate, text, color }: ITag) => (
  <Tooltip title={textDate}>
    <Tag text={text} color={color} />
  </Tooltip>
)
