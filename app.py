import numpy as np
import json
import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt
from flask import Flask, jsonify, render_template, url_for, flash, redirect
from forms import RegistrationForm, LoginForm

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
app.config['SECRET_KEY'] = '63cf72523975db8854365151adee8c24'

#################################################
# Database Setup
#################################################

engine = create_engine('postgresql://postgres:postgres@localhost:5432/Parks')

Base = automap_base()

Base.prepare(engine, reflect=True)

seattle = Base.classes.seattle

session = Session(bind = engine)

#################################################
# Flask Routes
#################################################

@app.route("/home")
def home():
    return render_template('home.html', posts=posts)


@app.route("/about")
def about():
    return render_template('about.html', title='About')


@app.route("/seattle")
def test_function():
    results = session.query(seattle.name, seattle.location, seattle.type, seattle.lat, seattle.lng, seattle.distance, seattle.duration).all()

    return render_template("city.html", results = results)


@app.route("/city")
def find_park_():
   
    results = session.query(seattle.name, seattle.location, seattle.type, seattle.lat, seattle.lng, seattle.distance, seattle.duration).all()

    data_list = []
    data_dict = {}
    for name,location,type,lat,lng,distance,duration in results:
        data_dict['Name'] = name
        data_dict['Location'] = location
        data_dict['Type'] = type
        data_dict['Lat'] = lat
        data_dict['Lng'] = lng
        data_dict['Distance'] = distance
        data_dict['Duration'] = duration
    
        data_list.append(data_dict)
        data_dict = {}
    return jsonify(data_list)

@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        flash(f'Account created for {form.username.data}!', 'success')
        return redirect(url_for('home'))
    return render_template('register.html', title='Register', form=form)


@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        if form.email.data == 'admin@blog.com' and form.password.data == 'password':
            flash('You have been logged in!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check username and password', 'danger')
    return render_template('login.html', title='Login', form=form)


@app.route("/")
def start():
    return ("Availble routes: /city")
   
if __name__ == '__main__':
    app.run(debug=True)


# CODE TO USE LATER
# trip_data = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
#        filter(Measurement.date >= country).filter(Measurement.date <= end).filter(Measurement.station == 'USC00519281').all()

