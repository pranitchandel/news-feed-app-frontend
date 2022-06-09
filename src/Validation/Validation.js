const Validation = (inputs) => {
  const errors = {};
  if (!inputs.name) {
    errors.name = "*Field is mandatory";
  }
  if (!inputs.email) {
    errors.email = "*Field is mandatory";
  }
  if (!inputs.password || inputs.password.length < 8) {
    errors.password = "*Field is mandatory";
  }
  if (!inputs.contactNumber) {
    errors.contactNumber = "*Field is mandatory";
  }
  if (!inputs.maritalStatus) {
    errors.maritalStatus = "*Field is mandatory";
  }
  if (!inputs.dateDOB || !inputs.monthDOB || !inputs.yearDOB) {
    errors.dateOfBirth = "*Field is mandatory";
  }
  if (!inputs.birthTime) {
    errors.birthTime = "*Field is mandatory";
  }
  if (inputs.terms === "no") {
    errors.terms = "Please accept terms and policy";
  }
  return errors;
};

export default Validation;
