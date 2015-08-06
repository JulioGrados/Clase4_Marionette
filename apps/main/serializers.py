from rest_framework import serializers
from .models import Event, Inscription, Favorito
from django.contrib.auth.models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = User
		fields = ("username", "first_name", "last_name")


class EventSerializer(serializers.ModelSerializer):

	favoritos = serializers.SerializerMethodField('get_favourites')

	def get_favourites(self, event):
		favoritos = Favorito.objects.filter(event = event).values("id")
		return favoritos

	class Meta:
		model = Event
		fields = ("id", "name", "address", "description", "image", "organizer", "date", "category", 
				"capacity", "user", "favoritos")


class InscritionSerializer(serializers.ModelSerializer):

	class Meta:
		model = Inscription


class FavoritoSerializer(serializers.ModelSerializer):

	class Meta:
		model = Favorito