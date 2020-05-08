const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */

const sportsSchema = mongoose.Schema({
    id : {
        type : String,
        require : true,
        unique : true
    },
    name : {
        type : String,
        require : true
    },
    num_players : {
        type : Number,
        require : true
    }
});

const collection = mongoose.model( 'sports', sportsSchema);

const Sport = {
    delete : function (sportId) {
        let filter = { id : sportId };
        return collection
            .deleteOne( filter )
                .then( result => {
                    if( result.n == 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                })
                .catch( err => {
                    return err;
                })
    }
}

module.exports = {
    Sport
};