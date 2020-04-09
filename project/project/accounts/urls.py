from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, RegisterAPI2, UserAPI2, OfficeAPI, DoctorsViewset, OfficeViewSet, DoctorDataViewset, DoctorsViewset
from knox import views as knox_views


urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/patient-register', RegisterAPI.as_view()),
    path('api/auth/office-register', OfficeAPI.as_view()),
    path('api/auth/doctor-register', RegisterAPI2.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/officelist', OfficeViewSet.as_view({'get': 'list'})),
    path('api/auth/patient-user', UserAPI.as_view()),
    path('api/auth/doctor-user', UserAPI2.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('doctors/username=<username>/',
         DoctorDataViewset.as_view({'get': 'list'})),
    path('doctors/edu=<edu>/',
         DoctorsViewset.as_view({'get': 'list'}))

]
