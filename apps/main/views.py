from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404
from rest_framework.decorators import detail_route
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import EventSerializer, InscritionSerializer, FavoritoSerializer
from .models import Event, Inscription, Favorito
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class EventViewSet(viewsets.ModelViewSet):

	queryset = Event.objects.all()
	serializer_class = EventSerializer

	@detail_route(methods=['post','get'])
	def inscritos(self, request, pk=None):
		if request.POST:
			Inscription.objects.create(
					event = get_object_or_404(Event, pk = pk),
					firstname = request.POST['firstname'],
					surname = request.POST['surname'],
					dni = request.POST['dni'],
					phone = request.POST['phone']
				)
			content = {'inscrito': 'Successfully'}
			return Response(content, status=status.HTTP_201_CREATED)
		else:
			inscritos = Inscription.objects.filter(event__pk = pk)
			inscritosSer = InscritionSerializer(inscritos, many=True, context={'request': request})
			return Response(inscritosSer.data)


class IndexView(TemplateView):

	template_name = 'index.html'



class FavoritoViewSet(viewsets.ModelViewSet):

	queryset = Favorito.objects.all()
	serializer_class = FavoritoSerializer
