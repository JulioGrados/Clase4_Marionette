from django.conf.urls import include, url
from rest_framework import routers
from .views import EventViewSet, IndexView, FavoritoViewSet

router = routers.SimpleRouter()
router.register(r'eventos', EventViewSet)
router.register(r'favoritos', FavoritoViewSet)


urlpatterns = [
	url(r'^api/', include(router.urls)),
    url(r'^$', IndexView.as_view()),
]
