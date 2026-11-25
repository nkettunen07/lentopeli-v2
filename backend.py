from flask import Flask
import os
from dotenv import load_dotenv
import mysql.connector
load_dotenv()

MYSQLPW = os.getenv('DBPASSWORD')
if MYSQLPW == None:
    print("ei oo db salasanaa")
    print("Tee .env tiedosto, kirjoita sinne DBPASSWORD= ja sen jälkeen kirjoita tietokantasi salasana. tämä ei koskaan mene githubiin.")
    exit(0)

connection = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password=MYSQLPW,
    database="flight_game"
)

def fetchone(query, params=()): 
    cursor = connection.cursor()
    cursor.execute(query, params)
    result = cursor.fetchone()
    cursor.close()
    return result
def fetchall(query, params=()): 
    cursor = connection.cursor()
    cursor.execute(query, params)
    result = cursor.fetchall()
    cursor.close()
    return result


app = Flask(__name__)
@app.route('/airports')
def airports():
    result = fetchall("""
        SELECT *
        FROM airport
    """)
    if result == None:
        return {
            "error": "Not foundia"
        }
    return result

app.run(use_reloader=True, host='127.0.0.1', port=3000)
