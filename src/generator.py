from github_api import api
import csv

result = []
for login in api.get_users_set():
    result.append(api.get_user_profile(login))

print(result)

headers = set()
for user in result:
    headers.update(set(user.keys()))
print(headers)
with open('data.csv', 'w') as f:
    w = csv.DictWriter(f, headers)
    w.writeheader()
    w.writerows(result)
