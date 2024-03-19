document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("github-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = e.target.search.value;
    fetch(`https://api.github.com/search/users?q=${username}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        data.items.forEach((user) => {
          renderCard(user);
        });
      })
      .catch((err) => console.log(err));
    form.reset();
  });
});

function renderCard(user) {
  const card = document.createElement("li");
  card.innerHTML = `
  <h3>${user.login}</h3>
  <li class="button" >view ${user.login}'s repository</li>
  <a href="${user.html_url}">view ${user.login}'s profile !</a>
  <img src="${user.avatar_url}">
   `;
  document.getElementById("user-list").append(card);
  card.querySelector(".button").addEventListener("click", () => {
    fetch(`https://api.github.com/users/${user.login}/repos`)
      .then((res) => res.json())
      .then((repo) => {
        repo.forEach((repo) => {
          //   console.log(repo);

          const repoList = document.createElement("li");
          repoList.innerHTML = `
          <a href="${repo.html_url}">${repo.html_url}</a>`;
          document.getElementById("repos-list").append(repoList);
        });
      })
      .catch((err) => console.log(err));
    repoList.style.color = "red";
  });
}
