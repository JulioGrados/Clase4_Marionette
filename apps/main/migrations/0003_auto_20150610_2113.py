# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_auto_20150610_1632'),
    ]

    operations = [
        migrations.AddField(
            model_name='inscription',
            name='dni',
            field=models.IntegerField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='inscription',
            name='phone',
            field=models.CharField(default=datetime.datetime(2015, 6, 10, 21, 13, 55, 798702, tzinfo=utc), max_length=20),
            preserve_default=False,
        ),
    ]
