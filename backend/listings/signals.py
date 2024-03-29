from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import PetSeeker
from notifications.models import Notification
from .models import Listing

@receiver(post_save, sender=Listing)
def notify_pet_seekers_on_listing_save(sender, instance, **kwargs):
    # Get the new or updated listing
    listing = instance

    # Get all pet seekers
    pet_seekers = PetSeeker.objects.all()

    # Check for matches and send notifications
    for seeker in pet_seekers:
        if (
            (seeker.pref_animal == listing.animal) and
            (seeker.pref_age == 'none' or seeker.pref_age == listing.age) and
            (seeker.pref_size == 'none' or seeker.pref_size == listing.size) and
            (seeker.pref_colour == listing.colour) and
            (seeker.pref_sex == 'none' or seeker.pref_sex == listing.sex) and
            (seeker.pref_personality == 'none' or seeker.pref_personality == listing.personality)
        ):
            # Create a match notification
            Notification.objects.create(
                recipient=seeker,  # Assuming there is a user field in PetSeeker
                notifier=listing.shelter,
                content=f"A new listing matches your preferences! See if you'd like to be {listing.name}'s pal!",
                title="match",
                link=f"/listings/{listing.id}"
            )