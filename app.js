var MongoClient = require('mongodb').MongoClient;
    commandLineArgs = require('command-line-args');
    assert = require('assert');

var options = commandLineOptions();

MongoClient.connect('mongodb://localhost:27017/crunchbase', function (err, db) {  
    assert.equal(err, null);

    console.log("successfully connects");
    var query = querydocument(options);
    var project = {"name": 1, "founded_year": 1};

    db.collection('companies').find(query).project(project).toArray(function (err, docs) {
        assert.equal(err, null);
        
        docs.forEach(function (doc) {  
            //console.log(doc.name + " is a " + doc.category_code + " company.");
            console.log(doc);
        });

        db.close();
    });
});

function commandLineOptions() {
    var arg = commandLineArgs([
        {name: "firstYear", alias: "f", type: Number},
        {name: "lastYear", alias: "l", type: Number},
        {name: "employees", alias: "e", type: Number}
    ]);

    console.log(arg);

    var options = JSON.parse(JSON.stringify(arg));
    if(!(("firstYear" in options) && ("lastYear" in options))) {
        console.log(arg.getUsage({
            title: "Usage",
            description: "The first two options below are required and the rest are optional"
        }));
        process.exit();
    }
    return options;
}

function querydocument(options) {
    var query = {
        "founded_year": {
            "$gte": options.firstYear,
            "$lte": options.lastYear
        }
    }
    if ("employees" in options) {
        query.number_of_employees = options.employees;
    }
    return query;
}
