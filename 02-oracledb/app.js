/**
 * Created by a0801 on 2017/8/2.
 */
const oracledb = require('oracledb');

const oracleConfig = require('../00-config/oracle-config')

// Get a non-pooled connection
oracledb.getConnection({
        user          : oracleConfig.eflow.user,
        password      : oracleConfig.eflow.password,
        connectString : oracleConfig.eflow.connectString
    },
    function (err, connection) {
        if (err) {
            console.error(err.message);
            return;
        }
        connection.execute(
            // The statement to execute
            "select * from mem_geninf where loginid=:id",

            // The "bind value" 180 for the "bind variable" :id
            ["a0801"],

            // Optional execute options argument, such as the query result format
            // or whether to get extra metadata
            // { outFormat: oracledb.OBJECT, extendedMetaData: true },

            // The callback function handles the SQL execution results
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
                console.log(result.rows);     // [ [ 180, 'Construction' ] ]
                doRelease(connection);
            });
    });


// Note: connections should always be released when not needed
function doRelease(connection) {
    connection.close(
        function (err) {
            if (err) {
                console.error(err.message);
            }
        });
}