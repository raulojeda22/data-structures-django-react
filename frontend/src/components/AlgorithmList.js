import React from 'react';
import { Link } from 'react-router-dom';

const AlgorithmList = ({ list }) => (
    <ul>
        {list && list.map((code) => {
            return (<li key={code.slug}><Link to={"/algorithm/" + code.slug}><div className="algoInfo"><div className="general-info"><p>{code.title}</p><small>{code.author.username}</small></div><div className="description"><p>{code.description}</p></div></div></Link></li>)
        })}
    </ul>
  );

export default AlgorithmList;