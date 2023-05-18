// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent page reload on form submission
    const searchInput = document.getElementById('search').value;
    searchUsers(searchInput);
}

// Function to search GitHub users
async function searchUsers(username) {
    const response = await fetch(`https://api.github.com/search/users?q=${username}`);
    const data = await response.json();
    displayUsers(data.items);
}

// Function to display user cards
function displayUsers(users) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Clear previous results

    users.forEach(user => {
        const card = createCard(user);
        cardContainer.appendChild(card);
    });
}

// Function to create a user card
function createCard(user) {
    const card = document.createElement('div');
    card.classList.add('card');

    const avatarContainer = document.createElement('div');
    avatarContainer.classList.add('avatar-container');

    const avatar = document.createElement('img');
    avatar.src = user.avatar_url;
    avatar.alt = `${user.login} avatar`;
    avatar.classList.add('avatar');
    avatarContainer.appendChild(avatar);

    card.appendChild(avatarContainer);

    const username = document.createElement('h3');
    username.textContent = user.login;
    card.appendChild(username);

    fetch(user.url)
        .then(response => response.json())
        .then(userData => {
            const stats = document.createElement('div');
            stats.classList.add('stats');

            const followers = document.createElement('p');
            followers.textContent = `Followers: ${userData.followers}`;
            stats.appendChild(followers);

            const following = document.createElement('p');
            following.textContent = `Following: ${userData.following}`;
            stats.appendChild(following);

            const repos = document.createElement('p');
            repos.textContent = `Public Repos: ${userData.public_repos}`;
            stats.appendChild(repos);

            card.appendChild(stats);
        })
        .catch(error => {
            console.log('Error fetching user data:', error);
        });

    const profileLink = document.createElement('a');
    profileLink.href = user.html_url;
    profileLink.textContent = 'View Profile';
    card.appendChild(profileLink);

    return card;
}

// Event listener for form submission
const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);