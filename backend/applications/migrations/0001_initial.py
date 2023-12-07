# Generated by Django 5.0 on 2023-12-07 07:46

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("listings", "0004_alter_listingimage_listing"),
    ]

    operations = [
        migrations.CreateModel(
            name="Application",
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_updated_at', models.DateTimeField(auto_now=True)),
                ('application_status', models.CharField(choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('denied', 'Denied'), ('withdrawn', 'Withdrawn')], default='pending', max_length=20)),
                ('applicant_first_name', models.CharField(max_length=50)),
                ('applicant_last_name', models.CharField(max_length=50)),
                ('applicant_email', models.CharField(max_length=50)),
                ('applicant_phone_number', models.IntegerField()),
                ('address', models.CharField(max_length=50)),
                ('postal_code', models.CharField(max_length=6)),
                ('above_twentyone', models.BooleanField()),
                ('ideal_pet_age', models.CharField(choices=[('none', 'none'), ('new', 'newborn'), ('young', 'young'), ('adult', 'adult'), ('senior', 'senior')], default='none', max_length=10)),
                ('ideal_pet_sex', models.CharField(choices=[('none', 'no gender preference'), ('F', 'female'), ('M', 'male')], default='none', max_length=5)),
                ('ideal_pet_size', models.CharField(choices=[('none', 'no size preference'), ('S', 'small'), ('M', 'medium'), ('L', 'large'), ('XL', 'extra large')], default='none', max_length=5)),
                ('ideal_pet_behaviour', models.CharField(choices=[('none', 'no behaviour preference'), ('very active', 'very active'), ('active', 'active'), ('laid-back', 'laid-back'), ('lap', 'lap-pet')], default='none', max_length=15)),
                ('currently_insured', models.BooleanField()),
                ('insurance_name', models.CharField(choices=[('visa', 'Visa'), ('master', 'Mastercard'), ('amex', 'American Express'), ('interac', 'Interac E-transfer'), ('paypal', 'Paypal')], max_length=10)),
                ('pet_listing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='listings.listing')),
                ('pet_seeker_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pet_seeker_applicant', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                "ordering": ["-created_at", "-last_updated_at"],
            },
        ),
    ]
