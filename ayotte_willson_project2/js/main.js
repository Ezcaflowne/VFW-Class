// Name: Willson Ayotte
// Date: Aug 3rd 2012
// Document: Project 2 VFW 1208 
// Description: Data base for saved data, get data, and clear data.

window.addEventListener("DOMContentLoaded", function(){

    //getElementById Function
    function $ (x) {
        var theElement = document.getElementById(x);
        return theElement;
    }
    
    //Crate slect field element and populate it with options
    function getType () {
        var formTag = document.getElementsByTagName('form'), //This is an Array because we used get tag name
            selectLi = $('select'),
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "aptType");
            for (var i=0, j=aptStatus.length; i<j; i++) {
                var makeOption = document.createElement('option');
                var optText = aptStatus[i];
                makeOption.setAttribute('value', optText);
                makeOption.innerHTML = optText;
                makeSelect.appendChild(makeOption);
            };
            selectLi.appendChild(makeSelect);
    }

    //Find of selected checkbox
    function getCheckboxPower () {
        if($('isPower').checked){
            isPowerValue = $('isPower').value;
        } else {
            isPowerValue = "No";
        }
    }

    function getCheckboxWhite () {
        if($('isWhiteLock').checked){
            isWhitelockValue = $('isWhiteLock').value;
        } else {
            isWhitelockValue = "No";
        }
    }

    function toggleControls(n) {
        switch(n) {
            case "on":
                $('apartmentForm').style.display = "none";
                $('clearLink').style.display = "inline";
                $('displayLink').style.display = "none";
                $('addNew').style.display = "inline";
                $('submit').style.display = "none";
                break;
            case "off":
                $('apartmentForm').style.display = "block";
                $('clearLink').style.display = "inline";
                $('displayLink').style.display = "inline";
                $('addNew').style.display = "none";
                $('items').style.display = "none";
                break;
            default:
                return false;
        }
    }

    // Store Data Function
    function storeData(){
        var id                 = Math.floor(Math.random()*10000001);
        // Gather up all our form field values and stred in an object
        // Object properties contain an array with the form label and input vales.
        getCheckboxPower();
        getCheckboxWhite();
        var item              = {};
            item.aptType      = ["Apartment Type:", $("aptType").value];
            item.aptNum      = ["Apartment Number:", $("aptNum").value];
            item.aptSize      = ["Apartment Size:", $("aptSize").value];
            item.vacDate      = ["Vacate:", $("vacDate").value];
            item.rdyDate     = ["Ready:", $("rdyDate").value];
            item.isPower     = ["Power?", isPowerValue];
            item.isWhiteLock = ["Whitelock?", isWhitelockValue];
            item.condition      = ["Condition:", $("condition").value];
            item.comments      = ["Additional Comments:", $("comments").value];
        // Save data into localStorage: Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Content Saved!");
    }

    // Show datat that saved.
    // Write data from local storage to broswer.
    function getData () {
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There are no Apartments saved in Local Storage.");
        }
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('items').style.display = "block";
        for(var i=0, len=localStorage.length; i<len;i++){
            var makeli = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            // Convert the string from local storage value back to an object by using JSON.parse
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            for(var n in obj){
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
            }
        }
    }


    // Clear all Data
    function clearLocal () {
        if(localStorage.length === 0) {
            alert("You have not saved any Apartments to the Database.");
        } else {
            localStorage.clear();
            alert("All Apartments have been deleted.");
            window.location.reload();
            return false;
        }
    }

    //Variable defaults
    var aptStatus = ["--Apartment Type--", "Vacant Available", "Vacant Rented", "Notice Availible"],
        isPowerValue = "No",
        isWhitelockValue = "No"
    ;
    getType();

    //Set Link & Submit Click Events
    var clearLink = $('clearLink');
    clearLink.addEventListener("click", clearLocal);
    var displayLink = $('displayLink');
    displayLink.addEventListener("click", getData);
    var save = $('submit');
    save.addEventListener("click", storeData);


});