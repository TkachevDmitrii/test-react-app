type SelectedRowKeysHandler = import('react').Dispatch<
  import('react').SetStateAction<number[]>
>
type TableProps<T> = import('antd').TableProps<T>
type ColumnType<T> = import('antd/lib/table').ColumnType<T>

type Render<T> = Pick<ColumnType<T>, 'render'>['render']

declare interface ISelectionConfig {
  setSelectedRowKeys: SelectedRowKeysHandler
  selectedRowKeys: number[]
}

declare interface ITableProps<T> extends TableProps<T> {
  rowKey?: string
  selection?: ISelectionConfig | false
  searchText?: string
  disableKey?: string
  multiselection?: boolean
  empty?: React.ReactNode
  skeletonLoading?: boolean
  rowCount?: number
  onWholeRowSelection?: boolean
  isTablePlaceholderVisible?: boolean
}

declare type TableColumn<T> = ColumnType<T> &
(
  | {
    highlight?: undefined
    render?: Render<T>
  }
  | {
    highlight?: true
    render?: (text: string, record: T, index: number) => string
  }
)

declare type ColumnGroup<T> = TableColumn<T>[]
