const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx'); // You might need to install this package

function finaliseData(data) {
    const mergedRecords = {};

    // Iterate over each record and merge based on 'Matric'
    data.forEach(record => {
        const matric = String(record.Matric).padStart(7, '0')
        if (!mergedRecords[matric]) {
            mergedRecords[matric] = { Surname: record.Surname, Forenames: record.Forenames, Matric: matric, Email: record.Email, Attendance: 0 };
        }
        mergedRecords[matric].Attendance += record.Attendance;
    });

    // Convert merged records back to a list of dictionaries
    const mergedList = Object.values(mergedRecords);

    // Sort the list by 'Attendance' with 0 at the top
    const sortedList = mergedList.sort((a, b) => a.Attendance - b.Attendance);

    return sortedList;
}

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function extractSecondKeyValues(row) {
    const keys = Object.keys(row);
    if (keys.length > 1) {
        return row[keys[1]];
    }
    return null; // Return null if there are not enough keys
}

function extractImportantColumns(data) {
    const columns = [];

    data.forEach(row => {
        const column = {};
        // console.log(row);
        if (isNumeric(row['__EMPTY_2'])) {
            column['Surname'] = row['Course'];
            column['Forenames'] = extractSecondKeyValues(row);
            column['Matric'] = row['__EMPTY_2'];
            column['Email'] = row['__EMPTY_3'];
            column['Attendance'] = row['__EMPTY_20'];
            columns.push(column);
        }
    });
    return columns;
}

async function processFiles(directoryPath) {
    const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.xlsx'));
    const data = [];

    files.forEach(file => {
        const workbook = xlsx.readFile(path.join(directoryPath, file));
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(sheet);
        const columns = extractImportantColumns(json);
        data.push(...columns);
    });

    // Perform your grouping and calculations here

    const finalData = finaliseData(data);
    const zeroAttendanceData = finalData.filter(record => record.Attendance === 0);
    const someAttendanceData = finalData.filter(record => record.Attendance > 0);
    const outputWorkbook = xlsx.utils.book_new();
    const outputSheet = xlsx.utils.json_to_sheet(finalData);
    const zeroSheet = xlsx.utils.json_to_sheet(zeroAttendanceData);
    const someSheet = xlsx.utils.json_to_sheet(someAttendanceData);
    xlsx.utils.book_append_sheet(outputWorkbook, outputSheet, 'All Results');
    xlsx.utils.book_append_sheet(outputWorkbook, zeroSheet, 'Zero Attendance');
    xlsx.utils.book_append_sheet(outputWorkbook, someSheet, 'Some Attendance');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const outputFilePath = path.join(require('os').homedir(), 'Desktop', `assessments-${formattedDate}.xlsx`);
    xlsx.writeFile(outputWorkbook, outputFilePath);

    return outputFilePath;
}

module.exports = processFiles;
