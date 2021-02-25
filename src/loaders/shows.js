const ShowModel = require('../models/show');
const { getAllShows } = require('../External Api/ShowsApi');

module.exports = async () => {
    const numOfShowInDB = await ShowModel.countDocuments({});
    const shouldUpdate = numOfShowInDB === 0;
    
    if(shouldUpdate){
        const shows = await getAllShows();
        
        if(!shows || shows.length === 0){
            console.warn('No shows in DB , but failed to retrieve any shows from external API');
            return;
        }

        let showsDocs = shows.map((show) => {
            return new ShowModel ({
                name : show.name,
                showID : show.id,
                imageURL : show.image.medium, 
                premiered : new Date(show.premiered),
                genres : show.genres
            })
        })

        console.log(`Inserting ${showsDocs.length} shows into DB...`);
        ShowModel.insertMany(showsDocs);
    }
}
