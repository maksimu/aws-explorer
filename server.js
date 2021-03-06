var express = require('express');
var AWS = require('aws-sdk');
var async = require('async');
var argv = require('optimist')
    .usage('Usage: $0 -a [num] -s [num] -r [str] -p [num] -sp [num]')
    .demand(['a', 's'])
    .default('r', 'us-east-1')
    .default('sp', 8888)
    .default('p', 9999)
    .describe('a', 'AWS Access Key (Required)')
    .describe('s', 'AWS Secret Access Key (Required)')
    .describe('r', 'AWS Region. Default. (Not Required, default "us-east-1"')
    .describe('p', 'Port of the REST server. (Not Required, default "9999"')
    .describe('sp', 'Port of the Static files server. (Not Required, default "8888"')
    .argv;

var app = express();

console.log("Access Key: ***** [" + argv.a.length + " letters]\nSecret Access Key: ***** [" + argv.s.length + " letters]\nRegion:[" + argv.r + "]\nWeb Service Port:[" + argv.p + "]\nStatic Server Port:[" + argv.sp + "]\n\n\n")

AWS.config.update({accessKeyId: argv.a, secretAccessKey: argv.s});
AWS.config.update({region: argv.r});

var elasticbeanstalk = new AWS.ElasticBeanstalk();
var ec2 = new AWS.EC2();

/**
 * Enable CORS
 */
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.get('/', function (req, res) {
    res.type('application/json');

    var allEnvironments;
    var environmentsData = []; // initialise an empty array

    /**
     * Execute functions in sequence. Need this to avoid async responses.
     */
    async.series([

        /**
         * 1st Function
         * @param callback
         */
            function (callback) {
            elasticbeanstalk.describeEnvironments(function (err, envsData) {

                console.log("11111 Start")
                if (err) {
                    console.log(err, err.stack);
                }
                else {
                    console.log("Assigning")
                    allEnvironments = envsData.Environments;
                }
                console.log(allEnvironments)
                console.log("11111 End");
                callback(null, "one");

            });
        },


        /**
         * 2nd Function
         * @param callback
         */
            function (callback) {
            console.log("22222 Start [" + allEnvironments.size + "]")


            /**
             * Asyncronously loop through the array
             */
            async.each(allEnvironments, function (environment, callback) {
                var params = {
                    EnvironmentId: environment.EnvironmentId
                };

                elasticbeanstalk.describeEnvironmentResources(params, function (err, resourceData) {

                    console.log("---- describing Environment [" + environment.EnvironmentId + "]");
                    if (err) {
                        console.log(err, err.stack); // an error occurred
                        callback(err);
                    } else {
//                        console.log(resourceData);

                        var envData = {
                            environment: environment,
                            resources: resourceData
                        }
                        environmentsData.push(envData);
                        console.log("added")
                        callback();
                    }

                });
            }, function (err) {
                // if any of the file processing produced an error, err would equal that error
                if (err) {
                    console.log('Problem');
                    callback(err);
                } else {
                    console.log('All is well');
                    callback();
                }
            });
            console.log("22222 End")

        }
    ], function (err) { //This is the final callback

        if (err) {
            console.error(err);
            res.send(err);
        } else {
            console.log('Both a and b are saved now');
            console.log("----> " + environmentsData);

            res.send(environmentsData);
        }
    });
});


/**
 * Return EC2 Instance information
 */
app.get('/instance/:instanceId', function (req, res) {

    var instanceId = req.params.instanceId;

    var params = {
        InstanceIds: [instanceId]
    };

    ec2.describeInstances(params, function (err, instanceRawData) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            res.send(instanceRawData);
        }
    });

});


app.listen(process.env.PORT || argv.p);




/**
 * -----------------------
 * Start Static Web Server
 * -----------------------
 */
var connect = require('connect');
console.log("Starting ...");
connect.createServer(connect.static(__dirname)).listen(argv.sp);
console.log("Started static web site on port: " + argv.sp);
