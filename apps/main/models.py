from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):

	name = models.CharField(max_length=100)
	address = models.CharField(max_length=100)
	description = models.CharField(max_length=250)
	image = models.ImageField(upload_to = "events")
	organizer = models.CharField(max_length=100)
	date = models.DateTimeField()
	category = models.CharField(max_length=50)
	capacity = models.IntegerField()
	user = models.ForeignKey(User)

	def __unicode__(self):
		return self.name

class Inscription(models.Model):
	event = models.ForeignKey(Event)
	firstname = models.CharField(max_length=50)
	surname = models.CharField(max_length=50)
	dni = models.IntegerField()
	phone = models.CharField(max_length=20)

	def __unicode__(self):
		return "%s %s" % (self.surname, self.event.name)

class Favorito(models.Model):
	event = models.ForeignKey(Event)
	user = models.ForeignKey(User)