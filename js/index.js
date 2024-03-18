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
  const h3 = document.createElement("h3");
  h3.textContent = user.login;
  const repoList = document.createElement("li");
  repoList.className = "button";
  repoList.innerText = `view ${user.login}'s repository`;
  repoList.addEventListener("click", () => {
    fetch(`https://api.github.com/users/${user.login}/repos`)
      .then((res) => res.json())
      .then((repo) => {
        repo.forEach((repo) => {
          //   console.log(repo);

          const li = document.createElement("li");
          const a = document.createElement("a");
          a.innerText = repo.html_url;
          a.href = repo.html_url;
          document.getElementById("repos-list").append(li, a);
        });
      })
      .catch((err) => console.log(err));
    repoList.style.color = "red";
  });
  //  User's profile
  const profile = document.createElement("a");
  profile.href = user.html_url;
  profile.innerText = `view ${user.login}'s profile !`;

  const img = document.createElement("img");
  img.src = user.avatar_url;
  card.append(h3, repoList, profile, img);
  document.getElementById("user-list").append(card);
}
