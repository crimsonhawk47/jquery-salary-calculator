$(document).ready(startScript);

function startScript() {
    $('#submitEmployee').on('click',addEmployee);
    
    
    
}

function addEmployee() {
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let idNumber = $('#idNumber').val();
    let jobTitle = $('#jobTitle').val();
    let annualSalary = $('#annualSalary').val();

    console.log(firstName, lastName, idNumber, jobTitle, annualSalary);
    
    $('#employeeDataTable').append(`
    <tr class='employee'>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${idNumber}</td>
        <td>${jobTitle}</td>
        <td>${annualSalary}</td>
    </tr>`);
    
    
    
    
    
    
}
