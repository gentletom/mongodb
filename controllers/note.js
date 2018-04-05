
var makeDate = require('../scripts/date.js');

var Headline = require('../models/Headline');
var Note = require('../models/Note');


exports.save = function(data, cb) {

  var formattedDate = makeDate();


  var newNote = new Note ({
    _headlineId:data.id,
    date:data.date,
    noteText:data.note
  });

  // save the newNote we made to mongoDB with mongoose's save function
  newNote.save(function(err, doc){

    if (err) {
      console.log(err);
    } 
    // or just log the doc we saved
    else{
      console.log(doc);
      // place the log back in this callback function

      cb(doc);
    }
  });
};

// gather notes for a news article.
// export this function as gather
exports.gather = function(data, cb) {
  // find all notes with the headline id from the article we passed
  Note.find({
    _headlineId: data.id
  })
  // and sort
  .sort({
    id: -1
  })

  .exec(function(err, doc) {
    // pass the data to our callback 
    cb(doc);
  });
};

// delete all notes from an article
// Export this function as delete
exports.delete = function(data, cb) {
  // remove a Note using mongoose and our note

  Note.remove({
    _headlineId:data.id
  }, function(err, removed){
    if(err){
      console.log(err);
    } 

    else {
      console.log("Delete Sucessful");
      cb(removed);
    }
  });
};