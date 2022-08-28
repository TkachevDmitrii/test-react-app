declare interface ToggleItem {
  label: string
  value: string | number
  disabled?: boolean
  count?: number
}

declare type StyledItem = Pick<ToggleItem, 'disabled'> & { active?: boolean }
