var mongoose = require("mongoose");
const Table = require("./models/table").model;
const fs = require("fs");
const { table } = require("console");

let tableData = fs.readFileSync(__dirname + "/allTables.json");
tableData = JSON.parse(tableData).T=tables;

let allTables = [];
table.Data.forEach(table => {
    allTables.push(new Table(table));
});

module.exports = allTables;