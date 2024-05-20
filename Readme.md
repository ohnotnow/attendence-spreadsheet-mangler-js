# Attendance Spreadsheet Mangler

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

Attendance Spreadsheet Mangler is an Electron-based application designed to streamline the process of managing and summarizing Moodle attendance records. The application extracts student attendance information from multiple `.xlsx` files and generates a consolidated `output.xlsx` file. This output file contains basic student information including name, matriculation number, and overall attendance statistics, providing a clear and concise summary for each student.

## Features

- Extracts attendance data from multiple `.xlsx` files.
- Generates a consolidated `output.xlsx` file with essential attendance statistics.
- Easy-to-use Electron interface.
- Cross-platform support.

## Installation

To install and run Attendance Spreadsheet Mangler, ensure you have [Node.js](https://nodejs.org/) installed on your system.

1. Clone the repository:
    ```sh
    git clone https://github.com/ohnotnow/attendence-spreadsheet-mangler-js.git
    ```

2. Navigate to the project directory:
    ```sh
    cd attendence-spreadsheet-mangler-js
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

## Local usage using npm

After installing the dependencies, you can run the application using the following command:

```sh
npm start
```

## Building an Executable

To build an executable for Attendance Spreadsheet Mangler using `electron-forge`, follow these steps:

1. Ensure you have installed all dependencies as mentioned in the [Installation](#installation) section.

2. Build the executable using the following command:
    ```sh
    npm run make
    ```

3. The built executables will be found in the `out/make` directory.

### Configuration

The build process uses the configuration specified in the `forge.config.js` file. This file defines the settings for `electron-forge` to package your application correctly.

### Customizing the Build

If you need to customize the build process, you can modify the `forge.config.js` file according to your requirements. Refer to the [Electron Forge documentation](https://www.electronforge.io/configuration) for detailed configuration options.

By following these steps, you should be able to create executables for different platforms easily. If you encounter any issues during the build process, please refer to the [Electron Forge documentation](https://www.electronforge.io) or open an issue on the [GitHub repository](https://github.com/ohnotnow/attendence-spreadsheet-mangler-js).

### How to Use

1. Launch the application.
2. Use the interface to select the `.xlsx` files containing Moodle attendance records then press the 'Process' button.
3. The application will process the files and generate a `output.xlsx` file on your desktop with a sheet for the consolidated attendance data, people with zero attendance and one for people with some attendance.

## Development

To contribute to the development of this project, follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine:
    ```sh
    git clone https://github.com/your-username/attendence-spreadsheet-mangler-js.git
    ```
3. Create a new branch for your feature or bug fix:
    ```sh
    git checkout -b feature-name
    ```
4. Make your changes and commit them with a detailed message:
    ```sh
    git commit -m "Description of your changes"
    ```
5. Push your changes to your forked repository:
    ```sh
    git push origin feature-name
    ```
6. Create a pull request on the original repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
