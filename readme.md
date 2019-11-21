# node-crawler

A jurassic web-scraper written in javascript. 
Inspired by [this tutorial](https://buttercms.com/blog/web-scraping-with-nodejs-and-cheerio) this crawler is devloped for work easy with wordpress website. 


### Install

``` shell
git clone https://github.com/nazzilla/node-crawler.git
cd node-crawler
npm install
```


### Setup

Open and Edit crawler.options.json
*sitemap* url to xml file
*selectors*  css selector for cheerio 


``` json
{

    "sitemap" : "https://your-website.com/sitemap.xml",
    "selectors" : {
        "title": "HtmlElement",
        "summary": "HtmlElement",
        "content": "HtmlElement",
        "thumb": "HtmlElement",
        "date_publish": "Y-m-d h:m",
        "authors": "HtmlCollection",
        "categories": "HtmlCollection"
    }

}

```


### EXAMPLE

``` json
{

    "sitemap" : "https://www.movie.tv/sitemap.xml",
    "selectors" : {
        "title":        "title",
        "summary":      ".single .post__summary",
        "content":      ".single .post__content",
        "thumb":        "figure.post__image img",
        "date_publish": ".post__datetime",
        "authors":      ".post__authors a",
        "categories" : ".post__categoriess a"
    }
}


```


### Run

``` shell
npm start
```




#### Developed with
[Cheerio](https://github.com/cheeriojs/cheerio)
[Axios](https://github.com/axios/axios)