# Generated by Django 4.0.3 on 2022-04-24 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0004_alter_post_options_post_published_on_post_slug_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(default='default.jpg', upload_to='post_images'),
        ),
    ]
