// export const sidebarMenuConfig = [
//   // {
//   //   label: 'Starter Pages',
//   //   icon: 'fas fa-tachometer-alt',
//   //   route: '/starter-pages'
//   // },
//   // {
//   //   label: 'Active Page',
//   //   icon: 'far fa-circle',
//   //   route: '/active-page'
//   // },
//   // {
//   //   label: 'Inactive Page',
//   //   icon: 'far fa-circle',
//   //   route: '/inactive-page'
//   // },
//   // {
//   //   label: 'Dashboard',
//   //   route: 'dashboard',
//   //   icon: 'nav-icon fas fa-chart-pie',
//   // },
//   // {
//   //   label: 'Users',
//   //   route: 'user-details',
//   //   icon: 'nav-icon fa fa-user-plus',
//   // },
//   // {
//   //   label: 'Add Product',
//   //   route: 'addproduct',
//   //   icon: 'nav-icon far fa-plus-square',
//   // },
//   // {
//   //   label: 'Sell Product',
//   //   route: 'selling',
//   //   icon: 'nav-icon fa fa-cart-arrow-down',
//   // },
//   // {
//   //   label: 'Billing',
//   //   route: 'printbill',
//   //   icon: 'nav-icon fa fa-regular fa-file',
//   // },
//   // {
//   //   label: 'Vendors',
//   //   route: 'vendors',
//   //   icon: 'nav-icon fa fa-user-md',
//   // },
  
// ];
export const sidebarMenuConfig = [
  {
    label: 'Dashboard',
    route: 'dashboard',
    icon: 'nav-icon fas fa-chart-pie',
  },
  {
    label: 'Settings',
    icon: 'nav-icon fas fa-cog',
    submenu: [
      {
        label: 'Users',
        route: 'user-details',
        icon: 'nav-icon fa fa-user-plus',
      },
      {
        label: 'Role',
        route: 'roles',
        icon: 'nav-icon fa fa-address-card',
      },
      {
        label: 'Role Permission',
        route: 'permission',
        icon: 'nav-icon fa fa-key',
      },
    ]
  },
  {
    label: 'Add Product',
    route: 'addproduct',
    icon: 'nav-icon far fa-plus-square',
  },
  {
    label: 'Sell Product',
    route: 'selling',
    icon: 'nav-icon fa fa-cart-arrow-down',
  },
  {
    label: 'Billing',
    route: 'printbill',
    icon: 'nav-icon fa fa-regular fa-file',
  },
  {
    label: 'Vendors',
    route: 'vendors',
    icon: 'nav-icon fa fa-user-md',
  },
];
  