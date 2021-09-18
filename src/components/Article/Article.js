import React from 'react'
import './Article.css'

const Article = ({ article }) => {
    return (
        <div className='article'>
            <h1>{article.title}</h1>
            <h2>
                <div dangerouslySetInnerHTML={{ __html: (article.intro) }} />
            </h2>
            <img src={article.images[0].medium} className='article__img' />
            <div dangerouslySetInnerHTML={{ __html: (article.body) }} className='article__paragraphs' />
            <ul className='article__ul'>
                {article.tags.map((el, index) => (<li key={index}>{el}</li>))}
            </ul>
        </div>
    )
}

export default Article