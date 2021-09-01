const axios = require('axios')
const fs = require('fs');


axios
	.get('https://medium.com/search?q=pricing')
	.then((response) => {
        const data = response.data.substring(16)//to delete the first 16 characters
        var dataparse = JSON.parse(data) //transition to JSON array

        var dataposts = dataparse.payload.value.posts
        //var datausers = dataparse.payload.value.users //It's not the good users here
        //console.log(dataparse.payload.references.User)//But here, yes
        var datausers = dataparse.payload.references.User

        var jsondefault = {
            articles: []
        }//creation of the articles table which will contain future articles

        fs.writeFile('articles.json', JSON.stringify(jsondefault), (err) =>{
            if (err) throw err
        })//creation of the JSON file for the articles
        for (var i = 0; i < dataposts.length; i++){//We will go through all the items that Axios has collected
            var obj = dataposts[i]; //on article 'i'....
            var megaid = obj.id//we get the id and we store it
            var creatorid = obj.creatorId//we retrieve the author's id (this will be used for the following)
            var description = 'Title :' + obj.title + ' Description : ' + obj.virtuals.subtitle//for the description I have included the title + description, it can be easily modified
            var date = new Date(obj.createdAt)//we get the date of the article
            //the above variables are there to "" organize me ""

            for (var user in datausers){//we browse all the users
                if (datausers[user].userId == creatorid){//and if an id in the current path is equal to the previously defined creatorid
                    var creatorName = datausers[user].name//then we create a new variable which will contain the name of the author
                }
            }

            var jsontot = {
                "id": megaid,
                "description": description,
                "date": date,
                "author": creatorName
            } //we put it in JSON form
            jsondefault.articles.push(jsontot)//we add them
            
        }
        fs.readFile('articles.json', 'utf8', function readFileCallback(err,data){
            if (err) {
                throw err
            }else{
                json = JSON.stringify(jsondefault, null, 4);
                fs.writeFile('articles.json', json, 'utf8', (err) =>{if (err) throw err})
            }
        })//then, checking that the previous additions, we add the articles one by one
        console.log("JSON data saved")
            
        
	})
	.catch((error) => {
		console.error(error)
	});