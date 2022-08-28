declare type TabValue = number | string

declare type TabsType = 'basic' | 'card'

declare interface TabElement {
  value: TabValue
  label: string
  hasMarker?: boolean
}
