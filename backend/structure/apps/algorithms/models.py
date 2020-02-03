from django.db import models

from structure.apps.core.models import TimestampedModel


class Algorithm(TimestampedModel):
    slug = models.SlugField(db_index=True, max_length=255, unique=True)
    title = models.CharField(db_index=True, max_length=255)

    description = models.TextField()
    body = models.TextField()

    # Every algorithm must have an author. This will answer questions like "Who
    # gets credit for writing this algorithm?" and "Who can edit this algorithm?".
    # Unlike the `User` <-> `Profile` relationship, this is a simple foreign
    # key (or one-to-many) relationship. In this case, one `Profile` can have
    # many `Algorithm`s.
    author = models.ForeignKey(
        'profiles.Profile', on_delete=models.CASCADE, related_name='algorithms'
    )

    def __str__(self):
        return self.title
