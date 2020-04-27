import React from 'react';
import './css/Card.css';

class Card extends React.Component {

  render() {
    let author = this.props.author;
    let authorName = author.substring(author.lastIndexOf('("')+2, author.lastIndexOf('")'));
    return (
      <div className="card">
        <figure className="card_content">         
          <figcaption>
            <div className="description" 
              dangerouslySetInnerHTML={{ __html: this.props.description }} 
            />
            <h3 className="title">
              <a href={this.props.imageLink} title={this.props.title}>
                {this.props.title}
              </a>
              by {authorName}
            </h3>
            <div className="tags">
              {this.props.tags ? 'Tags: ' + this.props.tags.replace(/\s+/g, ", ") : ""}
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
}

export default Card;


