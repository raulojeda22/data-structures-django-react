from django.apps import AppConfig


class ArticlesAppConfig(AppConfig):
    name = 'structure.apps.articles'
    label = 'articles'
    verbose_name = 'Articles'

    def ready(self):
        import structure.apps.articles.signals

default_app_config = 'structure.apps.articles.ArticlesAppConfig'
