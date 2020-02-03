from django.conf.urls import include, url
from .views import (
    DockerAPIView
)

app_name = 'dockerapi'

urlpatterns = [
    url(r'^docker/?$', DockerAPIView.as_view()),
]
