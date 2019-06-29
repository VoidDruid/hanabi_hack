import random

from github import Github, PaginatedList
from collections import defaultdict
import pickle
from redis_db import redis_db


def redis_wrapper(field):
    def wrapper(func):
        def inner_func(self, user, *args, **kwargs):
            user_name = user if isinstance(user, str) else user.name
            lookup = redis_db.hget(user_name, field)
            if lookup:
                return pickle.loads(lookup)
            try:
                result = func(self, user, *args, **kwargs)
                if isinstance(result, PaginatedList.PaginatedList):
                    result = list(result)
                redis_db.hset(user_name, field, pickle.dumps(result))
                return result
            except:
                redis_db.delete(user_name)
                return None
        return inner_func
    return wrapper


class GithubApi:
    def __init__(self):
        self.g = Github("KovalevVasilii", "witcher136")

    @redis_wrapper('repos')
    def get_user_repos(self, user):
        if isinstance(user, str):
            user = self.g.get_user(user)
        try:
            repos = user.get_repos()
            return repos
        except:
            return []

    @redis_wrapper('lang_dict')
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

    @redis_wrapper('pr')
    def get_user_prs(self, user_name):
        try:
            return self.g.search_issues('', involves=user_name, type='pr')
        except:
            return []

    @redis_wrapper('issue')
    def get_user_issues(self, user_name):
        try:
            return self.g.search_issues('', involves=user_name, type='issue')
        except:
            return []

    @redis_wrapper('lang_dict_prs')
    def get_prs_by_language(self, user_name, prs=None):
        lang_dict = defaultdict(int)
        if prs is None:
            prs = self.get_user_prs(user_name)
        if prs:
            try:
                for ev in prs:
                    lang_dict[ev.repository.language] += 1
                lang_dict.pop(None, None)
            except AttributeError:
                pass
        return lang_dict

    @staticmethod
    def _defaultdict_int():
        return defaultdict(int)

    @redis_wrapper('prs_dict')
    def count_prs(self, user_name, prs=None):
        prs_dict = defaultdict(self._defaultdict_int)
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

    @redis_wrapper('prs_by_lang')
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

    @redis_wrapper('user_data')
    def get_user_profile(self, user_name):
        user_obj = self.g.get_user(user_name)
        repos = self.get_user_repos(user_obj)
        prs = self.get_user_prs(user_name)
        stars = self.get_stars(user_obj, repos)
        language_counts = self.get_languages_counts(user_obj, repos)

        user_data = {
            **language_counts,
            #**{'pr_'+key: value for key, value in self.get_prs_by_language(user_name, prs).items()},
            'stars': stars,
            'login': user_name,
            'contributions': user_obj.contributions,
            'following': user_obj.following,
            'followers': user_obj.followers,
            'repos': user_obj.public_repos,
        }
        return user_data

    def get_users_set(self, count=50):
        users = self.g.get_users(since=20000000)
        users_result = []
        for user, _ in zip(users, range(count)):
            users_result.append(user.login)
        return users_result


api = GithubApi()
