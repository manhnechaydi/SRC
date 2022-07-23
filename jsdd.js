function playsound() {
    alert('Welcome');
    window.open("https://www.youtube.com/watch?v=23sQXMIQ0hk&t=0s");
}
var sinhvien =[];
function xacnhan() {
	var ten_sobaodanh1 = document.getElementById("User1").value;
	// alert(ten_sobaodanh1);
	var ten_sobaodanh2 = document.getElementById("User2").value;
	// alert(ten_sobaodanh2);
	var thg1 = document.getElementById('div2');
	var today = new Date();
	var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + ' ' + time;
		var tt = {
			ten_sobaodanh1: ten_sobaodanh1,
			ten_sobaodanh2: ten_sobaodanh2,
			x: dateTime
		}	

	if ((ten_sobaodanh1 == "" && ten_sobaodanh2 != "") || (ten_sobaodanh2 == "" && ten_sobaodanh1 != "")) {



		thg1.innerHTML = '<p>information: ' + ten_sobaodanh1 + ' ' + ten_sobaodanh2 + '<p>' + dateTime;
		//if (ten_sobaodanh1 != "" && ten_sobaodanh2 == "") document.forms["test"]["User2"].value = "0";
		//if (ten_sobaodanh1 == "" && ten_sobaodanh2 != "") document.forms["test"]["User1"].value = "0";

		//for (var i = 0; i < sinhvien.length;i++)
		//if (table.rowData.cell2 == ten_sobaodanh1 || table.rowData.cell2 == ten_sobaodanh2) alert('fukyou');
		//else {
		//if (sinhvien.length > 0) {
			//for (var i = 0; i < sinhvien.length; i++)
				//for (var j = sinhvien.length; j > 0; j--) {
					//if (sinhvien[i].ten_sobaodanh1.value == sinhvien[j].ten_sobaodanh1.value) alert('dm');
					//else {
					//	sinhvien.push(tt);

					//	console.log("ds:", sinhvien);

					//	inds();
					//}
				//}
		//} else {
			sinhvien.push(tt);

			console.log("ds:", sinhvien);

		inds();
	//}
		

		document.forms["test"]["User1"].value = "";
		document.forms["test"]["User2"].value = "";



	} else
			{
				alert('please choose again!');
				document.forms["test"]["User1"].value = "";
				document.forms["test"]["User2"].value = "";
			}

    
    


}



function inds() {
	var table = document.getElementById("mytable")

	//for (var j = 0; j < i; j++) {
		//if (sinhvien[j] = sinhvien[i]) alert('đã dc sử dụng!')

		//else {
	for (var i = table.rows.length - 1; i >= 0; i--) { table.deleteRow(i); }
	//for (var i = table.rows.length - 1; i >= 0; i--) { if () table.deleteRow(i); }



	for (var i = 0; i < sinhvien.length; i++) {
		

				var ojb = sinhvien[i];



				var row = table.insertRow(0);


				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				//var cell5 = row.insertCell(4);
				cell1.innerHTML = "🐣🐣";
				cell2.innerHTML = ojb.ten_sobaodanh1;
				cell3.innerHTML = ojb.ten_sobaodanh2;
				cell4.innerHTML = ojb.x;
				//cell5.innerHTML = "check";

			

				

			}
		}
	//}
//}	








let myData = [];
let myHeader = [];
let myFooter = [];

function getData() {
	$.ajax({
		url: 'https://randomuser.me/api/?results=10',
		dataType: 'json',
		success: function (data) {
			console.log('getData', data.results);
			showData(data.results);
		},
	});
}

function showData(data) {
	// console.log(data);
	myData = data.map((d) => {
		const sign = Math.random() < 0.5 ? -1 : 1;
		return {
			firstName: d?.name?.first,
			lastName: d?.name?.last,
			email: d?.email,
			phone: d?.phone,
			income: +(Math.random() * 1000).toFixed(2) * sign,
		};
	});
	console.log('myData', myData);
	let html =
		'<tr><td>name</td><td>surname</td><td>Email</td><td>Phone</td><td>Income</td></tr>';
	let total = 0;
	$.each(myData, function (key, value) {
		html += '<tr>';
		html += '<td>' + value?.firstName + '</td>';
		html += '<td>' + value?.lastName + '</td>';
		html += '<td>' + value?.email + '</td>';
		html += '<td>' + value?.phone + '</td>';
		html += '<td align="right">' + value?.income + '</td>';
		html += '</tr>';
		total += +value?.income;
	});
	html += '<tr>';
	html += '<td colspan="4">Total</td>';
	html += '<td align="right">' + +total.toFixed(2) + '</td>';
	html += '</tr>';
	myFooter = ['Total', '', '', '', +total.toFixed(2)];
	// console.log('html', html);
	$('table tbody').html(html);
}

async function exportToExcel(fileName, sheetName, report) {
	if (!myData || myData.length === 0) {
		console.error('ChÆ°a cĂ³ data');
		return;
	}
	console.log('exportToExcel', myData);

	if (report !== '') {
		myHeader = ['name', 'surname»', 'Email', 'Phone', 'Income'];
		exportToExcelPro('Users', 'Users', report, myHeader, myFooter, [
			{ width: 15 },
			{ width: 15 },
			{ width: 30 },
			{ width: 20 },
			{ width: 20 },
		]);
		return;
	}

	const wb = new ExcelJS.Workbook();
	const ws = wb.addWorksheet(sheetName);
	const header = Object.keys(myData[0]);
	console.log('header', header);
	ws.addRow(header);
	myData.forEach((rowData) => {
		console.log('rowData', rowData);
		row = ws.addRow(Object.values(rowData));
	});

	const buf = await wb.xlsx.writeBuffer();
	saveAs(new Blob([buf]), `${fileName}.xlsx`);
}

async function exportToExcelPro(
	fileName,
	sheetName,
	report,
	myHeader,
	myFooter,
	widths
) {
	if (!myData || myData.length === 0) {
		console.error('ChÆ°a cĂ³ data');
		return;
	}
	console.log('exportToExcel', myData);

	const wb = new ExcelJS.Workbook();
	const ws = wb.addWorksheet(sheetName);
	const columns = myHeader?.length;
	const title = {
		border: true,
		money: false,
		height: 100,
		font: { size: 30, bold: false, color: { argb: 'FFFFFF' } },
		alignment: { horizontal: 'center', vertical: 'middle' },
		fill: {
			type: 'pattern',
			pattern: 'solid', //darkVertical
			fgColor: {
				argb: '0000FF',
			},
		},
	};
	const header = {
		border: true,
		money: false,
		height: 70,
		font: { size: 15, bold: false, color: { argb: 'FFFFFF' } },
		alignment: { horizontal: 'center', vertical: 'middle' },
		fill: {
			type: 'pattern',
			pattern: 'solid', //darkVertical
			fgColor: {
				argb: 'FF0000',
			},
		},
	};
	const data = {
		border: true,
		money: true,
		height: 0,
		font: { size: 12, bold: false, color: { argb: '000000' } },
		alignment: null,
		fill: null,
	};
	const footer = {
		border: true,
		money: true,
		height: 70,
		font: { size: 15, bold: true, color: { argb: 'FFFFFF' } },
		alignment: null,
		fill: {
			type: 'pattern',
			pattern: 'solid', //darkVertical
			fgColor: {
				argb: '0000FF',
			},
		},
	};
	if (widths && widths.length > 0) {
		ws.columns = widths;
	}

	let row = addRow(ws, [report], title);
	mergeCells(ws, row, 1, columns);

	addRow(ws, myHeader, header);
	// console.log('wb', wb);
	myData.forEach((row) => {
		addRow(ws, Object.values(row), data);
	});
	// console.log('myFooter', myFooter);

	row = addRow(ws, myFooter, footer);
	mergeCells(ws, row, 1, columns - 1);

	const buf = await wb.xlsx.writeBuffer();
	saveAs(new Blob([buf]), `${fileName}.xlsx`);
}

function addRow(ws, data, section) {
	const borderStyles = {
		top: { style: 'thin' },
		left: { style: 'thin' },
		bottom: { style: 'thin' },
		right: { style: 'thin' },
	};
	const row = ws.addRow(data);
	console.log('addRow', section, data);
	row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
		if (section?.border) {
			cell.border = borderStyles;
		}
		if (section?.money && typeof cell.value === 'number') {
			cell.alignment = { horizontal: 'right', vertical: 'middle' };
			cell.numFmt = '$#,##0.00;[Red]-$#,##0.00';
		}
		if (section?.alignment) {
			cell.alignment = section.alignment;
		} else {
			cell.alignment = { vertical: 'middle' };
		}
		if (section?.font) {
			cell.font = section.font;
		}
		if (section?.fill) {
			cell.fill = section.fill;
		}
	});
	if (section?.height > 0) {
		row.height = section.height;
	}
	return row;
}

function mergeCells(ws, row, from, to) {
	// console.log(
	// 	'mergeCells',
	// 	row,
	// 	from,
	// 	to,
	// 	row.getCell(from)._address,
	// 	row.getCell(to)._address
	// );
	ws.mergeCells(`${row.getCell(from)._address}:${row.getCell(to)._address}`);
}

function columnToLetter(column) {
	var temp,
		letter = '';
	while (column > 0) {
		temp = (column - 1) % 26;
		letter = String.fromCharCode(temp + 65) + letter;
		column = (column - temp - 1) / 26;
	}
	return letter;
}
   

