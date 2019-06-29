from github_api import api
import csv

result = []

start = 15000000
step = 100
while len(result) < 750:
    print('LEN RESULT:', len(result))
    for num, login in enumerate(api.get_users_set(step, since=start)):
        print(start+num-15000000)
        profile = api.get_user_profile(login)
        if profile is None:
            continue
        result.append(profile)
    start += step

headers = set()
for user in result:
    headers.update(set(user.keys()))

print(headers)

with open('data.csv', 'w') as f:
    w = csv.DictWriter(f, headers)
    w.writeheader()
    w.writerows(result)
