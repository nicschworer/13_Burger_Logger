const { query } = require("./connection");
const connection = require("./connection");


function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  };
  
function objToSql(ob) {
    var arr = [];
  
    for (var key in ob) {
      arr.push(key + "=" + ob[key]);
    }
  
    return arr;
  };



var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        console.log(queryString);
        connection.query(queryString, function(err, results) {
            if (err) {throw err};
            cb(results);
        })
    },

    insertOne: function(table, cols, vals, cb) {
      console.log(vals);
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        console.log(queryString);

        connection.query(queryString, vals, function (err, results) {
            if (err) {throw err};
            cb(results);
        })

    },

    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        console.log(queryString);
        
        connection.query(queryString, function(err, results) {
            if (err) {throw err};
            cb(results);
        });

    }
};

module.exports = orm;