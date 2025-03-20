FROM python:3.12-slim 

RUN apt update && apt install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

WORKDIR /code  

COPY ./requirements.txt /code/requirements.txt
RUN pip install -r requirements.txt

COPY ./app /code/app 
COPY ./.env /code/.env
COPY ./modules /code/modules

EXPOSE 8000 

# Eliminar la opción --reload para producción
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]