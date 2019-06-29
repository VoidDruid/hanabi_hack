import random

from github import Github
from collections import defaultdict


class GithubApi:
    def __init__(self):
        self.g = Github("IgorBeschastnov", "Spacewalk_1")

    def get_user_repos(self, user):
        if isinstance(user, str):
            user = self.g.get_user(user)
        try:
            return user.get_repos()
        except:
            return []

    def get_languages_counts(self, user, repos=None):
        lang_dict = defaultdict(int)
        try:
            if repos is None:
                repos = self.get_user_repos(user)
            for repo in repos:
                lang_dict[repo.language] += 1
            lang_dict.pop(None, None)
        except:
            return {}
        return lang_dict

    def get_stars(self, user, repos=None):
        stars_count = 0
        try:
            if repos is None:
                repos = self.get_user_repos(user)
            for repo in repos:
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

    def get_prs_by_language(self, user_name, prs=None):
        lang_dict = defaultdict(int)
        if prs is None:
            prs = self.get_user_prs(user_name)
        if prs:
            for ev in prs:
                lang_dict[ev.repository.language] += 1
            lang_dict.pop(None, None)
        return lang_dict

    def count_prs(self, user_name, prs=None):
        prs_dict = defaultdict(lambda: defaultdict(int))
        if prs is None:
            prs = self.get_user_prs(user_name)
        if not prs:
            return {}
        for pr in prs:
            p = pr.as_pull_request()
            try:
                if p.merged:
                    prs_dict[p.head.repo.language]['merged'] += 1
                else:
                    prs_dict[p.head.repo.language]['failed'] += 1
            except AttributeError:
                pass
        return prs_dict

    def count_prs_by_language(self, user_name, prs):
        prs_dict = defaultdict(int)
        if prs is None:
            prs = self.get_user_prs(user_name)
        if not prs:
            return {}
        for pr in prs:
            p = pr.as_pull_request()
            try:
                prs_dict[p.head.repo.language] += 1
            except AttributeError:
                pass
        return prs_dict

    def get_user_profile(self, user_name):
        user_obj = self.g.get_user(user_name)
        if user_obj.public_repos == 0:
            return None
        repos = self.get_user_repos(user_obj)
        stars = self.get_stars(user_obj, repos)
        language_counts = self.get_languages_counts(user_obj, repos)
        user_data = {
            **language_counts,
            'stars': stars,
            'login': user_name,
            'contributions': user_obj.contributions,
            'following': user_obj.following,
            'followers': user_obj.followers,
            'repos': user_obj.public_repos,
        }
        return user_data

    def get_users_set(self, count=50, since=20000000):
        users = self.g.get_users(since=since)
        users_result = []
        for user, _ in zip(users, range(count)):
            users_result.append(user.login)
        return users_result


api = GithubApi()
