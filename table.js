;
(function() {
	'use strict';

	var userData = [{
		name: '',
		birthday: '',
		age:'',
		gender:''
	}];

	// Update table according to data
	var updateTable = function() {
		var dataTable = document.getElementById('table1'),
			tableHead = document.getElementById('table-head'),
			tbody = document.createElement('tbody');

		while (dataTable.firstChild) {
			dataTable.removeChild(dataTable.firstChild);
		}

		dataTable.appendChild(tableHead);

		for (var i = 0; i < userData.length; i++) {
			var tr = document.createElement('tr'),
				//td0 = document.createElement('td'),
				td1 = document.createElement('td'),
				td2 = document.createElement('td'),
				td3 = document.createElement('td'),
				td4 = document.createElement('td'),
				td5 = document.createElement('td'),
				td6 = document.createElement('td'),
				btnDelete = document.createElement('input'),
				btnEdit = document.createElement('input');

			btnDelete.setAttribute('type', 'button');
			btnDelete.setAttribute('value', 'Delete');
			btnDelete.setAttribute('class', 'btnDelete');
			btnDelete.setAttribute('id', i);

			btnEdit.setAttribute('type', 'button');
			btnEdit.setAttribute('value', 'Edit');

			btnEdit.setAttribute('class', 'btnEdit');

			btnEdit.setAttribute('id', i);

			//tr.appendChild(td0);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			tr.appendChild(td6);

			//td0.innerHTML = i + 1;
			td1.innerHTML = userData[i].name;
			td2.innerHTML = userData[i].birthday;
			td3.innerHTML = userData[i].age;
			td4.innerHTML = userData[i].gender;

			td5.appendChild(btnEdit);
			td6.appendChild(btnDelete);


			btnDelete.onclick = (function() {
				return function() {
					if (confirm("Are you sure you want to delete?")) {
						var deleteId = this.getAttribute('id');
						userData.splice(deleteId, 1);
						updateTable();
						refreshForm();
					}
				};
			})();

			btnEdit.addEventListener('click', function() {
				var editId = this.getAttribute('id');
				window.scrollTo({
					  top: 0, 
					  left: 0, 
					  behavior: 'smooth' 
					});
				updateForm(editId);
			}, false);

			tbody.appendChild(tr);
		}
		dataTable.appendChild(tbody);
	}

	// Set form for data edit
	var updateForm = function(id) {
		console.log(userData[id].name);
		var nameField = document.getElementById('name'),
			birthdayField = document.getElementById('birthday'),
			ageField = document.getElementById('age'),
			saveButton = document.getElementById('btnSave');

		nameField.value = userData[id].name;
		birthdayField.value = userData[id].birthday;
		ageField.value = userData[id].age;
		genderField.value = userData[id].gender;
		saveButton.value = 'Update';
		saveButton.setAttribute('data-update', id);
	}

	// Save new data
	var saveData = function() {
		var newName = document.getElementById('name').value,
			newBirthday = document.getElementById('birthday').value,
			newAge = document.getElementById('age').value,
			newGender = document.getElementById('gender').value,
			datatoAdd = {
				name: newName,
				birthday: newBirthday,
				age: newAge,
				gender: newGender,
			};

		userData.push(datatoAdd);
		updateTable();
	}

	// Update data
	var updateData = function(id) {
		var upName = document.getElementById('name').value,
			upBirthday = document.getElementById('birthday').value;
			upAge = document.getElementById('age').value;

		userData[id].name = upName;
		userData[id].birthday = upBirthday;
		userData[id].age = upAge;
		updateTable();
	}

	// Reset the form
	var refreshForm = function() {
		var nameField = document.getElementById('name'),
			birthdayField = document.getElementById('birthday'),
			ageField = document.getElementById('age'),
			saveButton = document.getElementById('btnSave');

		nameField.value = '';
		birthdayField.value = '';
		ageField.value = '';
		saveButton.value = 'Save';
		saveButton.removeAttribute('data-update');
	}

	// Main function
	var init = function() {
		updateTable();

		var btnSave = document.getElementById('btnSave'),
			btnRefresh = document.getElementById('btnRefresh');

		btnSave.onclick = function() {
			if (btnSave.getAttribute('data-update')) {
				updateData(btnSave.getAttribute('data-update'));
			} else {
				saveData();
			}
			refreshForm();
		};

		btnRefresh.onclick = function() {
			refreshForm();
		};
	};

	init(); //Intialize the table
})();