from github import Github
from collections import defaultdict


class GithubApi:
    def __init__(self):
        self.g = Github("KovalevVasilii", "witcher136")

    def get_user_repos(self, user_name):
        try:
            return self.g.get_user(user_name).get_repos()
        except:
            return []

    def get_languages_counts(self, user_name):
        lang_dict = defaultdict(int)
        try:
            for repo in self.get_user_repos(user_name):
                lang_dict[repo.language] += 1
            lang_dict.pop(None, None)
        except:
            return {}
        return lang_dict

    def get_stars(self, user_name):
        stars_count = 0
        try:
            for repo in self.get_user_repos(user_name):
                stars_count += repo.stargazers_count
        finally:
            return stars_count

    def get_user_prs(self, user_name):
        try:
            return self.g.search_issues('', involves=user_name, type='pr')
        except:
            return []

    def get_user_issues(self, user_name):
        try:
            return self.g.search_issues('', involves=user_name, type='issue')
        except:
            return []

    def get_prs_by_language(self, user_name):
        lang_dict = defaultdict(int)
        events = self.get_user_prs(user_name)
        if events:
            for ev in events:
                lang_dict[ev.repository.language] += 1
            lang_dict.pop(None, None)
        return lang_dict

    def count_prs(self, user_name):
        prs_dict = defaultdict(lambda: defaultdict(int))
        prs = self.get_user_prs(user_name)
        if prs:
            for pr in prs:
                p = pr.as_pull_request()
                if p.merged:
                    prs_dict[p.head.repo.language]['merged'] += 1
                else:
                    prs_dict[p.head.repo.language]['failed'] += 1
        return prs_dict


api = GithubApi()
