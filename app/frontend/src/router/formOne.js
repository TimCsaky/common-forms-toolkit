/**
 * Form One Form Routes
 */
import { FormNames } from '@/utils/constants';

const baseName = 'FormOne';
const baseTitle = 'Form One';


export default [
  {


    path: `/${FormNames.FORMONE}`,
    component: () => import(/* webpackChunkName: "formone" */ '@/views/FormOne.vue'),
    children: [
      {
        path: '',
        name: `${baseName}Form`,
        component: () => import(/* webpackChunkName: "formone-form" */ '@/views/formone/Root.vue'),
        meta: {
          title: baseTitle
        }
      },
      {
        path: 'admin',
        name: `${baseName}Admin`,
        component: () => import(/* webpackChunkName: "formone-admin" */ '@/views/formone/Admin.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Admin`
        }
      },
      {
        path: 'admin/dashboard',
        name: `${baseName}Dashboards`,
        component: () => import(/* webpackChunkName: "formone-dashboard" */ '@/views/formone/Dashboards.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Admin`
        }
      },
      {
        path: 'admin/settings',
        name: `${baseName}Settings`,
        component: () => import(/* webpackChunkName: "formone-settings" */ '@/views/formone/Settings.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Settings`
        }
      },
      {
        path: 'admin/submission/:submissionId',
        name: `${baseName}Submission`,
        component: () => import(/* webpackChunkName: "formone-submission" */ '@/views/formone/Submission.vue'),
        props: true,
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Submission`
        }
      },
      {
        path: 'admin/team',
        name: `${baseName}Team`,
        component: () => import(/* webpackChunkName: "formone-team" */ '@/views/formone/Team.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Team Management`
        }
      },
      {
        path: 'review/:submissionId',
        name: `${baseName}Review`,
        component: () => import(/* webpackChunkName: "formone-review" */ '@/views/formone/Review.vue'),
        props: true,
        meta: {
          title: `${baseTitle} Submission Review`
        }
      },
    ]
  },
];
