document.getElementById('select-directory').addEventListener('click', async () => {
    const directoryPaths = await window.electron.selectDirectory();
    if (directoryPaths.length > 0) {
        document.getElementById('selected-directory').innerText = `Selected Directory: ${directoryPaths[0]}`;
        document.getElementById('process-files').disabled = false;
    }
});

document.getElementById('process-files').addEventListener('click', async () => {
    const directoryPath = document.getElementById('selected-directory').innerText.replace('Selected Directory: ', '');
    const outputFilePath = await window.electron.processFiles(directoryPath);
    document.getElementById('output-file').innerText = `Output File: ${outputFilePath}`;
});
