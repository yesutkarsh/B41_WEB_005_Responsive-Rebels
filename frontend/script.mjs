// Algorithm data
const algorithmsData = [
    {
        title: "Bubble Sort",
        link: "./Algorithms/Bubble Sort/main.html",
        icon: "ri-bubble-chart-line"
    },
    {
        title: "Merge Sort",
        link: "./Algorithms/Merge Sort/main.html",
        icon: "ri-git-merge-line"
    },
    {
        title: "Linked List",
        link: "./Algorithms/Linked List/main.html",
        icon: "ri-link"
    },
    {
        title: "Selection Sort",
        link: "./Algorithms/Selection Sort/main.html",
        icon: "ri-list-check"
    },
    {
        title: "Queue",
        link: "./Algorithms/Queue/index.html",
        icon: "ri-stack-line"
    },
    {
        title: "Two Pointer",
        link: "./Algorithms/Two Pointer/main.html",
        icon: "ri-arrow-left-right-line"
    }
];

const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeModal = document.getElementById('closeModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Open modal with button or Cmd/Ctrl+K
searchBtn.addEventListener('click', openModal);
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openModal();
    }
});

// Close modal with button or Escape
closeModal.addEventListener('click', closeModalFunction);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModalFunction();
});

function openModal() {
    searchModal.style.display = 'block';
    searchInput.focus();
    renderResults(algorithmsData);
}

function closeModalFunction() {
    searchModal.style.display = 'none';
    searchInput.value = '';
}

// Close modal when clicking outside
searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
        closeModalFunction();
    }
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredResults = algorithmsData.filter(algo => 
        algo.title.toLowerCase().includes(searchTerm)
    );
    renderResults(filteredResults);
});

function renderResults(results) {
    searchResults.innerHTML = results.map(result => `
        <a href="${result.link}" class="search-result-item">
            <i class="${result.icon}"></i>
            ${result.title}
        </a>
    `).join('');
}


