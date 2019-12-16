$(document).ready(startScript);

let totalMonthlyCost = 0; //A global variable for all Employee Salaries


function startScript() { //Runs when page is done loading
    $('#submitEmployee').on('click', addEmployee); //Adds a click function to submit button
    $('tbody').on('click', '.deleteEmployeeButton', deleteCurrentEmployee);  
    // ^^^^Adds a click event to ANY employee buttons dynamically. 

}

function addToTotalAnnualSalary(numberToAdd) {
    totalMonthlyCost += numberToAdd/12; //Adds whatever is passed into the global monthly cost
    
}


function addEmployee() {
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let idNumber = $('#idNumber').val();
    let jobTitle = $('#jobTitle').val();
    let annualSalary = $('#annualSalary').val(); //Grabbing All Input Variables
    addToTotalAnnualSalary(Number(annualSalary)); //Converts Salary input to a number and adds to total

    displayTotalCost(); //Calls a function to update the Total Monthly Cost Display

    //We are adding the variables we got above into a table row of data. We make sure that
    //The Salary has its own class, because we will need that later. Same with the delete button
    $('#employeeDataTable').append(`
    <tr class='employee'>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${idNumber}</td>
        <td>${jobTitle}</td>
        <td class="individualEmployeeSalary">${annualSalary}</td>
        <td><button class='deleteEmployeeButton'>Delete</button></td>
    </tr>`); 

    //Calls a function that will change the background of total monthly cost to red if it's too high.
    checkIfTotalCostTooHigh();
}



function deleteCurrentEmployee() {
    //A delete button will trigger this. We will find the annual salary of the employee
    //we intend to delete. 
    let deletedEmployeeSalary = $(this).closest('tr').find('.individualEmployeeSalary').text();
    //Convert that salary to a number
    deletedEmployeeSalary = Number(deletedEmployeeSalary);
    //We will call the add function, but we will use it on a negative salary to subtract
    //from the monthly cost. 
    addToTotalAnnualSalary(-deletedEmployeeSalary);
    //Changes the monthly cost to red if it's too highs
    checkIfTotalCostTooHigh();
    //Updates the monthly cost display
    displayTotalCost();
    //Once we've done everything we need to, we remove the row. 
    $(this).closest('tr').remove();


}

function displayTotalCost() {
    //Grabs the area displaying the monthly cost
    let totalCostDisplay = $('#totalCostSpace');
    //Empties it
    totalCostDisplay.empty();
    //Adds back to the display, giving the newly updated Monthly Cost
    totalCostDisplay.append(`<p id='totalAnnualCost'>Total Monthly Cost: ${Math.round(totalMonthlyCost)}</p>`);
}

function checkIfTotalCostTooHigh() {
    //If the totalMonthlyCost exceeds 20000...
    if (totalMonthlyCost >= 20000) {
        //Switch the classes to something that makes it red
        $('#totalCostSpace').addClass('tooHigh');
        $('#totalCostSpace').removeClass('justRight');

    }//else...
    else {
        //Switch the classes to something that makes it white.
        $('#totalCostSpace').removeClass('tooHigh');
        $('#totalCostSpace').addClass('justRight');
    }

}
