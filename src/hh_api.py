import requests


class HHApi:
    def __init__(self):
        self.url = 'https://api.hh.ru/vacancies/'

    def get_jobs(self, param):
        page = 0
        params = {'text': param, 'per_page': 5, 'page': page}
        items = []
        while page < 1:
            result = requests.get(self.url, params=params)
            if not result.ok:
                break
            item_list = result.json()['items']
            items.extend(list(map(
                lambda item: {
                    'requirements': item['snippet']['requirement'],
                    'salary': item.get('salary').get('from') if item.get('salary') else None,
                    'title': item['name']
                }, item_list
            )))
            page += 1
            params['page'] = page
        return items

hh_api = HHApi()
