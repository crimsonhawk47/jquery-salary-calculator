$(document).ready(startScript);

let totalAnnualSalary = 0;

function startScript() {
    $('#submitEmployee').on('click', addEmployee);
    $('tbody').on('click', '.deleteEmployeeButton', deleteCurrentEmployee);

}

function addToTotalAnnualSalary(numberToAdd) {
    totalAnnualSalary += numberToAdd/12;
    
}

function addEmployee() {
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let idNumber = $('#idNumber').val();
    let jobTitle = $('#jobTitle').val();
    let annualSalary = $('#annualSalary').val();
    addToTotalAnnualSalary(Number(annualSalary));

    displayTotalCost();

    // console.log(firstName, lastName, idNumber, jobTitle, annualSalary);

    $('#employeeDataTable').append(`
    <tr class='employee'>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${idNumber}</td>
        <td>${jobTitle}</td>
        <td class="individualEmployeeSalary">${annualSalary}</td>
        <td><button class='deleteEmployeeButton'>Delete</button></td>
    </tr>`);

    checkIfTotalCostTooHigh();


}

function deleteCurrentEmployee() {
    
    let deletedEmployeeSalary = $(this).closest('tr').find('.individualEmployeeSalary').text();
    deletedEmployeeSalary = Number(deletedEmployeeSalary);
    console.log(deletedEmployeeSalary);

    addToTotalAnnualSalary(-deletedEmployeeSalary);
    checkIfTotalCostTooHigh();
    displayTotalCost();
    $(this).closest('tr').remove();


}

function displayTotalCost() {
    let totalCostDisplay = $('#totalCostSpace');
    totalCostDisplay.empty();
    totalCostDisplay.append(`<p id='totalAnnualCost'>Total Monthly Cost: ${Math.round(totalAnnualSalary)}</p>`);
}

function checkIfTotalCostTooHigh() {
    if (totalAnnualSalary > 20000) {
        $('#totalCostSpace').addClass('tooHigh');
        $('#totalCostSpace').removeClass('justRight');

    }
    else {
        $('#totalCostSpace').removeClass('tooHigh');
        $('#totalCostSpace').addClass('justRight');
    }

}