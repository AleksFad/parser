import React, { Component } from 'react';
import './App.css';
import Post from './components/Post';
import axios from 'axios';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  fetchPosts() {
    const { setPosts } = this.props;
    setPosts([]);
    axios
      .get('http://5e51a8d7d90e6c0014990d82.mockapi.io/posts')
      .then(({ data }) => {
        setPosts(data);
      });
  }

  render() {
    const { posts } = this.props;
    const { items } = posts;
    console.log(this.props);
    return (
      <div className='App'>
        <div>
          <button onClick={this.fetchPosts.bind(this)}>Get posts</button>

          <h3>Regions: {this.props.producer.source}</h3>
          <ul>
            <li>
              <button onClick={() => this.props.changeSource('Delfi')}>
                Delfi
              </button>
            </li>
            <li>
              <button onClick={() => this.props.changeSource('Postimees')}>
                Postimees
              </button>
            </li>
            <li>
              <button onClick={() => this.props.changeSource('ERR')}>
                ERR
              </button>
            </li>
          </ul>
        </div>

        {!items.length ? (
          <span>Loading...</span>
        ) : (
          items.map((post, key) => {
            return (
              <Post
                key={key}
                title={post.title}
                description={post.description}
                image={post.image}
              />
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = props => {
  console.log(props);
  return {
    ...props
  };
};

const actions = dispatch => ({
  setPosts: data =>
    dispatch({
      type: 'SET_POSTS',
      payload: data
    }),
  changeSource: name =>
    dispatch({
      type: 'CHANGE_SOURCE',
      payload: name
    })
});

export default connect(
  mapStateToProps,
  actions
)(App);
