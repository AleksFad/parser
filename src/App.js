import React, { Component } from 'react';
import './App.css';
import Post from './components/Post';
import axios from 'axios';
import { connect } from 'react-redux';
import { Container, Header, Item, Button, Segment } from 'semantic-ui-react';

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

  componentWillMount() {
    this.fetchPosts();
  }

  render() {
    const { posts } = this.props;
    const { items } = posts;
    console.log(this.props);
    return (
      <Container>
        <Header as='h2'>Source: {this.props.producer.source}</Header>
        <div>
          <Button onClick={this.fetchPosts.bind(this)} size='massive'>
            Get News
          </Button>
          <Button.Group>
            <Button onClick={() => this.props.changeSource('Delfi')}>
              Delfi
            </Button>
            <Button onClick={() => this.props.changeSource('Postimees')}>
              Postimees
            </Button>
            <Button onClick={() => this.props.changeSource('ERR')}>ERR</Button>
          </Button.Group>
        </div>
        <Item.Group>
          {!items.length ? (
            <Segment loading>
              <br />
              <br />
              <br />
            </Segment>
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
        </Item.Group>
      </Container>
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
