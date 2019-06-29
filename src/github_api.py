from github import Github


class GithubApi:
    def __init__(self):
        self.g_object = Github("KovalevVasilii", "witcher136")

    def get_user_repos(self, user_name):
        try:
            return self.g_object.get_user(user_name).get_repos()
        except:


    def get_dict_languages(self, user_name):
        print(10)
# Then play with your Github objects:
#for repo in g.get_user('IgorBeschastnov').get_repos():
   # print(repo.name, repo.language, repo.stargazers_count)


if __name__ == '__main__':
    name = 'IgorBeschastno'
    api = GithubApi()
    api.get_user_repos(name)
    print(a)
