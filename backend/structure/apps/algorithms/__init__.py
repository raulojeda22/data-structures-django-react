from django.apps import AppConfig


class AlgorithmsAppConfig(AppConfig):
    name = 'structure.apps.algorithms'
    label = 'algorithms'
    verbose_name = 'Algorithms'

    def ready(self):
        import structure.apps.algorithms.signals

default_app_config = 'structure.apps.algorithms.AlgorithmsAppConfig'
