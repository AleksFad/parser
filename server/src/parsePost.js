import unirest from 'unirest';
//like jquery
import cheerio from 'cheerio';
//extract domain
import psl from 'psl';
import { elems } from './config';

const delay = ms => new Promise(r => setTimeout(r, ms));

function parsePost(url, elems) {
  return new Promise((resolve, reject) => {
    unirest.get(url).end(({ body, error }) => {
      const $ = cheerio.load(body);

      const title = $(elems.title)
        .text()
        .trim();

      let image = $(elems.image).attr('src');
      image = image.indexOf('http') >= 0 ? image : psl.get(url) + image;
      const description = $(elems.text)
        .text()
        .trim();

      const post = {
        title: title,
        image: image,
        text: description
      };
      if (error) reject(error);

      resolve(post);
    });
  });
}

async function parseLinks(url, className, max = 5) {
  return await new Promise((resolve, reject) => {
    let links = [];
    unirest.get(url).end(({ body, error }) => {
      if (error) reject(error);

      const $ = cheerio.load(body);

      $(className).each((_, e) => {
        if (_ + 1 <= max) links.push($(e).attr('href'));
      });
      console.log(links);
    });
    delay(2000);
    resolve(links);
    if (!links.length) reject({ error: 'empty' });
  });
}

async function getPosts(links) {
  let posts = [];
  for (let i = 0; i < links.length; i++) {
    const post = await parsePost(links[i], elems.delfi).then(post => post);
    posts.push(post);
    await delay(1000);
  }
  return new Promise(async (resolve, reject) => {
    resolve(posts);
    if (!posts.length) reject({ error: 'No news' });
  });
}

export { parsePost, parseLinks, getPosts };
