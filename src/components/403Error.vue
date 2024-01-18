<template>
    <body>
        <div class="error-container">
            <div class="error-code">403</div>
            <div class="error-message">Forbidden</div>
            <div class="error-description">
                Sorry, you don't have permission to access this resource.
            </div>
            <a href="/" class="back-link">Go back to home</a>
        </div>
    </body>
</template>

<style scoped>
body {
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.error-container {
    text-align: center;
}

.error-code {
    font-size: 10em;
    color: #dc3545;
}

.error-message {
    font-size: 2em;
    color: #495057;
}

.error-description {
    font-size: 1.2em;
    color: #6c757d;
}

.back-link {
    margin-top: 20px;
    font-size: 1.2em;
    color: #007bff;
    text-decoration: none;
}

.back-link:hover {
    text-decoration: underline;
}
</style>