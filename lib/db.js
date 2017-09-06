var fs = require('fs');

var DataBase = function () {

    this.getTable = function (table, callback) {

        var returnTable = [];

        fs.readdir('./DataBaseFilesMock/' + table, function (err, files) {
            if (err) {
                return callback('Error while trying to load table: ' + table + ' [Database]');
            }
            files.forEach(function (file) {
                try {
                    var record = require(path(table, file));

                    if (record.isActive) {
                        returnTable.push(record);
                    }
                } catch (err) {
                    return callback('Error while trying to load table: ' + table + ' [Database]');
                }

            });

            return callback(null, returnTable);
        })

    };

    this.getRecord = function (table, recordId, callback) {
        try {
            var record = require(path(table, recordId));
        } catch (err) {
            return callback('Error while trying to load file:' + recordId + ' table: ' + table + ' [Database]');
        }
        if (!record.isActive) {
            return callback('Record not found');
        }
        callback(null, record);

    };

    this.save = function (data, table, callback) {
        var a = path(table, data.id);
        fs.writeFile(path(table, data.id), JSON.stringify(data), function (err) {
            if (err) {
                return callback('Error while trying to save file [table: ' + table + 'file: ' + data.id + '] Error: ' + err);
            }
            callback(null, 'Record saved');
        });
    };

    var path = function (table, fileName) {
        return __dirname + '/DataBaseFilesMock/' + table + '/' + fileName + '.json'
    };
};

exports = module.exports = new DataBase();