 const express = require('express')
 const app = express()
 const formidable = require('formidable')
 const fs = require('fs')
 

 app.get('/', function(req, res){
     res.sendFile(__dirname + '/index.html')
 })
 app.post('/', function(req, res){
    var form = new formidable.IncomingForm()
    form.parse(req)
    form.on('fileBegin', function(name, file){
        file.path = __dirname + "/" + file.name
    })
    form.on('file', function(name,file){
        console.log('Uploaded file  ' + file.name)
        var name = file.name
        excelToJson(name)
    })

    res.sendFile(__dirname + '/index.html')
})
const xlsx = require('xlsx')

var excelToJson = function (name){
    var excel = xlsx.readFile(__dirname + '/' + name)
    var nameSheet = excel.SheetNames
    var res = (xlsx.utils.sheet_to_json(excel.Sheets[nameSheet[0]]))
    var data = JSON.parse(JSON.stringify(res, function(a, b) {
        return typeof b === "string" ? b.toUpperCase() : b
      }))
    console.log(data)
    }
    



 app.listen(8081, function(){
     console.log('Servidor rodando localhost:8081')
 })
 