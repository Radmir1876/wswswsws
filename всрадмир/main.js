document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const userProfile = document.getElementById('user-profile');
    const userIcon = document.getElementById('user-icon');
    const userNameElement = document.getElementById('user-name');
    const viewProfileLink = document.getElementById('view-profile');
    const profileUsername = document.getElementById('profile-username');
    const profileEmail = document.getElementById('profile-email');
    const profileRegistrationDate = document.getElementById('profile-registration-date');

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        userNameElement.textContent = user.username;
        profileUsername.textContent = user.username;
        profileEmail.textContent = user.email || 'Не указан';
        profileRegistrationDate.textContent = user.registrationDate || 'Не указана';
        viewProfileLink.style.display = 'block';
    }

    userIcon.addEventListener('click', function() {
        if (userProfile.style.display === 'none') {
            userProfile.style.display = 'block';
        } else {
            userProfile.style.display = 'none';
        }
    });

    viewProfileLink.addEventListener('click', function(event) {
        event.preventDefault();
        userProfile.style.display = 'block';
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const registrationDate = new Date().toLocaleString();
        localStorage.setItem('user', JSON.stringify({ username, password, email, registrationDate }));
        alert('Регистрация успешна');
        userProfile.style.display = 'block';
        userNameElement.textContent = username;
        profileUsername.textContent = username;
        profileEmail.textContent = email;
        profileRegistrationDate.textContent = registrationDate;
        window.location.href = 'index.html';
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const loginUsername = document.getElementById('login-username').value;
        const loginPassword = document.getElementById('login-password').value;
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username === loginUsername && user.password === loginPassword) {
            alert('Вход успешен');
            userProfile.style.display = 'block';
            userNameElement.textContent = user.username;
            profileUsername.textContent = user.username;
            profileEmail.textContent = user.email || 'Не указан';
            profileRegistrationDate.textContent = user.registrationDate || 'Не указана';
            window.location.href = 'index.html';
        } else {
            alert('Ошибка входа! Проверьте, правильно ли вы ввели свои данные.');
        }
    });

    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            sections.forEach(section => section.style.display = 'none');
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.style.display = 'block';
        });
    });
});
function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            const userPostsContainer = document.getElementById('user-posts');
            userPostsContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                `;
                userPostsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
}

function fetchComments() {
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(comments => {
            const userCommentsContainer = document.getElementById('user-comments-container');
            userCommentsContainer.innerHTML = '';
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.innerHTML = `
                    <h3>${comment.name}</h3>
                    <p>${comment.body}</p>
                `;
                userCommentsContainer.appendChild(commentElement);
            });
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
}

const links = document.querySelectorAll('nav ul li a');
links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetSectionId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            sections.forEach(section => section.style.display = 'none');
            targetSection.style.display = 'block';
            if (targetSectionId === 'user-posts') {
                fetchPosts();
            } else if (targetSectionId === 'user-comments') {
                fetchComments();
            }
        }
    });
});
