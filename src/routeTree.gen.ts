/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as LoginRouteImport } from './routes/login'
import { Route as LayoutRouteImport } from './routes/_layout'
import { Route as LayoutUsersIndexRouteImport } from './routes/_layout/users/index'
import { Route as LayoutUsersCreateRouteImport } from './routes/_layout/users/create'
import { Route as LayoutUsersUserIdRouteImport } from './routes/_layout/users/$userId'

const LoginRoute = LoginRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRouteImport,
} as any)
const LayoutRoute = LayoutRouteImport.update({
  id: '/_layout',
  getParentRoute: () => rootRouteImport,
} as any)
const LayoutUsersIndexRoute = LayoutUsersIndexRouteImport.update({
  id: '/users/',
  path: '/users/',
  getParentRoute: () => LayoutRoute,
} as any)
const LayoutUsersCreateRoute = LayoutUsersCreateRouteImport.update({
  id: '/users/create',
  path: '/users/create',
  getParentRoute: () => LayoutRoute,
} as any)
const LayoutUsersUserIdRoute = LayoutUsersUserIdRouteImport.update({
  id: '/users/$userId',
  path: '/users/$userId',
  getParentRoute: () => LayoutRoute,
} as any)

export interface FileRoutesByFullPath {
  '/login': typeof LoginRoute
  '/users/$userId': typeof LayoutUsersUserIdRoute
  '/users/create': typeof LayoutUsersCreateRoute
  '/users': typeof LayoutUsersIndexRoute
}
export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/users/$userId': typeof LayoutUsersUserIdRoute
  '/users/create': typeof LayoutUsersCreateRoute
  '/users': typeof LayoutUsersIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/_layout': typeof LayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/_layout/users/$userId': typeof LayoutUsersUserIdRoute
  '/_layout/users/create': typeof LayoutUsersCreateRoute
  '/_layout/users/': typeof LayoutUsersIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/login' | '/users/$userId' | '/users/create' | '/users'
  fileRoutesByTo: FileRoutesByTo
  to: '/login' | '/users/$userId' | '/users/create' | '/users'
  id:
    | '__root__'
    | '/_layout'
    | '/login'
    | '/_layout/users/$userId'
    | '/_layout/users/create'
    | '/_layout/users/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
  LoginRoute: typeof LoginRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_layout/users/': {
      id: '/_layout/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof LayoutUsersIndexRouteImport
      parentRoute: typeof LayoutRoute
    }
    '/_layout/users/create': {
      id: '/_layout/users/create'
      path: '/users/create'
      fullPath: '/users/create'
      preLoaderRoute: typeof LayoutUsersCreateRouteImport
      parentRoute: typeof LayoutRoute
    }
    '/_layout/users/$userId': {
      id: '/_layout/users/$userId'
      path: '/users/$userId'
      fullPath: '/users/$userId'
      preLoaderRoute: typeof LayoutUsersUserIdRouteImport
      parentRoute: typeof LayoutRoute
    }
  }
}

interface LayoutRouteChildren {
  LayoutUsersUserIdRoute: typeof LayoutUsersUserIdRoute
  LayoutUsersCreateRoute: typeof LayoutUsersCreateRoute
  LayoutUsersIndexRoute: typeof LayoutUsersIndexRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutUsersUserIdRoute: LayoutUsersUserIdRoute,
  LayoutUsersCreateRoute: LayoutUsersCreateRoute,
  LayoutUsersIndexRoute: LayoutUsersIndexRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
  LoginRoute: LoginRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
