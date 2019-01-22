var Request = require("request");
module.exports = {
    get: function (query) {
        const format = 'json';
        const apiKey = '5NmIFUxjbzwH9acl5mNmSad6sUkBuBKJdsK1tblt';
        var query = query;
        query = query==undefined?'butter':query;
        const url = `https://api.nal.usda.gov/ndb/search/?format=${format}&q=${query}&max=25&sort=r&api_key=${apiKey}`;
        var data = '';
        return new Promise(function (resolve, reject) {
            Request.get(url, (error, response, body) => {
                if (error) {
                    reject(err);
                }
                var body = JSON.parse(body);
                data = body.list.item;
                resolve(data);
            });
        })
    }
};