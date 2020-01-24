from structure.apps.core.renderers import CustomJSONRenderer


class ProfileJSONRenderer(CustomJSONRenderer):
    object_label = 'profile'
    pagination_object_label = 'profiles'
    pagination_count_label = 'profilesCount'
