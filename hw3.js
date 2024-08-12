const launchListContainer = document.getElementById('launch-list');

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        launchListContainer.innerHTML = `<p class="alert alert-danger">Error fetching launch data!</p>`;
    }
};

const displayLaunches = (launches) => {
    launches.forEach(launch => {
        const launchItem = document.createElement('div');
        launchItem.classList.add('card', 'mb-3');

        launchItem.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${launch.name}</h5>
                <p class="card-text">Date: ${new Date(launch.date_local).toLocaleDateString()}</p>
                <p class="card-text">Rocket: ${launch.rocket.name}</p>
            </div>
        `;

        launchListContainer.appendChild(launchItem);
    });
};

const fetchAndDisplayLaunches = async () => {
    const url = 'https://api.spacexdata.com/v4/launches/past';
    const launches = await fetchData(url);
    displayLaunches(launches);
};

fetchAndDisplayLaunches();
