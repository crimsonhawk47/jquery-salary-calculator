$(document).ready(startScript);

let totalMonthlyCost = 0; //A global variable for all Employee Salaries
let employeeList = {}; //Object to hold employees


function startScript() { //Runs when page is done loading
    // Adding a click event to the submit button
    $('#submitEmployee').on('click', addEmployee); 
    //Adding a click event to ANY employee delete dynamically. 
    $('tbody').on('click', '.deleteEmployeeButton', deleteCurrentEmployee);

}


function addEmployee() {
    let idNumber = $('#idNumber').val();
    //Making sure you don't enter the same employee Twice
    if (employeeList.hasOwnProperty(idNumber)){
        alert('You already entered an employee with that job ID');
        return false;
    }
    //Grabbing All Input Variables
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let jobTitle = $('#jobTitle').val();
    let annualSalary = $('#annualSalary').val(); 
    if (!Number(annualSalary)){
        alert(`You didn't open a number for their salary`);
        
    }
    //Adding the inputs into an employeeList object, with a key of the ID Number of that employee
    employeeList[idNumber] = { 
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

function updateTotalAnnualSalary() {
    let newMonthlyCost = 0;
    //Looping through the list of employees and adding all salaries
    for (employeeKey in employeeList) { 
        newMonthlyCost += Number(employeeList[employeeKey].annualSalary)
    }
    totalMonthlyCost = newMonthlyCost / 12; //changes global monthlyCost
}



function deleteCurrentEmployee() {
    //A delete button will trigger this function. We need the individual employee ID from the row so we can
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
    //selects the area displaying the monthly cost
    let totalCostDisplay = $('#totalCostSpace');
    //Empties the selected area
    totalCostDisplay.empty();
    //Adds back to the display, giving the newly updated Monthly Cost
    totalCostDisplay.append(`<p id='totalAnnualCost'>Total Monthly Cost: ${Math.round(totalMonthlyCost)}</p>`);
}

function updateTable() {
    //Emptying the table
    $('#employeeDataTable').empty(); 
    //Fills the table with all the employees from the object
    for (employeeKey in employeeList) { 
        let employee = employeeList[employeeKey]
        $('#employeeDataTable').append(`
        <tr class='employee'>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td class="individualEmployeeID">${employee.idNumber}</td>
            <td>${employee.jobTitle}</td>
            <td class="individualEmployeeSalary">${employee.annualSalary}</td>
            <td><button class='deleteEmployeeButton btn btn-outline-danger'>Delete</button></td>
        </tr>`);
    }
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