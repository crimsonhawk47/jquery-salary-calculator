$(document).ready(startScript);

let totalMonthlyCost = 0; //A global variable for all Employee Salaries
let employeeList = {}; //Object to hold employees


function startScript() { //Runs when page is done loading
    $('#submitEmployee').on('click', addEmployee); //Adds a click function to submit button
    $('tbody').on('click', '.deleteEmployeeButton', deleteCurrentEmployee);
    // ^^^^Adds a click event to ANY employee buttons dynamically. 

}

function updateTotalAnnualSalary() {
    let newMonthlyCost = 0;
    for (employeeKey in employeeList) { //Loops through the list of employees and adds all salaries
        newMonthlyCost += Number(employeeList[employeeKey].annualSalary)
    }
    totalMonthlyCost = newMonthlyCost / 12; //changes global monthlyCost
}

function updateTable() {
    $('#employeeDataTable').empty(); //Empties the table
    
    for (employeeKey in employeeList) { //Fills the table with all the employees from the object
        let employee = employeeList[employeeKey]
        $('#employeeDataTable').append(`
        <tr class='employee'>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td class="individualEmployeeID">${employee.idNumber}</td>
            <td>${employee.jobTitle}</td>
            <td class="individualEmployeeSalary">${employee.annualSalary}</td>
            <td><button class='deleteEmployeeButton'>Delete</button></td>
        </tr>`);
    }
}


function addEmployee() {
    let idNumber = $('#idNumber').val();
    if (employeeList.hasOwnProperty(idNumber)){
        alert('You already entered an employee with that job ID');
        return false;
    }
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let jobTitle = $('#jobTitle').val();
    let annualSalary = $('#annualSalary').val(); //Grabbing All Input Variables
    
    employeeList[idNumber] = { //Adding the inputs into an employee, with a key of the ID Number of that employee
        firstName: firstName,
        lastName: lastName,
        idNumber: idNumber,
        jobTitle: jobTitle,
        annualSalary: annualSalary
    }
    updateTotalAnnualSalary();
    updateTable();
    displayTotalCost(); 
    checkIfTotalCostTooHigh();
    return true;
}



function deleteCurrentEmployee() {
    //A delete button will trigger this. We need the individual employee ID from the row so we can
    //index the object and delete the employee. 
    let deletedEmployeeID = $(this).closest('tr').find('.individualEmployeeID').text();

    delete employeeList[deletedEmployeeID] //deletes the employee

    //Now that the employee is gone we can update the global monthly cost and change the DOM
    updateTotalAnnualSalary();
    updateTable();
    displayTotalCost(); 
    checkIfTotalCostTooHigh();

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