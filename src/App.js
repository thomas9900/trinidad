import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom'
import './App.css'
import Lists from './components/Lists/Lists'
import Article from './components/Article/Article'
import Sidebar from './components/Sidebar/Sidebar'

const App = () => {
  const [list, setList] = useState([])
  const [article, setArticle] = useState([])

  useEffect(() => {
    const getList = async () => {
      const ListFromServer = await fetchList()
      setList(ListFromServer.list)
    }

    const getArticle = async () => {
      const ArticleFromServer = await fetchArticle()
      setArticle(ArticleFromServer)
    }

    getArticle()
    getList()
  }, [])

  const fetchList = async () => {
    const res = await fetch('http://proovitoo.twn.ee/api/list.json')
    const data = await res.json()
    return data
  }

  const fetchArticle = async () => {
    const res = await fetch('http://proovitoo.twn.ee/api/article.json')
    const data = await res.json()
    return data
  }

  return (
    <Router>
      <div className='wrapper'>
        <div className='container'>
          <Sidebar />
          <Switch>
            <Redirect exact from="/" to="/list" />
            <Route path='/list'>
              <Lists list={list} />
            </Route>
            <Route path='/article'>
              <Article article={article} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App