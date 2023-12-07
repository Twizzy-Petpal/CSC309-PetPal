# Generated by Django 4.2.7 on 2023-12-07 04:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0003_remove_listing_good_without"),
    ]

    operations = [
        migrations.AlterField(
            model_name="listingimage",
            name="listing",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="images",
                to="listings.listing",
            ),
        ),
    ]
