if (window.location.href.includes('https://www.netflix')) {
  let currentTitle = null;
  const initRatingDiv = () => {
    const div = document.createElement('div');
    div.style = `
      background-color: #FFF;
      padding: 0.5rem;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9999;
      opacity: 0.9;
      pointer-events: none;
    `;
    document.body.appendChild(div);
    return div;
  };

  const updateRatingDiv = (title, rating) => {
    ratingDiv.innerHTML = `
    <span style="color: #000">
      ${title || 'Unknown'}: ${rating || 'unknown'}
    </span>`;
  };

  const getSelectedElementTitle = () => {
    const selected = document.querySelector('a.slider-refocus:hover');
    return selected && selected.getAttribute('aria-label');
  }

  const getMovieInfo = (movieTitle) =>
    fetch(`https://www.omdbapi.com/?t=${encodeURI(movieTitle)}&apikey=323c7371`)
      .then(res => res.json()).then(res => res);

  const ratingDiv = initRatingDiv();
  updateRatingDiv();

  document.body.addEventListener('mousemove', () => {
    const title = getSelectedElementTitle();
    if (title && currentTitle !== title) {
      currentTitle = title;
      getMovieInfo(title).then(({ Title, imdbRating }) => updateRatingDiv(Title, imdbRating));
    }
  });
}
