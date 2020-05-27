var readLine = require('readline-sync');
var removeAccent = require('./removeaccent');
var fs = require('fs');
var contacts = [];
function loadData (){
    var dataContent = fs.readFileSync('./data.json');
    contacts = JSON.parse(dataContent); 
}
function showMenu (){
    console.log('1. Create new contact.');
    console.log('2. Search.');
    console.log('3. Show All Contacts.')
    console.log('4. Exit');
    var option = readLine.question('=>');
    switch (option){
        case '1':
            createNewContact();
            showMenu();
            break;
        case '2':
            search();
            break;
        case '3':
            showAllContacts();
            showMenu();
            break;
        case '4':
            break;
        default:
            console.log('Wrong option');
            break;
    }
}
function showAllContacts (){
    contacts.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    for (var contact of contacts){
        console.log(contacts.indexOf(contact) + 1,'>', contact.name, contact.phone);
    }
}
function createNewContact (){
    var name = readLine.question('Contact name: ');
    var phone = readLine.question('Phone number: ');
    var contact = {
        name: name,
        phone: parseInt(phone)
    }
    contacts.push(contact);
    save();
}
function search (){
    var searchInput = readLine.question('Search: ');
    //var keySearch = searchInput.toString()
    var searchRemoveAccent = removeAccent(searchInput).toLowerCase();
    for (var key in contacts){
        var dataKey = removeAccent(contacts[key].name).toLowerCase();
        if (searchRemoveAccent === dataKey || searchInput === contacts[key].phone.toString()){
            //console.log(searchRemoveAccent);
            console.log(contacts[key].name, contacts[key].phone);
            console.log('1. Edit Contact.');
            console.log('2. Delete Contact.');
            console.log('3. Show Menu');
            var choose = readLine.question('=> ');
            switch (choose){
                case '1':
                    editContact(key);
                    showMenu();
                    break;
                case '2':
                    deleteContact(key);
                    showMenu()
                    break;
                case '3':
                    showMenu();
                    break;
                default:
                    break;
            }
        } 
    }
    console.log('Not found');
    showMenu();
}
function deleteContact (presentid){
    contacts.splice(presentid, 1);
    save();
}
function editContact (presentid){
    console.log('1. Edit name.');
    console.log('2. Edit phone number.');
    console.log('3. Edit both');
    var option = readLine.question('=>');
    switch (option){
        case '1':
            var rename = readLine.question(contacts[presentid].name + ' => ');
            contacts[presentid].name = rename;
            save();
            break;
        case '2':
            var renumber = readLine.question(contacts[presentid].phone + ' => ');
            contacts[presentid].phone = renumber;
            save();
            break;
        case '3':
            var rename = readLine.question(contacts[presentid].name + ' => ');
            contacts[presentid].name = rename;
            var renumber = readLine.question(contacts[presentid].phone + ' => ');
            contacts[presentid].phone = renumber;
            save();
            break;
        default:
            console.log('Wrong option');
            break;
    }
}
function save (){
    fs.writeFileSync('./data.json', JSON.stringify(contacts));
}

function main (){
    loadData();
    showMenu();
}
main();

