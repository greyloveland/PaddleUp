# Getting started

clone the repo
git clone git@github.com:Manodiestra/data5570-spring-2025.git

## back end
1. Make a virtual environment
1. `python3 -m venv myvenv`
1. Activate it
1. `source myvenv/bin/activate`
1. Install pip modules
1. `pip3 install django djangorestframework`
1. `cd django_back_end`
1. Make database migrations
1. `python3 manage.py makemigrations api_app`
1. `python3 manage.py migrate`
1. Run the app
1. `python3 manage.py runserver`
1. `python3 manage.py runserver 0.0.0.0:8000` (for receiving external traffic)


