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
@app.route('/airport/<icao>')
def airport(icao):
    result = fetchone("""
        SELECT *
        FROM airport WHERE ident = %s
    """, (icao,))
    if result == None:
        return {
            "error": "Not foundia"
        }
    return {
        "id": result[0],
        "ident": result[1],
        "type": result[2],
        "name": result[3],
        "latitude_deg": result[4],
        "longitude_deg": result[5],
        "elevation_ft": result[6],
        "contitent": result[7],
        "iso_country": result[8],
        "municipality": result[9],
        "scheduled_service": result[10],
        "gps_code": result[11],
        "iata_code": result[12],
        "local_code": result[13],
        "home_link": result[14],
        "wikipedia_link": result[15],
        "keywords": result[16]
    }
@app.route('/starter')
def starter():
    # periaatteessa voisi hardcodee suoraan pelikoodiin, mutta tää on sillee helpompaa 
    # koska voi vaa päivittää näitä ja kaikki (jopa vanhat versiot) saa nää uudet
    starterairports = [
        "FSIA", #Seychelles International Airport
        "OMDB", #Dubai International Airport
        "EDDB", #Berlin Brandenburg Airport
        "KMIA", #Miami International Airport
        "SKBO", #El Dorado International Airport
        "YMML" #Melbourne International Airport
        ]
    return starterairports

app.run(use_reloader=True, host='127.0.0.1', port=3000)
