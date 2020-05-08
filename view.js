 const express = require('express')
 const app = express()
 const formidable = require('formidable')
 const xlsx = require('xlsx')
 

 //express template engine
//docblock

 app.get('/', function(req, res){
     res.sendFile(__dirname + '/index.html')
 })
 
 app.post('/', function(req, res){

    var form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
        let records =  searchJSON(readExcel(files.excel.path), 'NOME', fields.name)
        res.send('<pre>' + JSON.stringify(records, undefined, 4))

    })
}) 
/*
    form.on('fileBegin', function(name, file){
        file.path = __dirname + "/" + file.name
    })
    form.on('file', function(name,file){
        console.log('Uploaded file  ' + file.name)
        var name = file.name
        excelToJson(name)
    })

    res.sendFile(__dirname + '/index.html')


    var excelToJson = function (name){
    var excel = xlsx.readFile(__dirname + '/' + name)
    var nameSheet = excel.SheetNames
    var res = (xlsx.utils.sheet_to_json(excel.Sheets[nameSheet[0]]))
    var data = JSON.parse(JSON.stringify(res, function(a, b) {
        return typeof b === "string" ? b.toUpperCase() : b
      }))
    var result = data.filter(data =>{
        return new RegExp('LUIZ', 'i').test(data.NOME)
    })
    console.log(result)
    }

*/

/**
 * Trasnforma o arquivo excel em um array de objetos (JSON)
 * 
 * @param path caminho do arquivo
 * @return object[]
 */    
var readExcel = function(path){
    var excel = xlsx.readFile(path)
    return xlsx.utils.sheet_to_json(excel.Sheets[excel.SheetNames])
}

/**
 * Filtra o JSON em busca de objetos com a propriedade e o valor informados
 * 
 * @param records lista de registros
 * @param key propriedade do objeto
 * @param value valor do campo
 * @return object[]
 */    
var searchJSON = function(records, key, value) {
    var filterReturn = []
    for (var i = 0; i < records.length; i++) {
        if (records[i][key] == undefined) {
            continue
        }

        if (records[i][key].toUpperCase().match(value.toUpperCase())) {
            filterReturn.push(records[i])
        }
        
    }
    return filterReturn
}
    

 app.listen(8081, function(){
     console.log('Servidor rodando localhost:8081')
 })
 