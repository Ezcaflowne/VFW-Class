// Name: Willson Ayotte
// Date: Aug 3rd 2012
// Document: Project 3 VFW 1208 
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
                $('submit').style.display = "inline";
                break;
            default:
                return false;
        }
    }

    // Store Data Function
    function storeData(key){
        // If there is not key this means this is a brand new item and need a new key.
        if(!key){
            var id              = Math.floor(Math.random()*10000001);    
        } else {
            // Set the id to the existing key we are editing so that it will save over the data.
            // The key is the same key thats been passed along from the editSubmit event handler
            // to the validate function, and then passed here, into the storeData function.
            id = key;
        }
        
        // Gather up all our form field values and stred in an object
        // Object properties contain an array with the form label and input values.
        getCheckboxPower();
        getCheckboxWhite();
        var item                = {};
            item.aptType        = ["Apartment Type:", $("aptType").value];
            item.aptNum         = ["Apartment Number:", $("aptNum").value];
            item.aptSize        = ["Apartment Size:", $("aptSize").value];
            item.vacDate        = ["Vacate:", $("vacDate").value];
            item.rdyDate        = ["Ready:", $("rdyDate").value];
            item.isPower        = ["Power?", isPowerValue];
            item.isWhiteLock    = ["Whitelock?", isWhitelockValue];
            item.condition      = ["Condition:", $("condition").value];
            item.comments       = ["Additional Comments:", $("comments").value];
        // Save data into localStorage: Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Apartment is Saved!");
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
            var linksLi = document.createElement('li');
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
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi); // Create edit and delete button or links for each item in local storage
        }
    }

    // Make item Links function
    // Create the edit and delete links for each stored item when displayed.
    function makeItemLinks (key, linksLi) {
    // add edit single item link
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Apartment";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);

    // Added line break
    var breakTag = document.createElement('br');
    linksLi.appendChild(breakTag);

    // Add delete single item Link
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Apartment";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }   

    // edit item function
    function editItem () {
        // Grab the data from our local storage.
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        // Show the form
        toggleControls("off");

        // popluate the form feilds with current localStorage values.
        $('aptType').value  = item.aptType[1];
        $('aptNum').value   = item.aptNum[1];
        $('aptSize').value  = item.aptSize[1];
        $('vacDate').value  = item.vacDate[1];
        $('rdyDate').value  = item.rdyDate[1];
        if(item.isPower[1] == "Yes"){
            $('isPower').setAttribute("checked", "checked");
        }
        if(item.isWhiteLock[1] == "Yes"){
            $('isWhiteLock').setAttribute("checked", "checked");
        }
        $('condition').value = item.condition[1];
        $('comments').value  = item.comments[1];

        // Remove the initial listener from the input 'save contact' button.
        save.removeEventListener("click", storeData);
        // Change Submit Button value to Confirm Button
        $('submit').value = "Confirm Changes";
        var editSubmit = $('submit');
        // Save the key value established in this function as a property of the editSubmit event
        // so we can use that value when we save the data we edited.
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }

    function deleteItem () {
        var ask = confirm("Are you sure you want to delete this Apartment?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("Apartment was deleted!");
            window.location.reload();
        } else {
            alert("Apartment was not deleted.");
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

    function validate (event) {
        // Define elements we want to check
        var getType = $('aptType');
        var getNum  = $('aptNum');
        var getSize = $('aptSize');

        // Reset Error Messages
        errMsg.innerHTML = "";
        getType.style.border = "1px solid black";
        getNum.style.border  = "1px solid black";
        getSize.style.border = "1px solid black";

        // Get error messages
        var messageAry = [];
        // Group validation
        if(getType.value === "--Apartment Type--"){
            var typeError = "Please choose an Apartment Type.";
            getType.style.border = "1px solid red";
            messageAry.push(typeError);
        }

        // Apartment Number Validation
        if(getNum.value === ""){
            var aptNumError = "Please Enter an Apartment Number.";
            getNum.style.border = "1px solid red";
            messageAry.push(aptNumError);
        }
       
        // Apartment Size Validation
        var re = /^\dx\d$/;
        if(!(re.exec(getSize.value))){
            var getSizeError = "Please enter Apartment Size in a numxnum format.";
            getSize.style.border = "1px solid red";
            messageAry.push(getSizeError);
        }

        // If there were errors, display them on the screen.
        if(messageAry.length >= 1){
            for(var i=0, j=messageAry.length; i < j; i++){
                var txt = document.createElement('li');
                txt.innerHTML = messageAry[i];
                errMsg.appendChild(txt);
            }
            event.preventDefault();
            return false;
        } else {
            // If all is OK, save our data! Send the key value (which came from the edit data function).
            // Remember this key value was passed through the editSubmit event listner as a property.
            storeData(this.key);
        }
    }

    //Variable defaults
    var aptStatus = ["--Apartment Type--", "Vacant Available", "Vacant Rented", "Notice Availible"],
        isPowerValue = "No",
        isWhitelockValue = "No",
        errMsg = $('errors');
    ;
    getType();

    //Set Link & Submit Click Events
    var clearLink = $('clearLink');
    clearLink.addEventListener("click", clearLocal);
    var displayLink = $('displayLink');
    displayLink.addEventListener("click", getData);
    var save = $('submit');
    save.addEventListener("click", validate);


});