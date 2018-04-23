var mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection( {
    host: "localhost",
    port: 3306,

    user: "root",

    password: "root",
    database: "Bamazon"
});

connection.connect(function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Connected');
        start();
    }
});

// function which promt the user for a decision
var start = function() {
    console.log("\n   You have accessed our online store     \n" );
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: "Do you want to see what is in stock?",
            default: true
        }
    ]).then(function(answers) {
        if (answers.confirm) {
            viewItemsInDb();
            getUserInput();
        }
        else {
            console.log("Come again.  Goodbye.");
            connection.end();
        }
    });

};



function viewItemsInDb() { 
   console.log("Selecting all tableItems...\n");
    connection.query("SELECT * FROM myInventoryTbl", function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      //connection.end();
    }); 
 };
 

function getUserInput() {
    inquirer.prompt([
        // Verify the user input
        {
            type: 'input',
            name: 'item',
            message: 'Which item would you like to purchase? Please use the item key.',
            validate: function checkForIntegers(item) {
                const reg = /^\d+$/;
                return reg.test(item) || 'Please enter the number of the item key.';
            }
        },
        {
            type: 'input',
            name: 'itemQuantity',
            message: 'How many would you like to purchase?',
            validate: function checkForIntegers(itemQuantity) {
                const reg = /^\d+$/;
                return reg.test(itemQuantity) || 'Please enter a numerical value.';
            }
        }

    ]).then(function(answers) {
        let sql = 'SELECT ?? FROM ?? WHERE ?? = ?';
        let values = ['*', 'myInventoryTbl', 'itemkey', answers.item];
        keyValue = parseInt(answers.item);
        let itemQty = answers.itemQuantity;
        console.log(keyValue);
        sql = mysql.format(sql, values);
        connection.query(sql, function(err, results) {
            if(err)
                throw err;
            console.log("test", results, itemQty);
            if (itemQty <= results[0].instockcnt) {
                console.log('\nWise choice!\n');
                // The following lines update the database
                let userQuantity = results[0].instockcnt - itemQty;
                let query = connection.query(
                    'UPDATE myInventoryTbl set ? where ?',
                    [
                        {
                            instockcnt: userQuantity
                        },
                        {
                            itemkey: results[0].itemkey
                        }
                    ],
                    function(err, results) {
                        if(err)
                            throw err;
                        console.log(`${results.affectedRows} myInventoryTbl updated`);
                        getUserInput();
                    }
                );
                // report the total to the user
                userTotal = parseFloat((results[0].price * itemQty).toFixed(2));
                console.log('Your total is $' + userTotal + '\n');
            } else {
                console.log('\nWe do not have that many in stock. \nYou will have to reduce your amount.\n');
                getUserInput();
            }
        });
    });
};