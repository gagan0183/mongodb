var MongoClient = require('mongodb').MongoClient;
    assert = require('assert');


MongoClient.connect('mongodb://localhost:27017/crunchbase', function (err, db) {  
    assert.equal(err, null);

    console.log("successfully connects");
    var query = {"category_code": "biotech"};
    var project = {"category_code": 1};

    db.collection('companies').find(query).project(project).toArray(function (err, docs) {
        assert.equal(err, null);
        
        docs.forEach(function (doc) {  
            //console.log(doc.name + " is a " + doc.category_code + " company.");
            console.log(doc);
        });

        db.close();
    });
});