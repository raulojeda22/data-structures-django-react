from rest_framework import generics, mixins, status, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.permissions import (
    AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Algorithm
from .renderers import AlgorithmJSONRenderer
from .serializers import AlgorithmSerializer

#Admin
class AlgorithmViewSetAdmin(viewsets.ModelViewSet):
    queryset = Algorithm.objects.all()
    serializer_class = AlgorithmSerializer
    lookup_field = 'slug'
    permission_classes = (IsAuthenticated,)
    permission_classes = (IsAdminUser,)

class AlgorithmViewSet(mixins.CreateModelMixin, 
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     viewsets.GenericViewSet):

    lookup_field = 'slug'
    queryset = Algorithm.objects.select_related('author', 'author__user')
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (AlgorithmJSONRenderer,)
    serializer_class = AlgorithmSerializer

    def get_queryset(self):
        queryset = self.queryset

        author = self.request.query_params.get('author', None)
        if author is not None:
            queryset = queryset.filter(author__user__username=author)

        favorited_by = self.request.query_params.get('favorited', None)
        if favorited_by is not None:
            queryset = queryset.filter(
                favorited_by__user__username=favorited_by
            )

        return queryset

    def create(self, request):
        serializer_context = {
            'author': request.user.profile,
            'request': request
        }
        serializer_data = request.data.get('algorithm', {})

        serializer = self.serializer_class(
        data=serializer_data, context=serializer_context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        serializer_context = {'request': request}
        page = self.paginate_queryset(self.get_queryset())

        serializer = self.serializer_class(
            page,
            context=serializer_context,
            many=True
        )

        return self.get_paginated_response(serializer.data)

    def retrieve(self, request, slug):
        serializer_context = {'request': request}

        try:
            serializer_instance = self.queryset.get(slug=slug)
        except Algorithm.DoesNotExist:
            raise NotFound('An algorithm with this slug does not exist.')

        serializer = self.serializer_class(
            serializer_instance,
            context=serializer_context
        )

        return Response(serializer.data, status=status.HTTP_200_OK)


    def update(self, request, slug):
        serializer_context = {'request': request}

        try:
            serializer_instance = self.queryset.get(slug=slug)
        except Algorithm.DoesNotExist:
            raise NotFound('An algorithm with this slug does not exist.')

        serializer_data = request.data.get('algorithm', {})

        serializer = self.serializer_class(
            serializer_instance, 
            context=serializer_context,
            data=serializer_data, 
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

class AlgorithmsFavoriteAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (AlgorithmJSONRenderer,)
    serializer_class = AlgorithmSerializer

    def delete(self, request, algorithm_slug=None):
        profile = self.request.user.profile
        serializer_context = {'request': request}

        try:
            algorithm = Algorithm.objects.get(slug=algorithm_slug)
        except Algorithm.DoesNotExist:
            raise NotFound('An algorithm with this slug was not found.')

        profile.unfavorite(algorithm)

        serializer = self.serializer_class(algorithm, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, algorithm_slug=None):
        profile = self.request.user.profile
        serializer_context = {'request': request}

        try:
            algorithm = Algorithm.objects.get(slug=algorithm_slug)
        except Algorithm.DoesNotExist:
            raise NotFound('An algorithm with this slug was not found.')

        profile.favorite(algorithm)

        serializer = self.serializer_class(algorithm, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AlgorithmsFeedAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Algorithm.objects.all()
    renderer_classes = (AlgorithmJSONRenderer,)
    serializer_class = AlgorithmSerializer

    def get_queryset(self):
        return Algorithm.objects.filter(
            author__in=self.request.user.profile.follows.all()
        )

    def list(self, request):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)

        serializer_context = {'request': request}
        serializer = self.serializer_class(
            page, context=serializer_context, many=True
        )

        return self.get_paginated_response(serializer.data)
