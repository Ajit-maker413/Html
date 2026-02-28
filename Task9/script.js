// JSON Form Configuration
const formConfig = {
    title: "Registration Form",
    fields: [
        { label: "Full Name", type: "text", name: "fullname", required: true },
        { label: "Email", type: "email", name: "email", required: true },
        { label: "Password", type: "password", name: "password", required: true },
        {
            label: "Country",
            type: "select",
            name: "country",
            options: ["Select", "USA", "India", "Canada", "Australia"],
            required: true
        }
    ]
};

// States Data
const statesData = {
    USA: ["Select", "California", "Texas", "Florida", "New York"],
    India: ["Select", "Telangana", "Maharashtra", "Karnataka", "Tamil Nadu"],
    Canada: ["Select", "Ontario", "Quebec", "Alberta", "British Columbia"],
    Australia: ["Select", "New South Wales", "Victoria", "Queensland", "Tasmania"]
};

$(document).ready(function () {

    $("#formTitle").text(formConfig.title);

    // Build Form
    formConfig.fields.forEach(function (field) {

        let fieldDiv = $("<div>").addClass("field");
        fieldDiv.append($("<label>").text(field.label));

        if (field.type === "select") {

            let select = $("<select>").attr("name", field.name);

            field.options.forEach(function (option) {
                select.append($("<option>").text(option).val(option));
            });

            fieldDiv.append(select);

        } else {

            let input = $("<input>")
                .attr("type", field.type)
                .attr("name", field.name);

            fieldDiv.append(input);
        }

        fieldDiv.append($("<div>").addClass("error"));
        $("#dynamicForm").append(fieldDiv);
    });

    $("#dynamicForm").append("<button type='submit'>Submit</button>");
});


// Country Change Event
$(document).on("change", "select[name='country']", function () {

    $("#stateField").remove();
    let selectedCountry = $(this).val();

    if (statesData[selectedCountry]) {

        let stateDiv = $("<div>")
            .addClass("field")
            .attr("id", "stateField");

        stateDiv.append("<label>State</label>");

        let stateSelect = $("<select>").attr("name", "state");

        statesData[selectedCountry].forEach(function (state) {
            stateSelect.append($("<option>").text(state).val(state));
        });

        stateDiv.append(stateSelect);
        stateDiv.append("<div class='error'></div>");

        $("#dynamicForm button").before(stateDiv);
    }
});


// Form Validation
$("#dynamicForm").on("submit", function (e) {

    e.preventDefault();
    let isValid = true;

    $(".error").text("");

    $(this).find("input, select").each(function () {

        let value = $(this).val();
        let name = $(this).attr("name");

        if (!value || value === "Select") {
            $(this).siblings(".error").text("This field is required");
            isValid = false;
        }

        if (name === "email") {
            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                $(this).siblings(".error").text("Invalid email format");
                isValid = false;
            }
        }

        if (name === "password" && value.length < 6) {
            $(this).siblings(".error")
                .text("Password must be at least 6 characters");
            isValid = false;
        }
    });

    if (isValid) {
        alert("Form Submitted Successfully!");
    }
});