import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','structure.settings')

import django
django.setup()

from structure.apps.algorithms.models import Algorithm
from structure.apps.profiles.models import Profile
from structure.apps.authentication.models import User
from faker import Faker

fake = Faker()

def call(N):
    for i in range(N):
        fake_slug = fake.slug()

        fake_slug = fake.slug()
        fake_title = fake.word()
        fake_description = fake.text()
        fake_body = fake.text()
        author_yomogan = Profile.objects.get_or_create(user__username='yomogan')[0]

        a = Algorithm.objects.get_or_create(slug=fake_slug, title=fake_title, description=fake_description, body=fake_body, author=author_yomogan)[0]

        fake_body = fake.text()

if __name__ == '__main__':
    print("Filling random data")
    call(10)
    print("Filling done ")
    