
import { debounce } from 'decorators'

export function useDebouncedSearch() {

  const [inputValue, setInputValue] = useState('')
  const [search, setSearch] = useState('')
  const setSearchDebounced = useMemo(() => debounce(setSearch, 500), [])
  
  useMemo(() => setSearchDebounced(inputValue), [inputValue])

  return {
    search, inputValue, setInputValue
  }
}
