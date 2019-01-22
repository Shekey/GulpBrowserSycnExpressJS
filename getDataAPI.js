var Request = require("request");
module.exports = {
    get: function () {
        const format = 'json';
        const apiKey = '5NmIFUxjbzwH9acl5mNmSad6sUkBuBKJdsK1tblt';
        const query = 'butter';
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