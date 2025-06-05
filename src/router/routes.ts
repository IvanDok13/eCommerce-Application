export enum AppRoutes {
  HOME_ROUTE = '/',
  LOGIN_ROUTE = '/login',
  REGISTRATION_ROUTE = '/registration',
  USER_PROFILE_ROUTE = '/profile',
  CATALOG_ROUTE = '/catalog',
  CATALOG_CATEGORY_ROUTE = '/catalog/:categorySlug',
  PRODUCT_DETAIL_ROUTE = '/product/:productId',
  // TO DO: implement this - CATALOG_CATEGORY_ROUTE = '/catalog/*',
  ERROR_ROUTE = '*',
}
