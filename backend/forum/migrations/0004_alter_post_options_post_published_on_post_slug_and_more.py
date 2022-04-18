# Generated by Django 4.0.3 on 2022-04-17 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0003_alter_post_author'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['-published_on']},
        ),
        migrations.AddField(
            model_name='post',
            name='published_on',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='slug',
            field=models.SlugField(blank=True, null=True),
        ),
        migrations.AddIndex(
            model_name='post',
            index=models.Index(fields=['slug'], name='forum_post_slug_3a551c_idx'),
        ),
    ]
