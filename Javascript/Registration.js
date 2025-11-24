document.addEventListener("DOMContentLoaded", () => {
    
    const toggleBtn = document.getElementById("sidebarToggle");
    const backdrop = document.getElementById("drawerBackdrop");
    const body = document.body;

    function toggleSidebar() {
        body.classList.toggle("sidebar-open");
    }

    if (toggleBtn) toggleBtn.addEventListener("click", toggleSidebar);
    if (backdrop) backdrop.addEventListener("click", toggleSidebar);


    const facultySelect = document.getElementById("faculty_select");
    const facultyOtherInput = document.getElementById("faculty_other");

    if (facultySelect && facultyOtherInput) {
        facultySelect.addEventListener("change", function() {
            if (this.value === "Other") {
                facultyOtherInput.style.display = "block";
                facultyOtherInput.focus();
            } else {
                facultyOtherInput.style.display = "none";
                facultyOtherInput.value = ""; 
                facultyOtherInput.classList.remove("input-error");
            }
        });
    }


    const form = document.getElementById("regisForm");

    if (form) {
        form.addEventListener("submit", function(e) {
            let isValid = true;
            
            const validateField = (input, condition, errorMsgElem) => {
                if (condition) {
                    input.classList.add("input-error");
                    if (errorMsgElem) errorMsgElem.classList.add("show-error");
                    isValid = false;
                } else {
                    input.classList.remove("input-error");
                    if (errorMsgElem) errorMsgElem.classList.remove("show-error");
                }
            };

            const fullname = document.getElementById("fullname");
            validateField(fullname, fullname.value.trim() === "", fullname.nextElementSibling);

            const email = document.getElementById("email");
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(email, !emailPattern.test(email.value), email.nextElementSibling);

            const facultyError = facultyOtherInput.nextElementSibling;
            if (facultySelect.value === "") {
                facultySelect.classList.add("input-error");
                facultyError.classList.add("show-error");
                isValid = false;
            } else if (facultySelect.value === "Other") {
                if (facultyOtherInput.value.trim() === "") {
                    facultyOtherInput.classList.add("input-error");
                    facultyError.classList.add("show-error");
                    isValid = false;
                } else {
                    facultySelect.classList.remove("input-error");
                    facultyOtherInput.classList.remove("input-error");
                    facultyError.classList.remove("show-error");
                }
            } else {
                facultySelect.classList.remove("input-error");
                facultyOtherInput.classList.remove("input-error");
                facultyError.classList.remove("show-error");
            }

            const yearLevel = document.querySelector('input[name="year_level"]:checked');
            const radioError = document.getElementById("radio-error");
            if (!yearLevel) {
                radioError.classList.add("show-error");
                isValid = false;
            } else {
                radioError.classList.remove("show-error");
            }

            const consent = document.getElementById("consent");
            const consentError = consent.parentElement.querySelector(".error-msg");
            if (!consent.checked) {
                consentError.classList.add("show-error");
                isValid = false;
            } else {
                consentError.classList.remove("show-error");
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }
});