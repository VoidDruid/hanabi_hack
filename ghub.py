from github import Github

g = Github("IgorBeschastnov", "Spacewalk_1")

user = g.get_user("jdufresne")
print(user.name)
print(list(user.get_public_events()))
