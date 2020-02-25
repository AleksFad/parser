import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { parsePost, parseLinks, getPosts } from './parsePost';

parseLinks('https://rus.delfi.ee/', '.headline__title a', 5)
  .then(links => {
    getPosts(links)
      .then(posts => console.log(posts))
      .catch(e => console.log(e));
  })
  .catch(e => console.log(e));
