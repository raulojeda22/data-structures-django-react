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
        #client.containers.run(image, 'print("hey")' , True)
        #container = client.containers.run(image, "python -c \"print('miau')\nfor i in range(10):\n\tprint(i)\nprint('hey')\"", auto_remove=True)
        container = client.containers.run(image, "python -c \"" + code +"\"", auto_remove=True)
        res = container.decode("utf-8")
        return Response({"response":res}, status=status.HTTP_201_CREATED)

    def get(self, request):

        # The create serializer, validate serializer, save serializer pattern
        # below is common and you will see it a lot throughout this course and
        # your own work later on. Get familiar with it.

        image = "python:3.4-alpine"

        client = docker.from_env()
        #client.containers.run(image, 'print("hey")' , True)
        container = client.containers.run(image, "python -c \"print('miau')\nfor i in range(10):\n\tprint(i)\nprint('hey')\"", auto_remove=True)
        res = container.decode("utf-8")
        return Response({"response":res}, status=status.HTTP_201_CREATED)