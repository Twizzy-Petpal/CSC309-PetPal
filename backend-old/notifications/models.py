from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from petpal.settings import AUTH_USER_MODEL as User
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.db.models import Q

class Notification(models.Model):
    NOTIF_TYPE_CHOICES = [
        ("comment", "Someone has commented on your shelter."),
        ("application", "Someone has commented on your application"),
    ]

    # Associated users that have access to the notification
    recipient = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='notifications_received', null=True)
    notifier = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='notifications_sent', null=True)
    # Notification metadata
    creation_time = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False, verbose_name="read")
    content = models.TextField()
    title = models.CharField(max_length=13, choices=NOTIF_TYPE_CHOICES)
    link = models.URLField()
    # # Make a link that points to an associated model: either an application or a comment
    # # content_type=<appliction or shelter instance>
    # content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    # # object_id=<application or shelter instance>.id
    # object_id = models.PositiveIntegerField()
    # # Setting content_type and object_id will set associated model, so you do not need to set this in the creation
    # associated_model = GenericForeignKey("content_type", "object_id")

    def __str__(self):
        return f"{self.notifier} to {self.recipient}: {self.title}"

    @receiver(pre_delete, sender=User)
    def delete_notifications(sender, instance, **kwargs):
        Notification.objects.filter(Q(recipient=instance) & Q(notifier=None)).delete()
        Notification.objects.filter(Q(notifier=instance) & Q(recipient=None)).delete()