document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        document.getElementById('message').textContent = result.message;
    } catch (error) {
        document.getElementById('message').textContent = 'Upload failed. Please try again.';
    }
});
