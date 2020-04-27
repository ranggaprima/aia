import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { getImage } from './store/reducers';

import Card from './Card'
import './css/App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      searchvalue: '',
    }
  }

  static propTypes = {
    getFlickrImage: PropTypes.func.isRequired,
    imageData: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.bool,
  }

  componentWillMount() {
    this.props.getFlickrImage();
  }

  searchHandleClick = e => {
    e.preventDefault()
    const inputValue = document.getElementById('search').value;
    this.setState({ searchvalue: inputValue })
    console.log('Value: ', inputValue)
  }

  render() {
    const { loading, error, imageData } = this.props
    const { searchvalue } = this.state

    return (
      <div className="App">
        <div className="wrapper">
          <div className="header">
            <input
              type="text"
              placeholder="Search"
              id="search"
              className="search"
            />
            <button className="search_button" onClick={this.searchHandleClick}>Search</button>
          </div>
          <div className="content flexWrap">
            {loading ? 'Loading...' : error ? 'OOPS!!! There was an error connection' : (
              imageData
              .filter(data => new RegExp(searchvalue, "i").test(data.title) ||
              new RegExp(searchvalue, "i").test(data.description) ||
              new RegExp(searchvalue, "i").test(data.author)
              )
              .map((card, index) => (
                <Card
                  key={index}
                  author={card.author}
                  title={card.title}
                  description={card.description}
                  image={card.media.m}
                  tags={card.tags}
                />
              ))

            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    imageData: state.imageData,
    error: state.error,
    loading: state.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFlickrImage: (url) => dispatch(getImage(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


