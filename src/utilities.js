
exports.isSitemapXml = function(str) {
  var pattern = new RegExp('^(https?:\/\/).*(\.xml)$')
  return !!pattern.test(str);
}

exports.getFilename =  function( str ) {
  return str.replace(/^.*[\\\/]/, '');
}

exports.getDomain =  function(url, subdomain) {
  subdomain = subdomain || false;

  url = url.replace(/(https?:\/\/)?(www.)?/i, '');



  if (url.indexOf('/') !== -1) {
      return url.split('/')[0];
  }

  return url;
}


exports.getRandomArbitrary = function (num) {
  return Math.floor(Math.random() * num);
}
  


exports.isNotFalse = function ( value ){
  return value != '' && value != false && value > 0 && typeof value !== 'undefined'
}



exports.getDayNow = function(){

  var date = this.getPrettyDate();

  return date.date + '-' + date.time
  
}


exports.getPrettyDate  = function(){
  var roundDay = function( num ){
    return num <= 9 ? `0${num}` : num;
  }
  var daynow = new Date( Date.now() );
  return {
    date: roundDay( daynow.getDate() ) +'/'+ roundDay( daynow.getMonth()+1 ) + '/' + daynow.getFullYear(),
    time: roundDay(daynow.getHours()) +':'+ roundDay(daynow.getMinutes()) +':'+ roundDay(daynow.getSeconds())
  };
}