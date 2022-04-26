from django.db import models
from forum.models import Post
from users.models import UserAccount, Profile


class Comment(models.Model):
    """Model For The Comments In The Blog Posts"""
    author = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    body = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE,
                             related_name='comments', related_query_name='comment')
    is_displayed = models.BooleanField(default=True)
    published_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Post - "{self.post.title}", Body - "{self.body}"'

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