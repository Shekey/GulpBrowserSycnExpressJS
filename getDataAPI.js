var Request = require("request");
var factory = require('./factory');
var factory = new factory();
users = factory.create("food");

module.exports = {
    db: users,
    get: function (query) {
        const format = 'json';
        const apiKey = '5NmIFUxjbzwH9acl5mNmSad6sUkBuBKJdsK1tblt';
        var query = query;
        query = query == undefined ? 'butter' : query;
        const url = `https://api.nal.usda.gov/ndb/search/?format=${format}&q=${query}&sort=r&api_key=${apiKey}`;
        users.createTableFood();
        return new Promise(function (resolve, reject) {
            var data = '';
            users.name = query;
            console.log(query);
            users.getByName(users).then(function (result) {
                if(result.length>0){
                    result.fromDb = true;
                    resolve (result);
                }
                else {
                    Request.get(url, (error, response, body) => {
                        if (error) {
                            reject(error);
                        }
                        var body = JSON.parse(body);
                        data = body.list.item;
                        data.fromDb = false;
                        data.forEach(element => {
                            users.add(element.name,element.manu,query);
                        });
                        resolve(data);
                    });
                }
            });

        })
    }
};