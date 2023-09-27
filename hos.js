var myApp = angular.module("myApp", ["ui.router"]);

myApp.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("hospital", {
      url: "/hospital",
      templateUrl: "hospital.html",
      controller: "HospitalController",
    })
    .state("Pregister", {
      url: "/Patientreg",
      templateUrl: "Patientreg.html",
      controller: "PatientregController",
    })

    .state("Dregister", {
      url: "/doctorreg",
      templateUrl: "doctorreg.html",
      controller: "doctorregController",
    })

    .state("Plogin", {
      url: "/Patientlog",
      templateUrl: "patientlog.html",
      controller: "PatientloginController",
    })
    .state("Dlogin", {
      url: "/doctorlog",
      templateUrl: "doctorlog.html",
      controller: "doctorloginController",
    })
    .state("Pdashboard", {
      url: "/patientdashboard",
      templateUrl: "patientdashboard.html",
      controller: "Pdashboardcontroller",
    })
    .state("Ddashboard", {
      url: "/doctordashboard",
      templateUrl: "doctordashboard.html",
      controller: "Ddashboardcontroller",
    })
    .state("Rdashboard", {
      url: "/receptionistdashboard",
      templateUrl: "receptionistdashboard.html",
      controller: "Rcontroller",
    })
    .state("Prescription", {
      url: "/prescription",
      templateUrl: "prescription.html",
      controller: "Prescribecontroller",
    });

  $urlRouterProvider.otherwise("/hospital");
});
myApp.controller("HospitalController", [
  "$scope",
  "$state",
  "$http",
  function ($scope, $state, $http) {
    $scope.Patient = function () {
      $state.go("Pregister");
    };
    $scope.Staff = function () {
      $http
        .get("https://10.21.87.196:8000/department/")
        .then(function (response) {
          $scope.doctors = response.data;
          console.log($scope.doctors);
          $state.go("Dregister");
        })
        .catch(function (error) {
          console.error("Error loading users: " + error);
        });
    };
  },
]);

myApp.controller("PatientregController", function ($scope, $state, $http) {
  $scope.user = {};

  $scope.registerP = function () {
    $http({
      method: "POST",
      url: "https://10.21.87.196:8000/patientregister/",
      data: $scope.user,
    }).then(
      function (response) {
        console.log("Registration successful", response.data);
        Swal.fire({
          title: "Patient Registered Successfully",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
        });
        $state.go("Plogin");
      },
      function (error) {
        console.error("Registration failed", error);
        Swal.fire({
          title: "Registration Failed",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
        });
      }
    );
  };
});

myApp.controller("doctorregController", function ($scope, $state, $http) {
  $scope.user = {};

  $scope.registerS = function () {
    $http({
      method: "POST",
      url: "https://10.21.87.196:8000/staffregister/",
      data: $scope.user,
    }).then(
      function (response) {
        console.log("Registration successful", response.data);
        Swal.fire({
          title: "Doctor Registered Successfully",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
        });
        $state.go("Dlogin");
      },
      function (error) {
        console.error("Registration failed", error);
        Swal.fire({
          title: "Registration Failed",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
        });
      }
    );
  };
});
myApp.controller("PatientloginController", function ($scope, $state, $http) {
  $scope.user = {};

  $scope.loginP = function () {
    $http({
      method: "POST",
      url: "https://10.21.87.196:8000/patientlogin/",
      data: $scope.user,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      function (response) {
        console.log("Login Successful", response.data);
        Swal.fire({
          title: "Patient Login Successfully",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
        });
        $state.go("Pdashboard");
      },
      function (error) {
        console.error("Login failed", error);
        Swal.fire({
          title: "Login Failed",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
        });
      }
    );
  };
});
myApp.controller("doctorloginController", function ($scope, $state, $http) {
  $scope.user = {};

  $scope.loginD = function () {
    $http({
      method: "POST",
      url: "https://10.21.87.196:8000/stafflogin/",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: $scope.user,
    }).then(
      function (response) {
        if (response.data.message === "Doctor") {
          $state.go("Ddashboard");
        } else if (response.data.message === "Stafflogin") {
          Swal.fire({
            title: "Doctor Logged In Successfully",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/images/trees.png)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `,
          });
          $state.go("Rdashboard");
        } else {
          Swal.fire({
            title: "Receptionist Logged In Successfully",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/images/trees.png)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `,
          });
          console.error("error in response");
        }
      },
      function (error) {
        console.log("Login failed", error);
        Swal.fire({
          title: "Login Failed",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
        });
      }
    );
  };
});
myApp.controller("Pdashboardcontroller", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.pageTitle = "Dashboard";
    $scope.showDashboardContent = true;
    $scope.showAppointmentsContent = false;

    $scope.openSidebar = function () {
      document.getElementById("mySidebar").style.width = "250px";
    };

    $scope.closeSidebar = function () {
      document.getElementById("mySidebar").style.width = "0";
    };

    $scope.showDashboard = function () {
      $scope.pageTitle = "Patient Details";
      $scope.closeSidebar();
      $http({
        method: "GET",
        url: "https://10.21.87.196:8000/patient/",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }).then(
        function (response) {
          console.log("Fetched Patient Data", response.data);
          $scope.users = response.data;
        },
        function (patientError) {
          console.error("Failed to fetch patient data", patientError);
        }
      );
      $scope.showDashboardContent = true;
      $scope.showAppointmentsContent = false;
      $scope.closeSidebar();
    };

    $scope.showAppointments = function () {
      $scope.pageTitle = "Appointments";
      $scope.showDashboardContent = false;
      $scope.showAppointmentsContent = true;
      $scope.closeSidebar();

      $scope.getDepartments = function () {
        $http
          .get("https://10.21.87.196:8000/department/")
          .then(function (response) {
            $scope.departments = response.data;
          })
          .catch(function (error) {
            console.error("Error fetching departments: " + error);
          });
      };

      $scope.getDoctors = function () {
        if ($scope.selectedDepartment) {
          $http({
            method: "GET",
            url:
              "https://10.21.87.196:8000/doctorlist/?id=" +
              $scope.selectedDepartment.id,
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response) {
              $scope.doctors = response.data;
            })
            .catch(function (error) {
              console.error("Error fetching doctors: " + error);
            });
        } else {
          $scope.doctors = [];
        }
      };

      $scope.getDepartments();

      $http
        .get("https://10.21.87.196:8000/schedule/")
        .then(function (response) {
          $scope.Times = response.data;
          console.log($scope.Times);
        })
        .catch(function (error) {
          console.error("Error fetching appointment times: ", error);
        });

      $scope.bookAppointment = function () {
        var appointmentData = {
          problem: $scope.medicalIssue,
          medical: $scope.medicalHistory,
          date: $scope.date,
          time: $scope.selectedTime.id,
          doctor: $scope.selectedDoctor,
        };

        console.log(appointmentData);

        $http({
          method: "POST",
          url: "https://10.21.87.196:8000/appointment/",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          data: appointmentData,
        })
          .then(function (response) {
            console.log("Appointment booked successfully: " + response.data);
            Swal.fire("Thanks for booking Appointment!", "success");
          })
          .catch(function (error) {
            console.error("Error booking appointment: " + error);
            Swal.fire("Sorry!", "Your Appointmnet cannot be Applied!");
          });
      };
    };
  },
]);

myApp.controller("Ddashboardcontroller", function ($scope, $http, $state) {
  $scope.pageTitle = " ";
  $scope.showDashboardContent = false;
  $scope.showAppointmentsContent = false;

  $scope.openSidebar = function () {
    document.getElementById("mySidebar").style.width = "250px";
    $http({
      method: "GET",
      url: "https://10.21.87.196:8000/leftpanel/",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      function (Response) {
        console.log("Fetched Data", Response.data);
        $scope.panels = Response.data;
      },
      function (Error) {
        console.error("Failed to fetch data", Error);
      }
    );
  };

  $scope.handleHeadingClick = function (id) {
    console.log("Heading clicked. ID:", id);

    var url = "https://10.21.87.196:8000/panelrouting/?id=" + id;

    $http({
      method: "GET",
      url: url,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      function (Response) {
        console.log("ID sent successfully", Response.data);
        if (Response.data.message === "Dashboard") {
          $scope.showDashboard();
        } else if (Response.data.message === "Appointments") {
          $scope.showAppointments();
        } else if (Response.data.message === "Patients") {
          $scope.showPatients();
        } else {
          console.error("error in response");
        }
      },
      function (Error) {
        console.error("Failed to send ID", Error);
      }
    );
  };

  $scope.closeSidebar = function () {
    document.getElementById("mySidebar").style.width = "0";
  };

  $scope.showDashboard = function () {
    $scope.pageTitle = "Dashboard";
    $http({
      method: "GET",
      url: "https://10.21.87.196:8000/doctor/",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      function (doctorResponse) {
        console.log("Fetched doctor Data", doctorResponse.data);

        $scope.doctors = doctorResponse.data;
      },
      function (doctorError) {
        console.error("Failed to fetch doctor data", doctorError);
      }
    );
    $scope.showDashboardContent = true;
    $scope.showAppointmentsContent = false;
    $scope.showPatientsContent = false;
    $scope.closeSidebar();
  };

  $scope.showAppointments = function () {
    $scope.pageTitle = "Appointments";
    $http({
      method: "GET",
      url: "https://10.21.87.196:8000/docappoint/",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      function (response) {
        console.log("Fetched Appointment Data", response.data);
        $scope.appointments = response.data;
      },
      function (patientError) {
        console.error("Failed to fetch Appointment data", patientError);
      }
    );
    $scope.showDashboardContent = false;
    $scope.showAppointmentsContent = true;
    $scope.Prescription = function (id) {
      var url = "https://10.21.87.196:8000/prescriptiondata/?id=" + id;

      $http({
        method: "GET",
        url: url,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }).then(
        function (Response) {
          $scope.prescriptions = Response.data;
          console.log($scope.prescriptions);
          $state.go("Prescription");
        },
        function (Error) {
          console.error("Failed to send ID", Error);
        }
      );
    };
    $scope.showPatientsContent = false;
    $scope.closeSidebar();
  };
  $scope.showPatients = function () {
    $scope.pageTitle = "Patients";
    $http({
      method: "GET",
      url: "https://10.21.87.196:8000/doctordash/",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      function (response) {
        console.log("Fetched Patient Data", response.data);
        $scope.peopleData = response.data;
      },
      function (patientError) {
        console.error("Failed to fetch patient data", patientError);
      }
    );
    $scope.showDashboardContent = false;
    $scope.showAppointmentsContent = false;
    $scope.showPatientsContent = true;
    $scope.closeSidebar();
  };
});

myApp.controller("Rcontroller", function ($scope, $http) {
  $scope.pageTitle = "Welcome Receptionist";
  $scope.showDashboardContent = false;
  $scope.showAppointmentsContent = false;
  $scope.showDoctorsContent = false;

  $scope.openSidebar = function () {
    document.getElementById("mySidebar").style.width = "250px";
    $http({
      method: "GET",
      url: "https://10.21.87.196:8000/leftpanel/",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      function (Response) {
        console.log("Fetched Data", Response.data);
        $scope.panels = Response.data;
      },
      function (Error) {
        console.error("Failed to fetch data", Error);
      }
    );
  };

  $scope.handleHeadingClick = function (id) {
    console.log("Heading clicked. ID:", id);

    var url = "https://10.21.87.196:8000/panelrouting/?id=" + id;

    $http({
      method: "GET",
      url: url,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      function (Response) {
        console.log("ID sent successfully", Response.data);
        if (Response.data.message === "Dashboard") {
          $scope.showDashboard();
        } else if (Response.data.message === "Appointments") {
          $scope.showAppointments();
        } else if (Response.data.message === "Patients") {
          $scope.showPatients();
        } else if (Response.data.message === "Doctors") {
          $scope.showDoctors();
        } else {
          console.error("error in response");
        }
      },
      function (Error) {
        console.error("Failed to send ID", Error);
      }
    );
  };

  $scope.closeSidebar = function () {
    document.getElementById("mySidebar").style.width = "0";
  };

  $scope.showDashboard = function () {
    $scope.pageTitle = "Receptionist Details";
    $http({
      method: "GET",
      url: "https://10.21.87.196:8000/reception/",
      withCredentials: true,
      header: {
        "Content-Type": "application/json",
      },
    }).then(
      function (response) {
        console.log("Receptionist data", response.data);
        $scope.receptionsit = response.data;
      },
      function (Error) {
        console.log("No Data", Error);
      }
    );
    $scope.showDashboardContent = true;
    $scope.showAppointmentsContent = false;
    $scope.showPatientsContent = false;
    $scope.showDoctorsContent = false;
    $scope.closeSidebar();
  };

  $scope.showAppointments = function () {
    $scope.pageTitle = "Appointments";
    $http({
      method: "GET",
      url: "https://10.21.87.196:8000/recepappoint/",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      function (response) {
        console.log("Fetched Appointment Data", response.data);
        $scope.appointment = response.data;
      },
      function (Error) {
        console.error("Failed to fetch Appointment data", Error);
      }
    );
    $scope.AppointSheet = function () {
      var csv = " Id,Firstname,Lastname,Gender,Problem,Age\n";
      $scope.appointment.forEach(function (appoint) {
        csv +=
          appoint.id +
          "," +
          appoint.firstname +
          "," +
          appoint.lastname +
          "," +
          appoint.gender +
          "," +
          appoint.problem +
          "," +
          appoint.Age +
          "\n";
      });

      var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

      var link = document.createElement("a");
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "appointment.data.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    $scope.showDashboardContent = false;
    $scope.showAppointmentsContent = true;
    $scope.showPatientsContent = false;
    $scope.showDoctorsContent = false;
    $scope.closeSidebar();
  };
  $scope.showPatients = function () {
    $scope.pageTitle = "Patients";
    $http({
      method: "GET",
      url: "https://10.21.87.196:8000/showpatient/",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      function (response) {
        console.log("Fetched Patient Data", response.data);
        $scope.patients = response.data;
      },
      function (patientError) {
        console.error("Failed to fetch patient data", patientError);
      }
    );

    $scope.Excelsheet = function () {
      var csv = "User Id,Firstname,Lastname,Gender,Age\n";
      $scope.patients.forEach(function (patient) {
        csv +=
          patient.user_id +
          "," +
          patient.firstname +
          "," +
          patient.lastname +
          "," +
          patient.gender +
          "," +
          patient.Age +
          "\n";
      });

      var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

      var link = document.createElement("a");
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "patient_data.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };

    $scope.showDashboardContent = false;
    $scope.showAppointmentsContent = false;
    $scope.showPatientsContent = true;
    $scope.showDoctorsContent = false;
    $scope.closeSidebar();
  };
  $scope.showDoctors = function () {
    $scope.pageTitle = "Doctors";
    $http({
      method: "GET",
      url: "https://10.21.87.196:8000/showdoctor/",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      function (response) {
        console.log("Fetched Doctor Data", response.data);
        $scope.doctors = response.data;
      },
      function (doctorError) {
        console.error("Failed to fetch doctors data", doctorError);
      }
    );
    $scope.Doctorsheet = function () {
      var csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "User,Firstname,Lastname,Gender,Speciality\n";

      $scope.doctors.forEach(function (doctor) {
        csvContent += `${doctor.user},${doctor.firstname},${doctor.lastname},${doctor.gender},${doctor.speciality}\n`;
      });

      var encodedURI = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedURI);
      link.setAttribute("download", "patients.csv");
      document.body.appendChild(link);
      link.click();
    };
    $scope.showDashboardContent = false;
    $scope.showAppointmentsContent = false;
    $scope.showPatientsContent = false;
    $scope.showDoctorsContent = true;
    $scope.closeSidebar();
  };
});

myApp.controller("Prescribecontroller", function ($scope, $http) {
  $scope.medicines = [{}];
 
  

  $scope.addMedicine = function () {
    $scope.medicines.push({});
  };

  $scope.submitPrescription = function () {
   

    var prescriptionData = {
        medicines: $scope.medicines,
    };
    console.log(prescriptionData);

    $http({
        method: "POST",
        url: "https://10.21.87.196:8000/prescription/",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
        data: prescriptionData,
    })
    .then(function (response) {
        console.log("Prescription sent successfully");
    })
    .catch(function (error) {
        console.error("Error sending prescription: " + error);
    });
};
});
