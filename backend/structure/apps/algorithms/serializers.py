from rest_framework import serializers

from structure.apps.profiles.serializers import ProfileSerializer

from .models import Algorithm


class AlgorithmSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(read_only=True)
    description = serializers.CharField(required=False)
    slug = serializers.SlugField(required=False)

    favorited = serializers.SerializerMethodField()
    favoritesCount = serializers.SerializerMethodField(
        method_name='get_favorites_count'
    )

    # Django REST Framework makes it possible to create a read-only field that
    # gets it's value by calling a function. In this case, the client expects
    # `created_at` to be called `createdAt` and `updated_at` to be `updatedAt`.
    # `serializers.SerializerMethodField` is a good way to avoid having the
    # requirements of the client leak into our API.
    createdAt = serializers.SerializerMethodField(method_name='get_created_at')
    updatedAt = serializers.SerializerMethodField(method_name='get_updated_at')

    class Meta:
        model = Algorithm
        fields = (
            'author',
            'body',
            'createdAt',
            'description',
            'favorited',
            'favoritesCount',
            'slug',
            'title',
            'updatedAt',
        )

    def create(self, validated_data):
        author = self.context.get('author', None)

        algorithm = Algorithm.objects.create(author=author, **validated_data)

        return algorithm

    def get_created_at(self, instance):
        return instance.created_at.isoformat()

    def get_favorited(self, instance):
        request = self.context.get('request', None)

        if request is None:
            return False

        # if not request.user.is_authenticated():
        if not request.user.is_authenticated:
            return False

        return request.user.profile.has_favorited(instance)

    def get_favorites_count(self, instance):
        return instance.favorited_by.count()

    def get_updated_at(self, instance):
        return instance.updated_at.isoformat()