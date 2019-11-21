const AXIOS = require('axios');
const SHA = require('js-sha256');
//const readline = require('readline');

const _log = require('./src/log');
const Utils = require('./src/utilities');
const FILE = require('./src/savefile');
const Sitemap = require('./src/sitemap');
const Crawler = require('./src/crawler');


const CRAWLER_OPTS = require('./crawler.options.json');

let xmlbody;
let count = 0;
let total = 0;



function handleCrawling() {
	
	console.clear();
	console.log();
	console.log();
	
	if (count < total) {

		_log.count(count + 1,total);
		
		Crawler(xmlbody[count] )
		.then( ( response) => { 

			console.log(response.title)
	
			FILE.cache(response);
			count++;
			setTimeout( handleCrawling, 1000 )
		})
	

	} else {
		FILE.saveJson()
		console.log();
		console.log();
		console.log('Fine');
		process.exit()
	}
	//setTimeout( function(){ parseUrl( url ) }, 1000 )

}



function init( opts ) {
	console.clear();




	_log.space();
	_log.alert(`🕷  NODE Crawler`);
	
	Sitemap( opts.sitemap )
	.then( ( response) => { 

		FILE.newProject(opts.sitemap)
		xmlbody = response;
		count = 0;
		total = xmlbody.length;
		handleCrawling()
		console.log('a' ,response)} )

}

/*
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})*/





init( CRAWLER_OPTS );

/*

readline.question(`Url della sitemap? `, (name) => {

	if( name && Utils.isSitemapXml(name) ){
	
		_log.ok(`Sitemap sembra valida ${name}`);

		init(name)

	}else{

		_log.error('Inserisci una Sitemap valida :(')
		readline.close();
	}

	
})

*/



