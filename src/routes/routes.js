import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../views/NotFoundPage.vue'

// Admin views
import Overview from 'src/views/Overview.vue'
import UserProfile from 'src/views/UserProfile.vue'
import TableList from 'src/views/TableList.vue'
import Typography from 'src/views/Typography.vue'
import Icons from 'src/views/Icons.vue'
import Maps from 'src/views/Maps.vue'
import Notifications from 'src/views/Notifications.vue'
import Upgrade from 'src/views/Upgrade.vue'
import TestTableList from 'src/views/TestTableList.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      },
      {
        path: 'testTableList',
        name: 'TestTableList to PRO',
        component: TestTableList
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
