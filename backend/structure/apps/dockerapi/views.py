from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from structure.apps.core.renderers import CustomJSONRenderer
import docker
class DockerAPIView(APIView):
    # Allow any user (authenticated or not) to hit this endpoint.
    permission_classes = (AllowAny,)
    renderer_classes = (CustomJSONRenderer,)

    def post(self, request):

        # The create serializer, validate serializer, save serializer pattern
        # below is common and you will see it a lot throughout this course and
        # your own work later on. Get familiar with it.
        image = "python:3.4-alpine"
        code = request.data.get('code', {})
        client = docker.from_env()
        print("python -c \"" + code +"\"")
        try:
            container = client.containers.run(image, "python -c \"" + code +"\"", auto_remove=True, network_disabled=True)
            res = container.decode("utf-8")
            print(container)
            print(res)
            return Response({"response":res}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(str(e))
            return Response({"response":str(e)}, status=status.HTTP_400_BAD_REQUEST)
