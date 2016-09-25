
var errors = [
  {
    "type": "required",
    "message": "Required"
  }
];

var schema = {
  "schema": {
    "username": {
      "type": "Text",
      "help": "Please enter your email address",
      "validators": [
        "required",
        "email"
      ]
    },
    "password": {
      "validators": [
        "required"
      ],
      "type": "Password"
    }
  },
  "fieldsets": [
    {
      "legend": "Login Form",
      "fields": [
        "username",
        "password",
        "confirmPassword"
      ]
    }
  ],
  "submitButton": "Login"
};