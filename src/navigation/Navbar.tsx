import { Button, Icon, palette } from '@my/ui-kit'
import { MenuProps, Menu } from 'antd'
import { useLocation } from 'react-router-dom'
import { 
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { _history } from 'App/history'
import { MenuItem } from './components'

export interface IMenuItem {
  path: string
  iconType: IconType
  name: string
  permission: Permissions
  switch?: boolean
}
interface IProps {
  collapsed: boolean
  onCollapse?: () => void
}

interface ICountProps {
  value: number
}

interface INameWithCountProps {
  name: string,
  count: number
}

// const { Item: MenuItem } = Menu

type ClickHandler = NonNullable<MenuProps['onClick']>

// const StyledMenu = styled(Menu)`
//   padding: 24px 0px 0px 0px; 
//   display: flex; 
//   flex-direction: column; 
//   flex: 1; 
//   overflow-y: auto;
//   overflow-x: hidden;
// `
const IconContainer = styled.a`
  display: flex;
  margin-left: 8px;
`
const IconText = styled.p`
  color: ${palette.DARK};
  font-weight: 600;
  font-size: 16px;
  align-self: center;
`
const LabelMenu = styled.div`
  font-size: 10px;
  color: ${palette.GRAY_DARK};
  margin: 16px 16px 10px;
`
const StyledMenuItem = styled.div`
  
`
const CountContainer = styled.div<{ visible: boolean }>`
  ${({ visible }) => !visible && 'display: none'};
  padding: 0 6px;
  margin-left: 6px;
  align-self: center;
  height: 18px;
  border-radius: 40px;
  background: ${palette.LIGHT_BLUE_2};
`
const CountValue = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: ${palette.WHITE};
`
const ItemWithCountCountainer = styled.div`
  display: flex;
  align-items: center;
`

const Logo: React.FC<IProps> = ({ collapsed }) => (
  <IconContainer href={'/main'}>
    <Icon type='home' color={palette.DARK} />
    <IconText>Главная</IconText>
  </IconContainer>
)

const Count: React.FC<ICountProps> = ({ value }) => (
  <CountContainer visible={value > 0}>
    <CountValue>{value}</CountValue>
  </CountContainer>
)

const ItemWithCount: React.FC<INameWithCountProps> = ({ name, count }) => (
  <ItemWithCountCountainer>
    {name}
    <Count value={count} />
  </ItemWithCountCountainer>
)

function Navbar({ collapsed, onCollapse }: IProps) {
  const [name, setName] = useState<string | null>()

  useEffect(() => {
    const profileName = localStorage.getItem('profileName')
    setName(profileName)
  }, [localStorage.getItem('profileName')])

  const { pathname } = useLocation()
  const selectedKeys = useMemo(() => {
    const menuItemKey = pathname.split('/')[1]
    return [menuItemKey]
  }, [pathname])

  const handleClick = useCallback<ClickHandler>(
    ({ key }) => _history.push(key),
    []
  )
  
  return (
    <>
      <Logo collapsed={collapsed} />
      <Menu
        theme='light'
        selectedKeys={selectedKeys}
        onClick={handleClick}
      >
        {/* {!collapsed && (<LabelMenu>1 этап</LabelMenu>)} */}
        {/* <MenuItem icon={collapsed && <UserOutlined />} key='LearnLayout'>Верстка</MenuItem> */}
        {/* <MenuItem icon={collapsed && <UserOutlined />} key='main'>Простая верстка</MenuItem> */}
        {/* <MenuItem icon={collapsed && <UserAddOutlined />} key='second'>Следующий экран</MenuItem> */}
        {/* <MenuItem icon={collapsed && <UserAddOutlined />} key='third'>Третий экран</MenuItem> */}
        <MenuItem
          active={true}
          expanded={true}
          iconType='staff'
          name='LearnLayout'
          path='LearnLayout'
          onCloseMenu={() => null}
        />
      </Menu>
    </>
  )
}

export default Navbar
