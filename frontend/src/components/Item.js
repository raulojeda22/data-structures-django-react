import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
    category = this.props.match.params.category;
    item = this.props.match.params.item;
    link = "https://tse2.mm.bing.net/th?q=" + this.item + "&w=300&h=300&c=7&rs=1";
    back = "/carta/" + this.category;
    render() {
        return (
            <div>
                <p>{this.item}</p>

                <img alt={this.item} src={this.link}/>
                <p><Link to={this.back}>Back</Link></p>
            </div>
        );
    }
}

export default Item;