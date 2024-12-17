import { 
  DashboardOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  PictureOutlined,
  GiftOutlined,
  ShopOutlined,
  TeamOutlined,
  MailOutlined,
  SettingOutlined,
  MobileOutlined,
  FileTextOutlined,
  LayoutOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const mainNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}/`,
  title: 'sidenav.main',
  icon: '',
  breadcrumb: false,
  submenu: [
    {
      key: 'dashboards',
      path: `${APP_PREFIX_PATH}/`,
      title: 'sidenav.dashboard',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'scheduler',
      path: `${APP_PREFIX_PATH}/pages/sheduler`,
      title: 'sidenav.scheduler',
      icon: LayoutOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'catalog',
      path: `${APP_PREFIX_PATH}/`,
      title: 'sidenav.catalog',
      icon: ShoppingCartOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'catalog-productList',
          path: `${APP_PREFIX_PATH}/`,
          title: 'sidenav.catalog.products',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'catalog-categories',
          path: `${APP_PREFIX_PATH}/`,
          title: 'sidenav.catalog.categories',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'catalog-collections',
          path: `${APP_PREFIX_PATH}/`,
          title: 'sidenav.catalog.collections',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'catalog-combo',
          path: `${APP_PREFIX_PATH}/`,
          title: 'sidenav.catalog.combo',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    },
    {
      key: 'orders',
      path: `${APP_PREFIX_PATH}/`,
      title: 'sidenav.orders',
      icon: ShoppingOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'clients',
      path: `${APP_PREFIX_PATH}/pages`,
      title: 'sidenav.clients',
      icon: UserOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'clients-list',
          path: `${APP_PREFIX_PATH}/pages/clients-list`,
          title: 'sidenav.clients.clientsList',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'clients-group',
          path: `${APP_PREFIX_PATH}/`,
          title: 'sidenav.clients.clientsGroup',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
      ]
    },
    {
      key: 'banners',
      path: `${APP_PREFIX_PATH}/`,
      title: 'sidenav.banners',
      icon: PictureOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'promo-codes',
      path: `${APP_PREFIX_PATH}/`,
      title: 'sidenav.promoCodes',
      icon: GiftOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'shops-offline',
      path: `${APP_PREFIX_PATH}/`,
      title: 'sidenav.shopsOffline',
      icon: ShopOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'shops-addresses',
          path: `${APP_PREFIX_PATH}/`,
          title: 'sidenav.shopsOffline.addresses',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'shops-locations',
          path: `${APP_PREFIX_PATH}/`,
          title: 'sidenav.shopsOffline.locations',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
      ]
    },
    {
      key: 'employees',
      path: `${APP_PREFIX_PATH}/`,
      title: 'sidenav.employees',
      icon: TeamOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'mailings',
      path: `${APP_PREFIX_PATH}/`,
      title: 'sidenav.mailings',
      icon: MailOutlined,
      breadcrumb: true,
      submenu: []
    }
  ]
}]

const systemsNavTree = [{
  key: 'systems',
  path: `${APP_PREFIX_PATH}/`,
  title: 'sidenav.systems',
  icon: '',
  breadcrumb: false,
  submenu: [
    {
      key: 'settings',
      path: `${APP_PREFIX_PATH}/`,
      title: 'sidenav.settings',
      icon: SettingOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'mobile-app',
      path: `${APP_PREFIX_PATH}/`,
      title: 'sidenav.mobileApp',
      icon: MobileOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'logs',
      path: `${APP_PREFIX_PATH}/`,
      title: 'sidenav.logs',
      icon: FileTextOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const navigationConfig = [
  ...mainNavTree,
  ...systemsNavTree
]

export default navigationConfig;
