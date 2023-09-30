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
      $state.go("Dregister");
    };
  },
]);

myApp.controller("PatientregController", function ($scope, $state, $http) {
  $scope.user = {};

  $scope.registerP = function () {
    if (
      !$scope.user.name ||
      !$scope.user.firstname ||
      !$scope.user.lastname ||
      !$scope.user.age ||
      !$scope.user.gender ||
      !$scope.user.email ||
      !$scope.user.password ||
      !$scope.user.confirmpassword
    ) {
      Swal.fire({
        title: "Error",
        text: "All fields are required to proceed!!",
        width: 600,
        padding: "3em",
        color: "#566c6c",
        background: "#fff url(/images/trees.png)",
        backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      });
      return;
    }
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
  $http
    .get("https://10.21.87.196:8000/department/")
    .then(function (response) {
      $scope.departments = response.data;
      console.log($scope.departments);
    })
    .catch(function (error) {
      console.error("Error fetching departments: " + error);
    });

  $scope.registerS = function () {
    if (
      !$scope.name ||
      !$scope.firstname ||
      !$scope.lastname ||
      !$scope.email ||
      !$scope.password ||
      !$scope.confirmpassword
    ) {
      Swal.fire({
        title: "Error",
        text: "All fields are required to proceed!!",
        width: 600,
        padding: "3em",
        color: "#566c6c",
        background: "#fff url(/images/trees.png)",
        backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      });
      return;
    }
    var data = {
      name : $scope.name,
      firstname : $scope.firstname,
      lastname : $scope.lastname,
      email: $scope.email,
      gender: $scope.gender,
      department : $scope.selectedDepartment.id,
      password : $scope.password,
      confirmpassword : $scope.confirmpassword,
    }
    console.log(data)
    $http({
      method: "POST",
      url: "https://10.21.87.196:8000/staffregister/",
      data: data,
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
    if (!$scope.user.username || !$scope.user.password) {
      Swal.fire({
        title: "Error",
        text: "Username and password are required fields.",
        width: 600,
        padding: "3em",
        color: "#8a84ff",
        background: "#fff url(/images/trees.png)",
        backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      });
      return;
    }
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
    if (!$scope.user.username || !$scope.user.password) {
      Swal.fire({
        title: "Error",
        text: "Username and password are required fields.",
        width: 600,
        padding: "3em",
        color: "#7066e0",
        background: "#fff url(/images/trees.png)",
        backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      });
      return;
    }

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
            title: "Staff Logged In Successfully",
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
    $scope.pageTitle = "";
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
    $scope.showPrescriptionsContent = false;
    $scope.showPaymentContent = false;

    $scope.closeSidebar = function () {
      document.getElementById("mySidebar").style.width = "0";
    };

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
          } else if (Response.data.message === "Prescription") {
            $scope.showPrescription();
          } else if (Response.data.message === "Payment/Bill") {
            $scope.showPayments();
          } else {
            console.error("error in response");
          }
        },
        function (Error) {
          console.error("Failed to send ID", Error);
        }
      );
    };

    $scope.showDashboard = function () {
      $scope.pageTitle = "";
      $scope.showDashboardContent = true;
      $scope.showAppointmentsContent = false;
      $scope.showPrescriptionsContent = false;
      $scope.showPaymentContent = false;
      $scope.closeSidebar();
    };

    $scope.showAppointments = function () {
      $scope.pageTitle = "Appointment";
      $scope.showDashboardContent = false;
      $scope.showAppointmentsContent = true;
      $scope.showPrescriptionsContent = false;
      $scope.showPaymentContent = false;

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
      $scope.closeSidebar();
    };

    $scope.showPrescription = function () {
      $scope.pageTitle = "Prescription";
      $http({
        method: "GET",
        url: "https://10.21.87.196:8000/prescriptionpdf/",
        withCredentials: true,
      }).then(
        function (response) {
          console.log("Fetched Prescription Data", response.data);
          $scope.users = response.data;
        },
        function (patientError) {
          console.error("Failed to fetch Prescription data", patientError);
        }
      );
      $scope.download = function () {
        let button = document.getElementById("button");
        let makepdf = document.getElementById("makepdf");

        button.addEventListener("click", function () {
          let mywindow = window.open("", "PRINT", "height=400,width=600");

          mywindow.document.write(makepdf.innerHTML);

          mywindow.document.close();
          mywindow.focus();

          mywindow.print();
          mywindow.close();

          return true;
        });
      };
      $scope.showDashboardContent = false;
      $scope.showAppointmentsContent = false;
      $scope.showPrescriptionsContent = true;
      $scope.showPaymentContent = false;
      $scope.closeSidebar();
    };

    $scope.showPayments = function () {
      $scope.pageTitle = "Payment/Bill";
      $http({
        method: "GET",
        url: "https://10.21.87.196:8000/billdash/",
        withCredentials: true,
      }).then(
        function (response) {
          console.log("Fetched Payments Data", response.data);
          $scope.users = response.data;

          $scope.billAction = function (item) {
            console.log("Bill button clicked for ID: " + item.id);
            var pdfId = item.id;
            $http({
              method: "GET",
              url: "https://10.21.87.196:8000/paymentpdf/?id=" + pdfId,
              withCredentials: true,
              responseType: "arraybuffer",
            }).then(
              function (response) {
                console.log("Pdf data fetched", response.data);

                var blob = new Blob([response.data], {
                  type: "application/pdf",
                });
                var url = URL.createObjectURL(blob);

                $scope.pdfs = url;
              },
              function (error) {
                console.log("Data not fetched", error);
              }
            );
          };

          $scope.paymentAction = function (item) {
            console.log("Payment button clicked for ID: " + item.id);
            var id = { id: item.id };
            console.log(id);
            $http({
              method: "PUT",
              url: "https://10.21.87.196:8000/payapproval/",
              withCredentials: true,
              data: id,
            }).then(
              function (response) {
                console.log("Pdf data fetched", response.data);
                $scope.pdfs = response.data;
                if (response.data.message === "Payment Approved") {
                  Swal.fire("Payment Done!", "success");
                } else {
                  Swal.fire("Error");
                }
              },
              function (Error) {
                console.log("Data not fetched", Error);
              }
            );
          };
        },
        function (patientError) {
          console.error("Failed to fetch Payments data", patientError);
        }
      );
      $scope.showDashboardContent = false;
      $scope.showAppointmentsContent = false;
      $scope.showPrescriptionsContent = false;
      $scope.showPaymentContent = true;
      $scope.closeSidebar();
    };
  },
]);

myApp.controller("Ddashboardcontroller", function ($scope, $http, $state) {
  $scope.pageTitle = " ";
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
    $scope.pageTitle = "";
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
    $scope.AcceptAppointment = function (id) {
      console.log("Payment button clicked for ID: " + id);
      var id = { id: id };
      console.log(id);
      $http({
        method: "PUT",
        url: "https://10.21.87.196:8000/docapproval/",
        withCredentials: true,
        data: id,
      }).then(
        function (response) {
          console.log(" data fetched", response.data);
          if (response.data.message === "Appointment approved") {
            Swal.fire("Appointment Approved!", "success");
          } else {
            Swal.fire("Error");
          }
        },
        function (Error) {
          console.log("Data not fetched", Error);
        }
      );
    };

    $scope.Send = function (id) {
      console.log(" button clicked for ID: " + id);
      var id = id;
      console.log(id);
      reason = $scope.appointments.reject;
      console.log(reason);
      data = {
        id: id,
        reason: reason,
      };
      console.log(data);
      $http({
        method: "PUT",
        url: "https://10.21.87.196:8000/docreject/",
        withCredentials: true,
        data: data,
      }).then(
        function (response) {
          ($scope.appointments.reject = ""),
            console.log(" data fetched", response.data);
          if (response.data.message === "Appointment rejected") {
            Swal.fire("Appointment Rejected!", "Soory");
          } else {
            Swal.fire("Error");
          }
        },
        function (Error) {
          console.log("Data not fetched", Error);
        }
      );
    };

    $scope.editAppointment = function () {
      $http
        .get("https://10.21.87.196:8000/schedule/")
        .then(function (response) {
          $scope.Times = response.data;
          console.log($scope.Times);
        })
        .catch(function (error) {
          console.error("Error fetching appointment times: ", error);
        });
    };

    $scope.Sent = function (id) {
      console.log(" button clicked for ID: " + id);
      $scope.selectedTime = "";
      var id = id;
      console.log(id);
      date = $scope.appointments.reject;
      console.log(date);
      var data = {
        id: id,
        date: date,
        time: $scope.selectedTime.id,
      };

      console.log(data);
      $http({
        method: "PUT",
        url: "https://10.21.87.196:8000/updateappoint/",
        withCredentials: true,
        data: data,
      }).then(
        function (response) {
          ($scope.appointments.reject = ""),
            ($scope.appointments.rejected = ""),
            console.log(" data fetched", response.data);
          if (response.data.message === "Updated") {
            Swal.fire("Appointment Updated!", "Success");
          } else {
            Swal.fire("Error");
          }
        },
        function (Error) {
          console.log("Data not fetched", Error);
        }
      );
    };

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
        },
        function (Error) {
          console.error("Failed to send ID", Error);
        }
      );
    };
    $scope.medicines = [];

    $scope.addMedicine = function () {
      $scope.medicines.push({});
    };

    $scope.removeMedicine = function (index) {
      $scope.medicines.splice(index, 1);
    };

    $scope.Submit = function (id) {
      var Id = id;
      console.log(Id);
    
      var formattedMedicines = [];
    
      for (var i = 0; i < $scope.medicines.length; i++) {
        var medicine = {
          "Id": Id,
          "name": $scope.medicines[i].name || "",
          "dose": $scope.medicines[i].dose || "",
          "instructions": $scope.medicines[i].instructions || ""
        };
        formattedMedicines.push(medicine);
      }
    
      console.log(formattedMedicines);
    
      $http({
        method: "POST",
        url: "https://10.21.87.196:8000/prescription/",
        withCredentials: true,
        data: formattedMedicines, 
      })
        .then(function (response) {
          $scope.medicines[i].name="",
          $scope.medicines[i].dose="",
          $scope.medicines[i].instructions="",

          console.log("Data successfully sent to the server:", response.data);
        })
        .catch(function (error) {
          console.error("Error sending data to the server:", error);
        });
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
  $scope.pageTitle = "";
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
  $scope.showDoctorsContent = false;
  $scope.showPaymentsContent = false;

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
        } else if (Response.data.message === "Payment/Bill") {
          $scope.showPayment();
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
    $scope.pageTitle = "";
    $scope.showDashboardContent = true;
    $scope.showAppointmentsContent = false;
    $scope.showPatientsContent = false;
    $scope.showDoctorsContent = false;
    $scope.showPaymentsContent = false;
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

    $scope.ApproveAppointment = function (id) {
      console.log("Payment button clicked for ID: " + id);
      var id = { id: id };
      console.log(id);
      $http({
        method: "PUT",
        url: "https://10.21.87.196:8000/recepapproval/",
        withCredentials: true,
        data: id,
      }).then(
        function (response) {
          console.log(" data fetched", response.data);
          if (response.data.message === "Appointment approved") {
            Swal.fire("Appointment Approved!", "success");
          } else {
            Swal.fire("Error");
          }
        },
        function (Error) {
          console.log("Data not fetched", Error);
        }
      );
    };
    $scope.Submit = function (id) {
      console.log("Payment button clicked for ID: " + id);
      var id = id;
      console.log(id);
      reason = $scope.appointment.reject;
      console.log(reason);
      data = {
        id: id,
        reason: reason,
      };
      console.log(data);
      $http({
        method: "PUT",
        url: "https://10.21.87.196:8000/recepreject/",
        withCredentials: true,
        data: data,
      }).then(
        function (response) {
          ($scope.appointment.reject = ""),
            console.log(" data fetched", response.data);
          if (response.data.message === "Appointment rejected") {
            Swal.fire("Appointment Rejected!", "Soory");
          } else {
            Swal.fire("Error");
          }
        },
        function (Error) {
          console.log("Data not fetched", Error);
        }
      );
    };
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
    $scope.showPaymentsContent = false;
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
    $scope.showPaymentsContent = false;
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
    $scope.showPaymentsContent = false;
    $scope.closeSidebar();
  };

  $scope.showPayment = function () {
    $scope.pageTitle = "Payment/Bill";
    $http({
      method: "GET",
      url: "https://10.21.87.196:8000/appointpayment/",
      withCredentials: true,
    }).then(
      function (response) {
        console.log("Fetched Payment Data", response.data);
        $scope.users = response.data;
      },
      function (Error) {
        console.error("Failed to fetch data", Error);
      }
    );
    $scope.showDashboardContent = false;
    $scope.showAppointmentsContent = false;
    $scope.showPatientsContent = false;
    $scope.showDoctorsContent = false;
    $scope.showPaymentsContent = true;
    $scope.closeSidebar();

    $scope.Submit = function (Id) {
      var amountToPay = $scope.users.payment;

      var Data = {
        id: Id,
        payment: amountToPay,
      };

      $http({
        method: "POST",
        url: "https://10.21.87.196:8000/Payment/",
        withCredentials: true,
        data: Data,
      })
        .then(function (response) {
          $scope.users.payment = "";
          console.log("Payment submitted successfully:", response.data);
        })
        .catch(function (error) {
          console.error("Error submitting payment:", error);
        });
    };
  };
});
