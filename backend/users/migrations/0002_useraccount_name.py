# Generated by Django 4.0.3 on 2022-03-09 22:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='name',
            field=models.CharField(default='None', max_length=255),
        ),
    ]
