import React from 'react';
import { Link } from 'react-router-dom';

const AlgorithmList = ({ list }) => (
    <ul>
        {list && list.map((code) => {
            return (<li key={code.slug}><div className="algoInfo"><div className="general-info"><Link to={"/algorithm/" + code.slug}><p>{code.title}</p></Link><Link to={"/user/" + code.author.username}><small>{code.author.username}</small></Link></div><div className="description"><Link to={"/algorithm/" + code.slug}><p>{code.description}</p></Link></div></div></li>)
        })}
    </ul>
  );

export default AlgorithmList;