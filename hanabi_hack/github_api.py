from github import Github


class GithubApi:
    def __init__(self):
        self.g_object = Github("KovalevVasilii", "witcher136")
# Then play with your Github objects:
for repo in g.get_user('IgorBeschastnov').get_repos():
    print(repo.name, repo.language, repo.stargazers_count)