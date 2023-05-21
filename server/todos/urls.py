from django.urls import path
from .views import ListTodo, DetailTodo, AddTask, UpdateTask, DeleteTask

urlpatterns = [
    path('<int:pk>', DetailTodo.as_view()),
    path('', ListTodo.as_view()),
    path('add', AddTask.as_view()),
    path('update/<int:pk>', UpdateTask.as_view()),
    path('delete/<int:pk>', DeleteTask.as_view()),
]
