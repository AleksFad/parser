import unirest from 'unirest';
//like jquery
import cheerio from 'cheerio';
//extract domain
import psl from 'psl';

async function parsePost(url, elems) {
  await unirest.get(url).then(response => {
    const body = response.body;
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

    console.log(post);
  });
}

module.exports = parsePost;
