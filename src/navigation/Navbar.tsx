import { Button, palette } from '@my/ui-kit'
import { MenuProps, Menu } from 'antd'
import { useLocation } from 'react-router-dom'
import { 
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { _history } from 'App/history'

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

const { Item: MenuItem } = Menu

type ClickHandler = NonNullable<MenuProps['onClick']>

// const StyledMenu = styled(Menu)`
//   padding: 24px 0px 0px 0px; 
//   display: flex; 
//   flex-direction: column; 
//   flex: 1; 
//   overflow-y: auto;
//   overflow-x: hidden;
// `
const LabelMenu = styled.div`
  font-size: 10px;
  color: ${palette.GRAY_DARK};
  margin: 16px 16px 10px;
`
// const StyledMenuItem = styled(MenuItem)`
//   font-size: 14px;
//   color: ${palette.DARK};
//   font-weight: 500;
//   &&.ant-menu-item {
//     height: 30px;
//     line-height: 0;
//     margin: 0;
//     display: flex;
//     align-items: center;
//   }
//   &&.ant-menu-item-selected {
//     background-color: ${palette.LIGHT_BLUE};
//   }
//   &&.ant-menu-item:hover {
//     color: ${palette.DARK};
//     opacity: 0.7;
//   }
//   && > .ant-menu-item-icon {
//     line-height: 0 !important; 
//   }
// `
const StyledImage = styled.img`
  width: 100%;
  padding: 9px 15px;
`
const BottomMenu = styled.div`
  margin-top: auto;
  padding-bottom: 12px;
  justify-content: space-between;
  align-items: baseline;
`
const ProfileLogoutWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 26px 20px;
`
const CollapseMenuWrapper = styled.div<{ collapsed: boolean }>`
  ${({ collapsed }) => collapsed
    ? 'text-align: -webkit-center;'
    : 'float: right;'}
  margin-right: ${({ collapsed }) => !collapsed && '21px'};
`
const IconWrapper = styled.div<{ collapsed?: boolean }>`
  cursor: pointer;
  width: 16px;
  ${({ collapsed }) => collapsed && 'transform: rotate(180deg);'}
`
const ProfileNameText = styled.p`
  cursor: pointer;
  align-self: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: ${palette.GRAY_DARK};
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
  <a href={'/workers'}>
    {!collapsed ? (<StyledImage src='/images/logo.svg'/>) : (<StyledImage src='/images/logo_small.svg' height='58px' />)}
  </a>
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
    ({ key }) => _history.push('/' + key),
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
        {!collapsed && (<LabelMenu>1 этап</LabelMenu>)}
        <MenuItem icon={collapsed && <UserOutlined />} key='workers'>Простая верстка</MenuItem>
        <MenuItem icon={collapsed && <UserAddOutlined />} key='second'>Следующий экран</MenuItem>
      </Menu>
    </>
  )
}

export default Navbar
