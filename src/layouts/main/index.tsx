import { palette } from '@my/ui-kit'
import { Layout } from 'antd'
import { Slot } from 'slot'
import { Navbar } from 'navigation'

const { Header, Content, Sider } = Layout

const StyledSider = styled(Sider)`
  background: ${palette.WHITE};
  border: 1px solid #DDDDDD;
  border-left-style: none;
  border-top-style: none;
  overflow-y: auto;
  overflow-x: hidden;
  height: 104vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
  .ant-layout-sider-trigger {
    height: 0;
  }
`
const StyledContent = styled(Content)`
  background-color: ${palette.WHITE};
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
`

function MainLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarWidth = collapsed ? '79px' : '240px'

  return (
    <Layout style={{ minHeight: '100vh', borderRight: '1px' }}>
      <StyledSider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        width='240px'
      >
        <Navbar collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} />
      </StyledSider>
      <Layout style={{ marginLeft: collapsed ? 79 : 240 }}>
        <Header
          style={{
            backgroundColor: '#3571EA', position: 'fixed',
            zIndex: 1, width: `calc(100% - ${sidebarWidth})`, display: 'inline-flex', justifyContent: 'space-between',
            alignItems: 'center', paddingLeft: '32px', paddingRight: '32px'
          }}
        >
          <div style={{ marginRight: '24px', display: 'flex', alignItems: 'center', gap: '16px'}}>
            <Slot id='topbar-start' />
          </div>
          <div style={{ width: '50%', alignItems: 'center' }}>
            <Slot id='topbar-search' />
          </div>
          <div style={{ width: '35%', display: 'inline-flex', justifyContent: 'flex-end' }}>
            <Slot id='topbar-end' />
          </div>
        </Header>
        <Layout style={{ marginTop: 64 }}>
          <StyledContent>
            {children}
          </StyledContent>
          <Slot id='rightbar' />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout
