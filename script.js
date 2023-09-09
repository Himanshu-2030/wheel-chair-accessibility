var links = document.querySelectorAll('.left-panel a');
var contentSections = document.querySelectorAll('.content > div');

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Get the target class (e.g., "bhilai") from the link's href
    var targetClass = this.getAttribute('href').substring(1);

    // Toggle the visibility of elements with the target class
    for (var j = 0; j < contentSections.length; j++) {
      if (contentSections[j].classList.contains(targetClass)) {
        contentSections[j].style.display = 'block';
      } else {
        contentSections[j].style.display = 'none';
      }
    }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  // Load the JSON file
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const contentContainer = document.querySelector('.content');

      // Loop through the cities in the JSON data
      data.places.forEach(cityData => {
        // Create a div for the city
        const cityDiv = document.createElement('div');
        cityDiv.classList.add('city', cityData.city);

        // Loop through the locations in the city
        cityData.locations.forEach(location => {
          // Create a div for each location
          const locationDiv = document.createElement('div');
          locationDiv.classList.add('div', cityData.city);

          // Create a link for each location
          const a = document.createElement('a');
          a.textContent = location.name;
          a.href = location.location;
          a.target = '_blank'; // Open the link in a new tab

          // Append the link to the location div
          locationDiv.appendChild(a);

          // Append the location div to the city div
          cityDiv.appendChild(locationDiv);
        });

        // Append the city div to the content section
        contentContainer.appendChild(cityDiv);
      });

      // Function to show content for a specific city
      function showCityContent(city) {
        const cityDivs = document.querySelectorAll('.city');
        cityDivs.forEach(div => {
          div.style.display = div.classList.contains(city) ? 'block' : 'none';
        });
      }

      // Add click event listeners to the city links
      const cityLinks = document.querySelectorAll('.left-panel a');
      cityLinks.forEach(link => {
        link.addEventListener('click', function(event) {
          event.preventDefault();
          const city = this.getAttribute('href').substring(1);
          showCityContent(city);
        });
      });

      // Show content for the first city initially (you can change this if needed)
      showCityContent('bhilai');
    })
    .catch(error => console.error('Error loading JSON:', error));
});








