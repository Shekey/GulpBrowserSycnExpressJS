var Request = require("request");
var factory = require('./factory');
var factory = new factory();
users = factory.create("food");

module.exports = {
    db: users,
    get: function (query,perPage,currentPage) {
        const format = 'json';
        const apiKey = '5NmIFUxjbzwH9acl5mNmSad6sUkBuBKJdsK1tblt';
        var query = query;
        console.log(query + 'q'+query);
        query = query === undefined || query.length===0 ? 'butter':  query;
        var perPage = 25;
        var startItem = currentPage*25+1;
        var url = `https://api.nal.usda.gov/ndb/search/?format=${format}&q=${query}&max=${perPage}&offset=${startItem}&ds=Standard%20Reference&sort=r&api_key=${apiKey}`;
        users.createTableFood();
        return new Promise(function (resolve, reject) {
            query = query;
            console.log(query);
            query = query === undefined || query.length===0 ? 'butter':  query;
            console.log("get Data API");
            var data = '';
            users.name = query;
            users.getByName(users,startItem).then(function (result) {
                if(result.length>0){
                    result.fromDb = true;
                    result.total = result[0].total;
                    result.offset = currentPage*25-(25-result.length);
                    resolve (result);
                }
                else {
                    console.log(url);
                    Request.get(url, (error, response, body) => {
                        if (error) {
                            reject(error);
                        }
                        var body = JSON.parse(body);
                        data = body.list.item;
                        data.fromDb = false;
                        data.total = body.list.item.total;
                        result.offset = currentPage*25;
                        data.forEach(element => {
                            users.add(element.name,element.manu,query,data.total);
                        });
                        resolve(data);
                    });
                }
            });

        })
    }
};