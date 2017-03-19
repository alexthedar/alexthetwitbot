var twit = require('twit')
var config = require('./config.js')
var Twitter = new twit(config)

//RETWEET
var retweet = function(){
  var params = {
    q: "#happy, #joy, #smile",
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data){
    if(!err){
      var retweetId = data.statuses[0].id_str;
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function(err, response){
        if(response){
          console.log("retweeted")
        }
        if(err){
          console.log('something went wrong while trying to retweet')
        }
      })
    }
    else {
      console.log('something went wrong while searching')
    }
  })
}

retweet()

setInterval(retweet, 300000)


//Favorite

var favoriteTweet = function(){
  var params = {
    q: '#happy, #joy, #smile',
    result_type: 'recent',
    lang:'en'
  }

  Twitter.get('search/tweets', params, function(err, data){
    var tweet = data.stauses
    var randomTweet = ranDom(tweet)

    if(typeof randomTweet != 'undefined'){
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        if(err){
          console.log('cannot be favorite')
        } else {
          console.log('favorited')
        }
      })
    }
  })
}

favoriteTweet()

setInterval(favoriteTweet, 3600000)

function ranDom (arr){
  var index = Math.floor(Math.random()*arr.length)
  return arr[index]
}
