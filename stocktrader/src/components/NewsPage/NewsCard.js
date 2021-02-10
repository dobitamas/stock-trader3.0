import React, { useEffect, useState } from 'react'
//import './NewsCard.scss';
import dayjs from 'dayjs';


export function CardHeader({image, name}) {
    
      let style = { 
          backgroundImage: 'url(' + image + ')',
          
      };
      return (
        <header style={style} id={image} className="card-header">
          <h4 className="card-header--title">{name}</h4>
        </header>
      )
}
  
export function Button({link}) {
      return (
        <a className="button button-primary" href={link}>
          <i className="fa fa-chevron-right"></i> Find out more
        </a>
      )
  }
  
export function CardBody({title, text, date, link}) {
      return (
        <div className="card-body">
          <p className="date">{dayjs(date).format('DD/MM/YYYY')}</p>
          
          <h3>{title}</h3>
          
            <p className="body-content">{text}</p>
          
            <Button link={link}/>
              
            
        </div>
      )
  }
  
  export default function NewsCard({article}) {
      return (
        <article className="card">
          <CardHeader image={article? article.urlToImage : ""} name={article? article.source.name : "Loading..."}/>
          <CardBody title={article? article.title : "Loading..."} text={article? article.description : "Loading..."} link={article? article.url : ""}  />
        </article>
      )
  }
