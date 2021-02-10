import React from 'react'
import './NewsCard.scss';
import dayjs from 'dayjs';

export default function NewsCard2({article}) {
    return (
      <figure class="snip1518">
      <div class="image"><img src={article? article.urlToImage : ""} alt="sample101" /></div>
      <figcaption>
        <h5>{article? article.source.name : ""}</h5>
        <h3>{article? article.title : ""}</h3>
        <footer>
          <div class="date">{article? dayjs(article.publishedAt).format('MMMM DD, YYYY') : ""}</div>
          <div class="icons">
            <div class="views"><i class="ion-eye"></i>2,907</div>
            <div class="love"><i class="ion-heart"></i>623</div>
          </div>
        </footer>
      </figcaption> 
      <a href={article? article.url : ""} target="_blank"></a> 
    </figure>
    )
}
