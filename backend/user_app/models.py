from django.db import models


# Predefined list of countries (you can expand this or use django-countries package)
COUNTRY_CHOICES = [
    ("NG", "Nigeria"),
    ("US", "United States"),
    ("UK", "United Kingdom"),
    ("CA", "Canada"),
    ("GH", "Ghana"),
    ("KE", "Kenya"),
]


class Student(models.Model):
    student_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    country = models.CharField(max_length=50, choices=COUNTRY_CHOICES, default="NG")
    date_of_birth = models.DateField(null=True, blank=True)
    enrolled_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.student_id})"


class Teacher(models.Model):
    teacher_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    country = models.CharField(max_length=50, choices=COUNTRY_CHOICES, default="NG")
    specialization = models.CharField(max_length=100)
    hire_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} - {self.specialization}"
