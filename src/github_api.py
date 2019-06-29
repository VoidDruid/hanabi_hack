from github import Github
from collections import defaultdict


class GithubApi:
    def __init__(self):
        self.g= Github("KovalevVasilii", "witcher136")

    def get_user_repos(self, user_name):
        try:
            return self.g.get_user(user_name).get_repos()
        except:
            return None

    def get_dict_languages(self, user_name):
        lang_dict = defaultdict(int)
        try:
            for repo in self.get_user_repos(user_name):
                lang_dict[repo.language] += 1
            del lang_dict[None]
        except:
            return None
        return lang_dict


api = GithubApi()