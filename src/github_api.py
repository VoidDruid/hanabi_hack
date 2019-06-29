from github import Github
from collections import defaultdict


class GithubApi:
    def __init__(self):
        self.g = Github("KovalevVasilii", "witcher136")

    def get_user_repos(self, user_name):
        try:
            return self.g.get_user(user_name).get_repos()
        except:
            return None

    def get_languages_counts(self, user_name):
        lang_dict = defaultdict(int)
        try:
            for repo in self.get_user_repos(user_name):
                lang_dict[repo.language] += 1
            lang_dict.pop(None, None)
        except:
            return None
        return lang_dict

    def get_stars(self, user_name):
        stars_count = 0
        try:
            for repo in self.get_user_repos(user_name):
                stars_count += repo.stargazers_count
        except:
            pass

        return stars_count

    def get_user_events_pr(self, user_name):
        try:
            return api.g.search_issues('', involves=user_name, type='pr')
        except:
            return None

    def get_prs_by_language(self, user_name):
        lang_dict = defaultdict(int)
        events = self.get_user_events_pr(user_name)
        if events:
            for ev in events:
                lang_dict[ev.repository.language] += 1
            lang_dict.pop(None, None)
        return lang_dict


api = GithubApi()
#api.get_dict_languages_pull_request('KovalevVasilii')