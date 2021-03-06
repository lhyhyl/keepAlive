import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import KeepAlive from 'react-activation'

import KeepingTabs from './components/KeepingTabs'
import List from './views/List'
import Item from './views/Item'

import './App.css'

function AliveItem(props) {
  const id = props.match.params.id
  const shared = id % 2 === 0

  // 双数共享同一份缓存
  // 单数独享缓存
  return shared ? (
    <KeepAlive name="ItemShared">
      <Item {...props} />
    </KeepAlive>
  ) : (
    <KeepAlive name={`Item${id}`} id={id}>
      <Item {...props} />
    </KeepAlive>
  )
}

export default function App() {
  return (
    <div className="app">
      <div className="header">
        <KeepingTabs />
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/list">
            <KeepAlive name="List">
              <List />
            </KeepAlive>
          </Route>
          <Route exact path="/item/:id" component={AliveItem} />
          <Redirect to="/list" />
        </Switch>
      </div>
    </div>
  )
}
