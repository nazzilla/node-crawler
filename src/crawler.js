
const CHEERIO = require('cheerio');
const AXIOS = require('axios');

var _log = require('./log');
var Utils = require('./utilities');



const CRAWLER_OPTS = require('../crawler.options.json');
const schema = CRAWLER_OPTS.selectors



function getJsonLdData(str) {

  var obj = false,
    script = str.match(/<script type=\"application\/ld\+json\">([^<]+)<\/script>/g);

  if (script) {
    script = script[0].replace('<script type="application/ld+json">', '')
      .replace('</script>', "");//.replace(/\s+/g, " ");
    obj = JSON.parse(script)
  }

  return obj;

}


function AttrToJson($elems) {
  var out = []
  $elems.each(
    function (index, elm) {

      out.push({
        name: elm.children[0].data,
        url: elm.attribs['href']
      })
    }
  )

  return out
}




function parseHtml(key, $elm) {
  switch (key) {
    case "content":
      return $elm.children().toString().trim()
      break;

    case "video":
    case "thumb":
      return $elm[0].attribs.src ? $elm[0].attribs.src : $elm[1].attribs.src
      break;
    case "date_publish":
      $elm = $elm.first();
      return $elm.attr('datetime') ? $elm.attr('datetime') : $elm.text()
      break;
    case "tags":
    case "authors":
    case "categories":
      return AttrToJson($elm.first())
      break;
    default:
      return $elm.text().toString().trim()
  }
}




function parseResponse(body) {

  let output = new Object();
  const $HTML = CHEERIO.load(body, { normalizeWhitespace: true });

  for (var key in schema) {
    const $current = $HTML(schema[key])

    console.log(`${$current.length !== 0 ? '✅' : '🚫'} `, key, '\t\t', schema[key]);
    output[key] = $current.length && parseHtml(key, $current);
  }


  const slug = current_url.slice(0, -1).split('/').pop();
  output.url = current_url
  output.slug = slug

  //console.log('\n',output.uid)
  return output
}


let current_url




module.exports = async (url) => {
  // fetch data from a url endpoint
  current_url = url;
  const response = await AXIOS.get(url)
    .then(
      (response) => parseResponse(response.data)

    ).catch(function (error) {
      // handle error
      _log.error(error);
    })

  console.log('oooooo');

  return response;
}

