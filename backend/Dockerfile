FROM python3.9

WORKDIR /src

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY . .
EXPOSE 8000

ENTRYPOINT ["python3", "manage.py", "runserver"]
