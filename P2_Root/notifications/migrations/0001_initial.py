# Generated by Django 4.2.7 on 2023-11-08 20:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('is_read', models.BooleanField(default=False, verbose_name='read')),
                ('content', models.TextField()),
                ('title', models.CharField(choices=[('comment', 'Someone has commented on your shelter.'), ('application', 'Someone has commented on your application')], max_length=13)),
                ('link', models.URLField()),
                ('notifier', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='notifications_sent', to=settings.AUTH_USER_MODEL)),
                ('recipient', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='notifications_received', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
