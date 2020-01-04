export const LOGIN_VALIDATIONS = {
  email: {
    required: "The email is required",
    pattern: {
      message: "The email is not valid",
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  password: {
    required: "The password should be in place",
    minLength: {
      message: "Password length should be greater than 6",
      value: 6
    }
  }
};

export const REGISTER_VALIDATIONS = {
  name: {
    required: "The name is required"
  },
  email: {
    required: "The email is required",
    pattern: {
      message: "The email is not valid",
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  password: {
    required: "The password should be in place",
    minLength: {
      message: "Password length should be greater than 6",
      value: 6
    }
  }
};
