from django.shortcuts import render

# Create your views here.

from rest_framework.generics import ListAPIView, UpdateAPIView, CreateAPIView, DestroyAPIView
from rest_framework.generics import ListUpdateAPIView
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Account, PetShelter, PetSeeker
from rest_framework.permissions import IsAuthenticated
from .serializers import SeekerSerializer, ShelterSerializer, ShelterDetailsSerializer, ShelterListSerializer

# Login stuff is covered by the tokens?
# Create/Update (6 marks)
# Shelter account (3 marks)
# Pet seeker account (3 marks)
# Get (4 marks)
# Any user (shelter or seeker) can see the profile of a shelter.
#NOTNEEDED implement via applications Shelters can only view pet seekers' profiles if they have an active application with the shelter. 
# List (2 marks)
# Can view a list of shelters
# Cannot view a list of pet seekers
# Delete (1 mark)
# Shelter: all of their pet listings will be deleted.
# Seeker: all of their applications will be deleted.
# Both: all of their notifications will be deleted.

#login is done by the token api stuff?

class HelloWorldView(ListAPIView):
    def get(self, request):
        return Response({'message': 'Hello, world!'})

class PetSeekerRegisterView(CreateAPIView):
    serializer_class = SeekerSerializer
    def perform_create(self, serializer):
        serializer.save()


class PetShelterRegisterView(CreateAPIView):
    serializer_class = ShelterSerializer

    def perform_create(self, serializer):
        serializer.save()


class ProfileUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.user.account_type == 'petseeker':
            return SeekerSerializer
        else:
            return ShelterSerializer

    def get_object(self):
        return get_object_or_404(Account, pk=self.kwargs['pk'])


# endpoint /shelter/<int:pk>/details
# viewable to anyone
class ShelterDetailsView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ShelterDetailsSerializer
    def get_query_set(self):
        return get_object_or_404(PetShelter, pk=self.kwargs['pk'])



# get seeker profile , excluding this requirement as the application contains this info


# list of shelters
# endpoint /shelter/all/
class ShelterListView(ListAPIView):
    serializer_class = ShelterListSerializer
    def get_query_set(self):
        query_set = PetShelter.objects.all()
        return query_set


class AccountDeleteView(DestroyAPIView):
    queryset = Account.objects.all()
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        instance = get_object_or_404(PetShelter, pk=self.kwargs['pk'])
        if instance.user != request.user:
            return Response({'error': 'You are not authorized to delete this account.'}, status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)