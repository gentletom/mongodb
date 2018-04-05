var request = require('request');
var cheerio = require('cheerio');

var scrape = function(url, cb) {

  // if our url is the times home page (and it will be)...
  if (url == "http://www.nytimes.com") {

    request(url, function(err, res, body) {

      // load the body into cheerio's shorthand
      var $ = cheerio.load(body);

      var articles = {};

      $('.theme-summary').each(function(i, element){

        var head = $(this).children(".story-heading").text();

        var sum = $(this).children(".summary").text();

        // So long as our headline and sum aren't empty strings, do the following
        if (head !== "" && sum !== ""){

          // This section uses regular expressions and the trim function
          var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
          var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

          articles[i] = [headNeat]; 
          articles[i].push(sumNeat);
        }
      });

      // every article scraped into the articles object (good for testing)
      console.log(articles); 

      cb(articles);
    });
  }
};

// export the function, so the rest of the files in the backend can use it
module.exports = scrape;