from structure.apps.core.renderers import CustomJSONRenderer


class AlgorithmJSONRenderer(CustomJSONRenderer):
    object_label = 'algorithm'
    pagination_object_label = 'algorithms'
    pagination_count_label = 'algorithmsCount'
