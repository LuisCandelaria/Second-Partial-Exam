const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );

const app = express();
const {Sport} = require('./models/sport-model');


/* Your code goes here */

app.delete( '/sports/delete', jsonParser, (req, res) => {
    console.log("Deleting a Sport.");
    console.log(req.params);

    let id = req.body.id;
    let idP = req.params.id;

    if( !id ) {
        res.statusMessage = "The 'id' must be sent in the body.";
        return res.status( 406 ).end();
    }

    /*if( id != idP ) {
        res.statusMessage = "The 'id' in the body must be same as in the parameter.";
        return res.status( 409 ).end();
    }*/

    Sport
        .delete(id)
            .then( result => {
                if( !result ) {
                    res.statusMessage = "The sport doesn't exist in the database.";
                    return res.status( 404 ).end();
                }
                else {
                    return res.status( 204 ).end();
                }
            })
            .catch( err => {
                res.statusMessage = "Something went wrong with the Database.";
                return res.status( 500 ).end();
            })
});


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});