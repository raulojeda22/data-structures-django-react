from django.apps import AppConfig


class PostsAppConfig(AppConfig):
    name = 'structure.apps.posts'
    label = 'posts'
    verbose_name = 'Posts'

default_app_config = 'structure.apps.posts.PostsAppConfig'
