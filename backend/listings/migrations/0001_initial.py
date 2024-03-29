# Generated by Django 5.0 on 2023-12-07 07:46

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=50)),
                ('status', models.CharField(choices=[('available', 'available'), ('adopted', 'adopted'), ('pending', 'pending'), ('withdrawn', 'withdrawn')], max_length=10)),
                ('animal', models.CharField(max_length=50)),
                ('breed', models.CharField(max_length=50)),
                ('age', models.CharField(choices=[('new', 'newborn'), ('young', 'young'), ('adult', 'adult'), ('senior', 'senior')], max_length=10)),
                ('size', models.CharField(choices=[('S', 'small'), ('M', 'medium'), ('L', 'large'), ('XL', 'extra large')], max_length=5)),
                ('colour', models.CharField(max_length=50)),
                ('sex', models.CharField(choices=[('F', 'Female'), ('M', 'Male')], max_length=1)),
                ('personality', models.CharField(choices=[('very active', 'very active'), ('active', 'active'), ('laid-back', 'laid-back'), ('lap', 'lap-pet')], max_length=15)),
                ('good_with', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('deadline', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_updated_at', models.DateTimeField(auto_now=True)),
                ('shelter', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='listings', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ListingImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='listing_images/')),
                ('listing', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='listings.listing')),
            ],
        ),
    ]
