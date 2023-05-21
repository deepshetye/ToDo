from django.db import models
import django

class Todo(models.Model):
    title = models.CharField(max_length=200)
    board = models.IntegerField(default=0)
    priority = models.IntegerField(default=0)
    # due = models.DateTimeField(default=django.utils.timezone.now())
    updated_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
