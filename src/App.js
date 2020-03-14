import React, { Component } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import { adminRouter } from './routes'

import { Frame } from './components'

const menus = adminRouter.filter(route => route.isNav === true )

export default class App extends Component {
  
  render() {
    return (
      <Frame menus={menus} >
        <Switch>
          {
            adminRouter.map(route => {
              return (
                <Route
                  key={route.pathname}
                  path={route.pathname}
                  render={(routerProps) => {
                    return <route.component {...routerProps} />
                  }}
                />
              )
            })
          }
          <Redirect to={adminRouter[0].pathname} from='/admin' exact />
          <Redirect to="/404" />
        </Switch>
      </Frame>
    )
  }
}
