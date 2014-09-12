function Appointment(appointment) {
	var self = this;
	self.date = ko.observable(appointment.date);
	self.month = ko.observable(appointment.month);
	self.time = ko.observable(appointment.time);
	self.title = ko.observable(appointment.title);
	self.desc = ko.observable(appointment.desc);
	self.information = ko.observable(appointment.information);
}

function AppointmentViewModel() {
	var self = this;

	self.appointments = ko.observableArray([]);

	self.information = ko.observable();
	self.date = ko.observable();
	self.month = ko.observable();
	self.time = ko.observable();
	self.title = ko.observable();
	self.desc = ko.observable();
	self.information = ko.observable();
	self.fullDate = ko.computed(function(){
		return "" + self.date() + ". " + self.month() + ", " + self.time(); 
	});
	
	self.newappointmentdate = ko.observable("HALLO");
	
	
	
	self.refresh = function() {
		console.log("refresh")
		$.getJSON("/appointments/json", function(data) {
			var mappedTasks = $.map(data, function(item) {
				console.log(item)
				return new Appointment(item)
			});
			self.appointments(mappedTasks);
		});
	}

	self.chosenAppointmentId = ko.observable()
	self.chosenAppointmentData = ko.observable();
	self.goToAppointment = function() {
		var data = ko.toJS(this)
		
		var datastring = JSON.stringify(data.information);
		datastring = datastring.substring(1, datastring.length - 1)
		
		self.information(datastring);
		self.date(data.date);
		self.month(data.month);
		self.time(data.time);
		self.title(data.title);
		
	};
	
	self.refresh()
}

$(function() {
	ko.applyBindings(new AppointmentViewModel());
});
