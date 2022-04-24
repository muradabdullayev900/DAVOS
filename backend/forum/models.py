from django.db import models
from django.utils import timezone
from users.models import UserAccount, Profile
from django.db.models.signals import post_save, pre_save
from django.utils import timezone
from django.dispatch import receiver
from .utils import unique_slug_generator

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    published_on = models.DateTimeField(null=True, blank=True)
    author = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    slug = models.SlugField(blank=True, null=True)

    def __str__(self):
        return self.title

    @property
    def comments_list(self):
        return self.comments.filter(is_displayed=True)

    @property
    def total_comments(self):
        return self.comments_list.count()

    @property
    def author_full_name(self):
        try:
            return f'{self.author.first_name} {self.author.last_name}'
        except:
            return "Name Not Set"

    @property
    def user_profile(self):
        try:
            profile_image = Profile.objects.get(user_id=self.author).image 
            return f'{profile_image}'
        except:
            return "Profile Image Not Set"

    
    class Meta:
        indexes = [models.Index(fields=['slug'])]
        ordering = ['-published_on']


@receiver(post_save, sender=Post)
def generate_unique_slug_for_posts(sender, instance, created, *args, **kwargs):

    if created:
        instance.slug = unique_slug_generator(instance)
        instance.save()


@receiver(pre_save, sender=Post)
def update_published_on(sender, instance, **kwargs):
    """Update The Date Of 'Published On' When The Post Gets Published"""

    if instance.id:
        old_value = Post.objects.get(pk=instance.id).published_on
        if not old_value:
            instance.published_on = timezone.now()