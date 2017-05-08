var know_photos_num = 0;
var know_photos_list = new Array();
var know_photos_name_list = new Array();
var unknow_photos_num = 0;
var unknow_photos_list = new Array();
var unknow_photos_name_list = new Array();

// Script for Year
var ENG_YEAR = 1;


function doGet() {
  main();
  return HtmlService.createTemplateFromFile('php').evaluate();
}

function queryData(folderID){
  var query = 'trashed = false and ' +
        "'"+folderID+"' in parents";
  return Drive.Files.list({q: query,maxResults: 999});
}

function countFilesInFolder(knowFID, unknowFID) {
  var FileInFolder = queryData(knowFID);
  know_photos_num = FileInFolder.items.length; 
  for(var i=0;i<FileInFolder.items.length;i++){
    know_photos_list.push(FileInFolder.items[i].thumbnailLink);
    know_photos_name_list.push(FileInFolder.items[i].title);
  }
  var FileInFolder = queryData(unknowFID);
  unknow_photos_num = FileInFolder.items.length; 
  for(var i=0;i<FileInFolder.items.length;i++){
    unknow_photos_list.push(FileInFolder.items[i].thumbnailLink);
    unknow_photos_name_list.push(FileInFolder.items[i].title);
    // Generate Table Header
    setHeader_table(i,FileInFolder.items[i].title);
    
  }
}

function getItem(cond){
  switch(cond){
    case "kpn": return know_photos_num;
    case "kpl": return know_photos_list;
    case "upn": return unknow_photos_num;
    case "upl": return unknow_photos_list;
    default: return -1;
  }
}

function packArray(){
var log = new Array(new Array(know_photos_num,know_photos_list,know_photos_name_list),new Array(unknow_photos_num,unknow_photos_list,unknow_photos_name_list));
Logger.log(log);
  return log;
}

function main(){
  countFilesInFolder("....know_photo_folder_id......", ".....unknow_photo_folder_id....");
  return packArray();
  
}
