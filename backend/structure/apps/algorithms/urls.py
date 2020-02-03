# from django.conf.urls import include, url

# from rest_framework.routers import DefaultRouter

# from .views import (
#     AlgorithmViewSet, AlgorithmsFavoriteAPIView, AlgorithmsFeedAPIView,
#     CommentsListCreateAPIView, CommentsDestroyAPIView, TagListAPIView
# )

# router = DefaultRouter(trailing_slash=False)
# router.register(r'algorithms', AlgorithmViewSet)

# urlpatterns = [
#     url(r'^', include(router.urls)),

#     url(r'^algorithms/feed/?$', AlgorithmsFeedAPIView.as_view()),

#     url(r'^algorithms/(?P<algorithm_slug>[-\w]+)/favorite/?$',
#         AlgorithmsFavoriteAPIView.as_view()),

#     url(r'^algorithms/(?P<algorithm_slug>[-\w]+)/comments/?$', 
#         CommentsListCreateAPIView.as_view()),

#     url(r'^algorithms/(?P<algorithm_slug>[-\w]+)/comments/(?P<comment_pk>[\d]+)/?$',
#         CommentsDestroyAPIView.as_view()),

#     url(r'^tags/?$', TagListAPIView.as_view()),
# ]

from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from .views import (
    AlgorithmViewSet, AlgorithmsFavoriteAPIView, AlgorithmsFeedAPIView, AlgorithmViewSetAdmin
)

app_name = 'algorithms'

router = DefaultRouter()
router.register(r'algorithms', AlgorithmViewSet)

#Admin
router.register(r'algorithms_Admin', AlgorithmViewSetAdmin)

urlpatterns = [
    url(r'^', include(router.urls)),

    url(r'^algorithms/feed/?$', AlgorithmsFeedAPIView.as_view()),
    url(r'^algorithms/(?P<algorithm_slug>[-\w]+)/favorite/?$',AlgorithmsFavoriteAPIView.as_view()),
]
